<script setup>
import { ref, onMounted, toRaw } from 'vue'
import { useUserStore } from '@/stores/user'
import { useDatabaseVetStore } from '@/stores/databaseVets'
import { useDatabaseClientPlanStore } from '@/stores/databaseClientPlan'
const validate = ref({
  send: false,
  style: 'disabled',
  textButton: 'Verificar',
  buttonVerificar: 'buttonVerificar',
  code: '000000',
  data: {
    date: new Date().toISOString().split('T')[0],
    vet: '',
    socio: '',
    plan: '',
    responsible: '',
    anamnesis: '',
    temp: '',
    fc: '',
    fr: '',
    mucousMembrane: '',
    skinCondition: '',
    feflexes: '',
    mainGanglia: '',
    headNeck: '',
    formerMembers: '',
    hindLimbs: '',
    torax: '',
    abdomen: '',
    complementaryStudies: '',
    observations: '',
    practices: {},
    account: '',
    petId: '',
    practicesOfPet: {
      practices: []
    },
    planId: '',
    numAffiliate: ''
  }
})

const databaseUserStore = useUserStore()
const databaseVetStore = useDatabaseVetStore()
const databaseClientPlanStore = useDatabaseClientPlanStore()
onMounted(() => {
  databaseVetStore.getPractices()
  setPractices()
})
const ok = async () => {
  validate.value.textButton = 'Verificando...'
  try {
    const [validationResponse, account, pet] = await databaseUserStore.validateCode(
      parseInt(validate.value.code)
    )
    const [plan, id] = await databaseClientPlanStore.findPlanByPetId(pet.id)
    validate.value.data.practicesOfPet = plan
    validate.value.data.planId = id
    if (validationResponse) {
      validate.value.textButton = 'Verificado'
      validate.value.style = 'enabled'
      validate.value.data.socio = pet.name
      validate.value.data.plan = pet.plan
      validate.value.data.account = account
      validate.value.data.petId = pet.id
      validate.value.data.responsible = pet.client
      validate.value.data.numAffiliate = pet.numAffiliate
      validate.value.textButton = 'Verificar'
    } else {
      errorCode()
    }
  } catch (error) {
    errorCode()
  }
}

const setPractices = () => {
  validate.value.data.practices = Object.fromEntries(
    Object.entries(databaseVetStore.practices).map(([key, value]) => [value, false])
  )
}

const errorCode = () => {
  validate.value.textButton = 'Código Incorrecto'
  validate.value.style = 'disabled'
  validate.value.buttonVerificar = 'buttonError'
  // a los 3 segundos el texto tiene que cambiar a "Verificar"
  setTimeout(() => {
    validate.value.textButton = 'Verificar'
    validate.value.buttonVerificar = 'buttonVerificar'
  }, 1000)
}

const resetStates = () => {
  validate.value.send = false
  validate.value.style = 'disabled'
  validate.value.textButton = 'Verificar'
  validate.value.code = '000000'
  validate.value.data = {
    date: new Date().toISOString().split('T')[0],
    vet: '',
    socio: '',
    plan: '',
    responsible: '',
    anamnesis: '',
    temp: '',
    fc: '',
    fr: '',
    mucousMembrane: '',
    skinCondition: '',
    feflexes: '',
    mainGanglia: '',
    headNeck: '',
    formerMembers: '',
    hindLimbs: '',
    torax: '',
    abdomen: '',
    complementaryStudies: '',
    observations: '',
    practices: {},
    account: '',
    petId: '',
    practicesOfPet: {
      practices: []
    },
    planId: ''
  }
}

const sendForm = () => {
  const practices = Object.keys(validate.value.data.practices)
  databaseClientPlanStore.updatePlan(
    validate.value.data.planId,
    practices,
    validate.value.data.numAffiliate
  )
  
  delete validate.value.data.practicesOfPet
  validate.value.data.practices = practices
  const objToSend = validate.value.data
  databaseVetStore.sendForm(objToSend)
  databaseUserStore.expirationCode(validate.value.code)

  resetStates()
}

const consitionalRender = (data) => {
  if (!validate.value.data.practicesOfPet.practices) return false

  if (validate.value.data.practicesOfPet.practices[data.toString()]) {
    const value = validate.value.data.practicesOfPet.practices[data.toString()]
    if (!isNaN(value.amount) && parseInt(value.amount) > 0) {
      return value.coverage
    }
    if (!isNaN(value.amount) && parseInt(value.amount) === 0) {
      return false
    }
    return false
  }
  return false
}

const renderCoverage = (data) => {
  if (!data) return ''
  return `${data}%`
}
</script>

