<script setup>
import { onBeforeMount } from 'vue';
import { useDatabasePricesStore } from '@/stores/databasePrices';

import ContentBanner from '@/components/ContentBanner.vue';
import ContentSeparator from '@/components/icons/ContentSeparator.vue';
import LoadingAnimation from '../components/LoadingAnimation.vue';
import AffiliationsItems from '@/components/AffiliationsItems.vue';

import imageBanner from '@/assets/img/banner_afiliaciones.jpg';
import imageTitle from '@/assets/img/Afiliaciones.png';

const databasePricesStore = useDatabasePricesStore();

onBeforeMount(async () => {
  await databasePricesStore.getPrices();
});
</script>

<template>
  <div class="affiliations">
    <ContentBanner :banner="imageBanner" :title="imageTitle" />
    <section v-if="databasePricesStore.loadingDoc">
      <LoadingAnimation />
    </section>
    <section v-else>
      <section class="affiliations-single">
        <h1 class="single-title">Afiliación PETMED</h1>
        <h2 class="single-subtitle">Seleccione el plan deseado</h2>
        <ul class="single-list">
          <AffiliationsItems v-for="plan in databasePricesStore.prices.simple" :key="plan.name" :plan="plan" />
        </ul>
      </section>
      <section class="affiliations-promo">
        <h1 class="promo-subtitle">Promos</h1>
        <h1 class="promo-title">GRUPO FAMILIAR</h1>
        <ul class="promo-list">
          <AffiliationsItems v-for="plan in databasePricesStore.prices.familiar" :key="plan.name" :plan="plan" />
        </ul>
      </section>
    </section>
    <ContentSeparator class="separator-bottom" />
  </div>
</template>

<style scoped>
.separator-bottom {
  transform: rotate(180deg) translateY(-0.45rem) rotateY(180deg);
  fill: #3CBEB4;
  width: 100%;
  height: 3.875rem;
}

.affiliations-single,
.affiliations-promo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
}

.single-title,
.promo-title {
  color: #F4643C;
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.single-subtitle {
  font-weight: 500;
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.promo-subtitle {
  color: #363636;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
}

.single-list,
.promo-list {
  display: flex;
}

@media all and (max-width: 1024px) {

  .single-list,
  .promo-list {
    flex-direction: column;
  }
}
</style>