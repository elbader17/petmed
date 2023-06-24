<script setup>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import { useCheckScreen } from '@/composables/checkScreen';
import { useUserStore } from '@/stores/user';
import NavbarLinks from './NavbarLinks.vue';
import ModalReusable from '../components/ModalReusable.vue';
import AccountLogin from '../components/AccountLogin.vue';
import AccountForgot from '../components/AccountForgot.vue';

const { mobile, mobileL, mobileNav, toggleMobileNav } = useCheckScreen();
const userStore = useUserStore();

const openModal = ref(false);

const toggleModal = () => {
  openModal.value = !openModal.value;
}

const showLogin = ref(true)

const toggleShowLogin = () => {
  showLogin.value = !showLogin.value
}
</script>

<template>
  <section class="header">
    <nav class="header-container">
      <RouterLink :to="{ name: 'home' }" class="logo">
        <img class="logo-img" src="../assets/img/l1.png" alt="PetMed logo" />
      </RouterLink>
      <div v-show="!mobileL || mobileNav" :class="mobileNav ? 'dropdown-navbar' : 'navbar'">
        <NavbarLinks />
      </div>
      <div @click="toggleMobileNav" v-show="mobileL" class="toggle-btn" :class="{ 'icon-active': mobileNav }">
        <font-awesome-icon icon="fa-solid fa-bars" size="xl" />
      </div>
      <div v-if="!userStore.loadingSession">
        <div v-if="!userStore.userData">
          <div class="nav-button" @click="toggleModal">
            <p v-show="!mobile">Acceder</p>
            <font-awesome-icon v-show="mobile" icon="fa-solid fa-user" size="xl" />
          </div>
        </div>
        <div v-if="userStore.userData">
          <div :to="{ name: 'home' }" class="nav-button" @click="userStore.logoutUser">
            <p v-show="!mobile">Salir</p>
            <font-awesome-icon v-show="mobile" icon="fa-solid fa-right-from-bracket" size="xl" />
          </div>
        </div>
        <ModalReusable @closeModal="toggleModal" :modalActive="openModal">
          <transition name="fade" mode="out-in">
            <AccountLogin v-if="showLogin" @toggle="toggleShowLogin" @closeModal="toggleModal" />
            <AccountForgot v-else @toggle="toggleShowLogin" @closeModal="toggleModal" />
          </transition>
        </ModalReusable>
      </div>
    </nav>
  </section>
</template>

<style scoped>
.header {
  background-color: #fff;
}

.header-container {
  max-width: 1240px;
  width: 100%;
  margin: 0 auto;
  padding: 0.25rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-img {
  height: 5.95rem;
  width: auto;
}

.navbar {
  padding: 0.625rem;
  width: 100%;
  display: flex;
  justify-content: center;
}

.toggle-btn {
  border: none;
  color: #FFFFFF;
  background-color: #9E63C4;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease-out 0s;
}

.dropdown-navbar .navbar-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  background-color: #fff;
  width: 100%;
  height: 35%;
  top: 9rem;
  left: 0;
  z-index: 5;
}

.nav-button {
  border: none;
  background-color: #9E63C4;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
  transition: all 0.3s ease-out 0s;

  text-decoration: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 0.25rem;
  color: #FFFFFF;
  letter-spacing: 0.1rem;
  font-weight: 300;
  text-transform: uppercase;
}

.nav-button:hover {
  background-color: #393d3f;
  transform: scale(1.15);
  transition: all 0.5s cubic-bezier(0.5, 2.5, 0.5, 0) 0s;
}

.button-link {
  text-decoration: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 0.25rem;
  color: #FFFFFF;
  letter-spacing: 0.1rem;
  font-weight: 300;
  text-transform: uppercase;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media all and (max-width: 767px) {
  .nav-button {
    padding: 1rem 1.25rem;
    border-radius: 2.5rem;
  }
}
</style>