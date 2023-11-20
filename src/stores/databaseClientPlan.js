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

const databasePlansStore = useDatabasePlansStore()

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

        if (plan.numAffiliate) {
          const queryRef = query(
            collection(db, 'pets'),
            where('numAffiliate', '==', plan.numAffiliate)
          )
          const querySnapshot = await getDocs(queryRef)
          querySnapshot.forEach((doc) => {
            plan.petId = doc.id
            plan.petName = doc.data().name
            const date = doc.data().registration_code || null
            const partesFecha = date.split('/')
            const dia = partesFecha[0]
            const mes = partesFecha[1]
            const año = partesFecha[2]

            const fechaEnFormatoDate = new Date(`${mes}/${dia}/${año}`)

            const fechaEnFormatoISO = fechaEnFormatoDate.toISOString()
            plan.date = fechaEnFormatoISO
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
    createAllPlans() {
      // obtener el Id de todos los clientes desde la base de datos y guardarlos en un array
      const clients = []
      const queryRef = query(collection(db, 'clients'))
      getDocs(queryRef).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          clients.push(doc.id)
        })
      })
      const pets = []
      clients.forEach((client) => {
        const queryRef = query(collection(db, 'pets'), where('client', '==', client))
        getDocs(queryRef).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const date = doc.data().registration_code || null
            const partesFecha = date.split('/')
            const dia = partesFecha[0]
            const mes = partesFecha[1]
            const año = partesFecha[2]

            const fechaEnFormatoDate = new Date(`${mes}/${dia}/${año}`)

            const fechaEnFormatoISO = fechaEnFormatoDate.toISOString()
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
        })
      })
      pets.forEach((pet) => {
        this.addClientPlan(pet)
        console.log('🚀 plan creado')
      })
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
    async findPlanByPetId(petId) {
      try {
        const queryRef = query(collection(db, 'plans'))
        const querySnapshot = await getDocs(queryRef)

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

        const dateOfActivation = new Date(plan.date)
        const currentDate = new Date()
        const practices = {}

        for (const practiceId in plan.practices) {
          const practice = plan.practices[practiceId]
          if (!practice.gracetime || practice.gracetime === '-') {
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
    async updatePlan(planId, formPractices, numAffiliate) {
      console.log(
        '🚀 ~ file: plans.js ~ line 208 ~ PlansStore ~ updatePlan ~ formPractices',
        formPractices,
        planId,
        numAffiliate
      )
      this.loadingDoc = true
      try {
        const practicesDoc = await getDoc(doc(db, 'configs', 'practices'))
        const practices = await practicesDoc.data().list
        const practiceIndexes = formPractices.map((practiceName) => {
          return practices.indexOf(practiceName)
        })
        console.log(practiceIndexes)
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
