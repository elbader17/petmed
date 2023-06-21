<script setup>
import { useDatabaseVetStore } from '@/stores/databaseVets';
import { onMounted, ref } from 'vue';

const props = defineProps(['item']);

const databaseVetStore = useDatabaseVetStore();

const vet = ref({
  name: '',
  surname: '',
  cuit: '',
  birthdate: '',
  phone: '',
  address: '',
  city: ''
});

const handleSubmit = () => {
  databaseVetStore.updateVet(props.item.id, vet.value);
}

onMounted(async () => {
  vet.value = props.item;
})
</script>

<template>
  <section>
    <form @submit.prevent="handleSubmit">
      <label for="email">Correo electrónico:</label>
      <input type="text" id="email" name="email" v-model="vet.email">

      <label for="name">Nombre:</label>
      <input type="text" id="name" name="name" v-model="vet.name">

      <label for="surname">Apellido:</label>
      <input type="text" id="surname" name="surname" v-model="vet.surname">

      <label for="cuit">C.U.I.T.:</label>
      <input type="text" id="cuit" name="cuit" v-model="vet.cuit">

      <label for="birthdate">Fecha de nacimiento:</label>
      <input type="date" id="birthdate" name="birthdate" v-model="vet.birthdate">

      <label for="phone">Teléfono:</label>
      <input type="text" id="phone" name="phone" v-model="vet.phone">

      <label for="address">Dirección:</label>
      <input type="text" id="address" name="address" v-model="vet.address">

      <label for="city">Ciudad:</label>
      <input type="text" id="city" name="city" v-model="vet.city">

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