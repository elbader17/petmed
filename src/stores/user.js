import { defineStore } from 'pinia'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth'
import { addDoc, collection, getDocs, query, where, updateDoc } from 'firebase/firestore/lite'
import { db, auth } from '@/firebaseConfig'
import { useDatabaseUserStore } from './databaseUser'
import { useDatabaseVetStore } from './databaseVets'
import { useDatabasePetStore } from './databasePet'
import router from '@/router/index'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    userData: null,
    userCode: [],
    loadingUser: false,
    loadingSession: false,
    typeUser: 'client',
    errorMessage: null
  }),
  actions: {
    async loginUser(email, password) {
      this.loadingUser = true
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        this.userData = { email: user.email, uid: user.uid }
        const queryUser = query(
          collection(db, 'users'),
          where('account', '==', auth.currentUser.uid)
        )
        const queryUserSnap = await getDocs(queryUser)
        this.typeUser = queryUserSnap.docs[0].data().type
        this.errorMessage = null
        router.push({ name: 'dashboard-home' })
      } catch (error) {
        switch (error.code) {
          case 'auth/invalid-email':
            this.errorMessage = 'Email no válido'
            break
          case 'auth/user-not-found':
            this.errorMessage = 'Email inexistente'
            break
          case 'auth/wrong-password':
            this.errorMessage = 'Contraseña incorrecta'
            break
          default:
            this.errorMessage = 'Email o contraseña incorrecto'
            break
        }
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
    async resetUserPassword(email) {
      try {
        await sendPasswordResetEmail(auth, email)
      } catch (error) {
        console.log(error)
      }
    },

    async createCode(afiliate) {
      const code = Math.floor(100000 + Math.random() * 900000)
      const expiration = new Date()
      expiration.setMinutes(expiration.getMinutes() + 5)
      this.userCode = code

      const queryUser = query(collection(db, 'users'), where('account', '==', auth.currentUser.uid))
      const queryUserSnap = await getDocs(queryUser)

      let user = null
      queryUserSnap.forEach((document) => {
        user = document.id
      })
      const queryRef = query(collection(db, 'pets'), where('numAffiliate', '==', afiliate))
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
      try {
        const codeQuery = query(collection(db, 'codes'), where('code', '==', code))
        const codeSnapshot = await getDocs(codeQuery)
        console.log('🚀 ~ file: user.js:106 ~ validateCode ~ codeSnapshot:', codeSnapshot)
        if (codeSnapshot.empty) {
          return [false, null, null]
        }

        const codeDoc = codeSnapshot.docs[0]
        const expiration = codeDoc.data().expiration.toDate()
        const currentTime = new Date()
        if (currentTime > expiration) {
          return [false, null, null]
        }

        const account = codeDoc.data().account
        const petId = codeDoc.data().pet

        const petQuery = query(collection(db, 'pets'), where('__name__', '==', petId))
        const petSnapshot = await getDocs(petQuery)

        if (petSnapshot.empty) {
          return [false, null, null]
        }

        const petName = petSnapshot.docs[0].data().name
        const petPlan = petSnapshot.docs[0].data().plan
        const petClient = petSnapshot.docs[0].data().client
        const numAffiliate = petSnapshot.docs[0].data().numAffiliate

        const userQuery = query(collection(db, 'users'), where('__name__', '==', petClient))
        const userSnapshot = await getDocs(userQuery)

        if (userSnapshot.empty) {
          return [false, null, null]
        }
        console.log('test')
        const userName = userSnapshot.docs[0].data().name
        console.log('test')
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

        const formsQuery = query(
          collection(db, 'forms'),
          where('account', '==', account),
          where('date', '>=', thirtyDaysAgo)
        )
        console.log(
          '🚀 ~ file: user.js:175 ~ getFormsForAccountLast30Days ~ formsQuery:',
          formsQuery
        )

        const formsSnapshot = await getDocs(formsQuery)
        console.log(
          '🚀 ~ file: user.js:177 ~ getFormsForAccountLast30Days ~ formsSnapshot:',
          formsSnapshot
        )

        if (formsSnapshot.empty) {
          console.log('vacio') // No se encontraron formularios en los últimos 30 días
        }

        const formsData = []

        formsSnapshot.forEach((doc) => {
          const formData = doc.data()
          formsData.push(formData)
        })
        if (formsData.length > 0) {
          const formsWithConsults = []
          for (const form of formsData) {
            if (this.searchValue(form, 'Consulta en Clínica')) {
              formsWithConsults.push(form)
            }
          }
          if (petPlan === 'Plan 1005') {
            if (formsWithConsults.length >= 1) {
              return [false, null, null]
            }
          }
          if (petPlan === 'Plan 2010') {
            if (formsWithConsults.length >= 2) {
              return [false, null, null]
            }
          }
          if (petPlan === 'Plan 3015') {
            if (formsWithConsults.length >= 3) {
              return [false, null, null]
            }
          }
          console.log(formsWithConsults.length, petPlan);
        }

        const petData = {
          name: petName,
          client: userName,
          id: petId,
          plan: petPlan,
          numAffiliate: numAffiliate
        }
        return [true, account, petData]
      } catch (error) {
        return [false, null, null]
      }
    },
    searchValue(object, searchedValue) {
      return Object.values(object).some((value) => {
        if (typeof value === 'object') {
          return searchValue(value, searchedValue)
        }
        return value === searchedValue
      })
    },
    async getFormsForAccountLast30Days(account) {
      return formsData
    },

    async expirationCode(code) {
      const queryCode = query(collection(db, 'codes'), where('code', '==', parseInt(code)))
      const querySnapshot = await getDocs(queryCode)
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
              const databaseUserStore = useDatabaseUserStore()
              const databaseVetStore = useDatabaseVetStore()
              const databasePetStore = useDatabasePetStore()
              databaseUserStore.$reset()
              databaseVetStore.$reset()
              databasePetStore.$reset()
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
