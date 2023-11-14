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
    databaseVetStore.addVet(vet.value);
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <section>
    <form class="form" @submit.prevent="handleSubmit">
      <label class="form-title" for="add-email">Correo electrónico:</label>
      <input class="form-input" type="text" id="add-email" name="add-email" v-model="vet.email">

      <label class="form-title" for="add-name">Nombre:</label>
      <input class="form-input" type="text" id="add-name" name="add-name" v-model="vet.name">

      <label class="form-title" for="add-surname">Apellido:</label>
      <input class="form-input" type="text" id="add-surname" name="add-surname" v-model="vet.surname">

      <label class="form-title" for="add-cuit">C.U.I.T.:</label>
      <input class="form-input" type="text" id="add-cuit" name="add-cuit" v-model="vet.cuit">

      <label class="form-title" for="add-birthdate">Fecha de nacimiento:</label>
      <input class="form-input" type="date" id="add-birthdate" name="add-birthdate" v-model="vet.birthdate">

      <label class="form-title" for="add-phone">Teléfono:</label>
      <input class="form-input" type="text" id="add-phone" name="add-phone" v-model="vet.phone">

      <label class="form-title" for="add-address">Dirección:</label>
      <input class="form-input" type="text" id="add-address" name="add-address" v-model="vet.address">

      <label class="form-title" for="add-city">Ciudad:</label>
      <input class="form-input" type="text" id="add-city" name="add-city" v-model="vet.city">

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