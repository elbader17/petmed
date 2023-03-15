<script setup>
import { RouterView } from 'vue-router';
import AppNavbar from './components/AppNavbar.vue';
import AppFooter from './components/AppFooter.vue';
import NavbarInfo from './components/NavbarInfo.vue';
import FooterInfo from './components/FooterInfo.vue';
</script>

<template>
  <div>
    <NavbarInfo />
    <AppNavbar />
    <RouterView />
    <AppFooter />
    <FooterInfo />
  </div>
</template>

<style>
* {
  font-family: "Poppins", Sans-serif;
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
}

body {
  background: linear-gradient(rgba(255,255,255,0.97),rgba(255,255,255,0.97)),
  url('./assets/img/trama.jpg')
  center center fixed;
}
</style>
