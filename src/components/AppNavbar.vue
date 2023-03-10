<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <div>
      <RouterLink to="/">
        <img class="logo" src="../assets/img/l1.png" width="125" height="125" alt="PetMed logo" />
      </RouterLink>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/nosotros">Nosotros</RouterLink>
        <RouterLink to="/afiliaciones">Afiliaciones</RouterLink>
        <RouterLink to="/cartilla-de-prestadores">Cartilla de prestadores</RouterLink>
        <RouterLink to="/contacto">Contacto</RouterLink>
        <RouterLink to="/planes">Ver planes</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
header {
  background-color: #fff;
}

div {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 0.312rem 1.25rem 0.312rem 1.25rem;
}

.logo {
  width: 35%;
  height: auto;
}

nav {
  width: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
}

a {
  text-transform: uppercase;
  color: #000;
  font-weight: 300;
  text-decoration: none;
}
</style>