<script setup>
import ContentBanner from '../components/ContentBanner.vue';
import ContentSeparator from '../components/icons/ContentSeparator.vue';
import AffiliationsItems from '../components/AffiliationsItems.vue';

import imageBanner from '@/assets/img/banner_afiliaciones.jpg';
import imageTitle from '@/assets/img/Afiliaciones.png';
import plan1005 from '@/assets/img/1005.png';
import plan2010 from '@/assets/img/2010.png';
import plan3015 from '@/assets/img/3015.png';
import plan1005Familiar from '@/assets/img/1005-Familiar.png';
import plan2010Familiar from '@/assets/img/2010-Familiar.png';
import plan3015Familiar from '@/assets/img/3015-Familiar.png';

const planesSimples = [
  {
    id: 1,
    image: plan1005,
    name: "Plan 1005",
    price: 2000,
    discount: 0,
    link: "/planes"
  },
  {
    id: 2,
    image: plan2010,
    name: "Plan 2010",
    price: 3300,
    discount: 0,
    link: "/planes"
  },
  {
    id: 3,
    image: plan3015,
    name: "Plan 3015",
    price: 4790,
    discount: 0,
    link: "/planes"
  }
];
const planesPromos = [
  {
    id: 1,
    image: plan1005Familiar,
    name: "Grupo familiar por 2 mascotas – Plan 1005",
    price: 4000,
    discount: 10,
    link: "/planes"
  },
  {
    id: 2,
    image: plan2010Familiar,
    name: "Grupo familiar por 2 mascotas – Plan 2010",
    price: 6600,
    discount: 15,
    link: "/planes"
  },
  {
    id: 3,
    image: plan3015Familiar,
    name: "Grupo familiar por 2 mascotas – Plan 3015",
    price: 9580,
    discount: 15,
    link: "/planes"
  }
];
</script>

<template>
  <div class="affiliations">
    <ContentBanner :banner="imageBanner" :title="imageTitle" />
    <div class="affiliations-single">
      <h1 class="single-title">Afiliación PETMED</h1>
      <h2 class="single-subtitle">Seleccione el plan deseado</h2>
      <ul class="single-list">
        <AffiliationsItems
          v-for="plan in planesSimples"
          :key="plan.id"
          :plan="plan"
        />
      </ul>
    </div>
    <div class="affiliations-promo">
      <h1 class="promo-subtitle">Promos</h1>
      <h1 class="promo-title">GRUPO FAMILIAR</h1>
      <ul class="promo-list">
        <AffiliationsItems
          v-for="plan in planesPromos"
          :key="plan.id"
          :plan="plan"
        />
      </ul>
    </div>
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
  color: #f4643c;
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