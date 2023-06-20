<script setup>
import { useUserStore } from '@/stores/user';
import { useDatabaseUserStore } from '@/stores/databaseUser';
import { onMounted } from 'vue';
import { auth } from '@/firebaseConfig';

const userStore = useUserStore();
const databaseUserStore = useDatabaseUserStore();

onMounted(async () => {
  try {
    databaseUserStore.readClient(auth.currentUser.uid);
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <section class="dashboard-clients">
    <h1 class="clients-title">Home</h1>
    <p>Usted se ha iniciado sección con el correo:</p>
    <p>{{ userStore.userData?.email }}</p>
  </section>
</template>

<style scoped>
.dashboard-clients {
  display: flex;
  flex-direction: column;
  max-width: 860px;
  margin: 0 auto;
}

.clients-title {
  padding: 0.5rem;
  font-weight: 700;
  font-size: 1.75rem;
}
</style>