import { doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore/lite';
import { db } from '@/firebaseConfig';
import { defineStore } from 'pinia';
import { useDatabasePlansStore } from '@/stores/databasePlans';

const databasePlansStore = useDatabasePlansStore();

export const useDatabaseUserPlanStore = defineStore('databaseUserPlanStore', {
  state: () => ({
    loadingDoc: false,
    plan: null,
    plans: []
  }),
  actions: {
    async addUserPlan(id, plan) {
      this.loadingDoc = true;
      try {
        const planDefault = await databasePlansStore.getPlan(plan.name);
        const planObj = {
          name: plan.name,
          date: plan.date,
          paid: plan.paid,
          pet: null,
          practices: planDefault
        };
        const docRef = doc(db, 'plans', id);
        await setDoc(docRef, { ['plans']: arrayUnion(planObj) }, { merge: true });
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async addUserPlanPet(id, pet) {
      this.loadingDoc = true;
      try {
        const docRef = doc(db, 'plans', id);
        await updateDoc(docRef, {
          pet: pet
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    }
  }
})