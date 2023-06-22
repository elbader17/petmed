import { defineStore } from 'pinia';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, getDocs, query, where, updateDoc } from 'firebase/firestore/lite'
import { db, auth } from '@/firebaseConfig';
import { useDatabaseUserStore } from './databaseUser';
import { useDatabaseVetStore } from './databaseVets';
import { useDatabasePetStore } from './databasePet';
import router from '@/router/index';


export const useUserStore = defineStore('userStore', {
  state: () => ({
    userData: null,
    userCode: [],
    loadingUser: false,
    loadingSession: false,
    typeUser: 'client',
  }),
  actions: {
    async loginUser(email, password) {
      this.loadingUser = true
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        this.userData = { email: user.email, uid: user.uid }
        const queryUser = query(collection(db, 'users'), where('account', '==', auth.currentUser.uid))
        const queryUserSnap = await getDocs(queryUser)
        this.typeUser = queryUserSnap.docs[0].data().type
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
      this.userCode = code;

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
        return [false, null, null]
      }

      const codeDoc = querySnapshot.docs[0]
      const expiration = codeDoc.data().expiration.toDate()
      const currentTime = new Date()

      if (currentTime > expiration) {
        return [false, null, null]
      }

      const account = codeDoc.data().account
      const petId = codeDoc.data().pet

      const queryPet = query(collection(db, `pets`), where('__name__', '==', petId))
      const petSnapshot = await getDocs(queryPet)

      if (petSnapshot.empty) {
        return [false, null, null]
      }

      const petName = petSnapshot.docs[0].data().name
      const petPlan = petSnapshot.docs[0].data().plan
      const petClient = petSnapshot.docs[0].data().client

      const queryUser = query(collection(db, `users`), where('__name__', '==', petClient))
      const userSnapshot = await getDocs(queryUser)

      if (userSnapshot.empty) {
        return [false, null, null]
      }

      const userName = userSnapshot.docs[0].data().name

      const petData = {
        name: petName,
        client: userName,
        id: petId,
        plan: petPlan
      }

      return [true, account, petData]
    },

    async expirationCode(code) {
      console.log("🚀 ~ file: user.js:132 ~ expirationCode ~ code:", code)
      // esta funcion tiene que buscar el code en la db y cambiarle el expiration a este mismo momento
      const queryCode = query(collection(db, 'codes'), where('code', '==', parseInt(code)))
      const querySnapshot = await getDocs(queryCode)
      console.log("🚀 ~ file: user.js:136 ~ expirationCode ~ querySnapshot:", querySnapshot)
      const codeDoc = querySnapshot.docs[0]
      const expiration = new Date()
      await updateDoc(codeDoc.ref, { expiration })



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
              const databaseUserStore = useDatabaseUserStore();
              const databaseVetStore = useDatabaseVetStore();
              const databasePetStore = useDatabasePetStore();
              databaseUserStore.$reset();
              databaseVetStore.$reset();
              databasePetStore.$reset();
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
