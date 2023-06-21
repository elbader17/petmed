import { collection, deleteDoc, doc, getDocs, query, updateDoc, orderBy, limit, limitToLast, startAfter, endBefore, getDoc, setDoc } from 'firebase/firestore/lite';
import { db } from '@/firebaseConfig';
import { defineStore } from 'pinia';

export const useDatabaseVetStore = defineStore('databaseVetStore', {
  state: () => ({
    loadingDoc: false,
    vet: null,
    /* vet: [], */
    vets: [],
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
        const qRef = query(collection(db, 'vets'));
        const qSnapshot = await getDocs(qRef);
        this.total = qSnapshot.size;
        this.pages = Math.ceil((this.total / this.perPage));
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async getVet(id) {
      this.loadingDoc = true;
      try {
        const vetRef = doc(db, 'vets', id);
        const vetSnapshot = await getDoc(vetRef);
        this.vet = vetSnapshot.data();
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async getVets() {
      if (this.vets.length !== 0) {
        return
      }
      this.loadingDoc = true;
      try {
        const queryRef = query(collection(db, 'vets'), orderBy('name', 'asc'), limit(this.perPage));
        const querySnapshot = await getDocs(queryRef);
        this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        this.firstVisible = querySnapshot.docs[0];
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
    async nextPage() {
      this.loadingDoc = true;
      try {
        const queryRef = query(collection(db, 'vets'), orderBy('name', 'asc'), startAfter(this.lastVisible), limit(this.perPage));
        const querySnapshot = await getDocs(queryRef);
        this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        this.firstVisible = querySnapshot.docs[0];
        this.page++;
        this.vets = [];
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
    async previousPage() {
      this.loadingDoc = true;
      try {
        const queryRef = query(collection(db, 'vets'), orderBy('name', 'asc'), endBefore(this.firstVisible), limitToLast(this.perPage));
        const querySnapshot = await getDocs(queryRef);
        this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        this.firstVisible = querySnapshot.docs[0];
        this.page--;
        this.vets = [];
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
    async addVet(vet, uid) {
      this.loadingDoc = true;
      try {
        const vetObj = {
          email: vet.email,
          name: vet.name,
          surname: vet.surname,
          cuit: vet.cuit,
          birthdate: vet.birthdate,
          phone: vet.phone,
          address: vet.address,
          city: vet.city,
          type: 'veterinary'
        }
        const vetRef = await setDoc(collection(db, 'vets', uid), vetObj);
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
    /* async readVet(id) {
      if (this.vet.length !== 0 && this.vet[0].account == id) {
        return
      }
      this.loadingDoc = true;
      try {
        const vetRef = query(collection(db, 'vets'), where('account', '==', id));
        const vetSnapshot = await getDocs(vetRef);
        vetSnapshot.forEach((doc) => {
          this.vet.push({
            id: doc.id,
            ...doc.data()
          })
        })
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    }, */
    async updateVet(id, vet) {
      this.loadingDoc = true;
      try {
        const vetRef = doc(db, 'vets', id);
        await updateDoc(vetRef, vet);
        this.vets = this.vets.map(item => item.id === id ? ({
          ...item,
          email: vet.email,
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
