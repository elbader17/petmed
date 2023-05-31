import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc } from 'firebase/firestore/lite';
import { db, auth } from '@/firebaseConfig';
import { defineStore } from 'pinia';

export const useDatabaseProvidersStore = defineStore('databaseProvidersStore', {
  state: () => ({
    loadingDoc: false,
    providers: []
  }),
  actions: {
    async getProviders() {
      if (this.providers.length !== 0) {
        return
      }
      this.loadingDoc = true;
      try {
        const queryRef = query(collection(db, 'providers'));
        const querySnapshot = await getDocs(queryRef);
        querySnapshot.forEach((doc) => {
          this.providers.push({
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
    async addProvider(provider) {
      this.loadingDoc = true;
      try {
        const providerObj = {
          name: provider.name,
          address: provider.address,
          phone: provider.phone,
          city: provider.city,
          specialty: provider.specialty,
          user: auth.currentUser.uid
        }
        const providerRef = await addDoc(collection(db, 'providers'), providerObj);
        this.providers.push({
          id: providerRef.id,
          ...providerObj
        })
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async readProvider(id) {
      this.loadingDoc = true;
      try {
        const providerRef = doc(db, 'providers', id);
        const providerSnapshot = await getDoc(providerRef);
        if (!providerSnapshot.exists()) {
          throw new Error("No existe el prestador");
        }
        if (providerSnapshot.data().user === auth.currentUser.uid) {
          return providerSnapshot.data();
        } else {
          throw new Error("No tienes permiso");
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        this.loadingDoc = false;
      }
    },
    async updateProvider(id, provider) {
      this.loadingDoc = true;
      try {
        const providerRef = doc(db, 'providers', id);
        await updateDoc(providerRef, provider);
        this.providers = this.providers.map(item => item.id === id ? ({
          ...item,
          name: provider.name,
          address: provider.address,
          phone: provider.phone,
          city: provider.city,
          specialty: provider.specialty
        }) : item)
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async deleteProvider(id) {
      try {
        const providerRef = doc(db, 'providers', id);
        await deleteDoc(providerRef);
        this.providers = this.providers.filter(item => item.id !== id)
      } catch (error) {
        console.log(error);
      }/*  finally {

      } */
    }
  }
})