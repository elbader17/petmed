<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="plans">
    <div class="plans-header">
      <h1 class="plans-title">Nuestros Planes</h1>
      <h2 class="plans-subtitle">A La Medida De Tu Mascota</h2>
    </div>
    <ul class="plans-list">
      <li class="list-item">
        <img src="../assets/img/c1.jpg" class="item-img" alt="Plan 1005">
        <div class="item-info">
          <h1 class="info-title">Plan 1005</h1>
          <RouterLink to="/planes"><p class="info-link">Ver mas beneficios</p></RouterLink>
        </div>
      </li>
      <li class="list-item">
        <img src="../assets/img/c2.jpg" class="item-img" alt="Plan 2010">
        <div class="item-info">
          <h1 class="info-title">Plan 2010</h1>
          <RouterLink to="/planes"><p class="info-link">Ver mas beneficios</p></RouterLink>
        </div>
      </li>
      <li class="list-item">
        <img src="../assets/img/c3.jpg" class="item-img" alt="Plan 3015">
        <div class="item-info">
          <h1 class="info-title">Plan 3015</h1>
          <RouterLink to="/planes"><p>Ver mas beneficios</p></RouterLink>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.plans {
  text-align: center;
}

.plans-header {
  background-image: url(../assets/img/col3.png);
  background-position: bottom right;
  background-repeat: no-repeat;
  background-size: 14rem auto;
  opacity: 0.97;
  height: 10.5rem;
}

.plans-title {
  color: #000000;
  font-size: 2.3rem;
  font-weight: 700;
  text-transform: capitalize;
}

.plans-subtitle {
  color: #000000;
  font-size: 1.25rem;
  font-weight: 300;
  text-transform: capitalize;
}

.plans-list {
  display: flex;
  width: 100%;
  background-color: #3CBEB4;
}

.list-item {
  width: 27.2rem;
  list-style-type: none;
  text-align: left;
  overflow: hidden;
}

.item-img {
  width: 30rem;
}

.item-info {
  height: 22.2rem;
  width: 27.2rem;
  color: #FFFF;
  padding: 1rem;
  box-sizing: border-box;
  position: absolute;
  background: rgb(27, 27, 27, .5);
  bottom: -53.66rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.info-title {
  font-weight: 400;
}

a {
  color: #FFFF;
  text-decoration: none;
  font-weight: 300;
}
</style>