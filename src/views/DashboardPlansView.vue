<script setup>
import { useDatabasePlansStore } from '@/stores/databasePlans';
import { ref, onBeforeMount } from 'vue';
import ModalReusable from '../components/ModalReusable.vue';
import DashboardPlansAdd from '../components/DashboardPlansAdd.vue';
import DashboardPlansEdit from '../components/DashboardPlansEdit.vue';
import LoadingAnimation from '../components/LoadingAnimation.vue';

const databasePlansStore = useDatabasePlansStore();

onBeforeMount(async () => {
  databasePlansStore.getPlans();
});

const openModal = ref(false);
const openModalIndexed = ref([]);

const toggleModal = () => {
  openModal.value = !openModal.value;
}

const toggleModalIndexed = (index) => {
  const i = openModalIndexed.value.indexOf(index);
  if (i === -1) {
    openModalIndexed.value.push(index);
  } else {
    openModalIndexed.value.splice(i, 1);
  }
}

const modalActiveIndexed = (index) => {
  return openModalIndexed.value.includes(index);
}
</script>

<template>
  <section class="dashboard-plans">
    <h1 class="plans-title">Planes</h1>
    <div>
      <button class="button-add" @click="toggleModal">Agregar</button>
    </div>
    <ModalReusable @closeModal="toggleModal" :modalActive="openModal">
      <DashboardPlansAdd />
    </ModalReusable>
    <p v-if="databasePlansStore.loadingDoc">
      <LoadingAnimation />
    </p>
    <table v-else class="table">
      <thead class="table-head">
        <th class="head-item">Nombre</th>
        <th class="head-item">Acciones</th>
      </thead>
      <tbody class="table-body" v-for="(item, index) of databasePlansStore.plans" :key="item.id">
        <td class="body-item">{{ index }}</td>
        <td class="body-buttons">
          <button class="button-edit" @click="toggleModalIndexed(index)">Editar</button>
          <button class="button-delete" @click="databasePlansStore.deletePlan(item.id)">Eliminar</button>
        </td>
        <ModalReusable @closeModal="toggleModalIndexed(index)" :modalActive="modalActiveIndexed(index)">
          <DashboardPlansEdit :item="item" />
        </ModalReusable>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
.dashboard-plans {
  display: flex;
  flex-direction: column;
  max-width: 860px;
  margin: 0 auto;
}

.plans-title {
  padding: 0.5rem;
  font-weight: 700;
  font-size: 1.75rem;
}

.table {
  padding: 0.5rem;
  margin: 1rem 0.25rem;
  border: none;
  border-radius: 1.25rem;
  background-color: #fafafa;
  box-shadow: 0 1rem 1.75rem rgba(0, 0, 0, 0.25);
}

.head-item {
  padding: 0.5rem;
  font-weight: 600;
  font-size: 1.25rem;
}

.body-item {
  padding: 0.75rem;
  border-top: 1px solid #cacaca;
}

.pagination {
  display: flex;
  margin: 0 auto;
}

.body-item {
  padding: 0.75rem;
  border-top: 1px solid #cacaca;
}

.body-buttons {
  display: flex;
  justify-content: flex-end;
  padding: 0.75rem;
  border-top: 1px solid #cacaca;
}

.button-add,
.button-edit,
.button-delete,
.pagination-button {
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  border: none;
  border-radius: 1.25rem;
  font-size: 1rem;
  color: #fff;
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

.pagination-pages {
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  border: none;
  border-radius: 1.25rem;
  font-size: 1rem;
  color: #fff;
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  background-color: #8D57B0;
}

.pagination-button:disabled {
  cursor: auto;
  background-color: #794899;
}

.button-add,
.pagination-button {
  background-color: #8D57B0;
}

.button-add:hover,
.pagination-button:hover {
  background-color: #794899;
}

.button-edit {
  background-color: #3CBEB4;
}

.button-edit:hover {
  background-color: #33A198;
}

.button-delete {
  background-color: #F4643C;
}

.button-delete:hover {
  background-color: #F14313;
}
</style>