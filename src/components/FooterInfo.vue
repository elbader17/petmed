<script setup>
import { ref } from 'vue';
import { useCheckScreen } from '@/composables/checkScreen';
import FooterTermsAndConditions from './FooterTermsAndConditions.vue';

const { mobile } = useCheckScreen();
const modal = ref(false);

const abrirModal = () => {
  modal.value = !modal.value;
}
</script>

<template>
  <section class="footer-info">
    <div class="footer-info-container">
      <h2 v-show="!mobile">PETMED</h2>
      <h2 class="footer-modal" @click="modal = true">Términos y Condiciones</h2>
      <FooterTermsAndConditions v-show="modal" @abrirModal="abrirModal" />
    </div>
  </section>
</template>

<style scoped>
.footer-info {
  background-color: #8D57B0;
}

.footer-info-container {
  max-width: 1240px;
  width: 100%;
  margin: 0 auto;
  color: #fff;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1.25rem;
}

h2 {
  color: #fff;
  font-size: 17px;
  font-weight: 300;
}

.footer-modal {
  cursor: pointer;
}

@media all and (max-width: 768px) {
  .footer-info-container {
    flex-direction: column;
    justify-content: center;
  }
}
</style>