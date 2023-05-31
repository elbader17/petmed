<script setup>
defineProps(['modalActive']);

const emit = defineEmits(['closeModal'])
</script>

<template>
  <transition name="modal-animation">
    <div v-show="modalActive" class="modal">
      <transition name="modal-animation-inner">
        <div v-show="modalActive" class="modal-inner">
          <font-awesome-icon icon="fa-solid fa-circle-xmark" size="lg" @click="emit('closeModal')" />
          <slot></slot>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped></style>