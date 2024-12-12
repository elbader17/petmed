<script setup>
defineProps(['data'])
</script>

<template>
  <section class="providers-content">
    <table class="providers-table">
      <thead class="table-head">
        <tr>
          <th class="head-provider">Prestadores</th>
          <th class="head-item">Dirección</th>
          <th class="head-item">Teléfono</th>
          <th class="head-item">Localidad</th>
          <th class="head-item">Especialidad</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-for="item in data" :key="item.id">
          <td class="body-provider">{{ item.name }}</td>
          <td class="body-item">{{ item.address }}</td>
          <td class="body-item">{{ item.phone }}</td>
          <td class="body-item">{{ item.city }}</td>
          <td class="body-item">{{ item.specialty }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
.providers-content {
  display: flex;
  justify-content: center;
  text-align: center;
  padding-top: 4rem;
  margin-bottom: 15rem;
}

.providers-table {
  max-width: 1236px;
  padding: 1rem;
}

.head-item {
  color: #fff;
  background: #F4643C;
  font-weight: 600;
  font-size: 1.25rem;
  text-transform: uppercase;
  padding: 0.75rem;
}

.head-provider,
.body-provider {
  color: #fff;
  background: #9E63C4;
  padding: 0.75rem;
}

.head-provider {
  font-weight: 600;
  font-size: 1.25rem;
  text-transform: uppercase;
}

.body-item {
  background: #ECECEC;
  padding: 0.75rem;
}
</style>
