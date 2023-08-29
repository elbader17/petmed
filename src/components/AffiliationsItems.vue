<script setup>
import { useDatabaseAffiliationStore } from '@/stores/databaseAffiliation'

const databaseAffiliationStore = useDatabaseAffiliationStore()

defineProps(['plan'])
</script>

<template>
  <section class="affiliations-item">
    <img class="affiliations-img" :src="plan.image" :alt="plan.name">
    <div class="affiliations-info">
      <h3 class="info-subtitle">Valor Mensual</h3>
      <h1 class="info-title">{{ plan.name }}</h1>
      <div class="info-price">
        <h2 class="info-discount" v-if="!(plan.discount == 0)">${{ new Intl.NumberFormat('es-ar').format(plan.price) }}
        </h2>
        <h2 class="info-total">${{ new Intl.NumberFormat('es-ar').format(plan.price - (plan.price * (plan.discount /
          100))) }}</h2>
      </div>
      <RouterLink :to="{ name: 'afiliacion' }" class="info-link" @click="databaseAffiliationStore.addToCart(plan)">
        <font-awesome-icon icon="fa-solid fa-paw" />
        Quiero este plan
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.affiliations-item {
  text-align: center;
  margin: 1rem;
  width: 20rem;
  height: auto;
  max-width: 100%;
}

.affiliations-img {
  width: 17rem;
  height: auto;
  max-width: 100%;
}

.info-subtitle {
  color: #B7B7B7;
  font-weight: 400;
  font-size: 0.9rem;
  margin-top: 1rem;
}

.info-title {
  font-size: 1.625rem;
  font-weight: 600;
}

.info-price {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem auto;
}

.info-discount {
  opacity: .5;
  font-weight: 400;
  font-size: 1.25rem;
  margin-right: 0.25rem;
  text-decoration: line-through;
}

.info-total {
  font-weight: 500;
  font-size: 1.25rem;
}

.info-link {
  border: none;
  background-color: #9E63C4;
  color: #fff;
  font-size: 0.85rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
  cursor: pointer;
}
</style>