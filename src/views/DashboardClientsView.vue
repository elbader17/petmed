<script setup>
import { useDatabaseUserStore } from '@/stores/databaseUser';
import { useCheckScreen } from '@/composables/checkScreen';
import { ref, onBeforeMount } from 'vue';
import ModalReusable from '../components/ModalReusable.vue';
import DashboardClientsAdd from '../components/DashboardClientsAdd.vue';
import DashboardClientsEdit from '../components/DashboardClientsEdit.vue';
import LoadingAnimation from '../components/LoadingAnimation.vue';

const databaseUserStore = useDatabaseUserStore();

const { mobile } = useCheckScreen();

onBeforeMount(async () => {
  databaseUserStore.getSize();
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

const nextPage = async () => {
  if (databaseUserStore.page > 0) {
    await databaseUserStore.nextPage();
  }
};

const previousPage = async () => {
  if (databaseUserStore.page < databaseUserStore.total) {
    await databaseUserStore.previousPage();
  }
};
</script>

<template>
  <section class="dashboard-clients">
    <h1 class="clients-title">Clientes</h1>
    <div>
      <button class="button-add" @click="toggleModal">Agregar</button>
    </div>
    <ModalReusable @closeModal="toggleModal" :modalActive="openModal">
      <DashboardClientsAdd />
    </ModalReusable>
    <p v-if="databaseUserStore.loadingDoc">
      <LoadingAnimation />
    </p>
    <table v-else class="table">
      <thead class="table-head">
        <th class="head-item">Nombre</th>
        <th class="head-item">Acciones</th>
      </thead>
      <tbody class="table-body" v-for="(item, index) of databaseUserStore.clients" :key="item.id">
        <td class="body-item">{{ item.name }} {{ item.surname }}</td>
        <td class="body-buttons">
          <button class="button-edit" @click="toggleModalIndexed(index)">
            <font-awesome-icon icon="fa-solid fa-pen-to-square" v-show="mobile" />
            <p v-show="!mobile">Editar</p>
          </button>
          <button class="button-delete" @click="databaseUserStore.deleteClient(item.id)">
            <font-awesome-icon icon="fa-solid fa-trash" v-show="mobile" />
            <p v-show="!mobile">Eliminar</p>
          </button>
        </td>
        <ModalReusable @closeModal="toggleModalIndexed(index)" :modalActive="modalActiveIndexed(index)">
          <DashboardClientsEdit :item="item" />
        </ModalReusable>
      </tbody>
    </table>
    <div class="pagination">
      <button class="pagination-button" :disabled="databaseUserStore.page === 1" @click="previousPage">
        Anterior
      </button>
      <div class="pagination-pages">
        {{ databaseUserStore.page }} / {{ databaseUserStore.pages }}
      </div>
      <button class="pagination-button" :disabled="databaseUserStore.page === databaseUserStore.pages" @click="nextPage">
        Siguiente
      </button>
    </div>
  </section>
</template>

<style scoped>
.dashboard-clients {
  display: flex;
  flex-direction: column;
  max-width: 860px;
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