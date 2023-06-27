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
        if (planSnapshot.exists() && planSnapshot.data()) {
          this.plansClient.push(...planSnapshot.data().plans);
        } else {
          console.log('El cliente no tiene planes');
        }
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
          petId: plan.petId || null,
          petName: plan.petName || null,
          numAffiliate: plan.numAffiliate || null,
          practices: databasePlansStore.plan
        };
        const planRef = doc(db, 'plans', plan.client)
        await setDoc(planRef, { ['plans']: arrayUnion(planObj) }, { merge: true });
        const index = this.plans.findIndex((item) => item.id === plan.client);
        if (index !== -1) {
          this.plans[index].plans.push(planObj);
        } else {
          this.plans.unshift({
            id: plan.client,
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
    async addClientPlanPet(pet, petId) {
      this.loadingDoc = true;
      try {
        const docRef = doc(db, 'plans', pet.client);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const plans = data.plans;

          const index = plans.findIndex(plan => plan.plan === pet.plan && plan.numAffiliate === null);

          plans[index].petId = petId;
          plans[index].petName = pet.name;
          plans[index].numAffiliate = pet.numAffiliate;

          await updateDoc(docRef, { plans: plans });
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async updateAmountsDefault(docRef, plans, plan, planName, date) {
      this.loadingDoc = true;
      try {
        const defaultDocRef = doc(db, 'configs', 'plans');
        const defaultDocSnap = await getDoc(defaultDocRef);

        if (defaultDocSnap.exists()) {
          const defaultData = defaultDocSnap.data();
          const practicesDefault = defaultData[planName];
          const practices = plan.practices;

          for (const key in practices) {
            practices[key].amount = practicesDefault[key].amount;
          }

          date.setFullYear(date.getFullYear() + 1);
          plan.date = date.toISOString().slice(0, 16);

          await updateDoc(docRef, { plans: plans });
        } else {
          console.log('No existe el plan por default');
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async updateAmountsIfYearPassed(id) {
      this.loadingDoc = true;
      try {
        const docRef = doc(db, 'plans', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const plans = data.plans;

          for (let i = 0; i < plans.length; i++) {
            const dateStr = plans[i].date;
            const date = new Date(dateStr);
            const currentDate = new Date();
            const timeDiff = currentDate.getTime() - date.getTime();
            const yearDiff = timeDiff / (1000 * 3600 * 24 * 365);

            if (yearDiff >= 1) {
              await this.updateAmountsDefault(docRef, plans, plans[i], plans[i].plan, date);
            }
          }
        } else {
          console.log('No existe el plan');
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async updatePlan(planId, formPractices, numAffiliate) {
      this.loadingDoc = true;
      try {
        const practicesDoc = await getDoc(doc(db, 'configs', 'practices'));
        const practices = practicesDoc.data().practices;
        const practiceIndexes = formPractices.map(practiceName => practices.indexOf(practiceName));

        const docRef = doc(db, 'plans', planId);
        const planDoc = await getDoc(docRef);
        const planData = planDoc.data();
        const plans = planData.plans;

        for (let i = 0; i < plans.length; i++) {
          if (plans[i].numAffiliate === numAffiliate) {
            for (const practiceIndex of practiceIndexes) {
              plans[i].practices[practiceIndex].amount--;
            }
          }
        }
        await updateDoc(docRef, { plans });
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    }
  }
})