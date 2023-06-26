<script setup>
import { ref } from 'vue';
import { useDatabaseClientPlanStore } from '@/stores/databaseClientPlan';
import ModalReusable from '../components/ModalReusable.vue';
import DashboardClientsOnePlanAdd from '../components/DashboardClientsOnePlanAdd.vue';

const databaseClientPlanStore = useDatabaseClientPlanStore();

const props = defineProps(['item']);

const openModal = ref(false);

const toggleModal = () => {
  openModal.value = !openModal.value;
}
</script>

<template>
  <section>
    <table class="table">
      <thead class="table-head">
        <th class="head-item">N°</th>
        <th class="head-item">Plan</th>
        <th class="head-item">Mascota</th>
        <th class="head-item">Acciones</th>
      </thead>
      <tbody class="table-body" v-for="(plan, index) of props.item.plans" :key="plan.id">
        <td class="body-item">{{ index + 1 }}</td>
        <td class="body-item">{{ plan.plan }}</td>
        <td class="body-item">{{ plan.name }}</td>
        <td class="body-buttons">
          <button class="button-delete"
            @click="databaseClientPlanStore.deleteClientPlan(props.item.id, plan)">Eliminar</button>
        </td>
      </tbody>
    </table>
    <button class="button-add" @click="toggleModal">Agregar</button>
    <ModalReusable @closeModal="toggleModal" :modalActive="openModal">
      <DashboardClientsOnePlanAdd :id="props.item.id" />
    </ModalReusable>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
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