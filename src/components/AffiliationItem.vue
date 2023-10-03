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
    <td>{{ props.item.image }}</td>
    <td>{{ props.item.name }}</td>
    <td>${{ props.item.price }}</td>
    <td><input type="number" min="1" v-model="itemQuantity" @input="updateQuantity"></td>
    <td>${{ itemSubtotal }}</td>
    <td><font-awesome-icon icon="fa-solid fa-circle-xmark" size="lg" class="item-icon" /></td>
  </tr>
</template>

<style scoped>
tr {
  border-bottom: 0.065rem solid #ebebeb;
}

th,
td {
  padding: 1.25rem;
}

input {
  width: 3.631rem;
  text-align: center;
  min-height: 35px;
  padding: 0.3rem;
  border: 0.065rem solid #ebebeb;
}

.item-icon {
  color: #444;
}

.item-icon:hover {
  color: #9e63c4;
  cursor: pointer;
  transition: all 0.3s ease-out 0s;
}
</style>