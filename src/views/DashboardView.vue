<script setup>
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import DashboardSidebar from '../components/DashboardSidebar.vue';
import DashboardContent from '../components/DashboardContent.vue';

onAuthStateChanged(auth, user => {
  console.log(user);
})
</script>

<template>
  <section class="dashboard">
    <DashboardSidebar />
    <DashboardContent />
  </section>
</template>

<style scoped>
.dashboard {
  display: flex;
}
</style>