<script setup></script>

<template>
  <div class="plans">
    <div class="plans-header">
      <h1 class="plans-title">Nuestros Planes</h1>
      <h2 class="plans-subtitle">A La Medida De Tu Mascota</h2>
    </div>
    <ul class="plans-list">
      <li class="list-item">
        <figure><img src="../assets/img/c1.jpg" alt=""></figure>
        <div>
          <h1>Plan 1005</h1>
          <p>Ver mas beneficios</p>
        </div>
      </li>
      <li class="list-item">
        <figure><img src="../assets/img/c2.jpg" alt=""></figure>
        
        <h1>Plan 2010</h1>
        <p>Ver mas beneficios</p>
      </li>
      <li class="list-item">
        <img src="../assets/img/c3.jpg" alt="">
        <h1>Plan 3015</h1>
        <p>Ver mas beneficios</p>
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
  background-color: #3CBEB4;
}

.list-item {
  height: auto;
  width: 100%;
  list-style-type: none;
}
</style>