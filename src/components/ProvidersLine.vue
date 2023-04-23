<script setup>
import { ref } from 'vue';

defineProps(['data']);

const openIndexes = ref([]);

const toggleLine = (index) => {
  const i = openIndexes.value.indexOf(index)
  if (i === -1) {
    openIndexes.value.push(index)
  } else {
    openIndexes.value.splice(i, 1)
  }
}

const isOpen = (index) => {
  return openIndexes.value.includes(index)
}
</script>

<template>
  <section class="providers-content">
    <div class="providers-line" v-for="item, index in data" :key="item.id">
      <div class="line-header" @click="toggleLine(index)">
        <font-awesome-icon :icon="isOpen(index) ? 'fa-solid fa-minus' : 'fa-solid fa-plus'" size="lg" />
        <h1 class="line-title">{{ item.name }}</h1>
        <font-awesome-icon icon="fa-solid fa-angle-right" :class="{ 'icon-rotate': isOpen(index), 'icon-rotate-back': !isOpen(index) }" size="lg" />
      </div>
      <transition name="fade">
        <div class="line-content" v-if="isOpen(index)">
          <p class="content-item">{{ item.address }}</p>
          <p class="content-item">{{ item.phone }}</p>
          <p class="content-item">{{ item.location }}</p>
          <p class="content-item">{{ item.specialty }}</p>
        </div>
      </transition>
    </div>
  </section>
</template>

<style scoped>
.providers-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding-top: 4rem;
  margin-bottom: 15rem;
}

.providers-line {
  max-width: 1236px;
  width: 100%;
  padding: 1rem 2rem;
}

.line-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  background: --pm-violet;
  padding: 0.75rem 1.25rem;
}

.line-title {
  font-size: 1rem;
}

.icon-rotate {
  transition: transform 0.5s;
  transform: rotate(90deg);
}

.icon-rotate-back {
  transition: transform 0.5s;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.line-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  background: #F9F9F9;
  border: 1px solid #eee;
}

.content-item {
  background: #ECECEC;
  border: 1px solid #FCFCFC;
  padding: 0.5rem;
}
</style>