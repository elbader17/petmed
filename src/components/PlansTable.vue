<script setup>
import { computed } from 'vue';

const props = defineProps(['data', 'currentPlan']);

const planColor = computed(() => {
  switch (props.currentPlan) {
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
</script>

<template>
  <section class="plans-content">
    <table class="plans-table">
      <thead class="table-head" :style="{ backgroundColor: planColor }">
        <th class="head-item">Prestaciones</th>
        <th class="head-item">Cobertura</th>
        <th class="head-item">Tiempo de Carencia</th>
        <th class="head-item">Cantidad</th>
      </thead>
      <tbody class="table-body" v-for="item in props.data" :key="item.id">
        <td class="body-item">{{ item.benefits }}</td>
        <td class="body-item">{{ item.coverage }}</td>
        <td class="body-item">{{ item.waitingPeriod }}</td>
        <td class="body-item">{{ item.quantity }}</td>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
.plans-content {
  display: flex;
  justify-content: center;
  text-align: center;
}

.plans-table {
  max-width: 1236px;
  padding: 1rem;
  border-spacing: inherit;
  border-collapse: separate;
}

.head-item {
  color: #fff;
  font-weight: 600;
  font-size: 1.25rem;
  text-transform: uppercase;
  padding: 0.75rem 2rem;
  border: 0.1rem solid #ddd;
  border-inline-color: rgba(255, 255, 255, 0.25);
}

.body-item {
  font-weight: 300;
  color: #000;
  background: #fff;
  padding: 0.75rem 2rem;
  border: 0.1rem solid #ddd;
}
</style>