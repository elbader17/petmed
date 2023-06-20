import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, limit, where } from 'firebase/firestore/lite';
import { db, auth } from '@/firebaseConfig';
import { defineStore } from 'pinia';

export const useDatabasePetStore = defineStore('databasePetStore', {
  state: () => ({
    loadingDoc: false,
    pets: [],
    page: 1,
    perPage: 10,
    total: 0,
  }),
  actions: {
    async getClients(id) {
      if (this.pets.length !== 0) {
        return
      }
      this.loadingDoc = true;
      try {
        const queryRef = query(collection(db, 'pets'), limit(this.perPage), where('client', '==', id));
        const querySnapshot = await getDocs(queryRef);
        querySnapshot.forEach((doc) => {
          this.pets.push({
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
        const clientObj = {
          email: client.email,
          name: client.name,
          surname: client.surname,
          cuit: client.cuit,
          birthdate: client.birthdate,
          phone: client.phone,
          address: client.address,
          city: client.city,
          type: client.type,
          account: client.account
        }
        const clientRef = await addDoc(collection(db, 'pets'), clientObj);
        this.clients.push({
          id: clientRef.id,
          ...clientObj
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
        const clientRef = doc(db, 'pets', id);
        const clientSnapshot = await getDoc(clientRef);
        if (!clientSnapshot.exists()) {
          throw new Error("No existe el usuario");
        }
        if (clientSnapshot.data().user === auth.currentUser.uid) {
          return clientSnapshot.data();
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
        const clientRef = doc(db, 'pets', id);
        await updateDoc(clientRef, client);
        this.clients = this.clients.map(item => item.id === id ? ({
          ...item,
          email: client.email,
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
        const clientRef = doc(db, 'pets', id);
        await deleteDoc(clientRef);
        this.clients = this.clients.filter(item => item.id !== id)
      } catch (error) {
        console.log(error);
      }/*  finally {
        
      } */
    }
  }
})
