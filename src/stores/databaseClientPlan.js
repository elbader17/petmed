import { doc, setDoc, arrayUnion, arrayRemove, query, collection, getDoc, getDocs, updateDoc, startAfter, limit, endBefore, limitToLast } from 'firebase/firestore/lite';
import { db } from '@/firebaseConfig';
import { defineStore } from 'pinia';
import { useDatabasePlansStore } from '@/stores/databasePlans';

const databasePlansStore = useDatabasePlansStore();

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
    lastVisible: null,
  }),
  actions: {
    async getSize() {
      if (this.total !== 0) {
        return
      }
      this.loadingDoc = true;
      try {
        const qRef = query(collection(db, 'plans'));
        const qSnapshot = await getDocs(qRef);
        this.total = qSnapshot.size;
        this.pages = Math.ceil((this.total / this.perPage));
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async getPlans() {
      if (this.plans.length !== 0) {
        return
      }
      this.loadingDoc = true;
      try {
        const queryRef = query(collection(db, 'plans'), limit(this.perPage));
        const querySnapshot = await getDocs(queryRef);
        this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        this.firstVisible = querySnapshot.docs[0];
        querySnapshot.forEach((doc) => {
          this.plans.push({
            id: doc.id,
            ...doc.data()
          })
        })
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async getPlansUser(id) {
      this.loadingDoc = true;
      try {
        const planRef = doc(db, 'plans', id)
        const planSnapshot = await getDoc(planRef);
        this.plansClient.push(...planSnapshot.data().plans)
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async nextPage() {
      this.loadingDoc = true;
      try {
        const queryRef = query(collection(db, 'plans'), startAfter(this.lastVisible), limit(this.perPage));
        const querySnapshot = await getDocs(queryRef);
        this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        this.firstVisible = querySnapshot.docs[0];
        this.page++;
        this.plans = [];
        querySnapshot.forEach((doc) => {
          this.plans.push({
            id: doc.id,
            ...doc.data()
          })
        })
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async previousPage() {
      this.loadingDoc = true;
      try {
        const queryRef = query(collection(db, 'plans'), endBefore(this.firstVisible), limitToLast(this.perPage));
        const querySnapshot = await getDocs(queryRef);
        this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        this.firstVisible = querySnapshot.docs[0];
        this.page--;
        this.plans = [];
        querySnapshot.forEach((doc) => {
          this.plans.push({
            id: doc.id,
            ...doc.data()
          })
        })
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async addClientPlan(plan) {
      this.loadingDoc = true;
      try {
        await databasePlansStore.getPlan(plan.plan);
        const planObj = {
          plan: plan.plan,
          date: plan.date,
          paid: plan.paid,
          pet: null,
          name: null,
          practices: databasePlansStore.plan
        };
        const planRef = doc(db, 'plans', plan.numAffiliate)
        await setDoc(planRef, { ['plans']: arrayUnion(planObj) }, { merge: true });
        const index = this.plans.findIndex((item) => item.id === plan.numAffiliate);
        if (index !== -1) {
          this.plans[index].plans.push(planObj);
        } else {
          this.plans.unshift({
            id: plan.numAffiliate,
            plans: [planObj]
          })
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async deleteClientPlan(id, plan) {
      this.loadingDoc = true;
      try {
        const planRef = doc(db, 'plans', id)
        await updateDoc(planRef, { ['plans']: arrayRemove(plan) });
        this.plans = this.plans.map(item => item.id === id ? ({
          ...item,
          plans: item.plans.filter((value) => value !== plan)
        }) : item)
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async addClientPlanPet(id, pet, name, userplan) {
      this.loadingDoc = true;
      try {
        const docRef = doc(db, 'plans', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const plans = data.plans;

          const index = plans.findIndex(plan => plan.plan === userplan);

          plans[index].pet = pet;
          plans[index].name = name;

          await updateDoc(docRef, { plans: plans });
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    }
  }
})