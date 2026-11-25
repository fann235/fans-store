<script setup>
import { ref, reactive, computed, watch } from 'vue';

const props = defineProps({
  product: Object
});

const emit = defineEmits(['close', 'add-to-cart']);

const reviews = ref([]);
const newReview = reactive({
  author: '',
  rating: 5,
  comment: ''
});

const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
};

// Ulasan bawaan awal agar setiap produk langsung terlihat hidup
const getDefaultReviews = (prod) => [
  {
    id: 'rev-1',
    author: 'Rizky Pratama',
    rating: 5,
    date: '20 November 2026',
    comment: `Kualitas ${prod.title} mantap banget, packing kayu super aman dan pengiriman cepat sampai Surabaya!`
  },
  {
    id: 'rev-2',
    author: 'Nadia Putri',
    rating: 5,
    date: '22 November 2026',
    comment: 'Sesuai deskripsi, garansi resmi aman dan langsung berfungsi normal tanpa kendala.'
  }
];

// Muat ulasan dari localStorage setiap kali modal produk dibuka
watch(
  () => props.product,
  (prod) => {
    if (!prod) return;
    const storageKey = `fans_store_reviews_${prod.id}`;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      reviews.value = JSON.parse(saved);
    } else {
      reviews.value = getDefaultReviews(prod);
      localStorage.setItem(storageKey, JSON.stringify(reviews.value));
    }
    newReview.author = '';
    newReview.rating = 5;
    newReview.comment = '';
  },
  { immediate: true }
);

const averageRating = computed(() => {
  if (!reviews.value.length) return props.product?.rating || 5.0;
  const total = reviews.value.reduce((sum, r) => sum + r.rating, 0);
  return (total / reviews.value.length).toFixed(1);
});

const submitReview = () => {
  if (!props.product) return;
  if (!newReview.author.trim() || !newReview.comment.trim()) return;

  const today = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  reviews.value.unshift({
    id: 'rev-' + Date.now(),
    author: newReview.author.trim(),
    rating: newReview.rating,
    date: today,
    comment: newReview.comment.trim()
  });

  localStorage.setItem(
    `fans_store_reviews_${props.product.id}`,
    JSON.stringify(reviews.value)
  );

  newReview.author = '';
  newReview.rating = 5;
  newReview.comment = '';
};
</script>

<template>
  <div v-if="product" class="modal-backdrop" @click.self="emit('close')">
    <div class="modal-card">
      <button class="close-btn" @click="emit('close')">✕</button>

      <div class="modal-grid">
        <div class="modal-img-wrap">
          <img :src="product.image" :alt="product.title" class="modal-img" />
        </div>

        <div class="modal-info">
          <span class="tag">{{ product.category }} • {{ product.platform }}</span>
          <h2>{{ product.title }}</h2>
          <p class="rating-row">
            ⭐ <strong>{{ averageRating }}</strong> / 5.0
            <span class="muted">({{ reviews.length }} Ulasan Pembeli)</span>
          </p>
          <p class="desc">{{ product.description }}</p>

          <div class="price-box">
            <span v-if="product.discount > 0" class="old-price">
              {{ formatRupiah(product.originalPrice) }}
            </span>
            <span class="new-price">{{ formatRupiah(product.price) }}</span>
          </div>

          <button
            class="cta-btn"
            @click="emit('add-to-cart', product); emit('close')"
          >
            🛒 Masukkan ke Keranjang
          </button>
        </div>
      </div>

      <!-- BAGIAN ULASAN & RATING PEMBELI -->
      <div class="reviews-section">
        <h3>💬 Ulasan &amp; Rating Pembeli ({{ reviews.length }})</h3>

        <!-- Form Tulis Ulasan Baru -->
        <form @submit.prevent="submitReview" class="review-form">
          <div class="form-row-top">
            <input
              v-model="newReview.author"
              type="text"
              placeholder="Nama Anda (Contoh: Ahmad Fawaid)"
              required
            />
            <div class="star-picker">
              <span class="star-label">Rating:</span>
              <button
                v-for="star in 5"
                :key="star"
                type="button"
                :class="['star-btn', { active: star <= newReview.rating }]"
                @click="newReview.rating = star"
              >
                ★
              </button>
            </div>
          </div>

          <div class="form-row-bottom">
            <input
              v-model="newReview.comment"
              type="text"
              placeholder="Tulis pengalamanmu menggunakan produk ini..."
              required
            />
            <button type="submit" class="submit-rev-btn">Kirim Ulasan</button>
          </div>
        </form>

        <!-- Daftar Komentar Pembeli -->
        <div class="review-list">
          <div v-for="rev in reviews" :key="rev.id" class="review-item">
            <div class="rev-header">
              <div>
                <strong>{{ rev.author }}</strong>
                <span class="rev-stars">{{ '★'.repeat(rev.rating) }}{{ '☆'.repeat(5 - rev.rating) }}</span>
              </div>
              <small class="muted">{{ rev.date }}</small>
            </div>
            <p class="rev-text">{{ rev.comment }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.85);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 20px;
}

