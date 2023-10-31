import {
  setDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  orderBy,
  limit,
  limitToLast,
  startAfter,
  endBefore,
  where
} from 'firebase/firestore/lite'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { db, auth } from '@/firebaseConfig'
import { defineStore } from 'pinia'

export const useDatabaseUserStore = defineStore('databaseUserStore', {
  state: () => ({
    loadingDoc: false,
    client: null,
    clients: [],
    pets: [],
    page: 1,
    perPage: 10,
    pages: 0,
    total: 0,
    firstVisible: null,
    lastVisible: null
  }),
  actions: {
    async getSize() {
      if (this.total !== 0) {
        return
      }
      this.loadingDoc = true
      try {
        const qRef = query(collection(db, 'users'), where('type', '==', 'client'))
        const qSnapshot = await getDocs(qRef)
        this.total = qSnapshot.size
        this.pages = Math.ceil(this.total / this.perPage)
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingDoc = false
      }
    },
    async getClients(email = null, cuit = null) {
      let param1 = 'type'
      let param2 = 'client'
      if (email !== null && email !== '') {
        param1 = 'email'
        param2 = email
      }
      if (cuit !== null && cuit !== '') {
        param1 = 'cuit'
        param2 = cuit
      }
      this.loadingDoc = true
      try {
        const queryRef = query(
          collection(db, 'users'),
          where(param1, '==', param2),
          orderBy('name', 'asc'),
          limit(this.perPage)
        )
        const querySnapshot = await getDocs(queryRef)
        this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
        this.firstVisible = querySnapshot.docs[0]
        this.clients = []
        querySnapshot.forEach((doc) => {
          this.clients.push({
            id: doc.id,
            ...doc.data()
          })
        })
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingDoc = false
      }
    },
    async getPets() {
      if (this.pets.length !== 0) {
        return
      }
      this.loadingDoc = true
      try {
        const queryRef = query(collection(db, 'pets'), limit(this.perPage))
        const querySnapshot = await getDocs(queryRef)
        this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
        this.firstVisible = querySnapshot.docs[0]
        querySnapshot.forEach((doc) => {
          this.pets.push({
            id: doc.id,
            ...doc.data()
          })
        })
        console.log(this.pets)
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingDoc = false
      }
    },
    async updateClientPay(id) {
      this.loadingDoc = true
      try {
        const petRef = doc(db, 'users', id)
        await updateDoc(petRef, {
          lastPay: new Date().toLocaleDateString(),
          banned: false
        })
      } catch (error) {
        console.log(error)
      } finally {
        this.getClients()
        this.loadingDoc = false
        window.location.reload()
      }
    },
    async updateAllClientPay() {
      this.loadingDoc = true
      try {
        const queryRef = query(collection(db, 'users'), where('type', '==', 'client'))
        const querySnapshot = await getDocs(queryRef)
        querySnapshot.forEach((us) => {
          const clientRef = doc(db, 'users', us.id)
          console.log(clientRef)
          updateDoc(clientRef, {
            lastPay: new Date().toLocaleDateString(),
            banned: false
          })
        })
      } catch (error) {
        console.log(error)
      } finally {
        this.getClients()
        this.loadingDoc = false
        // window.location.reload()
      }
    },

    async banClient(id) {
      this.loadingDoc = true
      try {
        const petRef = doc(db, 'users', id)
        await updateDoc(petRef, {
          banned: true
        })
      } catch (error) {
        console.log(error)
      } finally {
        this.getClients()
        this.loadingDoc = false
        window.location.reload()
      }
    },

    async nextPage() {
      this.loadingDoc = true
      try {
        const queryRef = query(
          collection(db, 'users'),
          where('type', '==', 'client'),
          orderBy('name', 'asc'),
          startAfter(this.lastVisible),
          limit(this.perPage)
        )
        const querySnapshot = await getDocs(queryRef)
        this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
        this.firstVisible = querySnapshot.docs[0]
        this.page++
        this.clients = []
        querySnapshot.forEach((doc) => {
          this.clients.push({
            id: doc.id,
            ...doc.data()
          })
        })
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingDoc = false
      }
    },
    async previousPage() {
      this.loadingDoc = true
      try {
        const queryRef = query(
          collection(db, 'users'),
          where('type', '==', 'client'),
          orderBy('name', 'asc'),
          endBefore(this.firstVisible),
          limitToLast(this.perPage)
        )
        const querySnapshot = await getDocs(queryRef)
        this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
        this.firstVisible = querySnapshot.docs[0]
        this.page--
        this.clients = []
        querySnapshot.forEach((doc) => {
          this.clients.push({
            id: doc.id,
            ...doc.data()
          })
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
        const { user } = await createUserWithEmailAndPassword(auth, client.email, client.cuit)
        const clientObj = {
          email: client.email,
          name: client.name,
          surname: client.surname,
          cuit: client.cuit,
          birthdate: client.birthdate,
          phone: client.phone,
          address: client.address,
          city: client.city,
          type: 'client',
          account: user.uid,
          lastPay: new Date().toLocaleDateString(),
          banned: false
        }
        await setDoc(doc(db, 'users', user.uid), clientObj)
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingDoc = false
      }
    },
    async readClient(id) {
      if (this.client && this.client.account == id) {
        return
      }
      this.loadingDoc = true
      try {
        const clientRef = query(collection(db, 'users'), where('account', '==', id))
        const clientSnapshot = await getDocs(clientRef)
        const doc = clientSnapshot.docs[0]
        this.client = {
          id: doc.id,
          ...doc.data()
        }
      } catch (error) {
        console.log(error.message)
      } finally {
        this.loadingDoc = false
      }
    },
    async updateClient(id, client) {
      this.loadingDoc = true
      try {
        const clientRef = doc(db, 'users', id)
        await updateDoc(clientRef, client)
        this.clients = this.clients.map((item) =>
          item.id === id
            ? {
                ...item,
                email: client.email,
                name: client.name,
                surname: client.surname,
                dni: client.dni,
                birthdate: client.birthdate,
                phone: client.phone,
                address: client.address,
                city: client.city
              }
            : item
        )
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingDoc = false
      }
    },
    async deleteClient(id) {
      try {
        const clientRef = doc(db, 'users', id)
        await deleteDoc(clientRef)
        this.clients = this.clients.filter((item) => item.id !== id)
      } catch (error) {
        console.log(error)
      } /*  finally {
        
      } */
    }
  }
})
