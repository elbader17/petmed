<script setup>
import { useDatabaseUserStore } from '@/stores/databaseUser';
import { useDatabasePetStore } from '@/stores/databasePet';
import { useDatabaseClientPlanStore } from '@/stores/databaseClientPlan';
import { useCheckScreen } from '@/composables/checkScreen';
import { ref, onBeforeMount } from 'vue';
import { auth } from '@/firebaseConfig';
import ModalReusable from '../components/ModalReusable.vue';
import DashboardPetsAdd from '../components/DashboardPetsAdd.vue';
import DashboardPetsEdit from '../components/DashboardPetsEdit.vue';
import LoadingAnimation from '../components/LoadingAnimation.vue';

const databaseUserStore = useDatabaseUserStore();
const databasePetStore = useDatabasePetStore();
const databaseClientPlanStore = useDatabaseClientPlanStore();

const { mobile } = useCheckScreen();

onBeforeMount(async () => {
  try {
    await databaseUserStore.readClient(auth.currentUser.uid);
  } catch (error) {
    console.log(error);
  }

  try {
    await databasePetStore.getPets(databaseUserStore.client.id);
  } catch (error) {
    console.log(error);
  }

  try {
    await databaseClientPlanStore.getPlansUser(databasePetStore.pets[0].numAffiliate)
  } catch (error) {
    console.log(error);
  }
})

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
  <section class="dashboard-pets">
    <h1 class="pets-title">Mascotas</h1>
    <div>
      <button class="button-add" @click="toggleModal">Agregar</button>
    </div>
    <ModalReusable @closeModal="toggleModal" :modalActive="openModal">
      <DashboardPetsAdd :plans="databaseClientPlanStore.plansClient" />
    </ModalReusable>
    <p v-if="databaseUserStore.loadingDoc || databasePetStore.loadingDoc || databaseClientPlanStore.loadingDoc">
      <LoadingAnimation />
    </p>
    <table v-else class="table">
      <thead class="table-head">
        <th class="head-item">Nombre</th>
        <th class="head-item">Acciones</th>
      </thead>
      <tbody class="table-body" v-for="(item, index) of databasePetStore.pets" :key="item.id">
        <td class="body-item">{{ item.name }}</td>
        <td class="body-buttons">
          <button class="button-edit" @click="toggleModalIndexed(index)">
            <font-awesome-icon icon="fa-solid fa-pen-to-square" v-show="mobile" />
            <p v-show="!mobile">Editar</p>
          </button>
          <button class="button-delete" @click="databasePetStore.deletePet(item.id)">
            <font-awesome-icon icon="fa-solid fa-trash" v-show="mobile" />
            <p v-show="!mobile">Eliminar</p>
          </button>
        </td>
        <ModalReusable @closeModal="toggleModalIndexed(index)" :modalActive="modalActiveIndexed(index)">
          <DashboardPetsEdit :item="item" :plans="databaseClientPlanStore.plansClient" />
        </ModalReusable>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
.dashboard-pets {
  display: flex;
  flex-direction: column;
  max-width: 860px;
  margin: 0 auto;
}

.pets-title {
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