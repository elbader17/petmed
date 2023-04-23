<script setup>
import { RouterView } from 'vue-router';
import HeaderMain from './components/HeaderMain.vue';
import FooterMain from './components/FooterMain.vue';
</script>

<template>
  <div>
    <HeaderMain />
    <RouterView />
    <FooterMain />
  </div>
</template>

<style>
:root {
  --pm-violet: #9E63C4;
  --pm-violet-dark: #8D57B0;
  --pm-cyan: #3CBEB4;
  --pm-orange: #F4643C;
  --pm-orange-dark: #FF6438;
  --side-bar: 12rem;
}

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
