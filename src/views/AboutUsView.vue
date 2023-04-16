<script setup>
import ContentBanner from '../components/ContentBanner.vue';
import ContentSeparator from '../components/icons/ContentSeparator.vue';
import imageBanner from '@/assets/img/banner_nosotros.jpg';
import imageTitle from '@/assets/img/Nosotros.png';
</script>

<template>
  <div class="about-us">
    <ContentBanner :banner="imageBanner" :title="imageTitle" />
    <section class="about-us-content">
      <div class="content-text">
        <p>Hasta hace tiempo, de acuerdo a testimonios veterinarios un amplio porcentaje de casos se vieron condicionados
          por
          el estado terminal de las mascotas, lo que conlleva a pensar sobre el cuidado de éstas hasta el momento previo a
          los
          primeros síntomas.</p>
        <p>Pudimos determinar que los motivos de esta problemática se veían reflejados por la situación socio-económica
          junto
          a una falta de consciencia sobre tenencia responsable.</p>
        <p>A partir de esto, Desde 2019, PetMed (Medicina Prepaga para Mascotas) brinda una amplia cobertura veterinaria a
          través de una excelente red de profesionales asegurando el cuidado y la asistencia de las mascotas bajo planes
          acordes a las necesidades de las mismas y con cuotas accesibles.</p>
      </div>
      <ul class="content-list">
        <li class="content-item">
          <img class="item-title" src="../assets/img/mision.png" alt="Misión">
          <p class="item-text">Brindar Una Cobertura Médica De Confianza Y Calidad Para Mascotas</p>
        </li>
        <li class="content-item">
          <img class="item-title" src="../assets/img/vision.png" alt="Visión">
          <p class="item-text">Que Las Mascotas De Todo El País Puedan Contar Con La Cobertura Médica Para La Prevención
            De Enfermedades Y
            Así
            Obtener Una Mejor Calidad De Vida</p>
        </li>
        <li class="content-item">
          <img class="item-title" src="../assets/img/valores.png" alt="Valores">
          <p class="item-text">Confianza, Seguridad, Empatía, Felicidad</p>
        </li>
      </ul>
    </section>
    <ContentSeparator class="separator-bottom" />
  </div>
</template>

<style scoped>
.about-us {
  background-image: url(@/assets/img/col3.png);
  background-position: bottom right;
  background-repeat: no-repeat;
  background-size: 23rem auto;
}

.about-us-content {
  display: flex;
  flex-direction: column;
  max-width: 1240px;
  width: 100%;
  margin: 0 auto;
  margin-top: 2rem;
  align-items: center;
  text-align: center;
  padding: 3.125rem;
}

.content-text {
  display: flex;
  flex-direction: column;
  max-width: 75%;
}

.content-text p {
  margin-bottom: 1.5rem;
  font-weight: 400;
  font-size: 1.1rem;
}

.content-list {
  display: flex;
  flex-direction: row;
  min-width: 33%;
  margin-top: 3rem;
}

.content-item {
  list-style-type: none;
  flex-grow: 1;
  flex-basis: 0;
  margin: 1.25rem;
}

.item-title {
  width: 90%;
}

.item-text {
  font-weight: 300;
  font-size: 1.25rem;
}

.separator-bottom {
  transform: rotate(180deg) translateY(-0.45rem) rotateY(180deg);
  fill: #3CBEB4;
  width: 100%;
  height: 3.875rem;
}

@media all and (max-width: 768px) {
  .about-us {
    background-size: 15rem auto;
  }

  .about-us-content {
    padding: 3.125rem 0rem;
  }

  .content-list {
    flex-direction: column;
  }

  .item-title {
    width: 18rem;
  }
}
</style>