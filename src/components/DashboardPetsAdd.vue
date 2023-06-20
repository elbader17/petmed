<script setup>
import { useDatabasePetStore } from '@/stores/databasePet';
import { ref } from 'vue';

const databasePetStore = useDatabasePetStore();

const pet = ref({
  name: '',
  birthdate: '',
  animal: '',
  breed: '',
  sex: '',
  color: '',
  plan: '',
  numAffiliate: '',
})

const handleSubmit = () => {
  databasePetStore.addPet(pet.value);
  pet.value.name = '';
  pet.value.birthdate = '';
  pet.value.animal = '';
  pet.value.breed = '';
  pet.value.sex = '';
  pet.value.color = '';
  pet.value.plan = '';
  pet.value.numAffiliate = '';
}
</script>

<template>
  <section>
    <form @submit.prevent="handleSubmit">
      <label for="name">Nombre:</label>
      <input type="text" id="name" name="name" v-model="pet.name">

      <label for="birthday">Fecha de nacimiento:</label>
      <input type="date" id="birthday" name="birthday" v-model="pet.birthdate">

      <label for="animal">Tipo:</label>
      <input type="text" id="animal" name="animal" v-model="pet.animal">

      <label for="breed">Raza:</label>
      <input type="text" id="breed" name="breed" v-model="pet.breed">

      <label for="sex">Sexo:</label>
      <input type="text" id="sex" name="sex" v-model="pet.sex">

      <label for="color">Color:</label>
      <input type="text" id="color" name="color" v-model="pet.color">

      <label for="plan">Plan:</label>
      <input type="text" id="plan" name="plan" v-model="pet.plan">

      <label for="numAffiliate">Número de afiliado:</label>
      <input type="text" id="numAffiliate" name="numAffiliate" v-model="pet.numAffiliate">

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