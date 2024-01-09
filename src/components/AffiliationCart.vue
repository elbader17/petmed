<script setup>
import { useDatabaseAffiliationStore } from '@/stores/databaseAffiliation';
import { loadMercadoPago } from "@mercadopago/sdk-js";
import { onBeforeMount } from 'vue';
import AffiliationItem from '@/components/AffiliationItem.vue';
import AffiliationFooter from '@/components/AffiliationFooter.vue';

const databaseAffiliationStore = useDatabaseAffiliationStore();

const MERCADOPAGO_ID = import.meta.env.VITE_APP_MERCADOPAGO_ID;
const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

let mp;

const initMercadoPago = async () => {
  await loadMercadoPago();
  mp = new window.MercadoPago(MERCADOPAGO_ID, { locale: 'es-AR' });
}

const checkout = async () => {

  const orderData = {
    title: 'Afiliación PetMed',
    quantity: Number(1),
    price: Number(databaseAffiliationStore.totalPrice)
  }

  try {
    const response = await fetch(SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    });

    const preference = await response.json();

    createCheckoutButton(preference.id);
  } catch (error) {
    console.error('Error during checkout:', error);
  }
}

const createCheckoutButton = async (preferenceId) => {
  const bricksBuilder = mp.bricks();

  const newContainer = document.createElement('div');
  newContainer.id = 'wallet_container';

  const oldContainer = document.getElementById('wallet_container');
  oldContainer.parentNode.replaceChild(newContainer, oldContainer);

  try {
    await bricksBuilder.create("wallet", "wallet_container", {
      initialization: {
        preferenceId: preferenceId,
      },
    });
  } catch (error) {
    console.error('Error creating checkout button:', error);
  }
}

onBeforeMount(async () => {
  await initMercadoPago();
});
</script>

<template>
  <div>
    <table class="table">
      <thead class="table-header">
        <tr>
          <th></th>
          <th>Producto</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Subtotal</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <th v-if="Object.keys(databaseAffiliationStore.cart).length === 0">
          No tienes ningún producto agregado
        </th>
        <AffiliationItem v-else v-for="item in databaseAffiliationStore.cart" :key="item.id" :item="item" />
      </tbody>
      <tfoot>
        <input type="text" placeholder="Código del cupón">
        <button>Aplicar cupón</button>
      </tfoot>
    </table>
    <div class="affiliation-total">
      <table class="table">
        <thead class="table-header">
          <tr>
            <td>Total del carrito</td>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <th v-if="Object.keys(databaseAffiliationStore.cart).length === 0">
            Tu carrito está vacío
          </th>
          <AffiliationFooter v-else />
        </tbody>
        <tfoot>
          <th>
            <button @click="checkout">Finalizar Compra</button>
            <div id="wallet_container"></div>
          </th>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<style scoped>
.table {
  margin-top: 2rem;
  border: 0.065rem solid #ebebeb;
  background-color: #fff;
  border-spacing: 0;
  border-collapse: collapse;
}

.table-header {
  background-color: #fbfbfb;
  border-bottom: 0.065rem solid #ebebeb;
  padding: 0.75rem 1rem;
}

th,
td {
  padding: 1.25rem;
  color: #444;
  ;
}

input {
  padding: .5em .75em;
  border: 0.065rem solid #ebebeb;
}

button {
  font-weight: 600;
  margin: 1.25rem;
  padding: 0.5rem 2.5rem;
  color: #ffffff;
  background-color: #9e63c4;
  border: 0;
  cursor: pointer;
}

.affiliation-total {
  display: flex;
  justify-content: flex-end;
}
</style>
