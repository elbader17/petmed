import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, limit, where } from 'firebase/firestore/lite';
import { db, auth } from '@/firebaseConfig';
import { defineStore } from 'pinia';

export const useDatabasePetStore = defineStore('databasePetStore', {
  state: () => ({
    loadingDoc: false,
    pets: [],
    newPetRef: null,
    page: 1,
    perPage: 10,
    total: 0,
  }),
  actions: {
    async getPets(id) {
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
    async addPet(pet) {
      this.loadingDoc = true;
      try {
        const petObj = {
          name: pet.name,
          birthdate: pet.birthdate,
          animal: pet.animal,
          breed: pet.breed,
          sex: pet.sex,
          color: pet.color,
          plan: pet.plan,
          numAffiliate: pet.numAffiliate,
          client: pet.client
        }
        const petRef = await addDoc(collection(db, 'pets'), petObj);
        this.pets.push({
          id: petRef.id,
          ...petObj
        })
        this.newPetRef = petRef.id;
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async readPet(id) {
      this.loadingDoc = true;
      try {
        const petRef = doc(db, 'pets', id);
        const petSnapshot = await getDoc(petRef);
        if (!petSnapshot.exists()) {
          throw new Error("No existe la mascota");
        }
        if (petSnapshot.data().user === auth.currentUser.uid) {
          return petSnapshot.data();
        } else {
          throw new Error("No tienes permiso");
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        this.loadingDoc = false;
      }
    },
    async updatePet(id, pet) {
      this.loadingDoc = true;
      try {
        const petRef = doc(db, 'pets', id);
        await updateDoc(petRef, pet);
        this.pets = this.pets.map(item => item.id === id ? ({
          ...item,
          name: pet.name,
          birthdate: pet.birthdate,
          animal: pet.animal,
          breed: pet.breed,
          sex: pet.sex,
          color: pet.color,
          plan: pet.plan
        }) : item)
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async deletePet(id) {
      try {
        const petRef = doc(db, 'pets', id);
        await deleteDoc(petRef);
        this.pets = this.pets.filter(item => item.id !== id)
      } catch (error) {
        console.log(error);
      }/*  finally {
        
      } */
    }
  }
})
