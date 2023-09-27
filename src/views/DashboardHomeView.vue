<script setup>
import { useUserStore } from '@/stores/user';
import { useDatabaseUserStore } from '@/stores/databaseUser';
import { useDatabasePetStore } from '@/stores/databasePet';
import { useDatabaseClientPlanStore } from '@/stores/databaseClientPlan';
import { onBeforeMount, onMounted } from 'vue';
import { auth } from '@/firebaseConfig';

const userStore = useUserStore();
const databaseUserStore = useDatabaseUserStore();
const databasePetStore = useDatabasePetStore();
const databaseClientPlanStore = useDatabaseClientPlanStore();

onBeforeMount(async () => {
  try {
    databaseUserStore.readClient(auth.currentUser.uid);
  } catch (error) {
    console.log(error);
  }
});

onMounted(async () => {
  await databaseUserStore.readClient(auth.currentUser.uid);
  const client = databaseUserStore.client;

  if (client.type !== 'client') {
    console.log('Todo Ok');
  } else {
    try {
      databasePetStore.pets = [];
      await databasePetStore.getPets(client.id, client.name);
    } catch (error) {
      console.log(error);
    }
    const pets = databasePetStore.pets;

    try {
      databaseClientPlanStore.plansClient = [];
      await databaseClientPlanStore.getPlansUser(client.id);
    } catch (error) {
      console.log(error);
    }
    const plansUser = databaseClientPlanStore.plansClient;

    if (Object.keys(plansUser).length !== 0) {
      console.log('Ya posee planes');
      return
    } else {
      pets.forEach(async (pet) => {
        try {
          const currentDate = new Date();
          const date = currentDate.toISOString().slice(0, 16);

          let planName = ''
          switch (pet.plan) {
            case 'Plan 1005':
              planName = '1005';
              break;
            case 'Plan 2010':
              planName = '2010';
              break;
            case 'Plan 3015':
              planName = '3015';
              break;
            default:
              planName = pet.plan;
              break;
          }

          const clientObj = {
            client: client.id,
            plan: planName,
            date: date,
            paid: true,
            petId: pet.id,
            petName: pet.name,
            numAffiliate: pet.numAffiliate
          }

          try {
            await databaseClientPlanStore.addClientPlan(clientObj)
          } catch (error) {
            console.log(error);
          }

        } catch (error) {
          console.log(error);
        }
      });
    }
    databaseClientPlanStore.plans = [];
  }
})

</script>

<template>
  <section class="dashboard-clients">
    <h1 class="clients-title">Home</h1>
    <p>Usted se ha iniciado sección con el correo:</p>
    <p>{{ userStore.userData?.email }}</p>
  </section>
</template>

<style scoped>
.dashboard-clients {
  display: flex;
  flex-direction: column;
  max-width: 860px;
  margin: 0 auto;
}

.clients-title {
  padding: 0.5rem;
  font-weight: 700;
  font-size: 1.75rem;
}
</style>