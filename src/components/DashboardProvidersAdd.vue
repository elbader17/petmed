<script setup>
import { useDatabaseProvidersStore } from '@/stores/databaseProviders';
import { ref } from 'vue';

const databaseProvidersStore = useDatabaseProvidersStore();

const provider = ref({
  name: '',
  address: '',
  phone: '',
  city: '',
  specialty: ''
})

const handleSubmit = () => {
  databaseProvidersStore.addProvider(provider.value);
  provider.value.name = ''; provider.value.address = ''; provider.value.dni = ''; provider.value.phone = ''; provider.value.city = ''; provider.value.specialty = '';
}
</script>

<template>
  <section>
    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="Ingrese el nombre" v-model="provider.name">
      <input type="text" placeholder="Ingrese la dirección" v-model="provider.address">
      <input type="text" placeholder="Ingrese el teléfono" v-model="provider.phone">
      <input type="text" placeholder="Ingrese la ciudad" v-model="provider.city">
      <input type="text" placeholder="Ingrese la especialidad" v-model="provider.specialty">
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