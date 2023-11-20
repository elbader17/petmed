<script setup>
import { useUserStore } from '@/stores/user'
import { useDatabaseUserStore } from '@/stores/databaseUser'
import { useDatabasePetStore } from '@/stores/databasePet'
import { useDatabaseClientPlanStore } from '@/stores/databaseClientPlan'
import { onBeforeMount, onMounted, ref } from 'vue'
import { auth } from '@/firebaseConfig'

const userStore = useUserStore()
const databaseUserStore = useDatabaseUserStore()
const databasePetStore = useDatabasePetStore()
const databaseClientPlanStore = useDatabaseClientPlanStore()

onBeforeMount(async () => {
  try {
    databaseUserStore.readClient(auth.currentUser.uid)
  } catch (error) {
    console.log(error)
  }
})

onMounted(async () => {
  await databaseUserStore.readClient(auth.currentUser.uid)
  const client = databaseUserStore.client

  if (client.type !== 'client') {
    console.log('Todo Ok')
  } else {
    try {
      databasePetStore.pets = []
      await databasePetStore.getPets(client.id, client.name)
    } catch (error) {
      console.log(error)
    }
    const pets = databasePetStore.pets

    try {
      databaseClientPlanStore.plansClient = []
      await databaseClientPlanStore.getPlansUser(client.id)
    } catch (error) {
      console.log(error)
    }
    const plansUser = databaseClientPlanStore.plansClient

    if (Object.keys(plansUser).length !== 0) {
      console.log('Ya posee planes')
      return
    } else {
      pets.forEach(async (pet) => {
        try {
          const currentDate = new Date()
          const date = currentDate.toISOString().slice(0, 16)

          const planNameMappings = {
            'Plan 1005': '1005',
            'Plan 2010': '2010',
            'Plan 3015': '3015'
          }

          const planName = planNameMappings[pet.plan] || pet.plan
          const clientObj = {
            client: client.id,
            plan: planName,
            date: date,
            paid: true,
            petId: pet.id,
            petName: pet.name,
            numAffiliate: pet.numAffiliate
          }
          console.log('🚀 ~ file: DashboardHomeView.vue:79 ~ pets.forEach ~ clientObj:', clientObj)

          try {
            await databaseClientPlanStore.addClientPlan(clientObj)
          } catch (error) {
            console.log(error)
          }
        } catch (error) {
          console.log(error)
        }
      })
    }
    databaseClientPlanStore.plans = []
  }
})
const mode = ref(true)
const swichMode = () => {
  mode.value = !mode.value
}

const sendData = async () => {
  await userStore.updateUser()
  swichMode()
}
const renderByType = (type) => {
  const userType = localStorage.getItem('userType');
  if (type ===userType) return true;
  return false;
}
</script>

<template>
  <section class="dashboard-clients">
    <div v-if="renderByType('client')" class="form-container">
      <div>
        <div class="form-group">
          <label class="title" for="title">Datos de la cuenta</label>
          <button class="button-edit" @click="swichMode()"> Editar datos de contacto </button>

        </div>
        <div class="form-group">
          <label for="email">Correo Electrónico:</label>
          <input :disabled="mode" type="email" id="email" v-model="userStore.user.email" required>
        </div>
        <div class="form-group">
          <label for="name">Nombre:</label>
          <input :disabled="mode" type="text" id="name" v-model="userStore.user.name" required>
        </div>
        <div class="form-group">
          <label for="address">Dirección:</label>
          <input :disabled="mode" type="text" id="address" v-model="userStore.user.address" required>
        </div>
        <div class="form-group">
          <label for="phone">Teléfono:</label>
          <input :disabled="mode" type="text" id="phone" v-model="userStore.user.phone" required>
        </div>
        <div class="form-group">
          <label for="cuit">CUIT:</label>
          <input disabled type="text" id="cuit" v-model="userStore.user.cuit" required>
        </div>
        <div class="form-group">
          <label for="birthdate">Fecha de Nacimiento:</label>
          <input disabled type="text" id="birthdate" v-model="userStore.user.birthdate" required>
        </div>
        <div class="form-group">
          <button type="submit" @click="sendData()">Enviar</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dashboard-clients {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-container {
  background-color: #f5f5f5;
  padding: 40px;
  border-radius: 10px; /* Aumenta el radio del borde */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.title {
  font-weight: bold;
  font-size: 30px;
  margin-bottom: 10px;
}
form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px; /* Aumenta el espacio entre grupos de campo y etiqueta */
}

label {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
}

input {
  padding: 8px; /* Reduce el espacio interior de los campos de entrada */
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 10px;
  margin-left: 10px;
}

button {
  background-color: #3cbeb4;
  color: #fff;
  padding: 12px 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 18px;
  margin-top: 20px;
}

.button-edit {
  background-color: #9e63c4;
  color: #fff;
  padding: 6px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 18px;
  margin-left: 10px;
}

button:hover {
  background-color: #0056b3;
}
</style>
