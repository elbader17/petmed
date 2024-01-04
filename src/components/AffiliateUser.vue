<script setup>
import { ref } from 'vue';
import { useDatabaseUserStore } from '@/stores/databaseUser';

const databaseUserStore = useDatabaseUserStore();

const affiliateUser = ref({
  name: '',
  surname: '',
  cuit: '',
  birthdate: '',
  email: '',
  address: '',
  city: '',
  phone: ''
});

const resetForm = () => {
  affiliateUser.value = {
    name: '',
    surname: '',
    cuit: '',
    birthdate: '',
    email: '',
    address: '',
    city: '',
    phone: ''
  };
};

const handleSubmit = () => {
  try {
    databaseUserStore.addClient(affiliateUser.value).then(() => {
      resetForm()
    })
  } catch (error) {
    console.log(error)
  };
};
</script>

<template>
  <section class="affiliate-user">
    <h2 class="affiliate-title">Detalles del cliente</h2>
    <form class="affiliate-form" @submit.prevent="handleSubmit">

      <div class="form-row">
        <div class="row-input">
          <label class="form-label" for="name">Nombre:</label>
          <input class="form-input" type="string" id="name" v-model="affiliateUser.name" name="name" />
        </div>
        <div class="row-input">
          <label class="form-label" for="surname">Apellido:</label>
          <input class="form-input" type="string" id="surname" v-model="affiliateUser.surname" name="surname" />
        </div>
      </div>

      <label class="form-label" for="cuit">DNI/CUIT:</label>
      <input class="form-input" type="string" id="cuit" v-model="affiliateUser.cuit" name="cuit" />

      <label class="form-label" for="birthdate">Fecha de nacimiento:</label>
      <input class="form-input" type="date" id="birthdate" v-model="affiliateUser.birthdate" name="birthdate" />

      <label class="form-label" for="email">Correo electrónico:</label>
      <input class="form-input" type="string" id="email" v-model="affiliateUser.email" name="email" />

      <div class="form-row">
        <div class="row-input">
          <label class="form-label" for="address">Dirección:</label>
          <input class="form-input" type="string" id="address" v-model="affiliateUser.address" name="address" />
        </div>
        <div class="row-input">
          <label class="form-label" for="city">Localidad / Ciudad:</label>
          <input class="form-input" type="string" id="city" v-model="affiliateUser.city" name="city" />
        </div>
      </div>

      <label class="form-label" for="phone">Teléfono:</label>
      <input class="form-input" type="string" id="phone" v-model="affiliateUser.phone" name="phone" />

      <RouterLink :to="{ name: 'afiliacion-mascota' }" class="info-link">
        <button class="form-submit" type="submit">Enviar</button>
      </RouterLink>
    </form>
  </section>
</template>

<style scoped>
.affiliate-user {
  max-width: 840px;
  width: 100%;
  margin: 0 auto;
  padding: 3.125rem;
}

.affiliate-title {
  font-weight: 600;
  font-size: 1.25rem;
  letter-spacing: 0.05rem;
  padding-bottom: 1rem;
}

.affiliate-form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.form-label {
  margin-bottom: .15rem;
}

.form-input {
  border-color: #0201013B;
  border-radius: 0.25rem;
  margin-bottom: 0.75rem;
  padding: 0.25rem;
  width: 100%;
}

.form-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.row-input {
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
}

.form-submit {
  color: #ffffff;
  background-color: #ff7f50;
  font-size: 1rem;
  padding: 0.75rem 1.25rem;
  margin-top: 2rem;
  border: hidden;
  cursor: pointer;
}
</style>