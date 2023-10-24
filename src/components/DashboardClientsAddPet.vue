<script setup>
import { useDatabaseUserStore } from '@/stores/databaseUser'
import { useDatabasePetStore } from '@/stores/databasePet'
import { onMounted, ref } from 'vue'

const props = defineProps(['item'])

const databasePetStore = useDatabasePetStore()

const client = ref({
  animal: '',
  birthdate: '',
  name: '',
  breed: '',
  color: '',
  numAfiliate: '',
  plan: '',
  registration_code: new Date().toLocaleDateString(),
  sex: '',
  client: props.item.id
})

const form = ref(true)

const handleSubmit = () => {
  databasePetStore.addPet(client.value)
  form.value = false
}
</script>

<template>
  <section>
    <form v-if="form" class="form" @submit.prevent="handleSubmit">
      <label class="form-title" for="name">Nombre:</label>
      <input class="form-input" type="text" id="name" name="name" v-model="client.name" />

      <label class="form-title" for="breed">Raza:</label>
      <input class="form-input" type="text" id="breed" name="breed" v-model="client.breed" />
      <label class="form-title" for="animal">Animal:</label>
      <input class="form-input" type="text" id="animal" name="animal" v-model="client.animal" />

      <label class="form-title" for="birthdate">Fecha de nacimiento:</label>
      <input
        class="form-input"
        type="Date"
        id="birthdate"
        name="birthdate"
        v-model="client.birthdate"
      />

      <label class="form-title" for="color">Color:</label>
      <input class="form-input" type="text" id="color" name="color" v-model="client.color" />

      <label class="form-title" for="numAfiliate">Numero de afiliado:</label>
      <input
        class="form-input"
        type="text"
        id="numAfiliate"
        name="numAfiliate"
        v-model="client.numAfiliate"
      />

      <label class="form-title" for="plan">Plan:</label>
      <select class="form-input" id="plan" name="plan" v-model="client.plan">
        <option value="Plan 1005">1005</option>
        <option value="Plan 2010">2010</option>
        <option value="Plan 3015">3015</option>
      </select>

      <label class="form-title" for="sex">Sexo:</label>
      <select class="form-input" id="sex" name="sex" v-model="client.sex">
        <option value="Macho">Macho</option>
        <option value="Hembra">Hembra</option>
      </select>

      <button class="form-button" type="submit">Agregar</button>
    </form>
    <div class="container-notification">
      <h1 v-if="!form" class="notification">Mascota agregada</h1>
    </div>
  </section>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
}
.notification {
  color: rgb(154, 14, 167);
  font-size: 1.5rem;
}
.container-notification {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;
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
