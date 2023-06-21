import { defineStore } from 'pinia';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore/lite';
import { db, auth } from '@/firebaseConfig';
import { useDatabaseUserStore } from './databaseUser';
import router from '@/router/index';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    userData: null,
    newUser: null,
    loadingUser: false,
    loadingSession: false
  }),
  actions: {
    async registerUser(email, password) {
      this.loadingUser = true
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        this.newUser = { email: user.email, uid: user.uid };
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingUser = false
      }
    },
    async loginUser(email, password) {
      this.loadingUser = true
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        this.userData = { email: user.email, uid: user.uid }
        router.push({ name: 'dashboard-home' })
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingUser = false
      }
    },
    async logoutUser() {
      const databaseUserStore = useDatabaseUserStore()
      databaseUserStore.$reset()
      try {
        await signOut(auth)
        this.userData = null
        router.push({ name: 'home' })
      } catch (error) {
        console.log(error)
      }
    },
    async createCode() {
      const code = Math.floor(100000 + Math.random() * 900000)
      const expiration = new Date()
      expiration.setMinutes(expiration.getMinutes() + 5)

      const queryUser = query(collection(db, 'users'), where('account', '==', auth.currentUser.uid))
      const queryUserSnap = await getDocs(queryUser)

      let user = null
      queryUserSnap.forEach((document) => {
        user = document.id
      })

      const queryRef = query(collection(db, 'pets'), where('client', '==', user))
      const querySnapshot = await getDocs(queryRef)
      const pets = []
      querySnapshot.forEach((document) => {
        pets.push(document.id)
      })

      await addDoc(collection(db, 'codes'), {
        code,
        account: auth.currentUser.uid,
        expiration,
        pet: pets[0]
      })
    },

    async validateCode(code) {
      const queryCode = query(collection(db, 'codes'), where('code', '==', code))
      const querySnapshot = await getDocs(queryCode)
      if (querySnapshot.empty) {
        console.log('el código no existe')
        return false
      }

      const codeDoc = querySnapshot.docs[0]
      const expiration = codeDoc.data().expiration.toDate()
      const currentTime = new Date()

      if (currentTime > expiration) {
        console.log('el código ha expirado')
        return false
      }

      return true
    },

    currentUser() {
      return new Promise((resolve, reject) => {
        const unsuscribe = onAuthStateChanged(
          auth,
          (user) => {
            if (user) {
              this.userData = { email: user.email, uid: user.uid }
            } else {
              this.userData = null
              const databaseUserStore = useDatabaseUserStore()
              databaseUserStore.$reset()
            }
            resolve(user)
          },
          (error) => reject(error)
        )
        unsuscribe()
      })
    }
  }
})
