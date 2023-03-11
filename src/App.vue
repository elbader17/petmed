<script setup>
import { RouterView } from 'vue-router';
import AppNavbar from './components/AppNavbar.vue';
import AppFooter from './components/AppFooter.vue';
</script>

<template>
  <div>
    <AppNavbar />
    <RouterView />
    <AppFooter />
  </div>
</template>

<style>
* {
  font-family: "Poppins", Sans-serif;
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
}
</style>
