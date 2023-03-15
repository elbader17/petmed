<script setup>
</script>

<template>
  <header class="navbar-info">
    <div class="navbar-info-container">
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
      <ul class="follow-list">
        <li class="follow-item">
          <a href="http://www.instagram.com/petmed.ar" class="item-link">
            <font-awesome-icon icon="fa-brands fa-instagram" size="xl" class="item-icon" />
          </a>
        </li>
        <li class="follow-item">
          <a href="https://www.facebook.com/petmed.ar" class="item-link">
            <font-awesome-icon icon="fa-brands fa-facebook" size="xl" class="item-icon" />
          </a>
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped>
.navbar-info {
  background-color: #FF6438;
  background-image: url('../assets/img/trr2.png');
  background-position: center center;
  background-blend-mode: soft-light;
}

.navbar-info-container {
  width: 90%;
  max-width: 1240px;
  margin: 0 auto;
  color: #fff;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem 1.25rem;
  
}

.contact-list {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.follow-list {
  list-style-type: none;
  display: flex;
}

.contact-item {
  display: flex;
  margin: 0.2rem;
}

.item-text {
  font-size: 0.875rem;
  font-weight: 300;
  margin-left: 0.5rem;
}

.follow-item .item-icon {
  color: #fff;
  margin: 0.5rem;
}
</style>