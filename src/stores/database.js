import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where
} from 'firebase/firestore/lite'
import { db, auth } from '@/firebaseConfig'
import { defineStore } from 'pinia'

export const useDatabaseStore = defineStore('databaseStore', {
  state: () => ({
    loadingDoc: false,
    clients: []
  }),
  actions: {
    async test() {

     const data = await fetch("../../info.csv")
      .then(response => response.text())
      .then(csv => {
        // csv is now a string, you can use the split method
        const rows = csv.split('\n');
        const data = rows.map(row => row.split(','));
        // console.log(data[0]);
        return data
      });

      console.log(data[1])

      const emails = []
      const user = query(collection(db, 'users'), where('email', '==', "cristalracca18@gmail.com"));
      const querySnapshot = await getDocs(user)
      console.log("🚀 ~ file: database.js:38 ~ test ~ querySnapshot:", querySnapshot)

      for(const row of data){
        // solo agregar si el email no esta en el array
        // if( !emails.includes(row[10])){
        //   const docObj = {
        //     email: row[10] || "",
        //     name: row[2] || "",
        //     cuit: row[3] || "",
        //     birthdate: row[4] || "",
        //     phone: row[5] || "",
        //     address: row[6] || "",
        //   }
    
        //   const docRef = await addDoc(collection(db, 'users'), docObj)
        //   console.log(docRef.id)
        //   emails.push(row[10])
        // }

        // obtener desde firebase el id del usuario con el email

        // const user = query(collection(db, 'users'), where('email', '==', row[10]));
        // const querySnapshot = await getDocs(user)
        // console.log("🚀 ~ file: database.js:58 ~ test ~ querySnapshot:", querySnapshot)

        // const docObjPet = {
        //   registration_date: row[1] || "",
        //   name: row[7] || "",
        //   sex: row[8] || "",
        //   breed: row[11] || "",
        //   color: row[12] || "",
        //   birthdate: row[13] || "",
        //   plan: row[14] || "",
        //   observation: row[15] || "",
        //   status: row[16] || "",
        //   nro_afiliate: row[0] || "",
        //   id_user: user,
        // }
        

      }
      
    },




    async getClients() {
      if (this.clients.length !== 0) {
        return
      }

      this.loadingDoc = true

      try {
        const q = query(collection(db, 'clients'))
        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc) => {
          console.log(doc.id, doc.data())

          const client = {
            id: doc.id,
            ...doc.data()
          }

          this.clients.push(client)
        })
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingDoc = false
      }
    },

    async addClient(client) {
      this.loadingDoc = true

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

        const docRef = await addDoc(collection(db, 'clients'), docObj)
        console.log(docRef.id)

        const newClient = {
          id: docRef.id,
          ...docObj
        }

        this.clients.push(newClient)
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingDoc = false
      }
    },

    async readClient(id) {
      this.loadingDoc = true

      try {
        const docRef = doc(db, 'clients', id)
        const docSnap = await getDoc(docRef)

        if (!docSnap.exists()) {
          throw new Error('No existe el cliente')
        }

        if (docSnap.data().user !== auth.currentUser.uid) {
          throw new Error('No tienes permiso')
        }

        const client = {
          name: docSnap.data().name,
          surname: docSnap.data().surname,
          dni: docSnap.data().dni,
          birthdate: docSnap.data().birthdate,
          phone: docSnap.data().phone,
          address: docSnap.data().address,
          city: docSnap.data().city
        }

        return client
      } catch (error) {
        console.log(error.message)
      } finally {
        this.loadingDoc = false
      }
    },

    async updateClient(id, client) {
      this.loadingDoc = true

      try {
        const docRef = doc(db, 'clients', id)
        await updateDoc(docRef, client)

        this.clients = this.clients.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              ...client
            }
          } else {
            return item
          }
        })
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingDoc = false
      }
    },

    async deleteClient(id) {
      try {
        const docRef = doc(db, 'clients', id)
        await deleteDoc(docRef)

        this.clients = this.clients.filter((item) => item.id !== id)
      } catch (error) {
        console.log(error)
      } /*  finally {

      } */
    }
  }
})
