<script setup>
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';

const userStore = useUserStore();
const code = ref([]);

const handleSubmit = (async () => {
  try {
    userStore.createCode();
    code.value = Array.from(String(userStore.userCode));
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <section class="dashboard-code">
    <h1 class="code-title">Generar Código</h1>
    <form class="code-form" @submit.prevent="handleSubmit">
      <div class="code-box">
        <input class="input" type="text" v-model="code[0]">
        <input class="input" type="text" v-model="code[1]">
        <input class="input" type="text" v-model="code[2]">
        <input class="input" type="text" v-model="code[3]">
        <input class="input" type="text" v-model="code[4]">
        <input class="input" type="text" v-model="code[5]">
      </div>
      <p class="remember">Recuerda guardar bien el código</p>
      <button class="form-button" type="submit">Generar</button>
    </form>
  </section>
</template>

<style scoped>
.dashboard-code {
  display: flex;
  flex-direction: column;
  max-width: 860px;
  margin: 0 auto;
}

.code-title {
  padding: 0.5rem;
  font-weight: 700;
  font-size: 1.75rem;
  margin-bottom: 3rem;
}

.code-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  width: 380px;
  height: 280px;
  border-radius: 15px;
  background-color: white;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  transition: .4s ease-in-out;
}

.code-form:hover {
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
  scale: 0.99;
}

.code-box {
  margin: 3rem auto;
}

.input {
  position: relative;
  width: 3em;
  margin: 0 0.5rem;
  padding: 1rem;
  font-weight: 700;
  border-radius: 5px;
  border: none;
  outline: none;
  background-color: rgb(235, 235, 235);
  box-shadow: inset 3px 3px 6px #d1d1d1,
    inset -3px -3px 6px #ffffff;
}

.input:hover {
  box-shadow: inset 0px 0px 0px #d1d1d1,
    inset 0px 0px 0px #ffffff;
  background-color: lightgrey;
}

.input:focus {
  box-shadow: inset 0px 0px 0px #d1d1d1,
    inset 0px 0px 0px #ffffff;
  background-color: lightgrey;
}

.form-button {
  padding: 0.5rem 1rem;
  margin: 1.25rem;
  width: 80%;
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

@media all and (max-width: 768px) {
  .code-form {
    justify-content: center;
    width: 280px;
    height: 240px;
  }

  .input {
    margin: 0 0.15rem;
  }
}
</style>