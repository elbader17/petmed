<script setup></script>

<template>
  <section class="contact-location">
    <h2 class="location-title">Ubicación</h2>
    <p class="location-text">Ituzaingó 1348, X5800 Río Cuarto, Córdoba</p>
    <div class="location-map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3341.2726718720965!2d-64.36190308427244!3d-33.12820038843288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d201bc4f826405%3A0xf1f15cb8429ca7b3!2sPetMed%20Medicina%20Prepaga%20para%20Mascotas!5e0!3m2!1ses-419!2sar!4v1680375548003!5m2!1ses-419!2sar"
        width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  </section>
</template>

<style scoped>
.contact-location {
  max-width: 1140px;
  width: 100%;
  margin: 0 auto;
  padding: 1rem 2rem;
}

.location-title {
  color: #ff7f50;
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  line-height: 1rem;
  letter-spacing: 0.05rem;
}

.location-text {
  font-size: 1rem;
  padding: 1rem 0;
}
</style>