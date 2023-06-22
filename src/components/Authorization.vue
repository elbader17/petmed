<script setup>
import { ref, onMounted, toRaw } from 'vue'
import { useUserStore } from '@/stores/user'
import { useDatabaseVetStore } from '@/stores/databaseVets'
const validate = ref({})

const databaseUserStore = useUserStore()
const databaseVetStore = useDatabaseVetStore()
</script>

<template>
  <form>
    <section>
      <h2 for="">Numero de afiliado</h2>
      <input type="number" class="inputCode" id="" name="" />
    </section>

    <section></section>

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
