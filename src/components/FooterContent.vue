<script setup></script>

<template>
  <section class="footer">
    <div class="footer-container">
      <img class="footer-logo" src="../assets/img/Recurso-2-866x1024.png" alt="PetMed logo blanco">
      <section class="footer-contact">
        <h2 class="contact-title">Contacto</h2>
        <ul class="contact-list">
          <li class="contact-item">
            <font-awesome-icon icon="fa-solid fa-envelope" size="lg" class="item-icon" />
            <h3 class="item-text">ventas@petmed.ar</h3>
          </li>
          <li class="contact-item">
            <font-awesome-icon icon="fa-brands fa-whatsapp" size="lg" class="item-icon" />
            <h3 class="item-text">+54 358 517-6454</h3>
          </li>
        </ul>
      </section>
      <section class="footer-direction">
        <h2 class="direction-title">Dirección</h2>
        <ul class="direction-list">
          <li class="direction-item">
            <font-awesome-icon icon="fa-solid fa-location-dot" size="lg" class="item-icon" />
            <a href="https://goo.gl/maps/Y7kbXBjigwZuRJFX9" target="_blank" class="item-link">
              <h3 class="item-text">Ituzaingó 1348, Río Cuarto, Cba</h3>
            </a>
          </li>
        </ul>
      </section>
      <section class="footer-follow">
        <h2 class="follow-title">Seguinos en</h2>
        <ul class="follow-list">
          <li class="follow-item">
            <a href="https://www.instagram.com/petmed.ar" target="_blank" class="item-link">
              <font-awesome-icon icon="fa-brands fa-instagram" size="2x" class="item-icon" />
            </a>
          </li>
          <li class="follow-item">
            <a href="https://www.facebook.com/petmed.ar" target="_blank" class="item-link">
              <font-awesome-icon icon="fa-brands fa-facebook" size="2x" class="item-icon" />
            </a>
          </li>
        </ul>
      </section>
    </div>
  </section>
</template>

<style scoped>
.footer {
  background-color: #9E63C4;
  background-image: url('../assets/img/trr2.png');
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
  background-blend-mode: soft-light;
}

.footer-container {
  max-width: 1240px;
  width: 100%;
  margin: 0 auto;
  color: #fff;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1rem;
}

.footer-contact,
.footer-direction,
.footer-follow {
  padding: 0.25rem;
  display: flex;
  flex-direction: column;
}

.footer-logo {
  height: 5.95rem;
  width: auto;
}

.follow-list {
  list-style-type: none;
  display: flex;
}

.contact-item,
.direction-item {
  list-style-type: none;
  display: flex;
  margin-top: 0.5rem;
}

.contact-title,
.direction-title,
.follow-title {
  font-size: 1.25rem;
  font-weight: 300;
  margin-bottom: 1rem;
}

.item-text {
  font-size: 0.875rem;
  font-weight: 300;
  margin-left: 0.5rem;
}

.direction-item .item-link {
  text-decoration: none;
  color: #fff;
}

.follow-item .item-icon {
  color: #fff;
  margin-right: 1rem;
}

@media all and (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    align-content: center;
    align-items: center;
  }

  .footer-contact,
  .footer-direction,
  .footer-follow {
    align-items: center;
  }

  .contact-title,
  .direction-title,
  .follow-title {
    margin-top: 1.25rem;
    margin-bottom: 0.05rem;
  }

  .follow-item .item-icon {
    margin: 0.35rem;
  }
}
</style>