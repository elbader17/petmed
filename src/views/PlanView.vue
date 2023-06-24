<script setup>
import { useCheckScreen } from '@/composables/checkScreen';
import { ref, computed, watch } from 'vue';
import ContentBanner from '../components/ContentBanner.vue';
import ContentSeparator from '../components/icons/ContentSeparator.vue';
import PlansTable from '../components/PlansTable.vue';
import imageBanner from '@/assets/img/plans-banner.jpg';
import imageTitle from '@/assets/img/planes.png';
import plans from '@/data/plans.json';

import title1005 from '@/assets/img/TITU1005.png';
import title2010 from '@/assets/img/TITU2010.png';
import title3015 from '@/assets/img/TITU3015.png';
import plan1005 from '@/assets/img/1005-Plan.png';
import plan2010 from '@/assets/img/2010-Plan.png';
import plan3015 from '@/assets/img/3015-Plan.png';

const { mobile } = useCheckScreen();
const data = plans;

const currentPlan = ref(0);

const planColor = computed(() => {
  switch (currentPlan.value) {
    case 0:
      return '#9E63C4'
    case 1:
      return '#FF6438'
    case 2:
      return '#3CBEB4'
    default:
      return '#000'
  }
})

const planes = [
  {
    id: 1,
    title: title1005,
    image: plan1005,
    name: "Plan 1005",
    link: "/contacto"
  },
  {
    id: 2,
    title: title2010,
    image: plan2010,
    name: "Plan 2010",
    link: "/contacto"
  },
  {
    id: 3,
    title: title3015,
    image: plan3015,
    name: "Plan 3015",
    link: "/contacto"
  }
];

const transitionName = ref('slide-right')

watch(currentPlan, (val, old) => {
  transitionName.value = val > old ? 'slide-left' : 'slide-right'
})
</script>

<template>
  <div class="plans">
    <ContentBanner :banner="imageBanner" :title="imageTitle" />
    <div class="plans-header">
      <img class="plan-img" v-for="(plan, index) in planes" :key="plan.id" :src="plan.title"
        @click="currentPlan = index" />
    </div>
    <section v-show="!mobile">
      <Transition :name="transitionName" mode="out-in">
        <PlansTable :key="currentPlan" :data="data[currentPlan].services" :currentPlan="currentPlan" />
      </Transition>
    </section>
    <section class="plans-mobile" v-show="mobile">
      <Transition :name="transitionName" mode="out-in">
        <img class="mobile-img" :key="currentPlan" :src="planes[currentPlan].image" />
      </Transition>
    </section>
    <section class="plans-info">
      <div class="info-button">
        <RouterLink :to="planes[currentPlan].link" :style="{ backgroundColor: planColor }" class="info-link">
          <font-awesome-icon icon="fa-solid fa-paw" />
          Quiero este plan
        </RouterLink>
      </div>
      <div class="info-consider">
        <p>* No Cubre Descartables</p>
        <p>* No Cubre Inyectables</p>
        <p>* No Cubre Anestesia</p>
        <p>* No Cubre Cirugías Estéticas</p>
        <p>* LAS CONSULTAS NO SON ACUMULATIVAS</p>
      </div>
      <div class="info-terms">
        <p><strong>Tiempo Carencia</strong> = Tiempo de permanencia en la Obra Social</p>
        <p><strong>CT</strong>= Con Tope.</p>
      </div>
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

.plans-header {
  display: flex;
  justify-content: space-around;
  max-width: 940px;
  width: 100%;
  margin: 3rem auto 1rem auto;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.13);
}

.plan-img {
  width: 16rem;
  margin: 0.5rem;
  cursor: pointer;
}

.plans-mobile {
  display: flex;
  justify-content: center;
  margin: 3rem 1rem;
}

.mobile-img {
  max-width: 576px;
  width: 100%;
  margin: 0 auto;
}

.plans-info {
  display: flex;
  justify-content: center;
  max-width: 940px;
  width: 100%;
  margin: 3rem auto;
}

.info-button,
.info-consider,
.info-terms {
  margin: 1rem;
}

.info-link {
  border: none;
  color: #fff;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.slide-right-enter-from,
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.slide-left-enter-from,
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.slide-right-leave-from,
.slide-right-enter-to,
.slide-left-leave-from,
.slide-left-enter-to {
  opacity: 1;
}

.slide-right-leave-active,
.slide-right-enter-active,
.slide-left-leave-active,
.slide-left-enter-active {
  transition: all 0.2s;
}

@media all and (max-width: 768px) {
  .plans-header {
    flex-direction: column;
    align-items: center;
  }

  .plans-info {
    flex-direction: column;
    align-items: center;
  }
}
</style>