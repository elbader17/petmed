<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import dog from '@/assets/img/dog.svg'

const userStore = useUserStore()
const code = ref()
const showCard = ref(true)
const textButton = ref('Generar Token')

const generate = async () => {
  try {
    code.value = await userStore.createCode(pet.value.numAffiliate)
    showCard.value = !showCard.value
    if (textButton.value === 'Generar Token') {
      textButton.value = 'Regresar'
    } else {
      textButton.value = 'Generar Token'
    }
  } catch (error) {
    console.log(error)
  }
}
const props = defineProps(['item', 'plans'])

const options = ref([])

const renderPlans = (num) => {
  if (num === 'Plan 1005' || num == '1005') {
    return 'plan1'
  }
  if (num === 'Plan 2010' || num == '2010') {
    return 'plan2'
  }
  if (num === 'Plan 3015' || num == '3015') {
    return 'plan3'
  }
  return 'plan1'
}

onMounted(async () => {
  options.value = props.plans
  pet.value = props.item
})

const pet = ref({
  client: '',
  name: '',
  birthdate: '',
  animal: '',
  breed: '',
  sex: '',
  color: '',
  plan: '',
  numAffiliate: '',
  render_not: false,
  registration_code: '',
  responsable: ''
})
</script>

<template>
  <div class="dashboard">
    <section v-if="showCard" class="credit-card" :class="renderPlans(pet.plan)">
      <div class="card-info">
        <div class="card-header">
          <div class="header-title">
            <h1>Credencial</h1>
            <h1>de Servicio</h1>
          </div>
          <div class="pet-photo-container">
            <img
              :src="pet.photo ? pet.photo : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxURgBlcgpQeFnrvpwTytcHOYZ-lv63ssimQ&usqp=CAU'"
              alt="Pet Photo"
              class="pet-photo"
            />
            <div class="logo-container2">
              <img src="../../src/assets/logo.svg" alt="Logo" class="logo" />
            </div>
          </div>
        </div>

        <div class="card-field">
          <span class="field-title">Nombre:</span>
          <div class="field-value">{{ pet.name }}</div>
        </div>
        <div class="card-field">
          <span class="field-title">Sexo:</span>
          <div class="field-value">{{ pet.sex }}</div>
        </div>
        <div class="card-field">
          <span class="field-title">Raza:</span>
          <div class="field-value">{{ pet.breed }}</div>
        </div>

        <div class="card-field">
          <span class="field-titles"
            >Socio: <span class="extra-space" /> {{ pet.numAffiliate }}
            <span class="spaces" /> Plan: {{ pet.plan }}</span
          >
        </div>

        <div class="card-field">
          <span class="field-titles"
            >fecha de nac:&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; {{ pet.birthdate }} &nbsp;&nbsp;
            &nbsp;&nbsp; Alta: {{ pet.registration_code }}</span
          >
        </div>

        <div class="card-field">
          <span class="field-title">responsable:</span>
          <div class="field-value">{{ pet.responsable }}</div>
        </div>

        <div class="logo-container">
          <img :src="dog" alt="Logo" class="logo2" />
        </div>
      </div>
    </section>
    <div class="code-container" v-if="!showCard">
      <div v-if="code !== 'blocked'">
        <p>Este token es unico, es valido solo por 5 minutos</p>
        <p>En el caso de que expire el token, debe generar uno nuevo</p>
        <p class="code-text">{{ code }}</p>
      </div>
      <div v-else>
        <p class="code-text">Cuenta bloqueada.</p>
        <p>Comunicarse al 3585176454</p>
      </div>
    </div>

    <!-- boton para generar token -->
    <div class="form-container ">
      <button class="form-button" @click="generate">{{ textButton }}</button>
    </div>
  </div>
</template>

