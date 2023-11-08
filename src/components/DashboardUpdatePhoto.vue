<template>
  <section>
    <label class="form-title" for="photo-url">URL de la foto:</label>
    <input class="form-input" type="text" id="photo-url" name="photo-url" v-model="photoUrl" @change="updatePhoto">

    <div>
      <img :src="photoUrl" alt="Foto" style="max-width: 100%">
    </div>

    <button class="button-save" @click="savePhoto">Guardar</button>
  </section>
</template>

<script>
import { ref } from 'vue';
import { useDatabasePetStore } from '@/stores/databasePet'
const databasePetStore = useDatabasePetStore()

export default {
  props: {
    numAffiliate: {
      type: String,
    }
  },
  setup(props) {
    const photoUrl = ref('');

    function updatePhoto() {
      // Actualiza la imagen cuando cambia la URL
    }

    function savePhoto() {
      databasePetStore.updatePhotoOfPet(props.numAffiliate, photoUrl.value)
    }

    return {
      photoUrl,
      updatePhoto,
      savePhoto
    }
  }
}
</script>