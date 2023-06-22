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
    <form class="form" @submit.prevent="handleSubmit">
      <label class="form-title" for="add-name">Nombre:</label>
      <input class="form-input" type="text" id="add-name" name="add-name" v-model="provider.name">

      <label class="form-title" for="add-phone">Teléfono:</label>
      <input class="form-input" type="text" id="add-phone" name="add-phone" v-model="provider.phone">

      <label class="form-title" for="add-address">Dirección:</label>
      <input class="form-input" type="text" id="add-address" name="add-address" v-model="provider.address">

      <label class="form-title" for="add-city">Ciudad:</label>
      <input class="form-input" type="text" id="add-city" name="add-city" v-model="provider.city">

      <label class="form-title" for="add-specialty">Especialidad:</label>
      <input class="form-input" type="text" id="add-specialty" name="add-specialty" v-model="provider.specialty">

      <button class="form-button" type="submit">Agregar</button>
    </form>
  </section>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
}

.form-title {
  font-size: 1.15rem;
  line-height: 1.75rem;
  font-weight: 400;
  margin-top: 0.5rem;
}

.form-input {
  padding: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid #333333;
}

.form-button {
  padding: 0.5rem 1rem;
  margin: 1.25rem;
  border: none;
  border-radius: 1.25rem;
  font-size: 1rem;
  color: #fff;
  background-color: #8D57B0;
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

.form-button:hover {
  background-color: #794899;
}
</style>