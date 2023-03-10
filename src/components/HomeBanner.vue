<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <div class="hero">
      <video class="video" autoplay loop muted plays-inline>
        <source src="../assets/img/pet.mp4" type="video/mp4">
      </video>
      <div class="content">
        <img class="image" src="../assets/img/img_ban.png" alt="">
        <RouterLink to="/planes">Consultar planes</RouterLink>
      </div>
    </div>
</template>

<style scoped>
.hero {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  text-align: center;
  flex-wrap: wrap;
}

/*.video {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: -1;
  width: 100%;
  height: auto;
}*/

.video {
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
  overflow: hidden;
  z-index: -1;
  direction: ltr;
}

.image {
  width: 18.5rem;
}

a {
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  text-transform: uppercase;
  fill: #ffffff;
  color: #ffffff;
  background-color: #3CBEB4;
  border-radius: 1.0652rem;
  box-shadow: 0.3125rem -0.3125rem 3.75rem 0rem rgba(0, 0, 0, 0.1);
  padding: 0.75rem 1.25rem 0.75rem 1.25rem;
}

a:hover {
  color: #ffffff;
  background-color: #FF6438;
  border-color: #E9E9E9;
}
</style>
