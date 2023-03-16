<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

const mobile = ref(true);
const mobileNav = ref(false);

const toggleMobileNav = () => {
  mobileNav.value = !mobileNav.value;
}

onMounted(() => {
  window.addEventListener('resize', checkScreen);
  checkScreen();
})

const checkScreen = () => {
  const windowWidth = window.innerWidth;
  if (windowWidth <= 1023) {
    mobile.value = true;
    return;
  }
  mobile.value = false;
  mobileNav.value = false;
  return;
}
</script>

<template>
  <div class="header">
    <nav class="header-container">
      <RouterLink to="/" class="logo">
        <img class="logo-img" src="../assets/img/l1.png" alt="PetMed logo" />
      </RouterLink>
      <div v-show="!mobile" class="navbar">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink :to="{ name: 'home' }" class="nav-link">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="{ name: 'nosotros' }" class="nav-link">Nosotros</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="{ name: 'afiliaciones' }" class="nav-link">Afiliaciones</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="{ name: 'cartilla-de-prestadores' }" class="nav-link">Cartilla de prestadores</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="{ name: 'contacto' }" class="nav-link">Contacto</RouterLink>
          </li>
          <button class="header-button">
            <RouterLink :to="{ name: 'planes' }">Ver planes</RouterLink>
          </button>
        </ul>
      </div>
      <transition name="mobile-nav">
        <div v-show="mobileNav" class="dropdown-navbar">
          <ul class="navbar-nav">
            <li class="nav-item">
              <RouterLink :to="{ name: 'home' }" class="nav-link">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink :to="{ name: 'nosotros' }" class="nav-link">Nosotros</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink :to="{ name: 'afiliaciones' }" class="nav-link">Afiliaciones</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink :to="{ name: 'cartilla-de-prestadores' }" class="nav-link">Cartilla de prestadores</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink :to="{ name: 'contacto' }" class="nav-link">Contacto</RouterLink>
            </li>
            <button class="header-button">
              <RouterLink :to="{ name: 'planes' }">Ver planes</RouterLink>
            </button>
          </ul>
        </div>
      </transition>
      <div @click="toggleMobileNav()" v-show="mobile" class="toggle-btn" :class="{ 'icon-active': mobileNav }">
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

.navbar-nav {
  list-style: none;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}

.nav-item {
  display: inline-block;
  padding: 0.8rem 1.25rem;
  position: relative;
}

.nav-link {
  color: #000;
  font-weight: 300;
  font-size: 0.9rem;
  text-transform: uppercase;
  text-decoration: none;
  overflow: hidden;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-item::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 0.05rem;
  left: 0;
  bottom: 0;
  transition: transform 0.3s ease;
}

.nav-item:hover::after {
  background: #000;
}

.header-button {
  letter-spacing: 0.1rem;
  font-weight: 300;
  text-transform: uppercase;
  border: none;
  background-color: #9E63C4;
  cursor: pointer;
  padding: 0.625rem 1.875rem;
  transition: all 0.3s ease-out 0s;
}

.header-button a {
  text-decoration: none;
  color: #FFFFFF;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header-button:hover {
  background-color: #393d3f;
  transform: scale(1.2);
  transition: all 0.5s cubic-bezier(0.5, 2.5, 0.5, 0) 0s;
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