import { collection, deleteDoc, doc, getDocs, query, updateDoc, orderBy, limit, limitToLast, startAfter, endBefore, getDoc, setDoc, where, addDoc } from 'firebase/firestore/lite';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '@/firebaseConfig';
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
    practices: [],
  }),
  actions: {
    async getSize() {
      if (this.total !== 0) {
        return
      }
      this.loadingDoc = true;
      try {
        const qRef = query(collection(db, 'users'), where('type', '==', 'vet'));
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
        const vetRef = doc(db, 'users', id);
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
        const queryRef = query(collection(db, 'users'), where('type', '==', 'vet'), orderBy('name', 'asc'), limit(this.perPage));
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

    async getPractices() {
      const queryRef = query(collection(db, 'configs'), where('__name__', '==', 'practices'));
      const querySnapshot = await getDocs(queryRef);
      this.practices = querySnapshot.docs[0].data().list
    },

    async sendForm(data){
      console.log(data)
      const practices = data.practices
      delete data.practices
      const dataParse = {...data, ...practices}
      dataParse.date = new Date()
      const res = await addDoc(collection(db, 'forms'), dataParse);
        
    },

    async validateCode(code){
      const queryRef = query(collection(db, 'pets'), where('numAffiliate', '==', code.toString()));
      const querySnapshot = await getDocs(queryRef);
      const petid = querySnapshot.docs[0].id
      const queryRef2 = query(collection(db, 'plans'), where('__name__', '==', petid)); // <-- example 280376
      const querySnapshot2 = await getDocs(queryRef2);
      const plans = querySnapshot2._docs[0].data().plans
      const queryRef3 = query(collection(db, 'configs'), where('__name__', '==', 'practices'));
      const querySnapshot3 = await getDocs(queryRef3);
      const practices = querySnapshot3.docs[0].data().list
      for ( const plan of plans){
        if (plan.petId === petid){
          return {plan, practices}
        }
      }
    },
    async nextPage() {
      this.loadingDoc = true;
      try {
        const queryRef = query(collection(db, 'users'), where('type', '==', 'vet'), orderBy('name', 'asc'), startAfter(this.lastVisible), limit(this.perPage));
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
        const queryRef = query(collection(db, 'users'), where('type', '==', 'vet'), orderBy('name', 'asc'), endBefore(this.firstVisible), limitToLast(this.perPage));
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
    async addVet(vet) {
      this.loadingDoc = true;
      try {
        const { user } = await createUserWithEmailAndPassword(auth, vet.email, vet.cuit);
        const vetObj = {
          email: vet.email,
          name: vet.name,
          surname: vet.surname,
          cuit: vet.cuit,
          birthdate: vet.birthdate,
          phone: vet.phone,
          address: vet.address,
          city: vet.city,
          type: 'vet',
          account: user.uid
        }
        await setDoc(doc(db, 'users', user.uid), vetObj);
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
        const vetRef = query(collection(db, 'users'), where('account', '==', id));
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
        const vetRef = doc(db, 'users', id);
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
        const vetRef = doc(db, 'users', id);
        await deleteDoc(vetRef);
        this.vets = this.vets.filter(item => item.id !== id)
      } catch (error) {
        console.log(error);
      }/*  finally {
        
      } */
    }
  }
})
