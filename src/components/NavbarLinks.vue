<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
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
</template>

<style scoped>


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
</style>