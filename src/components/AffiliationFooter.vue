<script setup>
import { useDatabaseAffiliationStore } from '@/stores/databaseAffiliation'

const databaseAffiliationStore = useDatabaseAffiliationStore()

const vaciar = () => { databaseAffiliationStore.cart = {} }
</script>

<template>
  <th>Total productos</th>
  <td>$ <span>{{ databaseAffiliationStore.totalPrice }}</span></td>
  <td>
    <button @click="vaciar">
      vaciar todo
    </button>
  </td>
</template>
