<script setup>
import { useDatabaseUserStore } from '@/stores/databaseUser';
import { ref, onBeforeMount } from 'vue';
import ModalReusable from '../components/ModalReusable.vue';
import DashboardClientsAdd from '../components/DashboardClientsAdd.vue';
import DashboardClientsEdit from '../components/DashboardClientsEdit.vue';

const databaseUserStore = useDatabaseUserStore();

onBeforeMount(async () => {
  databaseUserStore.getClients();
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
  <section class="dashboard-clients">
    <h1 class="clients-title">Clientes</h1>
    <button class="button-add" @click="toggleModal">Agregar</button>
    <ModalReusable @closeModal="toggleModal" :modalActive="openModal">
      <DashboardClientsAdd />
    </ModalReusable>
    <p v-if="databaseUserStore.loadingDoc">Cargando clientes...</p>
    <table v-else class="table">
      <thead class="table-head">
        <th class="head-item">Nombre</th>
      </thead>
      <tbody class="table-body" v-for="(item, index) of databaseUserStore.clients" :key="item.id">
        <td class="body-item">{{ item.name }} {{ item.surname }}</td>
        <td class="body-item"><button class="button-edit" @click="toggleModalIndexed(index)">Editar</button></td>
        <td class="body-item"><button class="button-delete"
            @click="databaseUserStore.deleteClient(item.id)">Eliminar</button></td>
        <ModalReusable @closeModal="toggleModalIndexed(index)" :modalActive="modalActiveIndexed(index)">
          <DashboardClientsEdit :item="item" />
        </ModalReusable>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
.dashboard-clients {
  max-width: 600px;
  margin: 0 auto;
}

.clients-title {
  padding: 0.5rem;
  font-weight: 700;
  font-size: 1.75rem;
}

.table {
  padding: 0.5rem;
  margin: 1rem 0.25rem;
  border: none;
  border-radius: 1.25rem;
  background-color: #ECECEC;
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

.button-add,
.button-edit,
.button-delete {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 1.25rem;
  font-size: 1rem;
  color: #fff;
  cursor: pointer;
}

.button-add {
  background-color: #8D57B0;
}

.button-add:hover {
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