<script setup>
import { computed } from 'vue'
import { useDatabaseAffiliationStore } from '@/stores/databaseAffiliation'

const databaseAffiliationStore = useDatabaseAffiliationStore()

const totalCantidad = computed(databaseAffiliationStore.totalQuantity())
const totalPrecio = computed(databaseAffiliationStore.totalPrice())
const vaciar = () => { databaseAffiliationStore.cart = {} }
</script>

<template>
  <th>Total productos</th>
  <td>{{ totalCantidad }}</td>
  <td>
    <button @click="vaciar">
      vaciar todo
    </button>
  </td>
  <td>$ <span>{{ totalPrecio }}</span></td>
</template>
