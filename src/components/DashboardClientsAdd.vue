<script setup>
import { useDatabaseUserStore } from '@/stores/databaseUser';
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';

const databaseUserStore = useDatabaseUserStore();
const userStore = useUserStore();

const client = ref({
  email: '',
  name: '',
  surname: '',
  cuit: '',
  birthdate: '',
  phone: '',
  address: '',
  city: ''
})

const handleSubmit = () => {
  try {
    databaseUserStore.addClient(client.value).then(userStore.logoutUser());
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <section>
    <form @submit.prevent="handleSubmit">
      <label for="client-email">Correo electrónico:</label>
      <input type="text" id="client-email" name="client-email" v-model="client.email">

      <label for="client-name">Nombre:</label>
      <input type="text" id="client-name" name="client-name" v-model="client.name">

      <label for="client-surname">Apellido:</label>
      <input type="text" id="client-surname" name="client-surname" v-model="client.surname">

      <label for="client-cuit">C.U.I.T.:</label>
      <input type="text" id="client-cuit" name="client-cuit" v-model="client.cuit">

      <label for="client-birthdate">Fecha de nacimiento:</label>
      <input type="date" id="client-birthdate" name="client-birthdate" v-model="client.birthdate">

      <label for="client-phone">Teléfono:</label>
      <input type="text" id="client-phone" name="client-phone" v-model="client.phone">

      <label for="client-address">Dirección:</label>
      <input type="text" id="client-address" name="client-address" v-model="client.address">

      <label for="client-city">Ciudad:</label>
      <input type="text" id="client-city" name="client-city" v-model="client.city">

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