<script setup>
import ContentBanner from '@/components/ContentBanner.vue';
import imageBanner from '@/assets/img/affiliation-banner.jpg';
import imageTitle from '@/assets/img/Afiliaciones.png';
import AffiliatePet from '../components/AffiliatePet.vue';
</script>

<template>
  <div>
    <ContentBanner :banner="imageBanner" :title="imageTitle" />
    <AffiliatePet />
  </div>
</template>
