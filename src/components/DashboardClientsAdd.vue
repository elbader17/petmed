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
      <label for="email">Correo electrónico:</label>
      <input type="text" id="email" name="email" v-model="client.email">

      <label for="name">Nombre:</label>
      <input type="text" id="name" name="name" v-model="client.name">

      <label for="surname">Apellido:</label>
      <input type="text" id="surname" name="surname" v-model="client.surname">

      <label for="cuit">C.U.I.T.:</label>
      <input type="text" id="cuit" name="cuit" v-model="client.cuit">

      <label for="birthdate">Fecha de nacimiento:</label>
      <input type="date" id="birthdate" name="birthdate" v-model="client.birthdate">

      <label for="phone">Teléfono:</label>
      <input type="text" id="phone" name="phone" v-model="client.phone">

      <label for="address">Dirección:</label>
      <input type="text" id="address" name="address" v-model="client.address">

      <label for="city">Ciudad:</label>
      <input type="text" id="city" name="city" v-model="client.city">

      <label for="type">Tipo de usuario:</label>
      <input type="text" id="type" name="type" v-model="client.type">

      <button type="submit">Agregar</button>
    </form>
  </section>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  padding: 0.25rem;
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