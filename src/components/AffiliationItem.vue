<script setup>

defineProps(['item'])

</script>

<template>
  <tr>
    <th>{{ item.id }}</th>
    <td>{{ item.title }}</td>
    <td>{{ item.cantidad }}</td>
    <td><input type="number"></td>
    <td>${{ item.precio * item.cantidad }}</td>
  </tr>
</template>