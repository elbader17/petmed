<script setup>
import { RouterLink } from 'vue-router';

defineProps (['plan'])
</script>

<template>
  <section class="plans-item">
    <img class="item-img" :src="plan.image" :alt="plan.name">
    <div class="item-info">
      <h1 class="info-title">{{ plan.name }}</h1>
      <RouterLink :to="plan.link" class="info-link">Ver mas beneficios</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.plans-item {
  flex: 1 1 33.333%;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.plans-item .item-img {
  transform: translateX(-2rem);
  transition: transform 0.3s ease;
  width: 110%;
  height: 100%;
  object-fit: cover;
}

.plans-item:hover .item-img {
  transform: translateX(0rem);
  transition: transform 0.3s ease;
}

.item-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 1rem;
  transition: transform 0.3s ease;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.item-info:hover {
  transform: translateY(-2rem);
}

.info-title {
  color: #fff;
  font-weight: 500;
  font-size: 2rem;
  position: absolute;
  top: 55%;
}

a {
  text-decoration: none;
}

.info-link {
  color: #fff;
  font-weight: 300;
  opacity: 0;
  transition: 0.3s ease;
  position: absolute;
  bottom: 2.5%;
}

.item-info:hover .info-link {
  opacity: 1;
  transition: 0.3s ease;
}
</style>