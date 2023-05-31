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
    <h1>Clientes</h1>
    <button @click="toggleModal">Agregar</button>
    <ModalReusable @closeModal="toggleModal" :modalActive="openModal">
      <DashboardClientsAdd />
    </ModalReusable>
    <p v-if="databaseUserStore.loadingDoc">Cargando clientes...</p>
    <ul v-else>
      <li v-for="(item, index) of databaseUserStore.clients" :key="item.id">
        {{ item.name }} {{ item.surname }}
        <br>
        <ModalReusable @closeModal="toggleModalIndexed(index)" :modalActive="modalActiveIndexed(index)">
          <DashboardClientsEdit :item="item" />
        </ModalReusable>
        <button @click="toggleModalIndexed(index)">Editar</button>
        <button @click="databaseUserStore.deleteClient(item.id)">Eliminar</button>
      </li>
    </ul>
  </section>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>