<script setup>
import { ref } from 'vue';
import { useDatabaseAffiliationStore } from '@/stores/databaseAffiliation'

const databaseAffiliationStore = useDatabaseAffiliationStore()

const props = defineProps(['item'])

const itemQuantity = ref(props.item.quantity);
const itemSubtotal = ref(props.item.price * itemQuantity.value);

const updateQuantity = (event) => {
  databaseAffiliationStore.cart[props.item.id].quantity = event.target.value;
  itemSubtotal.value = props.item.price * itemQuantity.value;
}
</script>

<template>
  <tr>
    <th>{{ props.item.id }}</th>
    <td>{{ props.item.image }}</td>
    <td>{{ props.item.name }}</td>
    <td>${{ props.item.price }}</td>
    <td><input type="number" min="1" v-model="itemQuantity" @input="updateQuantity"></td>
    <td>${{ itemSubtotal }}</td>
  </tr>
</template>