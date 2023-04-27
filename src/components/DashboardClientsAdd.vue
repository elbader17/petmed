<script setup>
import { useDatabaseStore } from '@/stores/database';
import { ref } from 'vue';

const databaseStore = useDatabaseStore();

const client = ref({
  name: '',
  surname: '',
  dni: '',
  birthdate: '',
  phone: '',
  address: '',
  city: ''
})

const handleSubmit = () => {
  databaseStore.addClient(client.value.name, client.value.surname, client.value.dni, client.value.birthdate, client.value.phone, client.value.address, client.value.city);
  client.value.name = ''; client.value.surname = ''; client.value.dni = ''; client.value.birthdate = ''; client.value.phone = ''; client.value.address = ''; client.value.city = '';
}
</script>

<template>
  <section>
    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="Ingrese el nombre" v-model="client.name">
      <input type="text" placeholder="Ingrese el apellido" v-model="client.surname">
      <input type="text" placeholder="Ingrese el DNI" v-model="client.dni">
      <input type="text" placeholder="Ingrese la fecha de nacimiento" v-model="client.birthdate">
      <input type="text" placeholder="Ingrese el teléfono" v-model="client.phone">
      <input type="text" placeholder="Ingrese la dirección" v-model="client.address">
      <input type="text" placeholder="Ingrese la ciudad" v-model="client.city">
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