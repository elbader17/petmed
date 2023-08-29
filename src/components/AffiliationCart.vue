<script setup>
import { useDatabaseAffiliationStore } from '@/stores/databaseAffiliation'
import AffiliationItem from './AffiliationItem.vue';
import AffiliationFooter from './AffiliationFooter.vue';

const databaseAffiliationStore = useDatabaseAffiliationStore()
</script>

<template>
  <div>
    <table class="table">
      <thead class="table-header">
        <th></th>
        <th></th>
        <th>Producto</th>
        <th>Precio</th>
        <th>Cantidad</th>
        <th>Subtotal</th>
      </thead>
      <tbody>
        <AffiliationItem v-for="item in databaseAffiliationStore.cart" :key="item.id" :item="item" />
      </tbody>
      <tfoot>
        <button>Aplicar cupón</button>
      </tfoot>
    </table>

    <table class="table">
      <thead class="table-header">
        <th>Total del carrito</th>
      </thead>
      <tbody>
        <th v-if="Object.keys(databaseAffiliationStore.cart).length === 0">Tu carrito está vacío</th>
        <AffiliationFooter v-else />
      </tbody>
      <tfoot>
        <button>Finalizar compra</button>
      </tfoot>
    </table>
  </div>
</template>

<style scoped>
.table {
  border: 1px solid #ebebeb;
  border-radius: 10%;

}

.table-header {
  background-color: #fbfbfb;
  border: 1px solid rgba(0, 0, 0, .1);
  margin: 0 -1px 24px 0;
  text-align: left;
  width: 100%;
  border-collapse: separate;
  border-radius: 5px;
}
</style>