<script setup>
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
</script>

<template>
  <section class="dashboard-clients">
    <h1>Home</h1>
    <p>{{ userStore.userData?.email }}</p>
  </section>
</template>

<style scoped></style>