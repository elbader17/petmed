<script setup>
import { useDatabaseVetStore } from '@/stores/databaseVets';
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';

const databaseVetStore = useDatabaseVetStore();
const userStore = useUserStore();

const vet = ref({
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
    userStore.registerUser(vet.value.email, vet.value.cuit);
  } catch (error) {
    console.log(error);
  }

  try {
    databaseVetStore.addVet(vet.value, userStore.newUser.uid);
  } catch (error) {
    console.log(error);
  }

  vet.value.email = '';
  vet.value.name = '';
  vet.value.surname = '';
  vet.value.cuit = '';
  vet.value.birthdate = '';
  vet.value.phone = '';
  vet.value.address = '';
  vet.value.city = '';
}
</script>

<template>
  <section>
    <form @submit.prevent="handleSubmit">
      <label for="add-email">Correo electrónico:</label>
      <input type="text" id="add-email" name="add-email" v-model="vet.email">

      <label for="add-name">Nombre:</label>
      <input type="text" id="add-name" name="add-name" v-model="vet.name">

      <label for="add-surname">Apellido:</label>
      <input type="text" id="add-surname" name="add-surname" v-model="vet.surname">

      <label for="add-cuit">C.U.I.T.:</label>
      <input type="text" id="add-cuit" name="add-cuit" v-model="vet.cuit">

      <label for="add-birthdate">Fecha de nacimiento:</label>
      <input type="date" id="add-birthdate" name="add-birthdate" v-model="vet.birthdate">

      <label for="add-phone">Teléfono:</label>
      <input type="text" id="add-phone" name="add-phone" v-model="vet.phone">

      <label for="add-address">Dirección:</label>
      <input type="text" id="add-address" name="add-address" v-model="vet.address">

      <label for="add-city">Ciudad:</label>
      <input type="text" id="add-city" name="add-city" v-model="vet.city">

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