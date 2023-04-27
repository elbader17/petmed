import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc } from 'firebase/firestore/lite';
import { db, auth } from '@/firebaseConfig';
import { defineStore } from 'pinia';

export const useDatabaseStore = defineStore('databaseStore', {
  state: () => ({
    loadingDoc: false,
    clients: [],
  }),
  actions: {
    async getClients() {
      if (this.clients.length !== 0) {
        return
      }
      this.loadingDoc = true;
      try {
        const q = query(collection(db, 'clients'));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.id, doc.data());
          this.clients.push({
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
    async addClient(client) {
      this.loadingDoc = true;
      try {
        const docObj = {
          name: client.name,
          surname: client.surname,
          dni: client.dni,
          birthdate: client.birthdate,
          phone: client.phone,
          address: client.address,
          city: client.city,
          user: auth.currentUser.uid
        }
        const docRef = await addDoc(collection(db, 'clients'), docObj);
        console.log(docRef.id);
        this.clients.push({
          id: docRef.id,
          ...docObj
        })
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async readClient(id) {
      this.loadingDoc = true;
      try {
        const docRef = doc(db, 'clients', id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          throw new Error("No existe el cliente");
        }
        if (docSnap.data().user === auth.currentUser.uid) {
          return {
            name: docSnap.data().name,
            surname: docSnap.data().surname,
            dni: docSnap.data().dni,
            birthdate: docSnap.data().birthdate,
            phone: docSnap.data().phone,
            address: docSnap.data().address,
            city: docSnap.data().city
          };
        } else {
          throw new Error("No tienes permiso");
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        this.loadingDoc = false;
      }
    },
    async updateClient(id, client) {
      this.loadingDoc = true;
      try {
        const docRef = doc(db, 'clients', id);
        await updateDoc(docRef, {
          name: client.name,
          surname: client.surname,
          dni: client.dni,
          birthdate: client.birthdate,
          phone: client.phone,
          address: client.address,
          city: client.city
        });
        this.clients = this.clients.map(item => item.id === id ? ({
          ...item,
          name: client.name,
          surname: client.surname,
          dni: client.dni,
          birthdate: client.birthdate,
          phone: client.phone,
          address: client.address,
          city: client.city
        }) : item)
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async deleteClient(id) {
      try {
        const docRef = doc(db, 'clients', id);
        await deleteDoc(docRef);
        this.clients = this.clients.filter(item => item.id !== id)
      } catch (error) {
        console.log(error);
      }/*  finally {

      } */
    }
  }
})