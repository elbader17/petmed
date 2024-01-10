<script setup>
import { onBeforeMount, watch, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useDatabaseAffiliationStore } from '@/stores/databaseAffiliation';
import { loadMercadoPago } from "@mercadopago/sdk-js";
import AffiliationItem from '@/components/AffiliationItem.vue';
import AffiliationFooter from '@/components/AffiliationFooter.vue';

const databaseAffiliationStore = useDatabaseAffiliationStore();

const MERCADOPAGO_ID = import.meta.env.VITE_APP_MERCADOPAGO_ID;
const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

let mp;
const paymentMethod = ref('MercadoPago');
const isMercadoPagoLoaded = ref(false);
const router = useRouter();

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

    switchMPLoaded();
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

const handlePayment = async () => {
  if (paymentMethod.value === 'MercadoPago') {
    await checkout();
  } else if (paymentMethod.value === 'Cash') {
    router.push({ name: 'afiliacion-usuario' });
  }
}

const switchMPLoaded = () => {
  return isMercadoPagoLoaded.value = !isMercadoPagoLoaded.value;
}

watch(() => databaseAffiliationStore.totalPrice, () => {
  const walletContainer = document.getElementById('wallet_container');
  if (walletContainer) {
    walletContainer.innerHTML = '';
    switchMPLoaded();
  }
});

onBeforeMount(async () => {
  await initMercadoPago();
});
</script>

<template>
  <div>
    <table class="table-list">
      <thead class="table-header">
        <tr>
          <th class="column-producto" colspan="2">Producto</th>
          <th class="column-precio">Precio</th>
          <th class="column-cantidad">Cantidad</th>
          <th class="column-subtotal">Subtotal</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="Object.keys(databaseAffiliationStore.cart).length === 0">
          <td colspan="6">No tienes ningún producto agregado</td>
        </tr>
        <AffiliationItem v-else v-for="item in databaseAffiliationStore.cart" v-bind:key="item.id" v-bind:item="item" />
      </tbody>
      <tfoot>
        <tr>
          <td colspan="6">
            <div class="table-cupon">
              <input type="text" v-model="couponCode" placeholder="Código del cupón">
              <button>Aplicar cupón</button>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
    <table class="table-checkout small-table">
      <thead class="table-header">
        <tr>
          <td colspan="3">Total del carrito</td>
        </tr>
      </thead>
      <tbody>
        <tr v-if="Object.keys(databaseAffiliationStore.cart).length === 0">
          <td colspan="3">Tu carrito está vacío</td>
        </tr>
        <AffiliationFooter v-else v-bind:cart="databaseAffiliationStore.cart" />
      </tbody>
      <tfoot v-if="Object.keys(databaseAffiliationStore.cart).length !== 0">
        <tr v-if="!isMercadoPagoLoaded">
          <th>
            <div class="table-payment">
              <div class="table-payment-select">
                <input type="radio" id="cash" value="Cash" name="payment" v-model="paymentMethod">
                <label for="cash">Efectivo</label>
              </div>
              <div class="table-payment-select">
                <input type="radio" id="mercadopago" value="MercadoPago" name="payment" checked v-model="paymentMethod">
                <label for="mercadopago">Mercado Pago</label>
              </div>
            </div>
          </th>
          <td colspan="2">
            <button @click="handlePayment">Finalizar Compra</button>
          </td>
        </tr>

        <tr>
          <td colspan="3">
            <div id="wallet_container"></div>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<style scoped>
.table-list,
.table-checkout {
  margin-top: 2rem;
  margin-bottom: 2rem;
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

.table-cupon {
  display: flex;
  align-items: flex-start;
}

.table-payment {
  display: flex;
  flex-direction: row;
  font-weight: 300;
}

.table-payment-select {
  margin-left: 1rem;
}

th,
td {
  padding: 1.25rem;
  color: #444;
}

input {
  margin-right: .5rem;
  padding: .5em .75em;
  border: 0.065rem solid #ebebeb;
}

button {
  font-weight: 600;
  padding: 0.5rem 2.5rem;
  color: #ffffff;
  background-color: #9e63c4;
  border: 0;
  cursor: pointer;
}

@media (min-width: 601px) {
  .small-table {
    width: 50%;
    float: right;
  }
}

@media (max-width: 600px) {
  .table-list {
    width: 100%;
    display: block;
  }

  .table-payment {
    flex-direction: column;
    align-items: start;
  }

  .table-list thead {
    display: none;
  }

  .table-list tr {
    display: block;
    margin-bottom: 10px;
  }

  .table-list td {
    display: block;
    text-align: right;
  }

  .table-list td::before {
    content: attr(data-label);
    float: left;
    text-transform: uppercase;
    font-weight: bold;
  }

  .table-list td:last-child {
    border-bottom: 2px solid #ddd;
  }

  button {
    padding: 0.5rem .75rem;
  }
}
</style>
