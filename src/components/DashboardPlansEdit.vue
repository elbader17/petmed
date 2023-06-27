<script setup>
import { useDatabasePlansStore } from '@/stores/databasePlans';
import { onMounted, ref } from 'vue';

const props = defineProps(['item', 'index']);

const databasePlansStore = useDatabasePlansStore();

const planName = ref('');
const plan = ref({
  0: { amount: null, coverage: null, gracetime: null },
  1: { amount: null, coverage: null, gracetime: null },
  2: { amount: null, coverage: null, gracetime: null },
  3: { amount: null, coverage: null, gracetime: null },
  4: { amount: null, coverage: null, gracetime: null },
  5: { amount: null, coverage: null, gracetime: null },
  6: { amount: null, coverage: null, gracetime: null },
  7: { amount: null, coverage: null, gracetime: null },
  8: { amount: null, coverage: null, gracetime: null },
  9: { amount: null, coverage: null, gracetime: null },
  10: { amount: null, coverage: null, gracetime: null },
  11: { amount: null, coverage: null, gracetime: null },
  12: { amount: null, coverage: null, gracetime: null },
  13: { amount: null, coverage: null, gracetime: null },
  14: { amount: null, coverage: null, gracetime: null },
  15: { amount: null, coverage: null, gracetime: null },
  16: { amount: null, coverage: null, gracetime: null },
  17: { amount: null, coverage: null, gracetime: null },
  18: { amount: null, coverage: null, gracetime: null },
})

const handleSubmit = () => {
  databasePlansStore.updatePlan(props.index, plan.value);
}

onMounted(async () => {
  plan.value = props.item;
  planName.value = props.index;
})
</script>

