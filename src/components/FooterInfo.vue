<script setup>
import { ref } from 'vue';
import { useCheckScreen } from '@/composables/checkScreen';
import FooterTerminosYCondicones from './FooterTerminosYCondicones.vue';

const { mobile } = useCheckScreen();
const modal = ref(false);

const abrirModal = () => {
  modal.value = !modal.value;
}
</script>

<template>
  <div class="footer-info">
    <div class="footer-info-container">
      <h2 v-show="!mobile">PETMED</h2>
      <button @click="modal = true">Términos y Condiciones</button>
    </div>
    <FooterTerminosYCondicones v-show="modal" @abrirModal="abrirModal" />
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

@media all and (max-width: 767px) {
  .footer-info-container {
    flex-direction: column;
    justify-content: center;
  }
}
</style>