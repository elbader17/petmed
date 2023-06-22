<script setup>
import { useDatabasePlansStore } from '@/stores/databasePlans';
import { ref } from 'vue';

const databasePlansStore = useDatabasePlansStore();

const plan = ref({
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
  databasePlansStore.addPlan(plan.value);
  plan.value.name = '';
  plan.value.birthdate = '';
  plan.value.animal = '';
  plan.value.breed = '';
  plan.value.sex = '';
  plan.value.color = '';
  plan.value.plan = '';
  plan.value.numAffiliate = '';
}
</script>

<template>
  <section>
    <form class="form" @submit.prevent="handleSubmit">
      <label class="form-title" for="add-name">Nombre:</label>
      <input class="form-input" type="text" id="add-name" name="add-name" v-model="plan.name">

      <label class="form-title" for="add-birthday">Fecha de nacimiento:</label>
      <input class="form-input" type="date" id="add-birthday" name="add-birthday" v-model="plan.birthdate">

      <label class="form-title" for="add-animal">Tipo:</label>
      <input class="form-input" type="text" id="add-animal" name="add-animal" v-model="plan.animal">

      <label class="form-title" for="add-breed">Raza:</label>
      <input class="form-input" type="text" id="add-breed" name="add-breed" v-model="plan.breed">

      <label class="form-title" for="add-sex">Sexo:</label>
      <select class="form-input" id="add-sex" name="add-sex">
        <option value="Macho">Macho</option>
        <option value="Hembra">Hembra</option>
      </select>

      <label class="form-title" for="add-color">Color:</label>
      <input class="form-input" type="text" id="add-color" name="add-color" v-model="plan.color">

      <label class="form-title" for="add-plan">Plan:</label>
      <select class="form-input" id="add-plan" name="add-plan">
        <option value="1005">1005</option>
        <option value="2010">2010</option>
        <option value="3015">3015</option>
      </select>

      <label class="form-title" for="add-numAffiliate">Número de afiliado:</label>
      <input class="form-input" type="text" id="add-numAffiliate" name="add-numAffiliate" v-model="plan.numAffiliate">

      <button class="form-button" type="submit">Agregar</button>
    </form>
  </section>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  padding: 0.25rem;
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