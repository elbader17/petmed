import {
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
  getDoc,
  setDoc,
  where,
  addDoc
} from 'firebase/firestore/lite'
import { db, auth } from '@/firebaseConfig'
import { defineStore } from 'pinia'

export const useDatabaseAdminStore = defineStore('databaseAdminStore', {
  state: () => ({}),
  actions: {
    async getForms(params) {
      function formatDate(firestoreTime) {
        const timestamp =
          firestoreTime.seconds * 1000 + Math.floor(firestoreTime.nanoseconds / 1000000)
        const date = new Date(timestamp)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear().toString()

        const formattedDate = `${day}-${month}-${year}`
        return formattedDate
      }
      let queryRef = collection(db, 'forms')

      if (params.length > 0) {
        params.forEach((param) => {
          queryRef = query(queryRef, where(param.key, '==', param.value))
        })
      } else {
        queryRef = query(queryRef, orderBy('date', 'desc'), limit(20))
      }

      const querySnapshot = await getDocs(queryRef)
      const dataForList = []
      querySnapshot.forEach((doc) => {
        dataForList.push({
          name: doc.data().socio,
          id: doc.id,
          plan: doc.data().plan,
          date: formatDate(doc.data().date)
        })
      })

      return dataForList
    }
  }
})
