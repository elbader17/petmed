<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';

const email = ref('');
const password = ref('');

const userStore = useUserStore();

const handleSubmit = async() => {
  if(!email.value || password.value.length < 6) {
    return alert('Rellene el formulario');
  }
  await userStore.registerUser(email.value, password.value);
}
</script>

<template>
  <section>
    <h1>Register</h1>
    <form @submit.prevent="handleSubmit">
      <input type="email" v-model.trim="email" placeholder="Ingrese Email">
      <input type="password" v-model.trim="password" placeholder="Ingrese Password">
      <button type="submit" :disabled="userStore.loadingUser">Crear usuario</button>
    </form>
  </section>
</template>

<style scoped></style>