import {
  doc,
  setDoc,
  arrayUnion,
  arrayRemove,
  query,
  collection,
  getDoc,
  getDocs,
  updateDoc,
  startAfter,
  limit,
  endBefore,
  limitToLast,
  where
} from 'firebase/firestore/lite'
import { db } from '@/firebaseConfig'
import { defineStore } from 'pinia'
import { useDatabasePlansStore } from '@/stores/databasePlans'
import { useDatabaseUserStore } from './databaseUser'
import { useFormatDate } from '@/composables/formatDate'

const databasePlansStore = useDatabasePlansStore()
const databaseUserStore = useDatabaseUserStore()
const { formatDate } = useFormatDate()

export const useDatabaseClientPlanStore = defineStore('databaseClientPlanStore', {
  state: () => ({
    loadingDoc: false,
    plans: [],
    plansClient: [],
    page: 1,
    perPage: 10,
    pages: 0,
    total: 0,
    firstVisible: null,
    lastVisible: null
  }),
  actions: {
    async getSize() {
      if (this.total !== 0) {
        return
      }
      this.loadingDoc = true
      try {
        const qRef = query(collection(db, 'plans'))
        const qSnapshot = await getDocs(qRef)
        this.total = qSnapshot.size
        this.pages = Math.ceil(this.total / this.perPage)
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingDoc = false
      }
    },
    async getPlans() {
      if (this.plans.length !== 0) {
        return
      }
      this.loadingDoc = true
      try {
        const queryRef = query(collection(db, 'plans'), limit(this.perPage))
        const querySnapshot = await getDocs(queryRef)
        this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
        this.firstVisible = querySnapshot.docs[0]
        querySnapshot.forEach((doc) => {
          this.plans.push({
            id: doc.id,
            ...doc.data()
          })
        })
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingDoc = false
      }
    },
    async getPlansUser(id) {
      this.loadingDoc = true
      try {
        const planRef = doc(db, 'plans', id)
        const planSnapshot = await getDoc(planRef)
        if (planSnapshot.exists() && planSnapshot.data()) {
          this.plansClient.push(...planSnapshot.data().plans)
        } else {
          console.log('El cliente no tiene planes')
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingDoc = false
      }
    },
    async nextPage() {
      this.loadingDoc = true
      try {
        const queryRef = query(
          collection(db, 'plans'),
          startAfter(this.lastVisible),
          limit(this.perPage)
        )
        const querySnapshot = await getDocs(queryRef)
        this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
        this.firstVisible = querySnapshot.docs[0]
        this.page++
        this.plans = []
        querySnapshot.forEach((doc) => {
          this.plans.push({
            id: doc.id,
            ...doc.data()
          })
        })
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingDoc = false
      }
    },
    async previousPage() {
      this.loadingDoc = true
      try {
        const queryRef = query(
          collection(db, 'plans'),
          endBefore(this.firstVisible),
          limitToLast(this.perPage)
        )
        const querySnapshot = await getDocs(queryRef)
        this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
        this.firstVisible = querySnapshot.docs[0]
        this.page--
        this.plans = []
        querySnapshot.forEach((doc) => {
          this.plans.push({
            id: doc.id,
            ...doc.data()
          })
        })
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingDoc = false
      }
    },

    async addClientPlan(plan) {
      this.loadingDoc = true
      try {
        const existingPlan = await databasePlansStore.getPlan(plan.plan)
        if (!existingPlan) {
          throw new Error(`El plan "${plan.plan}" no existe en la base de datos.`)
        }

        const practices = JSON.parse(JSON.stringify(databasePlansStore.plan))

        if (typeof practices === 'object' && Object.prototype.hasOwnProperty.call(practices, '0')) {
          practices['0'].amount = String(Number(practices['0'].amount) / 12)
        }

        if (plan.numAffiliate) {
          const queryRef = query(
            collection(db, 'pets'),
            where('numAffiliate', '==', plan.numAffiliate)
          )
          const querySnapshot = await getDocs(queryRef)
          querySnapshot.forEach(async (doc) => {
            plan.petId = doc.id
            plan.petName = doc.data().name
            let date = doc.data().registration_code || null

            if (date && !date.includes('T')) {
              date = formatDate(date)
            }

            plan.date = date
          })
        }

        const planObj = {
          plan: plan.plan,
          date: plan.date,
          paid: plan.paid,
          petId: plan.petId || null,
          petName: plan.petName || null,
          numAffiliate: plan.numAffiliate || null,
          practices
        }

        const planRef = doc(db, 'plans', plan.client)
        await setDoc(planRef, { ['plans']: arrayUnion(planObj) }, { merge: true })
        const index = this.plans.findIndex((item) => item.id === plan.client)

        if (index !== -1) {
          this.plans[index].plans.push(planObj)
        } else {
          this.plans.unshift({
            id: plan.client,
            plans: [planObj]
          })
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingDoc = false
      }
    },

    async editClientPlan(data) {
      const clientPlanRef = doc(db, 'pets', data.id)

      await updateDoc(clientPlanRef, {
        name: data.name,
        plan: data.plan
      })

      const plansCollection = collection(db, 'plans')
      const querySnapshot = await getDocs(plansCollection)

      const planDoc = querySnapshot.docs.find((doc) => {
        const planData = doc.data()
        return planData.plans.some((plan) => plan.petId === data.id)
      })

      if (!planDoc) {
        console.log(`No plan found with petId: ${data.id}`)
        return null
      } else {
        const planData = planDoc.data()
        const planIndex = planData.plans.findIndex((plan) => plan.petId === data.id)

        if (planIndex !== -1) {
          planData.plans.splice(planIndex, 1)
          await updateDoc(planDoc.ref, { plans: planData.plans })
        }

        return planData
      }
    },
    async createAllPlans() {
      try {
        console.log('test')
        // obtener el Id de todos los clientes desde la base de datos y guardarlos en un array
        const clients = []
        const queryRef = query(collection(db, 'users'))
        const querySnapshot = await getDocs(queryRef)
        querySnapshot.forEach((doc) => {
          clients.push(doc.id)
        })
        const pets = []
        for (const client of clients) {
          const queryRef = query(collection(db, 'pets'), where('client', '==', client))
          const petSnapshot = await getDocs(queryRef)
          petSnapshot.forEach((doc) => {
            const date = doc.data().registration_code || '01/01/2022'
            console.log("🚀 ~ file: databaseClientPlan.js:254 ~ petSnapshot.forEach ~ date:", date)
            const fechaEnFormatoISO = formatDate(date)
            pets.push({
              client,
              plan: doc.data().plan.slice(-4),
              date: fechaEnFormatoISO,
              paid: true,
              petId: doc.id,
              petName: doc.data().name,
              numAffiliate: doc.data().numAffiliate
            })
          })
        }
        for (const pet of pets) {
          await this.addClientPlan(pet)
          console.log('🚀 plan creado')
        }
      } catch (error) {
        console.log(error)
      }
    },

    async deleteClientPlan(id, plan) {
      this.loadingDoc = true
      try {
        const planRef = doc(db, 'plans', id)
        await updateDoc(planRef, { ['plans']: arrayRemove(plan) })
        this.plans = this.plans.map((item) =>
          item.id === id
            ? {
              ...item,
              plans: item.plans.filter((value) => value !== plan)
            }
            : item
        )
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingDoc = false
      }
    },
    async addClientPlanPet(pet, petId) {
      this.loadingDoc = true
      try {
        const docRef = doc(db, 'plans', pet.client)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const data = docSnap.data()
          const plans = data.plans

          const index = plans.findIndex(
            (plan) => plan.plan === pet.plan && plan.numAffiliate === null
          )

          plans[index].petId = petId
          plans[index].petName = pet.name
          plans[index].numAffiliate = pet.numAffiliate

          await updateDoc(docRef, { plans: plans })
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingDoc = false
      }
    },

    async findPlanByPetId(petId) {
      try {
        let querySnapshot
        try {
          const queryRef = query(collection(db, 'plans'))
          querySnapshot = await getDocs(queryRef)
        } catch (error) {
          console.log(error)
        }

        const plans = []
        querySnapshot.forEach((doc) => {
          const planData = doc.data()
          const foundPlan = planData.plans.find((plan) => plan.petId === petId)

          if (foundPlan) {
            plans.push({
              id: doc.id,
              ...planData
            })
          }
        })

        let plan = {}
        plans[0].plans.forEach((p) => {
          if (p.petId === petId) {
            plan = p
          }
        })

        const petsRef = query(
          collection(db, 'pets'),
          where('numAffiliate', '==', plan.numAffiliate)
        )
        const petsSnapshot = await getDocs(petsRef)
        const petsData = petsSnapshot.docs[0].data()

        /* const usersRef = query(collection(db, 'users'), where('id', '==', petsData.client))
        const usersSnapshot = await getDocs(usersRef)
        const userData = usersSnapshot.docs[0].data() */

        const dateOfActivationISO = formatDate(petsData.registration_code)
        const dateOfActivation = new Date(dateOfActivationISO)
        const currentDate = new Date()
        const practices = {}

        for (const practiceId in plan.practices) {
          const practice = plan.practices[practiceId]

          if (!practice.gracetime || practice.gracetime === '-' || practice.gracetime === '0') {
            practices[practiceId] = practice
            continue
          }

          const graceTimeInDays = parseInt(practice.gracetime)
          const graceTimeInMillis = graceTimeInDays * 24 * 60 * 60 * 1000
          const activationDateInMillis = dateOfActivation.getTime()

          if (currentDate.getTime() - activationDateInMillis >= graceTimeInMillis) {
            practices[practiceId] = practice
          }
        }

        plan.practices = practices

        return [plan, plans[0].id]
      } catch (error) {
        console.log(error)
        return []
      }
    },

    async updateAmountsDefault(docRef, plans, plan, planName, date) {
      this.loadingDoc = true
      try {
        const defaultDocRef = doc(db, 'configs', 'plans')
        const defaultDocSnap = await getDoc(defaultDocRef)

        if (defaultDocSnap.exists()) {
          const defaultData = defaultDocSnap.data()
          const practicesDefault = defaultData[planName]
          const practices = plan.practices

          for (const key in practices) {
            practices[key].amount = practicesDefault[key].amount
          }

          date.setFullYear(date.getFullYear() + 1)
          plan.date = date.toISOString().slice(0, 16)

          await updateDoc(docRef, { plans: plans })
        } else {
          console.log('No existe el plan por default')
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingDoc = false
      }
    },

    async updateAmountsIfYearPassed(id) {
      this.loadingDoc = true
      try {
        const docRef = doc(db, 'plans', id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const data = docSnap.data()
          const plans = data.plans

          for (let i = 0; i < plans.length; i++) {
            const dateStr = plans[i].date
            const date = new Date(dateStr)
            const currentDate = new Date()
            const timeDiff = currentDate.getTime() - date.getTime()
            const yearDiff = timeDiff / (1000 * 3600 * 24 * 365)

            if (yearDiff >= 1) {
              await this.updateAmountsDefault(docRef, plans, plans[i], plans[i].plan, date)
            } else {
              console.log('No pasó un año')
            }
          }
        } else {
          console.log('No existe el plan')
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingDoc = false
      }
    },

    async updateAmountsIfMonthPassed(id) {
      this.loadingDoc = true
      try {
        const defaultDocRef = doc(db, 'configs', 'plans')
        const defaultDocSnap = await getDoc(defaultDocRef)
        const defaultData = defaultDocSnap.data()

        const valuesToUpdate = {}

        for (let key in defaultData) {
          let subObject = defaultData[key]

          valuesToUpdate[key] = {}

          let subKeys = Object.keys(subObject)
          let firstSubKey = subKeys[0]

          if (Object.prototype.hasOwnProperty.call(subObject[firstSubKey], 'amount')) {
            valuesToUpdate[key][firstSubKey] = { ...subObject[firstSubKey] }
            valuesToUpdate[key][firstSubKey]['amount'] = (
              Number(subObject[firstSubKey]['amount']) / 12
            ).toString()
          } else {
            valuesToUpdate[key][firstSubKey] = subObject[firstSubKey]
          }
        }

        const docRef = doc(db, 'plans', id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const data = docSnap.data()
          const plans = data.plans

          for (let i = 0; i < plans.length; i++) {
            const planDate = new Date(plans[i].date)
            const currentDate = new Date()

            planDate.setHours(0, 0, 0, 0)
            currentDate.setHours(0, 0, 0, 0)

            currentDate.setMonth(planDate.getMonth())
            if (currentDate.getDate() > planDate.getDate()) {
              currentDate.setDate(planDate.getDate())
            }

            if (currentDate > planDate) {
              let plan = plans[i].plan

              if (Object.prototype.hasOwnProperty.call(valuesToUpdate, plan)) {
                plans[i].practices = { ...plans[i].practices, ...valuesToUpdate[plan] }
              }

              await updateDoc(docRef, { [`plans`]: plans[i] })
            }
          }
          await updateDoc(docRef, { plans: plans })
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingDoc = false
      }
    },

    async updatePlan(planId, formPractices, numAffiliate) {
      console.log(
        '🚀 ~ file: plans.js ~ line 427 ~ PlansStore ~ updatePlan ~ formPractices',
        planId,
        formPractices,
        numAffiliate
      )
      this.loadingDoc = true
      try {
        const practicesDoc = await getDoc(doc(db, 'configs', 'practices'))
        const practices = await practicesDoc.data().list
        const practiceIndexes = formPractices.map((practiceName) => {
          return practices.indexOf(practiceName)
        })
        console.log(
          '🚀 ~ file: plans.js ~ line 439 ~ PlansStore ~ updatePlan ~ practiceIndexes:',
          practiceIndexes
        )
        const docRef = doc(db, 'plans', planId)
        const planDoc = await getDoc(docRef)
        const planData = planDoc.data()
        const plans = planData.plans
        for (let i = 0; i < plans.length; i++) {
          if (plans[i].numAffiliate === numAffiliate) {
            for (const practiceIndex of practiceIndexes) {
              const currentAmount = plans[i].practices[practiceIndex].amount
              if (!isNaN(currentAmount) && currentAmount !== '-') {
                plans[i].practices[practiceIndex].amount = (
                  parseInt(currentAmount, 10) - 1
                ).toString()
              }
            }
          }
        }
        await updateDoc(docRef, { plans })
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingDoc = false
      }
    }
  }
})
