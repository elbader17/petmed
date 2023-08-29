<script setup>
import AffiliationCart from '../components/AffiliationCart.vue';
import ContentBanner from '@/components/ContentBanner.vue';
import imageBanner from '@/assets/img/affiliation-banner.jpg';
import imageTitle from '@/assets/img/Afiliaciones.png';
</script>

<template>
  <div>
    <ContentBanner :banner="imageBanner" :title="imageTitle" />
    <AffiliationCart />
  </div>
</template>