<style scoped>
.form-button {
  margin: 0 auto;
}
.credit-card {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.header-title {
  margin-left: 0.7rem;
  margin-right: 15rem;
}
.extra-space {
  margin: 47px;
}
.form-container {
  text-align: center;
}
.spaces {
  margin: 22px;
}

.pet-photo-container {
  position: relative; /* Agrega posicionamiento relativo al contenedor de la foto y el logo */
}
.form-button {
  padding: 0.5rem 1rem;
  margin-top: 5px;
  width: 80%;
  border: none;
  border-radius: 1.25rem;
  font-size: 1rem;
  color: #fff;
  background-color: #8d57b0;
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  cursor: pointer;
}
.card-info {
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-family: 'Sigmar One', cursive;
}

.pet-photo {
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin: 1rem;
  border: 4px solid #fff; /* Agrega un borde blanco de 2px */
  box-sizing: border-box;
}

h1 {
  font-size: 2.4rem; /* Increased font size */
  font-weight: bold;
  color: #fff;
  margin: 0.2rem;
  padding: 0.1rem 0.1rem; /* Added padding to create a background */
  background-color: #3cbeb3; /* Background color for the h1 */
  border-radius: 5px; /* Rounded corners */
  font-family: 'Sigmar One', cursive;
}

.data-container {
  display: flex;
  flex-direction: column;
}
.code-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the code text horizontally */
  margin-top: 1rem; /* Add some top margin for spacing */
  text-align: center; /* Center the text inside the container */
  color: #7a26ce; /* Set the text color to purple */
  height: 15rem;
}
.logo-container2 {
  position: absolute; /* Agrega posicionamiento absoluto al logo */
  left: 10px;
  bottom: -220px; /* Ajusta la distancia desde la parte inferior */
}
.plan1 {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 100%;
  background-color: #8d57b0; /* Add a background color for the card */
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.plan2 {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 100%;
  background-color: #f4643c; /* Add a background color for the card */
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.plan2 h1 {
  background-color: #3cbeb4; /* Cambia el color de fondo a un tono más oscuro */
}

.plan3 {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 100%;
  background-color: #3cbeb4; /* Add a background color for the card */
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.plan3 h1 {
  background-color: #f4643c; /* Cambia el color de fondo a un tono más oscuro */
}

.code-text {
  font-size: 2.4rem; /* Increased font size */
  font-weight: bold;
  margin-bottom: 1rem; /* Add some bottom margin for spacing */
}

.card-field {
  display: flex;
  margin-bottom: 0.1rem; /* Reduced space between fields */
  margin-left: 1.5rem; /* Reduced space between fields */
}

.field-title {
  font-size: 1.1rem; /* Increased font size */
  font-weight: bold;
  width: 150px;
  color: #fff;
  font-family: 'Poppins', sans-serif;
}
.field-titles {
  font-size: 1.1rem; /* Increased font size */
  font-weight: bold;
  width: 100%;
  color: #fff;
  font-family: 'Poppins', sans-serif;
}

.field-value {
  flex: 1;
  font-size: 1.1rem; /* Increased font size */
  font-weight: bold; /* Added font weight */
  padding: 0.1rem;
  color: #fff; /* Text color in white */
  width: 10%;
  font-family: 'Poppins', sans-serif;
}

.logo-container {
  position: absolute; /* Set the logo container to absolute positioning */
  left: 70%; /* Distance from the right side */
  bottom: 4rem; /* Distance from the bottom */
}

.logo {
  width: 150px; /* Adjust the size as needed */
  filter: brightness(0) invert(1); /* Make the logo white */
}

.logo2 {
  position: absolute;
  z-index: 0; /* Coloca la imagen detrás de otros elementos */
  width: 450px;
  right: 80%;
  bottom: 80px;
  filter: invert(100%) brightness(200%) opacity(0.3);
}

@media (max-width: 800px) {
  .dashboard {
    transform: scale(0.9);
  }
}

@media (max-width: 770px) {
  .dashboard {
    transform: scale(0.8);
  }
  .header-title {
    margin-left: 0.7rem;
    margin-right: 13rem;
  }
}

@media (max-width: 690px) {
  .dashboard {
    transform: scale(0.7);
  }
  h1 {
    font-size: 1.8rem;
  }
  .card-header {
    margin-bottom: 0.2rem;
  }
  .credit-card {
    width: 120%;
    margin-left: -10%;
  }
  .logo-container {
    left: 75%;
  }
  .logo-container2 {
    bottom: -200px;
  }
  .logo {
    width: 140px;
  }
}
@media (max-width: 580px) {
  .dashboard {
    transform: scale(0.7);
  }
  h1 {
    font-size: 1.8rem;
  }
  .card-header {
    margin-bottom: 0.2rem;
  }
  .credit-card {
    width: 130%;
    margin-left: -15%;
  }
  .logo-container {
    left: 80%;
  }
}
@media (max-width: 475px) {
  .dashboard {
    transform: scale(0.6);
  }
  h1 {
    font-size: 1.8rem;
  }
  .card-header {
    margin-bottom: 0.2rem;
  }
  .credit-card {
    width: 150%;
    margin-left: -25%;
  }
}

@media (max-width: 420px) {
  .dashboard {
    transform: scale(0.58);
  }
  h1 {
    font-size: 1.8rem;
  }
  .card-header {
    margin-bottom: 0.2rem;
  }
  .credit-card {
    width: 160%;
    margin-left: -30%;
  }
  .header-title {
    margin-left: 0.7rem;
    margin-right: 11rem;
  }
}

@media (max-width: 400px) {
  .dashboard {
    transform: scale(0.53);
  }
  .logo {
    width: 130px;
    margin-left: 15px;
  }
}

@media (max-width: 380px) {
  .dashboard {
    transform: scale(0.5);
  }
  h1 {
    font-size: 1.8rem;
  }
  .card-header {
    margin-bottom: 0.2rem;
  }
  .credit-card {
    width: 180%;
    margin-left: -40%;
  }
}

@media (max-width: 330px) {
  .dashboard {
    transform: scale(0.38);
  }
  h1 {
    font-size: 1.8rem;
  }
  .card-header {
    margin-bottom: 0.2rem;
  }
  .credit-card {
    width: 220%;
    margin-left: -60%;
  }
  .logo-container {
    left: 95%;
  }
}
</style>
