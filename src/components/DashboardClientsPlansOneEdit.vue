<script setup>
import { useDatabaseClientPlanStore } from '@/stores/databaseClientPlan';
import { ref } from 'vue';

const databaseClientPlanStore = useDatabaseClientPlanStore();
const props = defineProps(['item'])
const client = ref({
  plan: props.item.plan,
  name: props.item.name,
  id: props.item.id
})

const handleSubmit = () => {
  try {
    databaseClientPlanStore.editClientPlan(client.value).then(() => {
      window.location.reload()
    })
    
  } catch (error) {
    console.log(error);
  }
}

</script>

<template>
  <section>
    <form class="form" @submit.prevent="handleSubmit">

      <label class="form-title" for="add-numAffiliate">Nombre:</label>
      <input class="form-input" type="text" id="add-numAffiliate" name="add-numAffiliate" v-model="client.name">

      <label class="form-title" for="add-plan">Plan:</label>
      <select class="form-input" id="add-plan" name="add-plan" v-model="client.plan">
        <option value="Plan 1005">1005</option>
        <option value="Plan 2010">2010</option>
        <option value="Plan 3015">3015</option>
      </select>

      <button class="form-button" type="submit">Editar</button>
    </form>
  </section>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
}

.form-title {
  font-size: 1.15rem;
  line-height: 1.75rem;
  font-weight: 400;
  margin-top: 0.5rem;
}

.form-input {
  padding: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid #333333;
}

.form-button {
  padding: 0.5rem 1rem;
  margin: 1.25rem;
  border: none;
  border-radius: 1.25rem;
  font-size: 1rem;
  color: #fff;
  background-color: #8D57B0;
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

.form-button:hover {
  background-color: #794899;
}
</style>