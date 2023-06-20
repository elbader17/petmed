<script setup>
import { ref } from 'vue';

const isExpanded = ref(true);

const toggleMenu = () => {
  isExpanded.value = !isExpanded.value;
}
</script>

<template>
  <aside class="sidebar-menu" :class="`${isExpanded && 'is-expanded'}`">
    <div class="menu-header">
      <h3 class="menu-title" v-if="isExpanded">Menu</h3>
      <button class="menu-toggle" @click="toggleMenu">
        <font-awesome-icon icon="fa-solid fa-angles-right" class="icon" size="2x" />
      </button>
    </div>
    <div class="admin-menu">
      <router-link class="button" :to="{ name: 'dashboard-home' }">
        <font-awesome-icon icon="fa-solid fa-house" class="icon" size="xl" />
        <h4 class="text" v-if="isExpanded">Home</h4>
      </router-link>
      <router-link class="button" :to="{ name: 'dashboard-clients' }">
        <font-awesome-icon icon="fa-solid fa-user" class="icon" size="xl" />
        <h4 class="text" v-if="isExpanded">Clientes</h4>
      </router-link>
      <router-link class="button" :to="{ name: 'dashboard-pets' }">
        <font-awesome-icon icon="fa-solid fa-cat" class="icon" size="xl" />
        <h4 class="text" v-if="isExpanded">Mascotas</h4>
      </router-link>
      <router-link class="button" :to="{ name: 'dashboard-vets' }">
        <font-awesome-icon icon="fa-solid fa-user-doctor" class="icon" size="xl" />
        <h4 class="text" v-if="isExpanded">Veterinarios</h4>
      </router-link>
      <router-link class="button" :to="{ name: 'dashboard-plans' }">
        <font-awesome-icon icon="fa-solid fa-money-check-dollar" class="icon" size="xl" />
        <h4 class="text" v-if="isExpanded">Planes</h4>
      </router-link>
      <router-link class="button" :to="{ name: 'dashboard-providers' }">
        <font-awesome-icon icon="fa-solid fa-file-medical" class="icon" size="xl" />
        <h4 class="text" v-if="isExpanded">Prestadores</h4>
      </router-link>
    </div>
  </aside>
</template>

<style scoped>
.sidebar-menu {
  display: flex;
  flex-direction: column;
  width: calc(4rem);
  min-height: 100vh;
  overflow: hidden;
  padding: 1rem;
  background-color: #8D57B0;
  color: #fff;
  transition: 0.2s ease-out;
}

.is-expanded {
  width: 12rem;
}

.menu-header {
  display: flex;
  justify-content: center;
  position: relative;
  margin: 1rem;
  transition: 0.2s ease-out;
}

.is-expanded .menu-header {
  justify-content: space-between;
}

.menu-toggle {
  color: #fff;
  background: none;
  border: none;
  transition: 0.2s ease-out;
  cursor: pointer;
}

.menu-toggle:hover {
  transform: translateX(0.5rem);
}

.is-expanded .menu-toggle {
  transform: rotate(-180deg);
  transition: 0.2s ease-out;
}

.is-expanded .menu-toggle:hover {
  transform: rotate(-180deg)translateX(0.5rem);
}

.menu-toggle .icon:hover,
.is-expanded .menu-toggle .icon:hover {
  color: #FF6438;
}

.icon {
  color: #fff;
  background: none;
  border: none;
  transition: 0.2s ease-out;
}

.menu-title {
  color: #FF6438;
  font-size: 1.25rem;
  text-transform: uppercase;
  transition: 0.2s ease-out;
}

.admin-menu {
  margin: 0 -0.5rem;
}

.button {
  display: flex;
  flex-direction: center;
  justify-content: center;
  text-decoration: none;
  padding: 1rem;
  transition: 0.2s ease-out;
}

.button:hover .icon,
.button:hover .text {
  color: #FF6438;
}

.is-expanded .button {
  justify-content: flex-start;
}

.text {
  color: #fff;
  margin-left: 1rem;
  transition: 0.2s ease-out;
}

/* @media all and (max-width: 768px) {
  .sidebar-menu {
    position: fixed;
    z-index: 3;
  }
} */
</style>