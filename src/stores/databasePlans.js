import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import { db, auth } from '@/firebaseConfig';
import { defineStore } from 'pinia';

export const useDatabasePlansStore = defineStore('databasePlansStore', {
  state: () => ({
    loadingDoc: false,
    plans: []
  }),
  actions: {
    async getPlans() {
      if (this.plans.length !== 0) {
        return
      }
      this.loadingDoc = true;
      try {
        const docRef = doc(db, "configs", "plans");
        const docSnapshot = await getDoc(docRef);
        const docData = docSnapshot.data();
        for (const key in docData) {
          this.plans.push(docData[key]);
        }
        console.log(this.plans);
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async addPlan(plan) {
      this.loadingDoc = true;
      try {
        const planObj = {
          name: plan.name,
          services: plan.services,
          user: auth.currentUser.uid
        }
        const planRef = await addDoc(collection(db, 'plans'), planObj);
        this.plans.push({
          id: planRef.id,
          ...planObj
        })
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async readPlan(id) {
      this.loadingDoc = true;
      try {
        const planRef = doc(db, 'plans', id);
        const planSnapshot = await getDoc(planRef);
        if (!planSnapshot.exists()) {
          throw new Error("No existe el plan");
        }
        if (planSnapshot.data().user === auth.currentUser.uid) {
          return planSnapshot.data();
        } else {
          throw new Error("No tienes permiso");
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        this.loadingDoc = false;
      }
    },
    async updatePlan(id, plan) {
      this.loadingDoc = true;
      try {
        const planRef = doc(db, 'plans', id);
        await updateDoc(planRef, plan);
        this.plans = this.plans.map(item => item.id === id ? ({
          ...item,
          name: plan.name,
          services: plan.services
        }) : item)
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async deletePlan(id) {
      try {
        const planRef = doc(db, 'plans', id);
        await deleteDoc(planRef);
        this.plans = this.plans.filter(item => item.id !== id)
      } catch (error) {
        console.log(error);
      }/*  finally {

      } */
    }
  }
})