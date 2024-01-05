<script setup>
import { useDatabaseAffiliationStore } from '@/stores/databaseAffiliation';
import { loadMercadoPago } from "@mercadopago/sdk-js";
import AffiliationItem from './AffiliationItem.vue';
import AffiliationFooter from './AffiliationFooter.vue';

const databaseAffiliationStore = useDatabaseAffiliationStore();

const initMercadoPago = async () => {
  await loadMercadoPago();
  const mp = new window.MercadoPago('TEST-cbd9ce79-f60c-4933-b05f-ea930c3f7c8f', { locale: 'es-AR' });

  document.getElementById('checkout-btn').addEventListener('click', async () => {

    const orderData = {
      title: 'Afiliación PetMed',
      quantity: Number(1),
      price: Number(databaseAffiliationStore.totalPrice)
    }

    const response = await fetch('http://localhost:8082/create_preference', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    });

    const preference = await response.json();

    createCheckoutButton(preference.id);

  });

  const createCheckoutButton = (preferenceId) => {
    const bricksBuilder = mp.bricks();

    const renderComponent = async () => {
      if (window.checkoutButton) window.checkoutButton.unmount();
      await bricksBuilder.create("wallet", "wallet_container", {
        initialization: {
          preferenceId: preferenceId,
        },
      });
    };
    renderComponent();
  };
}

initMercadoPago();
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
        <AffiliationItem v-for="item in databaseAffiliationStore.cart" :key="item.id" :item="item" />
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
          <button id="checkout-btn">Pagar con Mercado Pago</button>
          <div id="wallet_container"></div>
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
