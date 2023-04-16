<script setup>
import { RouterLink } from 'vue-router';
import { useCheckScreen } from '@/composables/checkScreen';
import { useUserStore } from '@/stores/user';
import NavbarLinks from './NavbarLinks.vue';

const { mobileL, mobileNav, toggleMobileNav } = useCheckScreen();
const userStore = useUserStore();
</script>

<template>
  <section class="header">
    <nav class="header-container">
      <RouterLink :to="{ name: 'home' }" class="logo">
        <img class="logo-img" src="../assets/img/l1.png" alt="PetMed logo" />
      </RouterLink>
      <div v-show="!mobileL" class="navbar">
        <NavbarLinks />
      </div>
      <transition name="mobile-nav">
        <div v-show="mobileNav" class="dropdown-navbar">
          <NavbarLinks />
        </div>
      </transition>
      <div @click="toggleMobileNav" v-show="mobileL" class="toggle-btn" :class="{ 'icon-active': mobileNav }">
        <font-awesome-icon icon="fa-solid fa-bars" />
      </div>
      <div v-if="!userStore.loadingSession">
        <div class="nav-button" v-if="!userStore.userData">
          <RouterLink :to="{ name: 'account' }" class="button-link">Acceder</RouterLink>
        </div>
        <div class="nav-button" v-if="userStore.userData">
          <RouterLink :to="{ name: 'account' }" class="button-link" @click="userStore.logoutUser">Salir</RouterLink>
        </div>
      </div>
      <div v-else class="nav-button">
        Cargando usuario...
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
  z-index: 1;
}

.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: all 0.3s ease;
  z-index: 10;
}

.mobile-nav-enter-from,
.mobile-nav-leave-to {
  opacity: 0;
}

.nav-button {
  border: none;
  background-color: #9E63C4;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
  transition: all 0.3s ease-out 0s;
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
</style>