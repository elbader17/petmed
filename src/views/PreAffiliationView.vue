<script setup>
import AffiliationCart from '../components/AffiliationCart.vue';
import ContentBanner from '@/components/ContentBanner.vue';
import imageBanner from '@/assets/img/affiliation-banner.jpg';
import imageTitle from '@/assets/img/Afiliaciones.png';
</script>

<template>
  <ContentBanner :banner="imageBanner" :title="imageTitle" />
  <div>
    <h2>*Recuerde que puede seguir agregando planes al carrito antes de finalizar la compra.</h2>
    <h2>**También puede cambiar la cantidad del mismo plan que desee adquirir.</h2>
    <AffiliationCart />
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  max-width: 1240px;
  width: 100%;
  margin: 0 auto;
  margin-top: 2rem;
  text-align: center;
  padding: 3.125rem;
}

h2 {
  font-size: 20px;
  font-weight: 300;
}
</style>