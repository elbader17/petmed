<script setup></script>

<template>
  <section class="dashboard-content">
    <router-view />
  </section>
</template>

<style scoped>
.dashboard-content {
  min-height: 83vh;
  flex: 1 1 0;
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.1);
  border-style: solid;
  border-width: 0.5rem 0rem;
  border-color: #3CBEB4;
}

/* @media all and (max-width: 768px) {
  .dashboard-content {
    padding-left: 6rem;
  }
} */
</style>