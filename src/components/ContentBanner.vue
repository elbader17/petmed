<script setup>
import ContentSeparator from '../components/icons/ContentSeparator.vue';

defineProps (['banner', 'title'])
</script>

<template>
  <section class="hero">
    <img class="hero-image" :src="banner" alt="Imagen banner">
    <div class="hero-content">
      <img class="content-image" :src="title" alt="Imagen titulo">
    </div>
    <ContentSeparator class="separator-top" />
  </section>
</template>

<style scoped>
.hero {
  min-height: 25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.separator-top {
  transform: rotate(180deg) translateY(-0.5rem);
  fill: #fff;
  width: 100%;
  height: 3.875rem;
}

.hero-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  margin: auto;
}

.hero-image {
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
  width: 20rem;
  position: absolute;
  bottom: 20%;
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
</style>
