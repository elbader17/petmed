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
        const keysTrue = []

        for (const key in doc.data()) {
          if (doc.data().hasOwnProperty(key) && doc.data()[key] === true) {
            keysTrue.push(key)
          }
        }

        dataForList.push({
          name: doc.data().socio,
          id: doc.id,
          plan: doc.data().plan,
          date: formatDate(doc.data().date),
          practices: keysTrue.join(', '),
          abdomen: doc.data().abdomen,
          anamnesis: doc.data().anamnesis,
          complementaryStudies: doc.data().complementaryStudies,
          fc: doc.data().fc,
          fr: doc.data().fr,
          feflexes: doc.data().feflexes,
          formerMembers: doc.data().formerMembers,
          headNeck: doc.data().headNeck,
          hindLimbs: doc.data().hindLimbs,
          mainGanglia: doc.data().mainGanglia,
          mucousMembrane: doc.data().mucousMembrane,
          observations: doc.data().observations,
          petId: doc.data().petId,
          responsible: doc.data().responsible,
          skinCondition: doc.data().skinCondition,
          temp: doc.data().temp,
          torax: doc.data().torax,
          vet: doc.data().vet,
        })
      })

      return dataForList
    }
  }
})
