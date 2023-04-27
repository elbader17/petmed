<script setup>
import DashboardSidebar from '../components/DashboardSidebar.vue';
import DashboardContent from '../components/DashboardContent.vue';
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