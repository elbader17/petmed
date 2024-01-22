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
        const planObj = {
          0: { amount: plan[0].amount, coverage: plan[0].coverage, gracetime: plan[0].gracetime },
          1: { amount: plan[1].amount, coverage: plan[1].coverage, gracetime: plan[1].gracetime },
          2: { amount: plan[2].amount, coverage: plan[2].coverage, gracetime: plan[2].gracetime },
          3: { amount: plan[3].amount, coverage: plan[3].coverage, gracetime: plan[3].gracetime },
          4: { amount: plan[4].amount, coverage: plan[4].coverage, gracetime: plan[4].gracetime },
          5: { amount: plan[5].amount, coverage: plan[5].coverage, gracetime: plan[5].gracetime },
          6: { amount: plan[6].amount, coverage: plan[6].coverage, gracetime: plan[6].gracetime },
          7: { amount: plan[7].amount, coverage: plan[7].coverage, gracetime: plan[7].gracetime },
          8: { amount: plan[8].amount, coverage: plan[8].coverage, gracetime: plan[8].gracetime },
          9: { amount: plan[9].amount, coverage: plan[9].coverage, gracetime: plan[9].gracetime },
          10: {
            amount: plan[10].amount,
            coverage: plan[10].coverage,
            gracetime: plan[10].gracetime
          },
          11: {
            amount: plan[11].amount,
            coverage: plan[11].coverage,
            gracetime: plan[11].gracetime
          },
          12: {
            amount: plan[12].amount,
            coverage: plan[12].coverage,
            gracetime: plan[12].gracetime
          },
          13: {
            amount: plan[13].amount,
            coverage: plan[13].coverage,
            gracetime: plan[13].gracetime
          },
          14: {
            amount: plan[14].amount,
            coverage: plan[14].coverage,
            gracetime: plan[14].gracetime
          },
          15: {
            amount: plan[15].amount,
            coverage: plan[15].coverage,
            gracetime: plan[15].gracetime
          },
          16: {
            amount: plan[16].amount,
            coverage: plan[16].coverage,
            gracetime: plan[16].gracetime
          },
          17: {
            amount: plan[17].amount,
            coverage: plan[17].coverage,
            gracetime: plan[17].gracetime
          },
          18: {
            amount: plan[18].amount,
            coverage: plan[18].coverage,
            gracetime: plan[18].gracetime
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
          const dateOfRegister = pet.registration_code || null;
          const dateOfConsult = formatDate(dateOfRegister);

          plan.pet = pet
          plan.petId = querySnapshot.docs[0].id
          if (dateOfConsult < dateOfRegister) {
            continue
          }
          consults.push(plan)

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

