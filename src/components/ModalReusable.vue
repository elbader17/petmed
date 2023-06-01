<script setup>
defineProps(['modalActive']);

const emit = defineEmits(['closeModal'])
</script>

<template>
  <transition name="modal-animation">
    <div v-show="modalActive" class="modal">
      <transition name="modal-animation-inner">
        <div v-show="modalActive" class="modal-inner">
          <div class="modal-button">
            <font-awesome-icon icon="fa-solid fa-circle-xmark" size="2x" @click="emit('closeModal')"
              class="button-close" />
          </div>
          <slot></slot>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.75);
}

.modal-inner {
  position: relative;
  max-width: 640px;
  width: 80%;
  background-color: #fff;
  box-shadow: 0 1rem 1.75rem rgba(0, 0, 0, 0.5);
  padding: 1.5rem;
  border-radius: 1.25rem;
}

.modal-button {
  display: flex;
  justify-content: flex-end;
}

.button-close {
  justify-content: flex-end;
  border: none;
  color: #9E63C4;
  background: none;
  cursor: pointer;
}

.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}

.modal-animation-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-animation-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-animation-inner-leave-to {
  transform: scale(0.8);
}
</style>