<script setup></script>

<template>
  <div class="benefits">
    <h1 class="benefits-title">¿Por qué afiliar tu mascota a PetMed?</h1>
    <ul class="benefits-list">
      <li class="benefits-item">
        <img src="../assets/img/cobertura-medica-veterinaria.png" class="item-img" alt="Cobertura medica">
        <h2>Amplia cobertura médica veterinaria</h2>
      </li>
      <li class="benefits-item">
        <img src="../assets/img/cartilla-de-prestadores.png" class="item-img" alt="Cartilla de prestadores">
        <h2 class="item-text">Accede a una amplia cartilla de prestadores</h2>
      </li>
      <li class="benefits-item">
        <img src="../assets/img/Petshop.png" class="item-img" alt="Petshop">
        <h2 class="item-text">Beneficios en Petshop, alimentos y peluquería</h2>
      </li>
    </ul>
    <ul class="benefits-list">
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
  text-align: center;
  width: 70%;
  margin: 0 auto;
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
}

.benefits-item {
  width: 100vh;
  position: relative;
  list-style-type: none;
  padding: 1rem;
}

.item-img {
  width: 6.15rem;
}

.item-text {
  color: #000000;
  font-size: 1.25rem;
  font-weight: 500;
}
</style>