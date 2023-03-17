<script setup>
import { RouterLink } from 'vue-router';
import { useCheckScreen } from '@/composables/checkScreen';
import NavbarLinks from './NavbarLinks.vue';

const { mobileL, mobileNav, toggleMobileNav } = useCheckScreen();
</script>

<template>
  <div class="header">
    <nav class="header-container">
      <RouterLink to="/" class="logo">
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
    </nav>
  </div>
</template>

<style scoped>
.header {
  background-color: #fff;
}

.header-container {
  width: 90%;
  max-width: 1240px;
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
</style>