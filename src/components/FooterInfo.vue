<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="footer-info">
    <div class="footer-info-container">
      <h2>PETMED</h2>
      <RouterLink to="">Términos y Condiciones</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.footer-info {
  background-color: #8D57B0;
}

.footer-info-container {
  width: 90%;
  max-width: 1240px;
  margin: 0 auto;
  color: #fff;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1.25rem;
}

h2, a {
  color: #fff;
  font-size: 17px;
  font-weight: 300;
  text-decoration: none;
}

</style>