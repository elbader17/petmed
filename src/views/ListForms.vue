<script setup>
import { ref } from 'vue'
import { useDatabaseAdminStore } from '@/stores/databaseAdmin'
import ModalReusable from '../components/ModalReusable.vue'

const databaseAdmin = useDatabaseAdminStore()

const search = async () => {
  const params = []
  if (data.value.nameOfPet !== '' && data.value.nameOfPet !== undefined) {
    params.push({
      key: 'socio',
      value: data.value.nameOfPet
    })
  }
  if (data.value.numAffiliate !== '' && data.value.numAffiliate !== undefined) {
    params.push({
      key: 'numAffiliate',
      value: data.value.numAffiliate
    })
  }
  if (data.value.responsable !== '' && data.value.responsable !== undefined) {
    params.push({
      key: 'responsible',
      value: data.value.responsable
    })
  }
  console.log("🚀 ~ file: ListForms.vue:10 ~ search ~ params:", params)
  const dataForList = await databaseAdmin.getForms(params)
  data.value.paginatedItems = dataForList
}

const toggleModal = (info) => {
  console.log(info);
  if (info) infoForShow.value = JSON.parse(JSON.stringify(info))
  openModal.value = !openModal.value
}

const openModal = ref(false)
const infoForShow = ref({})
const data = ref({
  paginatedItems: [],
  nameOfPet: '',
  nroOfAffiliate: '',
  nameOfResponsible: ''
})
</script>

<template>
  <section class="list-forms">
    <h2 class="consult-title">Planillas</h2>
    <div class="container">
      <div>
        <p>Mascota</p>
        <input type="text" v-model="data.nameOfPet" />
      </div>
      <div>
        <p>N° de afiliado</p>
        <input type="text" v-model="data.numAffiliate" />
      </div>
      <div>
        <p>Responsable</p>
        <input type="text" v-model="data.responsable" />
      </div>
      <div>
        <button class="btn-search" @click="search">buscar</button>
      </div>
    </div>
    <ModalReusable @closeModal="toggleModal" :modalActive="openModal">
      <div class="content-modal">
        <h2 class="title">Planilla</h2>
        <p>Nombre: {{ infoForShow.name }}</p>
        <p>N° de afiliado: {{ infoForShow.numAffiliate }}</p>
        <p>Responsable: {{ infoForShow.responsable }}</p>
        <p>Plan: {{ infoForShow.plan }}</p>
        <p>Fecha: {{ infoForShow.date }}</p>
        <p>Veterinario: {{ infoForShow.vet }}</p>
        <p>Abdomen: {{ infoForShow.abdomen }}</p>
        <p>Anamnesis: {{ infoForShow.anamnesis }}</p>
        <p>Estudios complementarios {{ infoForShow.complementaryStudies }}</p>
        <p>Fr: {{ infoForShow.fr }}</p>
        <p>Fc: {{ infoForShow.fc }}</p>
        <p>Reflejos: {{ infoForShow.feflexes }}</p>
        <p>Miembros anteriores: {{ infoForShow.formerMembers }}</p>
        <p>Cabeza y cuello: {{ infoForShow.headNeck }}</p>
        <p>Miembros posteriores: {{ infoForShow.hindLimbs }}</p>
        <p>Ganglios principales: {{ infoForShow.mainGanglia }}</p>
        <p>Membrana mucosa: {{ infoForShow.mucousMembrane }}</p>
        <p>Diagnostico: {{ infoForShow.diagnosis }}</p>
        <p>Diagnostico Diferencial: {{ infoForShow.differentialDiagnosis }}</p>
        <p>Tratamiento: {{ infoForShow.treatment }}</p>
        <p>Observaciones: {{ infoForShow.observations }}</p>
        <p>Condicion de piel: {{ infoForShow.skinCondition }}</p>
        <p>Temperatura: {{ infoForShow.temp }}</p>
        <p>Torax: {{ infoForShow.torax }}</p>
        <p v-if="infoForShow.practices && infoForShow.practices.length">
          Prácticas Aplicadas: {{ infoForShow.practices.join(', ') }}
        </p>
        <p>Veterinario: {{ infoForShow.vet }}</p>
        <p>Cantidad de Vacunas aplicadas: {{ infoForShow.countVacunas }}</p>
        <p>Cantidad de Radiografias: {{ infoForShow.countRadiografias }}</p>
        <p>Cantidad de cantidadAplicaciones: {{ infoForShow.countAplicaciones }}</p>
        <h3>Auditorias: </h3>
        <p v-if="infoForShow.odontology">Odontologia</p>
        <p v-if="infoForShow.surgery">Cirugía</p>
      </div>
    </ModalReusable>
    <div>
      <div v-for="item in data.paginatedItems" class="element" :key="item.name">
        <div @click="toggleModal(item)">
          <p class="data">{{ item.name }} - {{ item.plan }} - {{ item.numAffiliate }} </p>
          <p v-if="item.odontology || item.surgery" class="audit">Auditoria</p>
          <p class="date">{{ item.date }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.audit {
  color: #8d57b0;
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: 0.05rem;
  margin-left: 1rem;
}

.btn-search {
  margin-top: 1rem;
  background-color: #8d57b0;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 4px 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.consult-title {
  font-weight: 600;
  font-size: 1.25rem;
  letter-spacing: 0.05rem;
  padding-bottom: 1rem;
}

.container {
  margin-left: 5px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.content-modal {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 1.5rem;
}

.element>div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.element>div .date {
  margin-left: auto;
  color: #888;
}

.container>div {
  display: flex;
  flex-direction: column;
  margin-right: 10px;
}

.element {
  border-radius: 5px;
  background-color: white;
  width: 100%;
  border: 1px solid #8d57b0;
  margin: 5px;
  height: 40px;
  padding: 10px;
  transition: background-color 0.3s, border-color 0.3s;
}

.element:hover {
  background-color: #8d57b0;
  border-color: white;
  color: white;
}

@media all and (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}</style>
