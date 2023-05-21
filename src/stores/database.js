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
      const data = await fetch('../../info.csv')
        .then((response) => response.text())
        .then((csv) => {
          // csv is now a string, you can use the split method
          const rows = csv.split('\n')
          const data = rows.map((row) => row.split(','))
          // console.log(data[0]);
          return data
        })


      const emails = []
      const user = query(collection(db, 'users'))
      const querySnapshot = await getDocs(user)
      querySnapshot._docs.forEach((doc) => {
        // console.log(doc.id, doc.data())
        emails.push(doc.data().email)
      })

      const uniqueEmails = [...new Set(emails)]

      // generar una array de objetos en donde cada objeto tenga un email y el id del usuario

      const users = []
      uniqueEmails.forEach((email) => {
        const user = {
          email: email,
          id: ''
        }
        users.push(user)
      })

      const usersWithId = []
      users.forEach((user) => {
        const userWithId = {
          email: user.email,
          id: querySnapshot._docs.find((doc) => doc.data().email === user.email).id
        }
        usersWithId.push(userWithId)
      })

      console.log(usersWithId)


      const pets = query(collection(db, 'pets'))
      const querySnapshotPets = await getDocs(pets)
      querySnapshotPets._docs.forEach(async (petDoc) => {
        const pet = {
          id: petDoc.id,
          ...petDoc.data()
        }
        console.log(pet)
        const user = usersWithId.find((user) => user.email === pet.client)

        const petRef = doc(db, 'pets', pet.id)
        const res = await updateDoc(petRef, { client: user.id })
        console.log(res)
      })
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
