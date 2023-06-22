<script setup>
import { useDatabasePlansStore } from '@/stores/databasePlans';
import { onMounted, ref } from 'vue';

const props = defineProps(['item']);

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
});

const handleSubmit = () => {
  databasePlansStore.updatePlan(props.item.id, plan.value);
}

onMounted(async () => {
  plan.value = props.item;
})
</script>

<template>
  <section>
    <form class="form" @submit.prevent="handleSubmit">
      <label class="form-title" for="adit-name">Nombre:</label>
      <input class="form-input" type="text" id="adit-name" name="adit-name" v-model="plan.name">

      <label class="form-title" for="adit-birthday">Fecha de nacimiento:</label>
      <input class="form-input" type="date" id="adit-birthday" name="adit-birthday" v-model="plan.birthdate">

      <label class="form-title" for="adit-animal">Tipo:</label>
      <input class="form-input" type="text" id="adit-animal" name="adit-animal" v-model="plan.animal">

      <label class="form-title" for="adit-breed">Raza:</label>
      <input class="form-input" type="text" id="adit-breed" name="adit-breed" v-model="plan.breed">

      <label class="form-title" for="adit-sex">Sexo:</label>
      <select class="form-input" id="adit-sex" name="adit-sex">
        <option value="Macho">Macho</option>
        <option value="Hembra">Hembra</option>
      </select>

      <label class="form-title" for="adit-color">Color:</label>
      <input class="form-input" type="text" id="adit-color" name="adit-color" v-model="plan.color">

      <label class="form-title" for="adit-plan">Plan:</label>
      <select class="form-input" id="adit-plan" name="adit-plan">
        <option value="1005">1005</option>
        <option value="2010">2010</option>
        <option value="3015">3015</option>
      </select>

      <label class="form-title" for="adit-numAffiliate">Número de afiliado:</label>
      <input class="form-input" type="text" id="adit-numAffiliate" name="adit-numAffiliate" v-model="plan.numAffiliate">

      <button class="form-button" type="submit">Editar</button>
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