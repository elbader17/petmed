<script setup>
import ContentBanner from '../components/ContentBanner.vue';
import ContentSeparator from '../components/icons/ContentSeparator.vue';
import imageBanner from '@/assets/img/banner_afiliaciones.jpg';
import imageTitle from '@/assets/img/Afiliaciones.png';
</script>

<template>
  <div>
    <ContentBanner :banner="imageBanner" :title="imageTitle" />
    <div class="affiliations-single">
      <h1>Afiliación PETMED</h1>
      <h2>Seleccione el plan deseado</h2>
      <ul class="content-list">
        <li class="content-item">
        </li>
      </ul>
    </div>
    <div class="affiliations-family">
      <h1>Promos</h1>
      <h1>GRUPO FAMILIAR</h1>
      <ul class="content-list">
        <li class="content-item">
        </li>
      </ul>
    </div>
    <ContentSeparator class="separador-final" />
  </div>
</template>

<style scoped>
.separador-final {
  transform: rotate(180deg) translateY(-0.45rem) rotateY(180deg);
  fill: #3CBEB4;
  width: 100%;
  height: 3.875rem;
}
</style>