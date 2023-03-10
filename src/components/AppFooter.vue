<script setup></script>

<template>
  <div>
    <div>
      <img class="logo-footer" src="../assets/img/Recurso-2-866x1024.png" alt="PetMed logo blanco">
    </div>
    <div>
      <h2>Contacto</h2>
      <ul>
        <li>
          <font-awesome-icon icon="fa-solid fa-envelope" size="lg" />
          <h3>ventas@petmed.ar</h3>
        </li>
        <li>
          <font-awesome-icon icon="fa-brands fa-whatsapp" size="lg" />
          <h3>+54 358 517-6454</h3>
        </li>
      </ul>
    </div>
    <div>
      <h2>Dirección</h2>
      <font-awesome-icon icon="fa-solid fa-location-dot" size="lg" />
      <h3>Ituzaingó 1348, Río Cuarto, Cba</h3>
    </div>
    <div>
      <h2>Seguinos en</h2>
      <ul>
        <li><font-awesome-icon icon="fa-brands fa-instagram" size="2x" /></li>
        <li><font-awesome-icon icon="fa-brands fa-facebook" size="2x" /></li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
* {
  background-color: #8D57B0;
  color: #fff;
  font-weight: 300;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-footer {
  width: 6.55rem;
}

h2 {
  font-size: 1.25rem;
}

h3 {
  font-size: 0.875rem;
}

ul {}

li {
  list-style-type: none;
}
</style>