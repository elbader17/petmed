<script setup>
import { RouterLink } from 'vue-router';
import SeparadorContenido from './icons/SeparadorContenido.vue';
</script>

<template>
  <div class="plans">
    <div class="plans-header">
      <h1 class="plans-title">Nuestros Planes</h1>
      <h2 class="plans-subtitle">A La Medida De Tu Mascota</h2>
      <SeparadorContenido class="separador-intermedio"/>
    </div>
    <ul class="plans-list">
      <li class="list-item">
        <div class="item-img">
          <img src="../assets/img/c1.jpg" alt="Plan 1005">
        </div>
        <div class="item-info">
          <h1 class="info-title">Plan 1005</h1>
          <RouterLink to="/planes">
            <p class="info-link">Ver mas beneficios</p>
          </RouterLink>
        </div>
      </li>
      <li class="list-item">
        <div class="item-img">
          <img src="../assets/img/c2.jpg" alt="Plan 2010">
        </div>
        <div class="item-info">
          <h1 class="info-title">Plan 2010</h1>
          <RouterLink to="/planes">
            <p class="info-link">Ver mas beneficios</p>
          </RouterLink>
        </div>
      </li>
      <li class="list-item">
        <div class="item-img">
          <img src="../assets/img/c3.jpg" alt="Plan 3015">
        </div>
        <div class="item-info">
          <h1 class="info-title">Plan 3015</h1>
          <RouterLink to="/planes">
            <p class="info-link">Ver mas beneficios</p>
          </RouterLink>
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-image: url(../assets/img/col3.png);
  background-position: bottom right;
  background-repeat: no-repeat;
  background-size: 14rem auto;
  opacity: 0.97;
  height: 10.5rem;
  margin-top: 3rem;
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

.separador-intermedio {
  transform: rotate(180deg) translateY(-0.25rem) rotateY(180deg);
  fill: #3CBEB4;
  width: 100%;
  height: 3.875rem;
}

.plans-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background-color: #3CBEB4;
}

.list-item {
  /* flex-grow: 1;
  flex-basis: 0;
  width: 34vw;
  height: 48vh; */
  width: 450px;
  height: 450px;
  list-style-type: none;
  background-size: cover;
  overflow: hidden;
}

.item-img {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.item-img img {
  position: absolute;
  display: block;
  transform: translateX(-2rem);
  transition: transform 0.3s ease;
}

.list-item:hover .item-img img {
  transform: translateX(0rem);
  transition: transform 0.3s ease;
}

.item-info {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 1rem;
  box-sizing: border-box;
  overflow: hidden;
  transform: translateY(-16rem);
  transition: transform 0.3s ease;
}

.list-item:hover .item-info {
  transform: translateY(-18rem);
}

.info-title {
  color: #FFFF;
  font-weight: 400;
  padding-bottom: 10rem;
}

a {
  text-decoration: none;
}

.info-link {
  color: #FFFF;
  font-weight: 300;
  opacity: 0;
  transition: 0.3s ease;
}

.list-item:hover .info-link {
  opacity: 1;
  transition: 0.3s ease;
}
</style>