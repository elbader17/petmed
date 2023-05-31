<script setup>
import { useDatabaseUserStore } from '@/stores/databaseUser';
import { ref } from 'vue';

const databaseUserStore = useDatabaseUserStore();

const client = ref({
  email: '',
  name: '',
  surname: '',
  cuit: '',
  birthdate: '',
  phone: '',
  address: '',
  city: '',
  type: 'client',
})

const handleSubmit = () => {
  databaseUserStore.addClient(client.value);
  client.value.email = '';
  client.value.name = '';
  client.value.surname = '';
  client.value.cuit = '';
  client.value.birthdate = '';
  client.value.phone = '';
  client.value.address = '';
  client.value.city = '';
  client.value.type = '';
}
</script>

<template>
  <section>
    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="Ingrese correo electrónico" v-model="client.email">
      <input type="text" placeholder="Ingrese el nombre" v-model="client.name">
      <input type="text" placeholder="Ingrese el apellido" v-model="client.surname">
      <input type="text" placeholder="Ingrese el CUIT" v-model="client.cuit">
      <input type="text" placeholder="Ingrese la fecha de nacimiento" v-model="client.birthdate">
      <input type="text" placeholder="Ingrese el teléfono" v-model="client.phone">
      <input type="text" placeholder="Ingrese la dirección" v-model="client.address">
      <input type="text" placeholder="Ingrese la ciudad" v-model="client.city">
      <input type="text" placeholder="Ingrese el tipo de cliente" v-model="client.type">
      <button type="submit">Agregar</button>
    </form>
  </section>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>