<script setup>
import { useDatabaseUserStore } from '@/stores/databaseUser';
import { onMounted, ref } from 'vue';

const props = defineProps(['item']);

const databaseUserStore = useDatabaseUserStore();

const client = ref({
  email: '',
  name: '',
  surname: '',
  cuit: '',
  birthdate: '',
  phone: '',
  address: '',
  city: ''
});

const handleSubmit = () => {
  databaseUserStore.updateClient(props.item.id, client.value);
}

onMounted(async () => {
  client.value = props.item;
})
</script>

<template>
  <section>
    <form class="form" @submit.prevent="handleSubmit">
      <label class="form-title" for="edit-email">Correo electrónico:</label>
      <input class="form-input" type="text" id="edit-email" name="edit-email" v-model="client.email">

      <label class="form-title" for="edit-name">Nombre:</label>
      <input class="form-input" type="text" id="edit-name" name="edit-name" v-model="client.name">

      <label class="form-title" for="edit-surname">Apellido:</label>
      <input class="form-input" type="text" id="edit-surname" name="edit-surname" v-model="client.surname">

      <label class="form-title" for="edit-cuit">C.U.I.T.:</label>
      <input class="form-input" type="text" id="edit-cuit" name="edit-cuit" v-model="client.cuit">

      <label class="form-title" for="edit-birthdate">Fecha de nacimiento:</label>
      <input class="form-input" type="text" id="edit-birthdate" name="edit-birthdate" v-model="client.birthdate">

      <label class="form-title" for="edit-phone">Teléfono:</label>
      <input class="form-input" type="text" id="edit-phone" name="edit-phone" v-model="client.phone">

      <label class="form-title" for="edit-address">Dirección:</label>
      <input class="form-input" type="text" id="edit-address" name="edit-address" v-model="client.address">

      <label class="form-title" for="edit-city">Ciudad:</label>
      <input class="form-input" type="text" id="edit-city" name="edit-city" v-model="client.city">

      <button class="form-button" type="submit">Editar</button>
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