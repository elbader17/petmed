<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="hero">
    <video class="video" autoplay loop muted plays-inline>
      <source src="../assets/img/pet.mp4" type="video/mp4">
    </video>
    <div class="content">
      <img class="content-image" src="../assets/img/img_ban.png" alt="Somos el mimo que se merece">
      <RouterLink to="/planes"><button class="hero-button">Consultar planes</button></RouterLink>
    </div>
  </div>
</template>

<style scoped>
.hero {
  min-height: 30rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  margin: auto;
}

.video {
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
  object-fit: cover;
  z-index: -1;
  direction: ltr;
}

.content-image {
  width: 18.5rem;
  margin-bottom: 2rem;
}

.hero-button {
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  text-decoration: none;
  text-transform: uppercase;
  fill: #ffffff;
  color: #ffffff;
  background-color: #3CBEB4;
  border-radius: 1rem;
  padding: 0.5rem 1.25rem;
}

.hero-button:hover {
  color: #ffffff;
  background-color: #FF6438;
  border-color: #E9E9E9;
}
</style>
