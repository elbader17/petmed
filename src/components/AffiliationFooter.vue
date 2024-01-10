<script setup>
import { useDatabaseAffiliationStore } from '@/stores/databaseAffiliation'

const databaseAffiliationStore = useDatabaseAffiliationStore()

const vaciar = () => { databaseAffiliationStore.cart = {} }
</script>

<template>
  <tr>
    <th>Total productos</th>
    <td><strong>${{ databaseAffiliationStore.totalPrice }}</strong></td>
    <td>
      <button @click="vaciar">
        Vaciar todo
      </button>
    </td>
  </tr>
</template>

<style scoped>
tr {
  border-bottom: 0.065rem solid #ebebeb;
}

th,
td {
  padding: 1.25rem;
  color: #444;
}

button {
  font-weight: 600;
  padding: 0.5rem 2.5rem;
  color: #ffffff;
  background-color: #9e63c4;
  border: 0;
  cursor: pointer;
}

@media (max-width: 600px) {
  button {
    padding: 0.5rem .75rem;
  }
}
</style>
