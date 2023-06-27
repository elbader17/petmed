<script setup>
import { useDatabaseUserStore } from '@/stores/databaseUser';
import { useDatabasePetStore } from '@/stores/databasePet';
import { useDatabaseClientPlanStore } from '@/stores/databaseClientPlan';
import { ref, onMounted } from 'vue';

const databaseUserStore = useDatabaseUserStore();
const databasePetStore = useDatabasePetStore();
const databaseClientPlanStore = useDatabaseClientPlanStore();

const props = defineProps(['plans']);

const options = ref([]);

onMounted(async () => {
  options.value = props.plans;
});

const pet = ref({
  name: '',
  birthdate: '',
  animal: '',
  breed: '',
  sex: '',
  color: '',
  plan: '',
  numAffiliate: '',
  client: null
})

const handleSubmit = () => {
  pet.value.client = databaseUserStore.client.id
  databasePetStore.addPet(pet.value);
  databaseClientPlanStore.addClientPlanPet(pet.value.client, databasePetStore.newPetRef, pet.value.name, pet.value.plan)
  pet.value.name = '';
  pet.value.birthdate = '';
  pet.value.animal = '';
  pet.value.breed = '';
  pet.value.sex = '';
  pet.value.color = '';
  pet.value.plan = '';
  pet.value.client = '';
}
</script>

<template>
  <section>
    <form class="form" @submit.prevent="handleSubmit">
      <label class="form-title" for="add-name">Nombre:</label>
      <input class="form-input" type="text" id="add-name" name="add-name" v-model="pet.name">

      <label class="form-title" for="add-birthday">Fecha de nacimiento:</label>
      <input class="form-input" type="date" id="add-birthday" name="add-birthday" v-model="pet.birthdate">

      <label class="form-title" for="add-animal">Tipo:</label>
      <input class="form-input" type="text" id="add-animal" name="add-animal" v-model="pet.animal">

      <label class="form-title" for="add-breed">Raza:</label>
      <input class="form-input" type="text" id="add-breed" name="add-breed" v-model="pet.breed">

      <label class="form-title" for="add-sex">Sexo:</label>
      <select class="form-input" id="add-sex" name="add-sex" v-model="pet.sex">
        <option value="Macho">Macho</option>
        <option value="Hembra">Hembra</option>
      </select>

      <label class="form-title" for="add-color">Color:</label>
      <input class="form-input" type="text" id="add-color" name="add-color" v-model="pet.color">

      <label class="form-title" for="add-plan">Plan:</label>
      <select class="form-input" id="add-plan" name="add-plan" v-model="pet.plan">
        <option v-for="option in options" :key="option" :value="option.plan">{{ option.plan }}</option>
      </select>

      <label class="form-title" for="add-numAffiliate">Número de afiliado:</label>
      <input class="form-input" type="text" id="add-numAffiliate" name="add-numAffiliate" v-model="pet.numAffiliate">

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