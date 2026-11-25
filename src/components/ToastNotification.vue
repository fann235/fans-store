<script setup>
defineProps({
  message: String,
  visible: Boolean
});
</script>

<template>
  <Transition name="slide">
    <div v-if="visible" class="toast">
      <span>✅</span>
      <p>{{ message }}</p>
    </div>
  </Transition>
</template>

<style scoped>
.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: #1e293b;
  border-left: 4px solid var(--success);
  color: white;
  padding: 14px 20px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 300;
  font-weight: 500;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
