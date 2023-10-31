<script setup>
import { ref } from 'vue';

const affiliatePet = ref({
  name: '',
  birthdate: '',
  animal: '',
  breed: '',
  sex: '',
  castrated: '',
  plan: '',
  pathologies: '',
  photo: ''
})
</script>

<template>
  <section class="affiliate-pet">
    <h2 class="affiliate-title">Detalles de la mascota</h2>
    <form class="affiliate-form">

      <div class="form-row">
        <div class="row-input">
          <label class="form-label" for="name">Nombre:</label>
          <input class="form-input" type="string" id="name" v-model="affiliatePet.name" name="name" />
        </div>
        <div class="row-input">
          <label class="form-label" for="birthdate">Fecha de nacimiento:</label>
          <input class="form-input" type="date" id="birthdate" v-model="affiliatePet.birthdate" name="birthdate" />
        </div>
      </div>

      <div class="form-row">
        <div class="row-input">
          <label class="form-label" for="animal">Tipo:</label>
          <select class="form-input" id="animal" v-model="affiliatePet.animal" name="animal">
            <option value="Perro">Perro</option>
            <option value="Gato">Gato</option>
          </select>
        </div>
        <div class="row-input">
          <label class="form-label" for="breed">Raza:</label>
          <input class="form-input" type="string" id="breed" v-model="affiliatePet.breed" name="breed" />
        </div>
        <div class="row-input">
          <label class="form-label" for="sex">Sexo:</label>
          <select class="form-input" id="sex" v-model="affiliatePet.sex" name="sex">
            <option value="Macho">Macho</option>
            <option value="Hembra">Hembra</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="row-input">
          <label class="form-label" for="castrated">Castrado:</label>
          <select class="form-input" id="castrated" v-model="affiliatePet.castrated" name="castrated">
            <option value="Si">Si</option>
            <option value="No">No</option>
          </select>
        </div>
        <div class="row-input">
          <label class="form-label" for="plan">Plan:</label>
          <select class="form-input" id="plan" v-model="affiliatePet.plan" name="plan">
            <option value="Plan 1005">Plan 1005</option>
            <option value="Plan 2010">Plan 2010</option>
            <option value="Plan 3015">Plan 3015</option>
          </select>
        </div>
      </div>

      <label class="form-label" for="pathologies">Patologías crónicas y afines:</label>
      <textarea class="form-input" type="string" id="pathologies" v-model="affiliatePet.pathologies" name="pathologies"
        placeholder="En caso de no contar con patologías, escribir 'No'" />

      <label class="form-label" for="photo">Foto:</label>
      <input class="form-input" type="string" id="photo" v-model="affiliatePet.photo" name="photo" />

      <RouterLink :to="{ name: 'home' }" class="info-link">
        <button class="form-submit" type="submit">Enviar</button>
      </RouterLink>
    </form>
  </section>
</template>

<style scoped>
.affiliate-pet {
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