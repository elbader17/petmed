import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc } from 'firebase/firestore/lite';
import { db, auth } from '@/firebaseConfig';
import { defineStore } from 'pinia';

export const useDatabaseVetsStore = defineStore('databaseStore', {
  state: () => ({
    loadingDoc: false,
    vets: []
  }),
  actions: {
    async getVets() {
      if (this.vets.length !== 0) {
        return
      }
      this.loadingDoc = true;
      try {
        const queryRef = query(collection(db, 'vets'));
        const querySnapshot = await getDocs(queryRef);
        querySnapshot.forEach((doc) => {
          this.vets.push({
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
    async addVet(vet) {
      this.loadingDoc = true;
      try {
        const vetObj = {
          name: vet.name,
          surname: vet.surname,
          dni: vet.dni,
          birthdate: vet.birthdate,
          phone: vet.phone,
          address: vet.address,
          city: vet.city,
          user: auth.currentUser.uid
        }
        const vetRef = await addDoc(collection(db, 'vets'), vetObj);
        this.vets.push({
          id: vetRef.id,
          ...vetObj
        })
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async readVet(id) {
      this.loadingDoc = true;
      try {
        const vetRef = doc(db, 'vets', id);
        const vetSnapshot = await getDoc(vetRef);
        if (!vetSnapshot.exists()) {
          throw new Error("No existe el veterinario");
        }
        if (vetSnapshot.data().user === auth.currentUser.uid) {
          return vetSnapshot.data();
        } else {
          throw new Error("No tienes permiso");
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        this.loadingDoc = false;
      }
    },
    async updateVet(id, vet) {
      this.loadingDoc = true;
      try {
        const vetRef = doc(db, 'vets', id);
        await updateDoc(vetRef, vet);
        this.vets = this.vets.map(item => item.id === id ? ({
          ...item,
          name: vet.name,
          surname: vet.surname,
          dni: vet.dni,
          birthdate: vet.birthdate,
          phone: vet.phone,
          address: vet.address,
          city: vet.city
        }) : item)
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async deleteVet(id) {
      try {
        const vetRef = doc(db, 'vets', id);
        await deleteDoc(vetRef);
        this.vets = this.vets.filter(item => item.id !== id)
      } catch (error) {
        console.log(error);
      }/*  finally {

      } */
    }
  }
})