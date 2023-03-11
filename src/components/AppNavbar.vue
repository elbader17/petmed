<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="header">
    <RouterLink to="/" class="logo">
      <img class="logo-img" src="../assets/img/l1.png" alt="PetMed logo" />
    </RouterLink>
    <nav class="navbar">
      <ul class="navbar-nav">
        <li class="nav-item">
          <RouterLink to="/" class="nav-link">Home</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/nosotros" class="nav-link">Nosotros</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/afiliaciones" class="nav-link">Afiliaciones</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/cartilla-de-prestadores" class="nav-link">Cartilla de prestadores</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/contacto" class="nav-link">Contacto</RouterLink>
        </li>
      </ul>
    </nav>
    <RouterLink to="/planes"><button class="header-button">Ver planes</button></RouterLink>
  </header>
</template>

<style scoped>
.header {
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.3rem 1.25rem;
}

.navbar {
  padding: 0.625rem;
}

.logo-img {
  height: 5.95rem;
  width: auto;
}

.navbar-nav {
  list-style: none;
}

.nav-item {
  display: inline-block;
  padding: 0.8rem 1.25rem;
  position: relative;
}

.nav-link {
  color: #000;
  font-weight: 300;
  text-transform: uppercase;
  text-decoration: none;
  overflow: hidden;
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
  text-decoration: none;
  border: none;
  color: #FFFFFF;
  background-color: #9E63C4;
  padding: 0.625rem 1.875rem;
  transition: all 0.3s ease-out 0s;
}

.header-button:hover {
  background-color: #393d3f;
  transform: scale(1.2);
  transition: all 0.5s cubic-bezier(0.5, 2.5, 0.5, 0) 0s;
}
</style>