<template>
  <form>
    <section style="margin-bottom: 90px; margin-top: 30px">
      <h2>Verificación</h2>
      <label for="codigo">Código de Verificación del Socio:</label>
      <input type="text" id="codigo" name="codigo" v-model="validate.code" />

      <button @click="ok()" :class="validate.buttonVerificar" type="button">
        {{ validate.textButton }}
      </button>
    </section>

    <div class="container">
      <div v-for="(practice, index) in databaseVetStore.practices" :key="practice">
        <label style="display: inline-block">
          {{ practice }}
          <input
            :disabled="!consitionalRender(index)"
            type="checkbox"
            :id="practice"
            :name="practice"
            :value="practice"
            v-model="validate.data.practices[practice]"
            style="display: inline-block"
          />
          <span :style="{ color: consitionalRender(index) ? 'green' : 'black' }">
            {{ renderCoverage(consitionalRender(index)) }}
          </span>
        </label>
      </div>
    </div>

    <section>
      <h2>Fecha y Veterinaria</h2>
      <label for="fecha">Fecha:</label>
      <input type="date" id="fecha" v-model="validate.data.date" name="fecha" disabled />

      <label for="veterinaria">Veterinaria:</label>
      <input type="text" id="veterinaria" v-model="validate.data.vet" name="veterinaria" />
    </section>

    <section>
      <h2>Socio, Plan y Consulta</h2>
      <label for="socio">Socio:</label>
      <input disabled type="text" id="socio" v-model="validate.data.socio" name="socio" />

      <label for="plan">Plan:</label>
      <input disabled type="text" id="plan" v-model="validate.data.plan" name="plan" />

      <label for="responsable">Responsable:</label>
      <input
        disabled
        type="text"
        id="responsable"
        v-model="validate.data.responsible"
        name="responsable"
      />

      <label>Lugar de Consulta:</label>
      <div class="checkbox-group">
        <input type="checkbox" id="clinica" name="lugar" value="clinica" />
        <label for="clinica">Clínica</label>

        <input type="checkbox" id="domicilio" name="lugar" value="domicilio" />
        <label for="domicilio">Domicilio</label>

        <input type="checkbox" id="fuera_horario" name="lugar" value="fuera_horario" />
        <label for="fuera_horario">Fuera de Horario</label>
      </div>
    </section>

    <section>
      <h2>Estado General y Anamnesis</h2>
      <label for="anamnesis">Estado General y Anamnesis:</label>
      <textarea id="anamnesis" v-model="validate.data.anamnesis" name="anamnesis"></textarea>

      <label for="temperatura">Temperatura:</label>
      <input type="text" id="temperatura" v-model="validate.data.temp" name="temperatura" />

      <label for="fc">FC:</label>
      <input type="text" id="fc" v-model="validate.data.fc" name="fc" />

      <label for="fr">FR:</label>
      <input type="text" id="fr" v-model="validate.data.fr" name="fr" />

      <label for="mucosa">Estado de Mucosa:</label>
      <input type="text" id="mucosa" v-model="validate.data.mucousMembrane" name="mucosa" />

      <label for="piel_anexos">Estado de Piel y Anexos:</label>
      <input
        type="text"
        id="piel_anexos"
        v-model="validate.data.skinCondition"
        name="piel_anexos"
      />

      <label for="reflejos">Reflejos:</label>
      <input type="text" id="reflejos" v-model="validate.data.feflexes" name="reflejos" />

      <label for="ganglios">Ganglios Principales:</label>
      <input type="text" id="ganglios" v-model="validate.data.mainGanglia" name="ganglios" />

      <label for="cabeza_cuello">Cabeza y Cuello:</label>
      <input type="text" id="cabeza_cuello" v-model="validate.data.headNeck" name="cabeza_cuello" />

      <label for="miembros_anteriores">Miembros Anteriores:</label>
      <input
        type="text"
        id="miembros_anteriores"
        v-model="validate.data.formerMembers"
        name="miembros_anteriores"
      />

      <label for="miembros_posteriores">Miembros Posteriores:</label>
      <input
        type="text"
        id="miembros_posteriores"
        v-model="validate.data.hindLimbs"
        name="miembros_posteriores"
      />

      <label for="torax">Tórax:</label>
      <input type="text" id="torax" v-model="validate.data.torax" name="torax" />

      <label for="abdomen">Abdomen:</label>
      <input type="text" id="abdomen" v-model="validate.data.abdomen" name="abdomen" />

      <label for="estudios">Estudios Complementarios:</label>
      <input
        type="text"
        id="estudios"
        v-model="validate.data.complementaryStudies"
        name="estudios"
      />

      <label for="observaciones">Observaciones:</label>
      <textarea
        id="observaciones"
        v-model="validate.data.observations"
        name="observaciones"
      ></textarea>
    </section>

    <input
      :disabled="validate.send"
      type="button"
      :class="validate.style"
      value="Enviar"
      @click="sendForm"
    />
  </form>
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 20px;
}

h1 {
  text-align: center;
}

.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px; /* Espacio entre los elementos */
  background: #d8d8d8a2;
  padding: 1.25rem;
  margin: 20px 0;
}

.enabled {
  background-color: #4caf50;
  color: white;
  padding: 10px 90px;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  float: center;
  margin-top: 40px;
}

.disabled {
  background-color: #ccc;
  color: #666;
  padding: 10px 90px;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  float: center;
  margin-top: 40px;
}

.buttonVerificar {
  background-color: #9e63c4;
  color: #ffffff;
  padding: 10px 20px;
  margin: 20px;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  float: right;
}

.buttonError {
  background-color: #ff0000;
  color: #ffffff;
  padding: 10px 20px;
  margin: 20px;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  float: right;
}

form {
  max-width: 600px;
  margin: 0 auto;
}

section {
  margin-bottom: 20px;
}

h2 {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type='text'],
input[type='date'],
textarea {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

input[type='checkbox'] {
  display: inline;
  margin-right: 5px;
}

input[type='submit'] {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type='submit']:hover {
  background-color: #45a049;
}

textarea {
  height: 100px;
}

.checkbox-group {
  display: flex;
  align-items: center;
}

.checkbox-group label {
  margin-right: 10px;
}
</style>
