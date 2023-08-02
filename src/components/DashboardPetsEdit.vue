<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const code = ref()
const showCard = ref(true)
const textButton = ref('Generar Token')

const generate = async () => {
  try {
    userStore.createCode(pet.value.numAffiliate)
    code.value = userStore.userCode
    showCard.value = !showCard.value
    if(textButton.value === 'Generar Token') {
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
  render_not: false
})
</script>

<template>
  <div class="dashboard">
    <section v-if="showCard" class="credit-card">
      <div class="card-info">
        <div class="card-header">
          <h1>Credencial de Servicio</h1>
          <img
            src="https://s3.ppllstatics.com/laverdad/www/multimedia/202211/23/media/cortadas/como-saber-cuanto-frio-soportar-perro-kpaB-U180813416069owF-1248x770@La%20Verdad.jpg"
            alt="Pet Photo"
            class="pet-photo"
          />
        </div>

        <div class="card-field">
          <span class="field-title">Nombre:</span>
          <div class="field-value">{{ pet.name }}</div>
        </div>

        <div class="card-field">
          <span class="field-title">Fecha de nacimiento:</span>
          <div class="field-value">{{ pet.birthdate }}</div>
        </div>

        <div class="card-field">
          <span class="field-title">Tipo:</span>
          <div class="field-value">{{ pet.animal }}</div>
        </div>

        <div class="card-field">
          <span class="field-title">Raza:</span>
          <div class="field-value">{{ pet.breed }}</div>
        </div>

        <div class="card-field">
          <span class="field-title">Sexo:</span>
          <div class="field-value">{{ pet.sex }}</div>
        </div>

        <div class="card-field">
          <span class="field-title">Color:</span>
          <div class="field-value">{{ pet.color }}</div>
        </div>

        <div class="logo-container">
          <img src="../../src/assets/logo.svg" alt="Logo" class="logo" />
        </div>
      </div>
    </section>
    <div class="code-container" v-if="!showCard">
      <p>Este token es unico, es valido solo por 5 minutos</p>
      <p>En el caso de que expire el token, debe generar uno nuevo</p>
      <p class="code-text">{{ code }}</p>
    </div>

    <!-- boton para generar token -->
    <button class="form-button" @click="generate">{{ textButton }}</button>
  </div>
</template>

<style scoped>
.credit-card {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 780px; /* Adjust the width as needed */
  background-color: #a188fc; /* Add a background color for the card */
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.form-button {
  padding: 0.5rem 1rem;
  margin-left: 4.5rem;
  margin-top: 1rem;
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
}

.pet-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
}

h1 {
  font-size: 2.4rem; /* Increased font size */
  font-weight: bold;
  color: #fff;
  margin: 0;
  padding: 0.5rem 1rem; /* Added padding to create a background */
  background-color: #64b5f6; /* Background color for the h1 */
  border-radius: 5px; /* Rounded corners */
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
  color: #8d57b0; /* Set the text color to purple */
  height: 15rem;
}

.code-text {
  font-size: 2.4rem; /* Increased font size */
  font-weight: bold;
  margin-bottom: 1rem; /* Add some bottom margin for spacing */
}

.card-field {
  display: flex;
  margin-bottom: 0.25rem; /* Reduced space between fields */
}

.field-title {
  font-size: 1.2rem; /* Increased font size */
  font-weight: bold;
  width: 150px;
  color: #fff;
}

.field-value {
  flex: 1;
  font-size: 1.2rem; /* Increased font size */
  font-weight: bold; /* Added font weight */
  padding: 0.25rem;
  color: #fff; /* Text color in white */
  width: 50%; /* Occupy 50% of the width */
}

.logo-container {
  position: absolute; /* Set the logo container to absolute positioning */
  right: 3.2rem; /* Distance from the right side */
  bottom: 4rem; /* Distance from the bottom */
}

.logo {
  width: 150px; /* Adjust the size as needed */
  filter: brightness(0) invert(1); /* Make the logo white */
}

@media (max-width: 600px) {
  .dashboard {
    transform: rotate(90deg);
    margin-bottom: 1rem ;
  }
  .credit-card {
    width: 600px;
    height: 180%;
    margin: 10px 10px ;  
    padding: 0px;
  }
  .logo{
    width: 100px;
  }
  .logo-container{
    right: -15rem;
    bottom: 4rem;
  }
  .field-title{
    width: 100px;
    font-size: 0.8rem;
    margin-left: 0.7rem;
  }
  .field-value{
    width: 100px;
    font-size: 0.8rem;
  }
  .card-field{
    margin-bottom: 0.1rem;
  }
  .card-info{
    margin-bottom: 0.1rem;
    height: 10%;
  }
  .card-header{
    margin-bottom: 0.1rem;
  }
  .pet-photo{
    width: 100px;
    height: 100px;
    margin-right: 0.5rem;
    margin-top: 0.5rem;
  }
  h1{
    font-size: 1.5rem;
  }
  .form-button{
    margin-left: 10rem;
    margin-top: 0.5rem;
    width: 80%;
    font-size: 0.8rem;
  }
}
</style>
