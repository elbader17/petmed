<script setup></script>

<template>
  <section class="contact-info">
    <ul class="contact-list">
      <li class="contact-item">
        <font-awesome-icon icon="fa-solid fa-envelope" size="2x" class="item-icon" />
        <div class="item-info">
          <h3 class="item-title">Email</h3>
          <h3 class="item-text">ventas@petmed.ar</h3>
        </div>
      </li>
      <li class="contact-item">
        <font-awesome-icon icon="fa-brands fa-whatsapp" size="2x" class="item-icon" />
        <div class="item-info">
          <h3 class="item-title">Teléfono</h3>
          <h3 class="item-text">+54 358 517-6454</h3>
        </div>
      </li>
    </ul>
    <h2 class="social-title">Redes Sociales</h2>
    <ul class="social-list">
      <li class="social-icon">
        <a href="https://www.facebook.com/petmed.ar">
          <font-awesome-icon icon="fa-brands fa-facebook" size="2x" class="icon-link" />
        </a>
      </li>
      <li class="social-icon">
        <a href="https://www.instagram.com/petmed.ar">
          <font-awesome-icon icon="fa-brands fa-instagram" size="2x" class="icon-link" />
        </a>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.contact-info {
  display: flex;
  flex-direction: column;
  background-color: #f7f7f7;
  padding: 2rem;
}

.contact-list {
  padding-bottom: 1rem;
}

.contact-item {
  display: flex;
  padding: 1rem 0;
}

.social-title {
  padding-left: 1rem;
  border-style: solid;
  border-width: 0rem 0rem 0rem 0.25rem;
  border-color: #ff7f50;
}

.social-list {
  display: flex;
}

.item-icon {
  border-radius: 50%;
  color: #fff;
  background-color: #FF6438;
  padding: 1rem;
}

.item-info {
  padding-left: 1rem;
}

.item-title {
  font-weight: 700;
  font-size: 1rem;
  color: #ff7f50;
  margin-bottom: 0.75rem;
}

.item-text {
  font-weight: 300;
  font-size: 1rem;
}

.social-icon {
  list-style-type: none;
}

.icon-link {
  color: #FF6438;
  padding-top: 1rem;
  padding-right: 1rem;
}

@media all and (max-width: 768px) {
  .contact-info {
    align-items: center;
  }
}
</style>