<script setup>
import { useDatabasePetStore } from '@/stores/databasePet'
import { useCheckScreen } from '@/composables/checkScreen'
import { ref, onBeforeMount } from 'vue'
import ModalReusable from '../components/ModalReusable.vue'
import DashboardClientsPlansAdd from '../components/DashboardClientsPlansAdd.vue'
import DashboardClientsPlansEdit from '../components/DashboardClientsPlansEdit.vue'
import LoadingAnimation from '../components/LoadingAnimation.vue'

const databasePetStore = useDatabasePetStore()

const { mobile } = useCheckScreen()

onBeforeMount(async () => {
  databasePetStore.getPetsByPage()
})

const openModal = ref(false)
const openModalIndexed = ref([])

const toggleModal = () => {
  openModal.value = !openModal.value
}

const toggleModalIndexed = (index) => {
  const i = openModalIndexed.value.indexOf(index)
  if (i === -1) {
    openModalIndexed.value.push(index)
  } else {
    openModalIndexed.value.splice(i, 1)
  }
}

const modalActiveIndexed = (index) => {
  return openModalIndexed.value.includes(index)
}

const numAffiliateSearch = ref('')
const nameSearch = ref('')

const searchPets = async () => {
  let param1 = ''
  let param2 = ''
  if (numAffiliateSearch.value !== '') {
    param1 = numAffiliateSearch.value
  }
  if (nameSearch.value !== '') {
    param2 = nameSearch.value
  }
  await databasePetStore.getPetsByPage(1, param1, param2)
}
</script>

<template>
  <section class="dashboard-clients">
    <h1 class="clients-title">Mascotas</h1>
    <div>

      <button class="button-add" @click="toggleModal">Agregar</button>
      <input
        type="text"
        placeholder="Buscar por número de afiliado"
        v-model="numAffiliateSearch"
      />
      <input type="text" placeholder="Buscar por nombre" v-model="nameSearch" />
      <button class="button-add" @click="searchPets">Buscar</button>
    </div>
    <ModalReusable @closeModal="toggleModal" :modalActive="openModal">
      <DashboardClientsPlansAdd />
    </ModalReusable>
    <p v-if="databasePetStore.loadingDoc">
      <LoadingAnimation />
    </p>
    <table v-else class="table">
      <thead class="table-head">
        <th class="head-item">Nombre / N° de Afiliado</th>
        <th class="head-item">Acciones</th>
      </thead>
      <tbody class="table-body" v-for="(item, index) of databasePetStore.pets" :key="item.id">
        <td class="body-item">{{ item.name }} / {{ item.numAffiliate }}</td>
        <td class="body-buttons">
          <button class="button-edit" @click="toggleModalIndexed(index)">
            <font-awesome-icon icon="fa-solid fa-pen-to-square" v-show="mobile" />
            <p v-show="!mobile">In process</p>
          </button>
        </td>
        <ModalReusable
          @closeModal="toggleModalIndexed(index)"
          :modalActive="modalActiveIndexed(index)"
        >
          <DashboardClientsPlansEdit :item="item" />
        </ModalReusable>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
.dashboard-clients {
  display: flex;
  flex-direction: column;
  max-width: 860px;
  margin: 0 auto;
}
input {
  padding: 0.5rem;
  margin: 1rem 0.25rem;
  border: none;
  border-radius: 1.25rem;
  background-color: #fafafa;
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
  background-color: #8d57b0;
}

.pagination-button:disabled {
  cursor: auto;
  background-color: #794899;
}

.button-add,
.pagination-button {
  background-color: #8d57b0;
}

.button-add:hover,
.pagination-button:hover {
  background-color: #794899;
}

.button-edit {
  background-color: #3cbeb4;
}

.button-edit:hover {
  background-color: #33a198;
}

.button-delete {
  background-color: #f4643c;
}

.button-delete:hover {
  background-color: #f14313;
}
</style>
