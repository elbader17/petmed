<script setup>
import { ref } from 'vue'
import { useDatabaseVetStore } from '@/stores/databaseVets'
import ModalReusable from '../components/ModalReusable.vue'

const code = ref('')
const practices = ref([])
const practicesData = ref([])
const toggleModal = () => {
  openModal.value = !openModal.value
}

const openModal = ref(false)
const databaseVetStore = useDatabaseVetStore()

const sendCode = async () => {
  const response = await databaseVetStore.validateCode(code.value)
  practices.value = response.practices
  practicesData.value = response.plan.practices
  console.log("🚀 ~ file: Authorization.vue:20 ~ sendCode ~ practicesData:", practicesData.value)
  toggleModal()
}
</script>

<template>
  <form>
    <section>
      <h2 for="">Numero de afiliado</h2>
      <input type="number" v-model="code" class="inputCode" id="" name="" />
    </section>
    <ModalReusable @closeModal="toggleModal" :modalActive="openModal">
      <div v-for="(practice, index) in practices" :key="index">
        <p>{{ practice }}: {{ practicesData[index].amount }} | cobertura {{ practicesData[index].coverage }}% </p>
      </div>
    </ModalReusable>
    <input type="button" class="buttonVerificar" value="Solicitar" @click="sendCode" />
  </form>
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 20px;
}

h1 {
  text-align: center;
}

.buttonVerificar {
  background-color: #9e63c4;
  color: #ffffff;
  padding: 10px 20px;
  margin: 20px;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  float: right;
}

form {
  max-width: 600px;
  margin: 0 auto;
}

section {
  margin-bottom: 20px;
}

h2 {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type='number'],
textarea {
  width: 100%;
  height: 50px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  text-align: center;
  font-size: 20px;
}

input[type='text'],
input[type='date'],
textarea {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

input[type='checkbox'] {
  display: inline;
  margin-right: 5px;
}

input[type='submit'] {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type='submit']:hover {
  background-color: #45a049;
}

textarea {
  height: 100px;
}
</style>
