<script setup>
import ContentBanner from '../components/ContentBanner.vue';
import ContentSeparator from '../components/icons/ContentSeparator.vue';
import ProvidersTable from '../components/ProvidersTable.vue';
import ProvidersLine from '../components/ProvidersLine.vue';
import imageBanner from '@/assets/img/banner_cartilla.jpg';
import imageTitle from '@/assets/img/cartilla.png';
import providers from '@/data/providers.json';
import { useCheckScreen } from '@/composables/checkScreen';

const { mobile } = useCheckScreen();
const data = providers;
</script>

<template>
  <div class="letter-providers">
    <ContentBanner :banner="imageBanner" :title="imageTitle" />
    <ProvidersTable :data="data" v-show="!mobile" />
    <ProvidersLine :data="data" v-show="mobile" />
    <ContentSeparator class="separator-bottom" />
  </div>
</template>

<style scoped>
.letter-providers {
  background-image: url(../assets/img/col3.png);
  background-position: bottom right;
  background-repeat: no-repeat;
  background-size: 23rem auto;
}

.separator-bottom {
  transform: rotate(180deg) translateY(-0.45rem) rotateY(180deg);
  fill: #3CBEB4;
  width: 100%;
  height: 3.875rem;
}
</style>