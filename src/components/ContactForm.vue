<script setup></script>

<template>
  <div class="contact-form">
    <h2 class="consult-title">Formulario de consultas</h2>
    <form class="consult-form" action="https://formsubmit.co/6b81ecdb38e750ad367e0538f78be924" method="POST">
      <input class="form-item" type="text" name="Nombre" placeholder="Nombre y Apellido" required>
      <input class="form-item" type="text" name="Teléfono" placeholder="Teléfono" required>
      <input class="form-item" type="email" name="Email" placeholder="Email" required>
      <textarea class="form-textarea" name="Consulta" placeholder="Consulta" rows="4" required></textarea>
      <input type="hidden" name="_captcha" value="false">
      <input type="hidden" name="_template" value="table">
      <input type="hidden" name="_next" value="http://localhost:5173/contacto">
      <button class="form-submit" type="submit">Enviar</button>
    </form>
  </div>
</template>

<style scoped>
.contact-form {
  padding-right: 2rem;
  padding-bottom: 2rem;
  width: 100%;
}

.consult-title {
  font-weight: 600;
  font-size: 1.25rem;
  letter-spacing: 0.05rem;
  padding-bottom: 1rem;
}

.consult-form {
  display: flex;
  flex-direction: column;
}

.form-item,
.form-textarea {
  border-color: #0201013B;
  border-radius: 0.25rem;
  margin-bottom: 0.75rem;
  padding: 0.75rem;
}

.form-textarea {
  resize: vertical;
}

.form-submit {
  color: #ffffff;
  background-color: #ff7f50;
  font-size: 1rem;
  padding: 0.75rem 1.25rem;
  border: hidden;
}

@media all and (max-width: 768px) {
  .contact-form {
    padding-right: 0;
  }
}
</style>