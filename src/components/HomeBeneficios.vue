<script setup></script>

<template>
  <div class="benefits">
    <h1 class="benefits-title">¿Por qué afiliar tu mascota a PetMed?</h1>
    <ul class="benefits-list">
      <li class="benefits-item">
        <img src="../assets/img/cobertura-medica-veterinaria.png" class="item-img" alt="Cobertura medica">
        <h2 class="item-text">Amplia cobertura médica veterinaria</h2>
      </li>
      <li class="benefits-item">
        <img src="../assets/img/cartilla-de-prestadores.png" class="item-img" alt="Cartilla de prestadores">
        <h2 class="item-text">Accede a una amplia cartilla de prestadores</h2>
      </li>
      <li class="benefits-item">
        <img src="../assets/img/Petshop.png" class="item-img" alt="Petshop">
        <h2 class="item-text">Beneficios en Petshop, alimentos y peluquería</h2>
      </li>
      <li class="benefits-item">
        <img src="../assets/img/Atencion-las-24hs.png" class="item-img" alt="Atención 24hs">
        <h2 class="item-text">Atención las 24hs para su mascota</h2>
      </li>
      <li class="benefits-item">
        <img src="../assets/img/profesionales.png" class="item-img" alt="Profesionales">
        <h2 class="item-text">Accede a profesionales especializado</h2>
      </li>
      <li class="benefits-item">
        <img src="../assets/img/online.png" class="item-img" alt="Online">
        <h2 class="item-text">Afiliación 100% online</h2>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.benefits {
  width: 90%;
  max-width: 1240px;
  margin: 0 auto;
  text-align: center;
  padding: 3.125rem;
}

.benefits-title {
  color: #f4643c;
  font-size: 1.562rem;
  font-weight: 700;
  margin-bottom: 3rem;
}

.benefits-list {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}

.benefits-item {
  flex-grow: 1;
  flex-basis: 0;
  min-width: 33%;
  list-style-type: none;
  padding: 1rem;
}

.item-img {
  width: 6.15rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease-out 0s;
}

.item-img:hover {
  transform: scale(1.1);
}

.item-text {
  color: #000000;
  font-size: 1.25rem;
  font-weight: 500;
}

@media all and (max-width: 768px) {
  .benefits-list {
    flex-direction: column;
  }
}
</style>