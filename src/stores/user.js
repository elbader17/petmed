import { defineStore } from 'pinia'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth'
import { addDoc, collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore/lite'
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
    errorMessage: null,
    user: {}
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
        localStorage.setItem('userType', queryUserSnap.docs[0].data().type)
        this.user = queryUserSnap.docs[0].data()
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
    async updateUser() {
      const user = this.user
      const queryUser = query(collection(db, 'users'), where('account', '==', auth.currentUser.uid))
      const queryUserSnap = await getDocs(queryUser)
      const id = queryUserSnap.docs[0].id
      const userRef = doc(db, 'users', id)
      await updateDoc(userRef, user)
    },
    async logoutUser(redirect = true) {
      const databaseUserStore = useDatabaseUserStore()
      databaseUserStore.$reset()
      try {
        await signOut(auth)
        this.userData = null
        if (redirect) router.push({ name: 'home' })
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

      const queryRef = query(collection(db, 'pets'), where('numAffiliate', '==', afiliate))
      const querySnapshot = await getDocs(queryRef)

      const pets = []
      const dataPet = []
      querySnapshot.forEach((document) => {
        pets.push(document.id)
        dataPet.push(document.data())
      })
      if (dataPet[0]) {
        const userQuery = query(collection(db, 'users'), where('__name__', '==', dataPet[0].client))
        const userSnapshot = await getDocs(userQuery)
        const userData = userSnapshot.docs[0].data()
        if (userData.banned) {
          return 'blocked'
        }

        const lastPayDate = new Date(userData.lastPay.split('/').reverse().join('-'))
        const currentDate = new Date()

        const registrationParts = (userData.registration_date || '01/01/2023').split('/')
        const registration = new Date(
          parseInt(registrationParts[2], 10),
          parseInt(registrationParts[1], 10) - 1,
          parseInt(registrationParts[0], 10)
        )

        let dueDay = registration.getDate()

        let nextPaymentYear = registration.getFullYear()
        let nextPaymentMonth = registration.getMonth() + 1

        if (lastPayDate > registration) {
          nextPaymentYear = lastPayDate.getFullYear()
          nextPaymentMonth = lastPayDate.getMonth() + 1
        }

        if (nextPaymentMonth > 11) {
          nextPaymentMonth = 0
          nextPaymentYear++
        }

        const daysInMonth = new Date(nextPaymentYear, nextPaymentMonth + 1, 0).getDate()

        if (dueDay > daysInMonth) {
          dueDay = daysInMonth
        }

        const dueDate = new Date(nextPaymentYear, nextPaymentMonth, dueDay)

        if (currentDate > dueDate) {
          return 'blocked'
        }
      }
      await addDoc(collection(db, 'codes'), {
        code,
        account: auth.currentUser.uid,
        expiration,
        pet: pets[0],
        afiliate
      })
      return code
    },

    async validateCode(code) {
      try {
        const codeQuery = query(collection(db, 'codes'), where('code', '==', code))
        const codeSnapshot = await getDocs(codeQuery)
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
        const userName = userSnapshot.docs[0].data().name
        const firstDayOfMonth = new Date()
        firstDayOfMonth.setDate(1)
        firstDayOfMonth.setHours(0, 0, 0, 0)

        const formsQuery = query(
          collection(db, 'forms'),
          where('account', '==', account),
          where('date', '>=', firstDayOfMonth)
        )
        function searchValue(object, searchedValue) {
          return Object.values(object).some((value) => {
            if (typeof value === 'object') {
              return searchValue(value, searchedValue)
            }
            return value === searchedValue
          })
        }

        const formsSnapshot = await getDocs(formsQuery)
        const formsData = []
        const petData = {
          name: petName,
          client: userName,
          id: petId,
          plan: petPlan,
          numAffiliate: numAffiliate
        }

        formsSnapshot.forEach((doc) => {
          const formData = doc.data()
          formsData.push(formData)
        })
        if (formsData.length > 0) {
          const formsWithConsults = []
          for (const form of formsData) {
            if (searchValue(form, 'Consulta en Clínica') && form.petId === petId) {
              formsWithConsults.push(form)
            }
          }

          if (petPlan === 'Plan 1005') {
            if (formsWithConsults.length >= 1) {
              return [true, account, petData, true]
            }
          }
          if (petPlan === 'Plan 2010') {
            if (formsWithConsults.length >= 2) {
              return [true, account, petData, true]
            }
          }
          if (petPlan === 'Plan 3015') {
            if (formsWithConsults.length >= 3) {
              return [true, account, petData, true]
            }
          }
        }

        return [true, account, petData]
      } catch (error) {
        console.log('test 5', error)
        return [false, null, null]
      }
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
