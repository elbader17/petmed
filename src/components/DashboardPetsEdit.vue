<script setup>
import { useDatabasePetStore } from '@/stores/databasePet';
import { onMounted, ref } from 'vue';

const props = defineProps(['item', 'plans']);

const databasePetStore = useDatabasePetStore();

const options = ref([]);

onMounted(async () => {
  options.value = props.plans;
  pet.value = props.item;
});

const pet = ref({
  client: '',
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
  databasePetStore.updatePet(props.item.id, pet.value);
}
</script>

<template>
  <section>
    <form class="form" @submit.prevent="handleSubmit">
      <label class="form-title" for="edit-name">Nombre:</label>
      <input class="form-input" type="text" id="edit-name" name="edit-name" v-model="pet.name">

      <label class="form-title" for="edit-birthday">Fecha de nacimiento:</label>
      <input class="form-input" type="date" id="edit-birthday" name="edit-birthday" v-model="pet.birthdate">

      <label class="form-title" for="edit-animal">Tipo:</label>
      <input class="form-input" type="text" id="edit-animal" name="edit-animal" v-model="pet.animal">

      <label class="form-title" for="edit-breed">Raza:</label>
      <input class="form-input" type="text" id="edit-breed" name="edit-breed" v-model="pet.breed">

      <label class="form-title" for="edit-sex">Sexo:</label>
      <select class="form-input" id="edit-sex" name="edit-sex" v-model="pet.sex">
        <option value="Macho">Macho</option>
        <option value="Hembra">Hembra</option>
      </select>

      <label class="form-title" for="edit-color">Color:</label>
      <input class="form-input" type="text" id="edit-color" name="edit-color" v-model="pet.color">

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