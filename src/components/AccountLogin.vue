<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import ElipsisLoading from './icons/ElipsisLoading.vue';

const userStore = useUserStore();

const emit = defineEmits(['closeModal', 'toggle']);

const email = ref('');
const password = ref('');
const errMsg = ref();

const handleSubmit = async () => {
  if (!email.value) {
    return alert('Rellene el formulario');
  }
  await userStore.loginUser(email.value, password.value);
  errMsg.value = userStore.errorMessage;
  if (!errMsg.value) {
    emit('closeModal');
  }
}
</script>

<template>
  <section>
    <form class="form" @submit.prevent="handleSubmit">
      <p class="form-title">Ingrese a su cuenta</p>
      <input class="form-input" type="email" v-model.trim="email" placeholder="Ingrese el correo">
      <input class="form-input" type="password" v-model.trim="password" placeholder="Ingrese la contraseña">
      <p class="form-error" v-if="errMsg">{{ errMsg }}</p>
      <button class="form-button" type="submit" :disabled="userStore.loadingUser">
        <ElipsisLoading v-if="userStore.loadingUser" />
        <p v-else>Acceder</p>
      </button>
      <p class="password-question">Te has olvidado de la contraseña?</p>
      <p class="password-link" @click="emit('toggle')">Recuperar la contraseña</p>
    </form>
  </section>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-title {
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 600;
  text-align: center;
  padding: 0.75rem;
}

.input-container {
  position: relative;
}

.form-input,
.form-button {
  outline: none;
  border: 1px solid #e5e7eb;
  margin: 8px 0;
}

.form-input {
  background-color: #fff;
  padding: 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  width: 100%;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.form-error {
  color: #F14313;
}

.form-button {
  display: block;
  padding: 0.75rem 1.25rem;
  background-color: #8D57B0;
  color: #fff;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  width: 100%;
  border-radius: 0.5rem;
  text-transform: uppercase;
  cursor: pointer;
}

.form-button:hover {
  background-color: #794899;
}

.form-button:disabled {
  cursor: auto;
  background-color: #794899;
}

.password-question {
  color: #6B7280;
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-align: center;
}

.password-link {
  color: #794899;
  text-decoration: underline;
  cursor: pointer;
}
</style>