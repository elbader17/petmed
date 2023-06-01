<script setup>
import { useDatabaseProvidersStore } from '@/stores/databaseProviders';
import { onMounted, ref } from 'vue';

const props = defineProps(['item']);

const databaseProvidersStore = useDatabaseProvidersStore();

const provider = ref({
  name: '',
  address: '',
  phone: '',
  city: '',
  specialty: ''
});

const handleSubmit = () => {
  databaseProvidersStore.updateProvider(props.item.id, provider.value);
}

onMounted(async () => {
  provider.value = props.item;
})
</script>

<template>
  <section>
    <form @submit.prevent="handleSubmit">
      <label for="name">Nombre:</label>
      <input type="text" id="name" name="name" v-model="provider.name">

      <label for="phone">Teléfono:</label>
      <input type="text" id="phone" name="phone" v-model="provider.phone">

      <label for="address">Dirección:</label>
      <input type="text" id="address" name="address" v-model="provider.address">

      <label for="city">Ciudad:</label>
      <input type="text" id="city" name="city" v-model="provider.city">

      <label for="specialty">Especialidad:</label>
      <input type="text" id="specialty" name="specialty" v-model="provider.specialty">

      <button type="submit">Editar</button>
    </form>
  </section>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

label {
  margin-top: 0.5rem;
}

button {
  padding: 0.65rem 1.25rem;
  margin: 1.25rem;
  border: none;
  border-radius: 1.25rem;
  font-size: 1rem;
  color: #fff;
  background-color: #8D57B0;
  cursor: pointer;
}
</style>