<script setup>
import { useDatabaseUserStore } from '@/stores/databaseUser'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'

const databaseUserStore = useDatabaseUserStore()
const userStore = useUserStore()

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

const resetForm = () => {
  client.value = {
    email: '',
    name: '',
    surname: '',
    cuit: '',
    birthdate: '',
    phone: '',
    address: '',
    city: ''
  }
}

const handleSubmit = () => {
  try {
    databaseUserStore.addClient(client.value).then(() => {
      // userStore.logoutUser(false)
      resetForm()
    })
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <section>
    <form class="form" @submit.prevent="handleSubmit">
      <label class="form-title" for="add-email">Correo electrónico:</label>
      <input
        class="form-input"
        type="text"
        id="add-email"
        name="add-email"
        v-model="client.email"
      />

      <label class="form-title" for="add-name">Nombre:</label>
      <input class="form-input" type="text" id="add-name" name="add-name" v-model="client.name" />

      <label class="form-title" for="add-surname">Apellido:</label>
      <input
        class="form-input"
        type="text"
        id="add-surname"
        name="add-surname"
        v-model="client.surname"
      />

      <label class="form-title" for="add-cuit">C.U.I.T.:</label>
      <input class="form-input" type="text" id="add-cuit" name="add-cuit" v-model="client.cuit" />

      <label class="form-title" for="add-birthdate">Fecha de nacimiento:</label>
      <input
        class="form-input"
        type="date"
        id="add-birthdate"
        name="add-birthdate"
        v-model="client.birthdate"
      />

      <label class="form-title" for="add-phone">Teléfono:</label>
      <input
        class="form-input"
        type="text"
        id="add-phone"
        name="add-phone"
        v-model="client.phone"
      />

      <label class="form-title" for="add-address">Dirección:</label>
      <input
        class="form-input"
        type="text"
        id="add-address"
        name="add-address"
        v-model="client.address"
      />

      <label class="form-title" for="add-city">Ciudad:</label>
      <input class="form-input" type="text" id="add-city" name="add-city" v-model="client.city" />

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
  background-color: #8d57b0;
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

.form-button:hover {
  background-color: #794899;
}
</style>
