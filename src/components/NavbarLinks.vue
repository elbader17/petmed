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
      <RouterLink :to="{ name: 'planes' }" class="nav-link">Planes</RouterLink>
    </li>
    <li class="nav-item">
      <a href="https://petmed.ar/afiliaciones/" class="nav-link">Afiliaciones</a>
    </li>
    <li class="nav-item">
      <RouterLink :to="{ name: 'cartilla-de-prestadores' }" class="nav-link">Cartilla de prestadores</RouterLink>
    </li>
    <li class="nav-item">
      <RouterLink :to="{ name: 'contacto' }" class="nav-link">Contacto</RouterLink>
    </li>
  </ul>
</template>

<style scoped>
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
  justify-content: center;
}

.nav-link {
  display: inline-block;
  padding: 0.8rem 1.25rem;
  position: relative;
  text-decoration: none;
  color: #000;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 0.05rem;
  left: 0;
  bottom: 0;
  transition: transform 0.3s ease;
}

.nav-item {
  font-weight: 300;
  font-size: 0.9rem;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-link:hover::after {
  background: #000;
}

.router-link-active::after {
  background: #000;
}
</style>