<script setup>
import { useDatabaseProvidersStore } from '@/stores/databaseProviders';
import { ref, onBeforeMount } from 'vue';
import ModalReusable from '../components/ModalReusable.vue';
import DashboardProvidersAdd from '../components/DashboardProvidersAdd.vue';
import DashboardProvidersEdit from '../components/DashboardProvidersEdit.vue';

const databaseProvidersStore = useDatabaseProvidersStore();

onBeforeMount(async () => {
  databaseProvidersStore.getProviders();
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
  <section class="dashboard-providers">
    <h1>Proveedores</h1>
    <button @click="toggleModal">Agregar</button>
    <ModalReusable @closeModal="toggleModal" :modalActive="openModal">
      <DashboardProvidersAdd />
    </ModalReusable>
    <p v-if="databaseProvidersStore.loadingDoc">Cargando proveedores...</p>
    <ul v-else>
      <li v-for="(item, index) of databaseProvidersStore.providers" :key="item.id">
        {{ item.name }} {{ item.specialty }}
        <br>
        <ModalReusable @closeModal="toggleModalIndexed(index)" :modalActive="modalActiveIndexed(index)">
          <DashboardProvidersEdit :item="item" />
        </ModalReusable>
        <button @click="toggleModalIndexed(index)">Editar</button>
        <button @click="databaseProvidersStore.deleteProvider(item.id)">Eliminar</button>
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