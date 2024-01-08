import { collection, deleteField, doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import { db } from '@/firebaseConfig';
import { defineStore } from 'pinia';

export const useDatabasePricesStore = defineStore('databasePricesStore', {
  state: () => ({
    loadingDoc: false,
    prices: null,
  }),
  actions: {
    async getPrices() {
      if (this.prices !== null) {
        return
      }
      this.loadingDoc = true;
      try {
        const docRef = doc(collection(db, "configs"), "prices");
        const docSnapshot = await getDoc(docRef)
        this.prices = docSnapshot.data();
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async addPrice(name, plan) {
      this.loadingDoc = true;
      try {
        const planObj = {
          name: name,
          price: plan.price,
          quantity: plan.quantity,
          discount: plan.discount,
          img: plan.img,
        }

        const docRef = doc(db, "configs", "prices");
        const dataObj = { [`${name}`]: planObj };
        await updateDoc(docRef, dataObj);
        this.prices[name] = dataObj;
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async updatePrice(name, plan) {
      this.loadingDoc = true;
      try {
        const docRef = doc(db, 'configs', 'prices');
        const dataObj = { [`${name}`]: plan };
        await updateDoc(docRef, dataObj);
        this.prices[name] = plan;
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async deletePrice(name) {
      try {
        const docRef = doc(db, 'configs', 'prices');
        const dataObj = { [`${name}`]: deleteField() };
        delete this.prices[name]
        await updateDoc(docRef, dataObj);
      } catch (error) {
        console.log(error);
      }/*  finally {

      } */
    }
  }
})