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
  await userStore.loginUser(email.value, password.value);
}
</script>

<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleSubmit">
      <input type="email" v-model.trim="email" placeholder="Ingrese Email">
      <input type="password" v-model.trim="password" placeholder="Ingrese Password">
      <button type="submit" :disabled="userStore.loadingUser">Acceder</button>
    </form>
  </div>
</template>

<style scoped></style>