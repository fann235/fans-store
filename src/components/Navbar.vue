<script setup>
defineProps({
  activeTab: String,
  cartCount: Number,
  wishlistCount: Number,
  libraryCount: Number
});

defineEmits(['change-tab']);
</script>

<template>
  <header class="navbar">
    <div class="container nav-content">
      <div class="brand" @click="$emit('change-tab', 'store')">
        <span class="brand-icon">⚡</span>
        <span class="brand-text">FANS<span class="highlight">STORE</span></span>
      </div>

      <nav class="nav-links">
        <button
          :class="['nav-btn', { active: activeTab === 'store' }]"
          @click="$emit('change-tab', 'store')"
        >
          Store
        </button>

        <button
          :class="['nav-btn', { active: activeTab === 'wishlist' }]"
          @click="$emit('change-tab', 'wishlist')"
        >
          Wishlist
          <span v-if="wishlistCount > 0" class="badge secondary">{{ wishlistCount }}</span>
        </button>

        <button
          :class="['nav-btn', { active: activeTab === 'library' }]"
          @click="$emit('change-tab', 'library')"
        >
          My Library
          <span v-if="libraryCount > 0" class="badge success">{{ libraryCount }}</span>
        </button>

        <button
          :class="['nav-btn cart-btn', { active: activeTab === 'cart' }]"
          @click="$emit('change-tab', 'cart')"
        >
          🛒 Cart
          <span class="badge primary">{{ cartCount }}</span>
        </button>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  background: rgba(19, 26, 42, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: 1px;
}

.brand-icon {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  padding: 4px 9px;
  border-radius: 8px;
  font-size: 1.1rem;
}

.highlight {
  color: var(--accent);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-btn {
  background: transparent;
  color: var(--text-muted);
  padding: 8px 14px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 6px;
}

.nav-btn:hover {
  color: var(--text-main);
  background: rgba(255, 255, 255, 0.05);
}

.nav-btn.active {
  color: var(--text-main);
  background: rgba(99, 102, 241, 0.18);
  border: 1px solid rgba(99, 102, 241, 0.4);
}

.cart-btn {
  background: var(--bg-input);
  color: var(--text-main);
}

.badge {
  font-size: 0.75rem;
  padding: 2px 7px;
  border-radius: 999px;
  font-weight: 700;
}

.badge.primary { background: var(--primary); color: white; }
.badge.secondary { background: var(--warning); color: #000; }
.badge.success { background: var(--success); color: #000; }

@media (max-width: 640px) {
  .brand-text { font-size: 1.1rem; }
  .nav-btn { padding: 6px 10px; font-size: 0.85rem; }
}
</style>
