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
  --pm-vw: #8D57B0;
  --pm-vb: #794899;
  --pm-cw: #3CBEB4;
  --pm-cw: #33A198;
  --pm-ow: #F4643C;
  --pm-ow: #F14313;
}

* {
  font-family: "Poppins", Sans-serif;
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
}

body {
  background: linear-gradient(rgba(255, 255, 255, 0.97), rgba(255, 255, 255, 0.97)),
    url('./assets/img/trama.jpg') center center fixed;
}
</style>
