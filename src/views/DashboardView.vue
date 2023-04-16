<script setup>
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebaseConfig';

onAuthStateChanged(auth, user => {
  console.log(user);
})
</script>

<template>
  <div>
    <h1>Dashboard</h1>
  </div>
</template>

<style></style>