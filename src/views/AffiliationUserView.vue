<script setup>
import ContentBanner from '@/components/ContentBanner.vue';
import imageBanner from '@/assets/img/affiliation-banner.jpg';
import imageTitle from '@/assets/img/Afiliaciones.png';
import AffiliateUser from '../components/AffiliateUser.vue';
</script>

<template>
  <div>
    <ContentBanner :banner="imageBanner" :title="imageTitle" />
    <AffiliateUser />
  </div>
</template>