<template>
  <section>
    <form class="form" @submit.prevent="handleSubmit">
      <label class="form-name-title" for="edit-name">Nombre plan:</label>
      <input class="form-name-input" type="text" id="edit-name" name="edit-name" v-model="planName">

      <h3 class="form-title">Consulta en Clínica:</h3>
      <div class="form-categories">
        <label class="form-subtitle" for="edit-amount-0">Cantidad:</label>
        <input class="form-input" type="text" id="edit-amount-0" name="edit-amount-0" v-model="plan[0].amount">

        <label class="form-subtitle" for="edit-coverage-0">Cobertura:</label>
        <input class="form-input" type="text" id="edit-coverage-0" name="edit-coverage-0" v-model="plan[0].coverage">

        <label class="form-subtitle" for="edit-gracetime-0">Carencia:</label>
        <input class="form-input" type="text" id="edit-gracetime-0" name="edit-gracetime-0" v-model="plan[0].gracetime">
      </div>

      <h3 class="form-title">Consulta en Domicilio:</h3>
      <div class="form-categories">
        <label class="form-subtitle" for="edit-amount-1">Cantidad:</label>
        <input class="form-input" type="text" id="edit-amount-1" name="edit-amount-1" v-model="plan[1].amount">

        <label class="form-subtitle" for="edit-coverage-1">Cobertura:</label>
        <input class="form-input" type="text" id="edit-coverage-1" name="edit-coverage-1" v-model="plan[1].coverage">

        <label class="form-subtitle" for="edit-gracetime-1">Carencia:</label>
        <input class="form-input" type="text" id="edit-gracetime-1" name="edit-gracetime-1" v-model="plan[1].gracetime">
      </div>

      <h3 class="form-title">Consulta de Urgencia:</h3>
      <div class="form-categories">
        <label class="form-subtitle" for="edit-amount-2">Cantidad:</label>
        <input class="form-input" type="text" id="edit-amount-2" name="edit-amount-2" v-model="plan[2].amount">

        <label class="form-subtitle" for="edit-coverage-2">Cobertura:</label>
        <input class="form-input" type="text" id="edit-coverage-2" name="edit-coverage-2" v-model="plan[2].coverage">

        <label class="form-subtitle" for="edit-gracetime-2">Carencia:</label>
        <input class="form-input" type="text" id="edit-gracetime-2" name="edit-gracetime-2" v-model="plan[2].gracetime">
      </div>

      <h3 class="form-title">Farmacia Veterinaria:</h3>
      <div class="form-categories">
        <label class="form-subtitle" for="edit-amount-3">Cantidad:</label>
        <input class="form-input" type="text" id="edit-amount-3" name="edit-amount-3" v-model="plan[3].amount">

        <label class="form-subtitle" for="edit-coverage-3">Cobertura:</label>
        <input class="form-input" type="text" id="edit-coverage-3" name="edit-coverage-3" v-model="plan[3].coverage">

        <label class="form-subtitle" for="edit-gracetime-3">Carencia:</label>
        <input class="form-input" type="text" id="edit-gracetime-3" name="edit-gracetime-3" v-model="plan[3].gracetime">
      </div>

      <h3 class="form-title">Vacunas:</h3>
      <div class="form-categories">
        <label class="form-subtitle" for="edit-amount-4">Cantidad:</label>
        <input class="form-input" type="text" id="edit-amount-4" name="edit-amount-4" v-model="plan[4].amount">

        <label class="form-subtitle" for="edit-coverage-4">Cobertura:</label>
        <input class="form-input" type="text" id="edit-coverage-4" name="edit-coverage-4" v-model="plan[4].coverage">

        <label class="form-subtitle" for="edit-gracetime-4">Carencia:</label>
        <input class="form-input" type="text" id="edit-gracetime-4" name="edit-gracetime-4" v-model="plan[4].gracetime">
      </div>

      <h3 class="form-title">Aplicaciones (Inyectables):</h3>
      <div class="form-categories">
        <label class="form-subtitle" for="edit-amount-5">Cantidad:</label>
        <input class="form-input" type="text" id="edit-amount-5" name="edit-amount-5" v-model="plan[5].amount">

        <label class="form-subtitle" for="edit-coverage-5">Cobertura:</label>
        <input class="form-input" type="text" id="edit-coverage-5" name="edit-coverage-5" v-model="plan[5].coverage">

        <label class="form-subtitle" for="edit-gracetime-5">Carencia:</label>
        <input class="form-input" type="text" id="edit-gracetime-5" name="edit-gracetime-5" v-model="plan[5].gracetime">
      </div>

      <h3 class="form-title">Oftalmología y Cardiología:</h3>
      <div class="form-categories">
        <label class="form-subtitle" for="edit-amount-6">Cantidad:</label>
        <input class="form-input" type="text" id="edit-amount-6" name="edit-amount-6" v-model="plan[6].amount">

        <label class="form-subtitle" for="edit-coverage-6">Cobertura:</label>
        <input class="form-input" type="text" id="edit-coverage-6" name="edit-coverage-6" v-model="plan[6].coverage">

        <label class="form-subtitle" for="edit-gracetime-6">Carencia:</label>
        <input class="form-input" type="text" id="edit-gracetime-6" name="edit-gracetime-6" v-model="plan[6].gracetime">
      </div>

      <h3 class="form-title">Kinesiología y Fisioterapia:</h3>
      <div class="form-categories">
        <label class="form-subtitle" for="edit-amount-7">Cantidad:</label>
        <input class="form-input" type="text" id="edit-amount-7" name="edit-amount-7" v-model="plan[7].amount">

        <label class="form-subtitle" for="edit-coverage-7">Cobertura:</label>
        <input class="form-input" type="text" id="edit-coverage-7" name="edit-coverage-7" v-model="plan[7].coverage">

        <label class="form-subtitle" for="edit-gracetime-7">Carencia:</label>
        <input class="form-input" type="text" id="edit-gracetime-7" name="edit-gracetime-7" v-model="plan[7].gracetime">
      </div>

      <h3 class="form-title">Análisis clínicos no específicos:</h3>
      <div class="form-categories">
        <label class="form-subtitle" for="edit-amount-8">Cantidad:</label>
        <input class="form-input" type="text" id="edit-amount-8" name="edit-amount-8" v-model="plan[8].amount">

        <label class="form-subtitle" for="edit-coverage-8">Cobertura:</label>
        <input class="form-input" type="text" id="edit-coverage-8" name="edit-coverage-8" v-model="plan[8].coverage">

        <label class="form-subtitle" for="edit-gracetime-89">Carencia:</label>
        <input class="form-input" type="text" id="edit-gracetime-89" name="edit-gracetime-89" v-model="plan[8].gracetime">
      </div>

      <h3 class="form-title">Radiografías:</h3>
      <div class="form-categories">
        <label class="form-subtitle" for="edit-amount-9">Cantidad:</label>
        <input class="form-input" type="text" id="edit-amount-9" name="edit-amount-9" v-model="plan[9].amount">

        <label class="form-subtitle" for="edit-coverage-9">Cobertura:</label>
        <input class="form-input" type="text" id="edit-coverage-9" name="edit-coverage-9" v-model="plan[9].coverage">

        <label class="form-subtitle" for="edit-gracetime-9">Carencia:</label>
        <input class="form-input" type="text" id="edit-gracetime-9" name="edit-gracetime-9" v-model="plan[9].gracetime">
      </div>

      <h3 class="form-title">Ecografías:</h3>
      <div class="form-categories">
        <label class="form-subtitle" for="edit-amount-10">Cantidad:</label>
        <input class="form-input" type="text" id="edit-amount-10" name="edit-amount-10" v-model="plan[10].amount">

        <label class="form-subtitle" for="edit-coverage-10">Cobertura:</label>
        <input class="form-input" type="text" id="edit-coverage-10" name="edit-coverage-10" v-model="plan[10].coverage">

        <label class="form-subtitle" for="edit-gracetime-10">Carencia:</label>
        <input class="form-input" type="text" id="edit-gracetime-10" name="edit-gracetime-10"
          v-model="plan[10].gracetime">
      </div>

      <h3 class="form-title">Electrocardiogramas:</h3>
      <div class="form-categories">
        <label class="form-subtitle" for="edit-amount-11">Cantidad:</label>
        <input class="form-input" type="text" id="edit-amount-11" name="edit-amount-11" v-model="plan[11].amount">

        <label class="form-subtitle" for="edit-coverage-11">Cobertura:</label>
        <input class="form-input" type="text" id="edit-coverage-11" name="edit-coverage-11" v-model="plan[11].coverage">

        <label class="form-subtitle" for="edit-gracetime-11">Carencia:</label>
        <input class="form-input" type="text" id="edit-gracetime-11" name="edit-gracetime-11"
          v-model="plan[11].gracetime">
      </div>

      <h3 class="form-title">Enfermería en Clínica:</h3>
      <div class="form-categories">
        <label class="form-subtitle" for="edit-amount-12">Cantidad:</label>
        <input class="form-input" type="text" id="edit-amount-12" name="edit-amount-12" v-model="plan[12].amount">

        <label class="form-subtitle" for="edit-coverage-12">Cobertura:</label>
        <input class="form-input" type="text" id="edit-coverage-12" name="edit-coverage-12" v-model="plan[12].coverage">

        <label class="form-subtitle" for="edit-gracetime-12">Carencia:</label>
        <input class="form-input" type="text" id="edit-gracetime-12" name="edit-gracetime-12"
          v-model="plan[12].gracetime">
      </div>

      <h3 class="form-title">Internaciones:</h3>
      <div class="form-categories">
        <label class="form-subtitle" for="edit-amount-13">Cantidad:</label>
        <input class="form-input" type="text" id="edit-amount-13" name="edit-amount-13" v-model="plan[13].amount">

        <label class="form-subtitle" for="edit-coverage-13">Cobertura:</label>
        <input class="form-input" type="text" id="edit-coverage-13" name="edit-coverage-13" v-model="plan[13].coverage">

        <label class="form-subtitle" for="edit-gracetime-13">Carencia:</label>
        <input class="form-input" type="text" id="edit-gracetime-13" name="edit-gracetime-13"
          v-model="plan[13].gracetime">
      </div>

      <h3 class="form-title">Cirugías (Castraciones):</h3>
      <div class="form-categories">
        <label class="form-subtitle" for="edit-amount-14">Cantidad:</label>
        <input class="form-input" type="text" id="edit-amount-14" name="edit-amount-14" v-model="plan[14].amount">

        <label class="form-subtitle" for="edit-coverage-14">Cobertura:</label>
        <input class="form-input" type="text" id="edit-coverage-14" name="edit-coverage-14" v-model="plan[14].coverage">

        <label class="form-subtitle" for="edit-gracetime-14">Carencia:</label>
        <input class="form-input" type="text" id="edit-gracetime-14" name="edit-gracetime-14"
          v-model="plan[14].gracetime">
      </div>

      <h3 class="form-title">Análisis clínicos específico:</h3>
      <div class="form-categories">
        <label class="form-subtitle" for="edit-amount-15">Cantidad:</label>
        <input class="form-input" type="text" id="edit-amount-15" name="edit-amount-15" v-model="plan[15].amount">

        <label class="form-subtitle" for="edit-coverage-15">Cobertura:</label>
        <input class="form-input" type="text" id="edit-coverage-15" name="edit-coverage-15" v-model="plan[15].coverage">

        <label class="form-subtitle" for="edit-gracetime-15">Carencia:</label>
        <input class="form-input" type="text" id="edit-gracetime-15" name="edit-gracetime-15"
          v-model="plan[15].gracetime">
      </div>

      <h3 class="form-title">Certificados de Salud:</h3>
      <div class="form-categories">
        <label class="form-subtitle" for="edit-amount-16">Cantidad:</label>
        <input class="form-input" type="text" id="edit-amount-16" name="edit-amount-16" v-model="plan[16].amount">

        <label class="form-subtitle" for="edit-coverage-16">Cobertura:</label>
        <input class="form-input" type="text" id="edit-coverage-16" name="edit-coverage-16" v-model="plan[16].coverage">

        <label class="form-subtitle" for="edit-gracetime-16">Carencia:</label>
        <input class="form-input" type="text" id="edit-gracetime-16" name="edit-gracetime-16"
          v-model="plan[16].gracetime">
      </div>

      <h3 class="form-title">Odontología:</h3>
      <div class="form-categories">
        <label class="form-subtitle" for="edit-amount-17">Cantidad:</label>
        <input class="form-input" type="text" id="edit-amount-17" name="edit-amount-17" v-model="plan[17].amount">

        <label class="form-subtitle" for="edit-coverage-17">Cobertura:</label>
        <input class="form-input" type="text" id="edit-coverage-17" name="edit-coverage-17" v-model="plan[17].coverage">

        <label class="form-subtitle" for="edit-gracetime-17">Carencia:</label>
        <input class="form-input" type="text" id="edit-gracetime-17" name="edit-gracetime-17"
          v-model="plan[17].gracetime">
      </div>

      <h3 class="form-title">Obs. Antir. en Cónsul. con Certif.:</h3>
      <div class="form-categories">
        <label class="form-subtitle" for="edit-amount-18">Cantidad:</label>
        <input class="form-input" type="text" id="edit-amount-18" name="edit-amount-18" v-model="plan[18].amount">

        <label class="form-subtitle" for="edit-coverage-18">Cobertura:</label>
        <input class="form-input" type="text" id="edit-coverage-18" name="edit-coverage-18" v-model="plan[18].coverage">

        <label class="form-subtitle" for="edit-gracetime-18">Carencia:</label>
        <input class="form-input" type="text" id="edit-gracetime-18" name="edit-gracetime-18"
          v-model="plan[18].gracetime">
      </div>

      <button class="form-button" type="submit">Editar</button>
    </form>
  </section>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  padding: 0.25rem;
}

.form-name-title {
  font-size: 1.15rem;
  line-height: 1.75rem;
  font-weight: 700;
}

.form-name-input {
  padding: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  width: 10rem;
  border-radius: 0.5rem;
  border: 1px solid #333333;
}

.form-title {
  font-size: 1.15rem;
  line-height: 1.75rem;
  font-weight: 400;
  margin-top: 0.5rem;
}

.form-categories {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.form-subtitle {
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 400;
  margin-top: 0.5rem;
}

.form-input {
  padding: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  width: 2.5rem;
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