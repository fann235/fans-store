<script setup>
defineProps({
  product: Object,
  isWishlisted: Boolean
});

defineEmits(['add-to-cart', 'toggle-wishlist', 'view-detail']);

const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
};
</script>

<template>
  <div class="card">
    <div class="image-wrapper" @click="$emit('view-detail', product)">
      <img :src="product.image" :alt="product.title" loading="lazy" />
      <span v-if="product.discount > 0" class="discount-tag">-{{ product.discount }}%</span>
      <span class="category-tag">{{ product.category }}</span>
    </div>

    <div class="card-body">
      <div class="meta-row">
        <span class="platform">{{ product.platform }}</span>
        <span class="rating">⭐ {{ product.rating }}</span>
      </div>

      <h3 class="title" @click="$emit('view-detail', product)">{{ product.title }}</h3>

      <div class="price-box">
        <span v-if="product.discount > 0" class="old-price">
          {{ formatRupiah(product.originalPrice) }}
        </span>
        <span class="current-price">{{ formatRupiah(product.price) }}</span>
      </div>

      <div class="actions">
        <button
          :class="['wish-btn', { active: isWishlisted }]"
          @click="$emit('toggle-wishlist', product)"
          :title="isWishlisted ? 'Hapus dari Wishlist' : 'Simpan ke Wishlist'"
        >
          {{ isWishlisted ? '❤️' : '🤍' }}
        </button>

        <button class="buy-btn" @click="$emit('add-to-cart', product)">
          + Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.25s ease, border-color 0.25s ease;
}

.card:hover {
  transform: translateY(-5px);
  border-color: var(--primary);
}

.image-wrapper {
  position: relative;
  height: 170px;
  overflow: hidden;
  cursor: pointer;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;
}

.card:hover .image-wrapper img {
  transform: scale(1.06);
}

.discount-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  background: var(--success);
  color: #042f2e;
  font-weight: 800;
  font-size: 0.78rem;
  padding: 3px 8px;
  border-radius: 6px;
}

.category-tag {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(11, 15, 25, 0.85);
  color: var(--accent);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 6px;
  border: 1px solid rgba(6, 182, 212, 0.3);
}

.card-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  font-size: 0.76rem;
  color: var(--text-muted);
  margin-bottom: 6px;
}

.platform {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.title {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 12px;
  cursor: pointer;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.title:hover {
  color: var(--accent);
}

.price-box {
  margin-top: auto;
  margin-bottom: 14px;
  display: flex;
  flex-direction: column;
}

.old-price {
  font-size: 0.8rem;
  color: var(--text-muted);
  text-decoration: line-through;
}

.current-price {
  font-size: 1.12rem;
  font-weight: 800;
  color: var(--text-main);
}

.actions {
  display: flex;
  gap: 8px;
}

.wish-btn {
  background: var(--bg-input);
  border: 1px solid var(--border);
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 1rem;
}

.wish-btn.active {
  border-color: var(--danger);
  background: rgba(239, 68, 68, 0.15);
}

.buy-btn {
  flex: 1;
  background: var(--primary);
  color: white;
  font-weight: 600;
  padding: 9px 14px;
  border-radius: 8px;
}

.buy-btn:hover {
  background: var(--primary-hover);
}
</style>
