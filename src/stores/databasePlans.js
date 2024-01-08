import { collection, deleteField, doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import { db } from '@/firebaseConfig';
import { defineStore } from 'pinia';

export const useDatabasePlansStore = defineStore('databasePlansStore', {
  state: () => ({
    loadingDoc: false,
    plan: null,
    plans: null,
  }),
  actions: {
    async getPlan(name) {
      if (this.plan !== null) {
        return
      }
      this.loadingDoc = true;
      try {
        const docRef = await doc(collection(db, "configs"), "plans");
        const docSnapshot = await getDoc(docRef)
        this.plan = docSnapshot.data()[name];
        return true
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async getPlans() {
      if (this.plans !== null) {
        return
      }
      this.loadingDoc = true;
      try {
        const docRef = doc(collection(db, "configs"), "plans");
        const docSnapshot = await getDoc(docRef)
        this.plans = docSnapshot.data();
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async addPlan(name, plan) {
      this.loadingDoc = true;
      try {
        const planObj = plan.reduce((acc, curr, index) => {
          acc[index] = { amount: curr.amount, coverage: curr.coverage, gracetime: curr.gracetime };
          return acc;
        }, {});

        const docRef = doc(db, "configs", "plans");
        const dataObj = { [`${name}`]: planObj };
        await updateDoc(docRef, dataObj);
        this.plans[name] = dataObj;
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async updatePlan(name, plan) {
      this.loadingDoc = true;
      try {
        const docRef = doc(db, 'configs', 'plans');
        const dataObj = { [`${name}`]: plan };
        await updateDoc(docRef, dataObj);
        this.plans[name] = plan;
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async deletePlan(name) {
      try {
        const docRef = doc(db, 'configs', 'plans');
        const dataObj = { [`${name}`]: deleteField() };
        delete this.plans[name]
        await updateDoc(docRef, dataObj);
      } catch (error) {
        console.log(error);
      }/*  finally {

      } */
    }
  }
})