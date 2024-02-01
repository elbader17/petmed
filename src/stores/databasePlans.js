import {
  collection,
  deleteField,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  where,
  query
} from 'firebase/firestore/lite'

import { db } from '@/firebaseConfig'
import { defineStore } from 'pinia'
import { useFormatDate } from '@/composables/formatDate';
import plans from '@/plans.json'

const { formatDate } = useFormatDate()

export const useDatabasePlansStore = defineStore('databasePlansStore', {
  state: () => ({
    loadingDoc: false,
    plan: null,
    plans: null
  }),
  actions: {
    async getPlan(name) {
      this.loadingDoc = true
      try {
        const docRef = await doc(collection(db, 'configs'), 'plans')
        const docSnapshot = await getDoc(docRef)
        this.plan = docSnapshot.data()[name]
        return true
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingDoc = false
      }
    },
    async getPlans() {
      if (this.plans !== null) {
        return
      }
      this.loadingDoc = true
      try {
        const docRef = doc(collection(db, 'configs'), 'plans')
        const docSnapshot = await getDoc(docRef)
        this.plans = docSnapshot.data()
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingDoc = false
      }
    },
    async addPlan(name, plan) {
      this.loadingDoc = true
      try {
        let planObj = {}
        for (let i = 0; i < plan.length; i++) {
          planObj[i] = {
            amount: plan[i].amount,
            coverage: plan[i].coverage,
            gracetime: plan[i].gracetime
          }
        }
        const docRef = doc(db, 'configs', 'plans')
        const dataObj = { [`${name}`]: planObj }
        await updateDoc(docRef, dataObj)
        this.plans[name] = dataObj
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingDoc = false
      }
    },
    async updatePlan(name, plan) {
      this.loadingDoc = true
      try {
        const docRef = doc(db, 'configs', 'plans')
        const dataObj = { [`${name}`]: plan }
        await updateDoc(docRef, dataObj)
        this.plans[name] = plan
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingDoc = false
      }
    },
    async updatePlansFromJson() {
      try {
        let counter = 0
        const consults = []
        for (let i = plans.length - 1; i >= 0; i--) {
          let plan = plans[i] // PLAN EXAMPLE{ IdReg: 3722, NumForm: 280002, "Plan Obra": 2010, Prestacion: "Consulta en Clinica", Fecha: "14/6/2019", Prestador: "Nadia Hernadez Veterinaria" }
          const q = query(
            collection(db, 'pets'),
            where('numAffiliate', '==', plan.NumForm.toString())
          )
          const querySnapshot = await getDocs(q)
          if (querySnapshot.docs.length === 0) {
            continue
          }
          const pet = querySnapshot.docs[0].data()

          const dateOfRegister = formatDate(pet.registration_code) || null;
          const dateOfConsult = formatDate(plan.Fecha);

          plan.pet = pet
          plan.petId = querySnapshot.docs[0].id
          if (dateOfConsult < dateOfRegister) {
            continue
          }
          consults.push(plan)
          console.log("🚀 ~ file: databasePlans.js:113 ~ updatePlansFromJson ~ plan:", plan)

          counter++
        }

        return consults
      } catch (error) {
        console.log(error)
      }
    },
    async getJsonPlans() {
      const q = query(collection(db, 'plans'))
      const querySnapshot = await getDocs(q)
      const plans = []
      querySnapshot.docs.forEach((doc) => {
        doc.data().plans.forEach((plan) => {
          const planObj = {
            numeroAfiliado: plan.numAffiliate,
            practicas: plan.practices
          }
          plans.push(planObj)
        })
      })

      return plans
    },
    async deletePlan(name) {
      try {
        const docRef = doc(db, 'configs', 'plans')
        const dataObj = { [`${name}`]: deleteField() }
        delete this.plans[name]
        await updateDoc(docRef, dataObj)
      } catch (error) {
        console.log(error)
      } /*  finally {

      } */
    }
  }
})