.modal-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  max-width: 820px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 28px;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: var(--bg-input);
  color: var(--text-main);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-weight: bold;
  z-index: 2;
}

.close-btn:hover {
  background: var(--danger);
}

.modal-grid {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: 24px;
  align-items: center;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border);
}

.modal-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 12px;
}

.tag {
  background: rgba(99, 102, 241, 0.2);
  color: #a5b4fc;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 600;
  display: inline-block;
}

.modal-info h2 {
  margin: 10px 0 6px;
  font-size: 1.45rem;
}

.rating-row {
  color: var(--warning);
  font-size: 0.92rem;
  margin-bottom: 10px;
}

.muted {
  color: var(--text-muted);
}

.desc {
  color: var(--text-muted);
  font-size: 0.92rem;
  margin-bottom: 18px;
}

.price-box {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 16px;
}

.old-price {
  text-decoration: line-through;
  color: var(--text-muted);
  font-size: 0.95rem;
}

.new-price {
  font-size: 1.45rem;
  font-weight: 800;
  color: var(--accent);
}

.cta-btn {
  width: 100%;
  background: var(--primary);
  color: white;
  padding: 12px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.98rem;
}

.cta-btn:hover {
  background: var(--primary-hover);
}

/* Styles Ulasan & Rating */
.reviews-section {
  margin-top: 22px;
}

.reviews-section h3 {
  font-size: 1.1rem;
  margin-bottom: 14px;
}

.review-form {
  background: var(--bg-main);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 14px;
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-row-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.form-row-top input {
  flex: 1;
  min-width: 200px;
}

.star-picker {
  display: flex;
  align-items: center;
  gap: 4px;
  background: var(--bg-card);
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid var(--border);
}

.star-label {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-right: 4px;
}

.star-btn {
  background: transparent;
  color: #475569;
  font-size: 1.25rem;
  line-height: 1;
  padding: 0 2px;
}

.star-btn.active {
  color: var(--warning);
}

.form-row-bottom {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.form-row-bottom input {
  flex: 1;
  min-width: 220px;
}

.submit-rev-btn {
  background: var(--accent);
  color: #042f2e;
  font-weight: 800;
  padding: 10px 18px;
  border-radius: 8px;
  white-space: nowrap;
}

.submit-rev-btn:hover {
  filter: brightness(1.1);
}

.review-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 230px;
  overflow-y: auto;
  padding-right: 4px;
}

.review-item {
  background: var(--bg-main);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 12px 14px;
}

.rev-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.rev-stars {
  color: var(--warning);
  margin-left: 8px;
  font-size: 0.92rem;
}

.rev-text {
  font-size: 0.9rem;
  color: var(--text-main);
}

@media (max-width: 680px) {
  .modal-grid {
    grid-template-columns: 1fr;
  }
}
</style>