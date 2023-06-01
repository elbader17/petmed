<script setup>
import { ref } from 'vue'
const validate = ref({
  send: false,
  style: 'disabled',
  textButton: 'Verificar'
})

const ok = () => {
  validate.value.send = true
  validate.value.style = 'enabled'
  validate.value.textButton = 'Verificando...'
  setTimeout(() => {
    validate.value.send = false
    validate.value.style = 'disabled'
    validate.value.textButton = 'Verificar'
  }, 3000)
}
</script>

<template>
  <form>
    <section>
      <h2>Fecha y Veterinaria</h2>
      <label for="fecha">Fecha:</label>
      <input type="date" id="fecha" name="fecha" />

      <label for="veterinaria">Veterinaria:</label>
      <input type="text" id="veterinaria" name="veterinaria" />
    </section>

    <section>
      <h2>Socio, Plan y Consulta</h2>
      <label for="socio">Socio:</label>
      <input disabled type="text" id="socio" name="socio" />

      <label for="plan">Plan:</label>
      <input disabled type="text" id="plan" name="plan" />

      <label for="responsable">Responsable:</label>
      <input disabled type="text" id="responsable" name="responsable" />

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
      <textarea id="anamnesis" name="anamnesis"></textarea>

      <label for="temperatura">Temperatura:</label>
      <input type="text" id="temperatura" name="temperatura" />

      <label for="fc">FC:</label>
      <input type="text" id="fc" name="fc" />

      <label for="fr">FR:</label>
      <input type="text" id="fr" name="fr" />

      <label for="mucosa">Estado de Mucosa:</label>
      <input type="text" id="mucosa" name="mucosa" />

      <label for="piel_anexos">Estado de Piel y Anexos:</label>
      <input type="text" id="piel_anexos" name="piel_anexos" />

      <label for="reflejos">Reflejos:</label>
      <input type="text" id="reflejos" name="reflejos" />

      <label for="ganglios">Ganglios Principales:</label>
      <input type="text" id="ganglios" name="ganglios" />

      <label for="cabeza_cuello">Cabeza y Cuello:</label>
      <input type="text" id="cabeza_cuello" name="cabeza_cuello" />

      <label for="miembros_anteriores">Miembros Anteriores:</label>
      <input type="text" id="miembros_anteriores" name="miembros_anteriores" />

      <label for="miembros_posteriores">Miembros Posteriores:</label>
      <input type="text" id="miembros_posteriores" name="miembros_posteriores" />

      <label for="torax">Tórax:</label>
      <input type="text" id="torax" name="torax" />

      <label for="abdomen">Abdomen:</label>
      <input type="text" id="abdomen" name="abdomen" />

      <label for="estudios">Estudios Complementarios:</label>
      <input type="text" id="estudios" name="estudios" />

      <label for="observaciones">Observaciones:</label>
      <textarea id="observaciones" name="observaciones"></textarea>
    </section>

    <section>
      <h2>Verificación</h2>
      <label for="codigo">Código de Verificación del Socio:</label>
      <input type="text" id="codigo" name="codigo" />

      <button @click="ok()" class="buttonVerificar" type="button">{{ validate.textButton }}</button>
    </section>

    <input :disabled="validate.send" type="button" :class="validate.style" value="Enviar" />
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
