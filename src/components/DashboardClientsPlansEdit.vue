<script setup>
import { ref } from 'vue'
import { useDatabaseClientPlanStore } from '@/stores/databaseClientPlan'
import { useCheckScreen } from '@/composables/checkScreen'
import ModalReusable from '../components/ModalReusable.vue'
import DashboardClientsPlansOneEdit from '../components/DashboardClientsPlansOneEdit.vue'

const databaseClientPlanStore = useDatabaseClientPlanStore()

const { mobile } = useCheckScreen()

const props = defineProps(['item'])

const openModal = ref(false)

const toggleModal = () => {
  openModal.value = !openModal.value
}
</script>

<template>
  <section>
    <table class="table">
      <thead class="table-head">
        <th class="head-item" v-show="!mobile">N°</th>
        <th class="head-item" v-show="!mobile">Plan</th>
        <th class="head-item">Mascota</th>
        <th class="head-item">Acciones</th>
      </thead>
      <tbody class="table-body">
        <td class="body-item" v-show="!mobile">{{ props.item.numAffiliate }}</td>
        <td class="body-item" v-show="!mobile">{{ props.item.plan }}</td>
        <td class="body-item">{{ props.item.name }}</td>
        <td class="body-buttons">
          <button
            class="button-delete"
            @click="databaseClientPlanStore.deleteClientPlan(props.item.id, props.item.plan)"
          >
            <font-awesome-icon icon="fa-solid fa-trash" v-show="mobile" />
            <p v-show="!mobile">Eliminar</p>
          </button>
          <button class="button-edit" @click="toggleModal">
            <font-awesome-icon icon="fa-solid fa-edit" v-show="mobile" />
            <p v-show="!mobile">Editar</p>
          </button>
        </td>
      </tbody>
    </table>
    <ModalReusable @closeModal="toggleModal" :modalActive="openModal">
      <DashboardClientsPlansOneEdit :item="props.item" />
    </ModalReusable>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
}
.button-edit {
  background-color: #3cbeb4;
}

.button-edit:hover {
  background-color: #33a198;
}
.table {
  width: 100%;
  padding: 0.5rem;
  margin: 1rem 0.25rem;
  border: none;
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
.button-delete {
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  border: none;
  border-radius: 1.25rem;
  font-size: 1rem;
  color: #fff;
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

.button-add {
  background-color: #8d57b0;
}

.button-add:hover {
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
