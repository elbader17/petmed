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
        const docRef = doc(collection(db, "configs"), "plans");
        const docSnapshot = await getDoc(docRef);
        this.plan = docSnapshot.data()[name];
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
          10: { amount: plan[10].amount, coverage: plan[10].coverage, gracetime: plan[10].gracetime },
          11: { amount: plan[11].amount, coverage: plan[11].coverage, gracetime: plan[11].gracetime },
          12: { amount: plan[12].amount, coverage: plan[12].coverage, gracetime: plan[12].gracetime },
          13: { amount: plan[13].amount, coverage: plan[13].coverage, gracetime: plan[13].gracetime },
          14: { amount: plan[14].amount, coverage: plan[14].coverage, gracetime: plan[14].gracetime },
          15: { amount: plan[15].amount, coverage: plan[15].coverage, gracetime: plan[15].gracetime },
          16: { amount: plan[16].amount, coverage: plan[16].coverage, gracetime: plan[16].gracetime },
          17: { amount: plan[17].amount, coverage: plan[17].coverage, gracetime: plan[17].gracetime },
          18: { amount: plan[18].amount, coverage: plan[18].coverage, gracetime: plan[18].gracetime },
        }
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