<script setup>
import ContentSeparator from './icons/ContentSeparator.vue';
import HomePlansItems from './HomePlansItems.vue';

import plan1005 from '@/assets/img/c1.jpg';
import plan2010 from '@/assets/img/c2.jpg';
import plan3015 from '@/assets/img/c3.jpg';

const planes = [
  {
    id: 1,
    image: plan1005,
    name: "Plan 1005",
    link: "/planes"
  },
  {
    id: 2,
    image: plan2010,
    name: "Plan 2010",
    link: "/planes"
  },
  {
    id: 3,
    image: plan3015,
    name: "Plan 3015",
    link: "/planes"
  }
];
</script>

<template>
  <div class="plans">
    <div class="plans-header">
      <h1 class="plans-title">Nuestros Planes</h1>
      <h2 class="plans-subtitle">A La Medida De Tu Mascota</h2>
      <ContentSeparator class="separator-intermediate" />
    </div>
    <ul class="plans-list">
      <HomePlansItems 
        v-for="plan in planes" :key="plan.id"
        :plan="plan"
      />
    </ul>
  </div>
</template>

<style scoped>
.plans {
  text-align: center;
}

.plans-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-image: url(../assets/img/col3.png);
  background-position: bottom right;
  background-repeat: no-repeat;
  background-size: 14rem auto;
  opacity: 0.97;
  height: 10.5rem;
  margin-top: 3rem;
}

.plans-title {
  color: #000000;
  font-size: 2.3rem;
  font-weight: 700;
  text-transform: capitalize;
}

.plans-subtitle {
  color: #000000;
  font-size: 1.25rem;
  font-weight: 300;
  text-transform: capitalize;
}

.separator-intermediate {
  transform: rotate(180deg) translateY(-0.25rem) rotateY(180deg);
  fill: #3CBEB4;
  width: 100%;
  height: 3.875rem;
}

.plans-list {
  display: flex;
  flex-wrap: nowrap;
  background-color: #3CBEB4;
  display: flex;
  list-style-type: none;
  overflow: hidden;
  margin: 0 auto;
}

@media all and (max-width: 768px) {
  .plans-header {
    background-size: 10rem auto;
  }
  .plans-list {
    flex-direction: column;
  }
}
</style>