<script setup>
import ContentBanner from '../components/ContentBanner.vue';
import ContentSeparator from '../components/icons/ContentSeparator.vue';
import ContactLocation from '../components/ContactLocation.vue';
import ContactTitle from '../components/ContactTitle.vue';
import ContactInfo from '../components/ContactInfo.vue';
import ContactForm from '../components/ContactForm.vue';

import imageBanner from '@/assets/img/contact-banner.jpg';
import imageTitle from '@/assets/img/contacto.png';
</script>

<template>
  <div>
    <ContentBanner :banner="imageBanner" :title="imageTitle" />
    <div class="contact-content">
      <ContactTitle />
      <section class="contact-consult">
        <ContactForm />
        <ContactInfo />
      </section>
      <ContactLocation />
    </div>
    <ContentSeparator class="separator-bottom" />
  </div>
</template>

<style scoped>
.separator-bottom {
  transform: rotate(180deg) translateY(-0.45rem) rotateY(180deg);
  fill: #3CBEB4;
  width: 100%;
  height: 3.875rem;
}

.contact-content {
  display: flex;
  flex-direction: column;
}

.contact-consult {
  max-width: 1140px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  justify-content: space-between;
}

.contact-consult {
  display: flex;
  flex-direction: row;
}

@media all and (max-width: 768px) {
  .contact-consult {
    flex-direction: column;
  }
}
</style>