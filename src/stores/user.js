import { defineStore } from 'pinia';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { useDatabaseUserStore } from './databaseUser';
import router from '@/router/index';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    userData: null,
    newUser: null,
    loadingUser: false,
    loadingSession: false
  }),
  actions: {
    async registerUser(email, password) {
      this.loadingUser = true;
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        this.newUser = { email: user.email, uid: user.uid };
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingUser = false;
      }
    },
    async loginUser(email, password) {
      this.loadingUser = true;
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        this.userData = { email: user.email, uid: user.uid };
        router.push({ name: 'dashboard-home' });
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingUser = false;
      }
    },
    async logoutUser() {
      const databaseUserStore = useDatabaseUserStore();
      databaseUserStore.$reset();
      try {
        await signOut(auth);
        this.userData = null;
        router.push({ name: 'home' });
      } catch (error) {
        console.log(error);
      }
    },
    currentUser() {
      return new Promise((resolve, reject) => {
        const unsuscribe = onAuthStateChanged(auth, user => {
          if (user) {
            this.userData = { email: user.email, uid: user.uid };
          } else {
            this.userData = null;
            const databaseUserStore = useDatabaseUserStore();
            databaseUserStore.$reset();
          }
          resolve(user);
        }, error => reject(error));
        unsuscribe();
      })
    }
  }
})