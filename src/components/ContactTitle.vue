<script setup>
import contactImg from '@/assets/img/contact-background.jpg';
</script>

<template>
  <section class="contact-title">
    <img class="title-image" :src="contactImg" alt="Imagen titulo">
    <div class="title-content">
      <h1 class="content-title">Datos De Contacto</h1>
      <h3 class="content-subtitle">Comunicate con nosotros por consultas o presupuestos y te responderemos a la
        brevedad.</h3>
    </div>
  </section>
</template>

<style scoped>
.contact-title {
  min-height: 15rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.title-image {
  height: 99%;
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
  object-fit: cover;
  z-index: -1;
  direction: ltr;
}

.title-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  padding: 4.7rem;
  background: rgba(255, 255, 255, 0.95);
}

.content-title {
  font-weight: 700;
  font-size: 2.5rem;
  text-transform: capitalize;
}

.content-subtitle {
  font-weight: 300;
  font-size: 1.25rem;
}
</style>