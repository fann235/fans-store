<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue';
import {
  allHardwareProducts,
  pcProducts,
  keyboardProducts,
  mouseProducts,
  topupGames
} from './data/products';
import Navbar from './components/Navbar.vue';
import ProductCard from './components/ProductCard.vue';
import ProductModal from './components/ProductModal.vue';
import ToastNotification from './components/ToastNotification.vue';

// Navigasi Halaman Utama
const activeTab = ref('store');
const selectedProduct = ref(null);

// Kategori Store: 'All' | 'PC' | 'Top-Up' | 'Keyboard' | 'Mouse'
const selectedCategory = ref('All');
const searchQuery = ref('');
const sortBy = ref('default');

// State Khusus Fitur Top-Up (Pilih Game -> Cek Nickname -> Pilih Nominal)
const selectedTopupGame = ref(null);
const selectedNominal = ref(null);
const topupPlayerId = ref('');
const checkedPlayer = ref(null);
const idCheckError = ref('');
const isCheckingId = ref(false);

// Reset hasil cek nickname jika user mengubah teks ID
watch(topupPlayerId, () => {
  checkedPlayer.value = null;
  idCheckError.value = '';
});

// Database Simulasi Akun Game Asli yang Terdaftar (Bisa ditambah sesuai kebutuhan)
const registeredAccounts = {
  mlbb: [
    { id: '12345678 (2026)', nickname: 'Fawaid_SBY', server: 'Server Indonesia (2026)' },
    { id: '88412905 (2145)', nickname: 'RRQ_Lemon', server: 'Server Indonesia (2145)' },
    { id: '45901234 (2089)', nickname: 'ONIC_Kairi', server: 'Server Indonesia (2089)' },
    { id: '77120934 (2511)', nickname: 'EVOS_Wannn', server: 'Server Indonesia (2511)' },
    { id: '99012345 (2026)', nickname: 'Perbanas_Pro', server: 'Server Indonesia (2026)' }
  ],
  ff: [
    { id: '987654321', nickname: 'FawaidBooyah', server: 'Server Indonesia' },
    { id: '1122334455', nickname: 'EVOS_Mr05', server: 'Server Indonesia' },
    { id: '5566778899', nickname: 'FrontaLGaming', server: 'Server Indonesia' }
  ],
  valorant: [
    { id: 'FansPlayer#2026', nickname: 'FansPlayer#2026', server: 'Region AP (Asia-Pacific)' },
    { id: 'f0rsakeN#PRX', nickname: 'PRX f0rsakeN', server: 'Region AP (Asia-Pacific)' },
    { id: 'TenZ#SEN', nickname: 'SEN TenZ', server: 'Region NA / AP' }
  ],
  pubg: [
    { id: '5123456789', nickname: 'FawaidWWCD', server: 'Server Asia / Indo' },
    { id: '5987654321', nickname: 'BTR_Ryzen', server: 'Server Asia / Indo' },
    { id: '5544332211', nickname: 'ZuxxyLuxxy', server: 'Server Asia / Indo' }
  ]
};

// State Keranjang, Wishlist, dan Library (Tersimpan di localStorage)
const cart = ref([]);
const wishlist = ref([]);
const library = ref([]);

// Daftar Lengkap Metode Pembayaran (QRIS, Semua E-Wallet, Semua Bank)
const paymentOptions = [
  {
    id: 'QRIS',
    group: 'Instan',
    label: 'QRIS (Semua E-Wallet & Mobile Banking)',
    type: 'qris',
    accountName: 'FANS STORE OFFICIAL',
    nmid: 'ID1020260088991'
  },
  {
    id: 'GoPay',
    group: 'E-Wallet',
    label: 'GoPay',
    type: 'ewallet',
    number: '0812-3456-7890',
    rawNumber: '081234567890',
    accountName: 'Ahmad Fawaid (Fans Store)'
  },
  {
    id: 'OVO',
    group: 'E-Wallet',
    label: 'OVO',
    type: 'ewallet',
    number: '0812-3456-7890',
    rawNumber: '081234567890',
    accountName: 'Ahmad Fawaid (Fans Store)'
  },
  {
    id: 'DANA',
    group: 'E-Wallet',
    label: 'DANA',
    type: 'ewallet',
    number: '0857-9876-5432',
    rawNumber: '085798765432',
    accountName: 'Ahmad Fawaid (Fans Store)'
  },
  {
    id: 'ShopeePay',
    group: 'E-Wallet',
    label: 'ShopeePay',
    type: 'ewallet',
    number: '0857-9876-5432',
    rawNumber: '085798765432',
    accountName: 'Ahmad Fawaid (Fans Store)'
  },
  {
    id: 'LinkAja',
    group: 'E-Wallet',
    label: 'LinkAja',
    type: 'ewallet',
    number: '0813-2233-4455',
    rawNumber: '081322334455',
    accountName: 'Fans Store Indonesia'
  },
  {
    id: 'Bank BCA',
    group: 'Transfer Bank',
    label: 'Bank BCA',
    type: 'bank',
    number: '8820-5519-2026',
    rawNumber: '882055192026',
    accountName: 'PT Fans Store Indonesia'
  },
  {
    id: 'Bank BRI',
    group: 'Transfer Bank',
    label: 'Bank BRI',
    type: 'bank',
    number: '0098-0100-4521-503',
    rawNumber: '009801004521503',
    accountName: 'PT Fans Store Indonesia'
  },
  {
    id: 'Bank BNI',
    group: 'Transfer Bank',
    label: 'Bank BNI',
    type: 'bank',
    number: '1420-8899-2026',
    rawNumber: '142088992026',
    accountName: 'PT Fans Store Indonesia'
  },
  {
    id: 'Bank Mandiri',
    group: 'Transfer Bank',
    label: 'Bank Mandiri',
    type: 'bank',
    number: '140-00-2026889-1',
    rawNumber: '1400020268891',
    accountName: 'PT Fans Store Indonesia'
  },
  {
    id: 'Bank BSI',
    group: 'Transfer Bank',
    label: 'Bank Syariah Indonesia (BSI)',
    type: 'bank',
    number: '7192-8844-10',
    rawNumber: '7192884410',
    accountName: 'PT Fans Store Indonesia'
  },
  {
    id: 'CIMB Niaga',
    group: 'Transfer Bank',
    label: 'Bank CIMB Niaga',
    type: 'bank',
    number: '7058-9912-3400',
    rawNumber: '705899123400',
    accountName: 'PT Fans Store Indonesia'
  },
  {
    id: 'SeaBank',
    group: 'Transfer Bank',
    label: 'SeaBank',
    type: 'bank',
    number: '9014-8820-5512',
    rawNumber: '901488205512',
    accountName: 'PT Fans Store Indonesia'
  }
];

// State Checkout & Promo
const promoInput = ref('');
const discountPercent = ref(0);
const checkoutForm = reactive({
  buyerName: '',
  email: '',
  paymentMethod: 'QRIS'
});

const activePaymentDetail = computed(() => {
  return paymentOptions.find((opt) => opt.id === checkoutForm.paymentMethod) || paymentOptions[0];
});

// State Notifikasi Toast
const toast = reactive({
  visible: false,
  message: ''
});

let toastTimeout = null;
const showToast = (msg) => {
  toast.message = msg;
  toast.visible = true;
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.visible = false;
  }, 2800);
};

// Load dari localStorage
onMounted(() => {
  const savedCart = localStorage.getItem('fans_store_cart');
  const savedWishlist = localStorage.getItem('fans_store_wishlist');
  const savedLibrary = localStorage.getItem('fans_store_library');

  if (savedCart) cart.value = JSON.parse(savedCart);
  if (savedWishlist) wishlist.value = JSON.parse(savedWishlist);
  if (savedLibrary) library.value = JSON.parse(savedLibrary);
});

watch(cart, (val) => localStorage.setItem('fans_store_cart', JSON.stringify(val)), { deep: true });
watch(wishlist, (val) => localStorage.setItem('fans_store_wishlist', JSON.stringify(val)), { deep: true });
watch(library, (val) => localStorage.setItem('fans_store_library', JSON.stringify(val)), { deep: true });

// Gabungkan semua produk untuk tab "All"
const allCombinedProducts = computed(() => {
  const flattenedTopups = topupGames.flatMap((game) =>
    game.packages.map((pkg) => ({
      id: pkg.id,
      title: pkg.title,
      category: 'Top-Up',
      price: pkg.price,
      originalPrice: pkg.originalPrice,
      discount: pkg.discount,
      rating: 4.9,
      platform: `${game.name} • ${pkg.amount}`,
      image: game.image,
      description: game.description
    }))
  );
  return [...allHardwareProducts, ...flattenedTopups];
});

// Computed Produk berdasarkan Kategori aktif
const displayedProducts = computed(() => {
  let sourceList = [];
  if (selectedCategory.value === 'All') {
    sourceList = allCombinedProducts.value;
  } else if (selectedCategory.value === 'PC') {
    sourceList = pcProducts;
  } else if (selectedCategory.value === 'Keyboard') {
    sourceList = keyboardProducts;
  } else if (selectedCategory.value === 'Mouse') {
    sourceList = mouseProducts;
  }

  let result = sourceList.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    item.platform.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

  if (sortBy.value === 'price-asc') {
    result = [...result].sort((a, b) => a.price - b.price);
  } else if (sortBy.value === 'price-desc') {
    result = [...result].sort((a, b) => b.price - a.price);
  } else if (sortBy.value === 'rating') {
    result = [...result].sort((a, b) => b.rating - a.rating);
  }

  return result;
});

const selectCategory = (cat) => {
  selectedCategory.value = cat;
  if (cat !== 'Top-Up') {
    selectedTopupGame.value = null;
    selectedNominal.value = null;
    topupPlayerId.value = '';
    checkedPlayer.value = null;
    idCheckError.value = '';
  }
};

const openTopupGame = (game) => {
  selectedTopupGame.value = game;
  selectedNominal.value = game.packages[0];
  topupPlayerId.value = '';
  checkedPlayer.value = null;
  idCheckError.value = '';
};

// Mengisi cepat contoh ID valid untuk memudahkan testing/presentasi
const fillSampleId = (sampleId) => {
  topupPlayerId.value = sampleId;
  verifyPlayerId();
};

// Validasi ID Game: Hanya ID yang formatnya benar & terdaftar yang memunculkan Nickname
const verifyPlayerId = () => {
  if (!selectedTopupGame.value) return;
  const rawId = topupPlayerId.value.trim();

  if (!rawId) {
    showToast(`Masukkan ${selectedTopupGame.value.inputLabel} terlebih dahulu!`);
    return;
  }

  isCheckingId.value = true;
  checkedPlayer.value = null;
  idCheckError.value = '';

  setTimeout(() => {
    const gameId = selectedTopupGame.value.id;
    const normalize = (str) => str.replace(/\s+/g, '').toLowerCase();

    // 1. Cek kecocokan format dasar per game terlebih dahulu
    let formatValid = true;
    let formatHint = '';

    if (gameId === 'mlbb') {
      // Format MLBB harus angka User ID (6-10 digit) + Zone ID dalam kurung (4-5 digit), misal: 12345678 (2026)
      const mlbbRegex = /^\d{6,10}\s*\(\d{4,5}\)$/;
      if (!mlbbRegex.test(rawId)) {
        formatValid = false;
        formatHint = 'Format ID Mobile Legends salah. Gunakan format UserID (ZoneID), contoh: 12345678 (2026).';
      }
    } else if (gameId === 'ff') {
      const ffRegex = /^\d{8,12}$/;
      if (!ffRegex.test(rawId)) {
        formatValid = false;
        formatHint = 'Player ID Free Fire harus berupa 8–12 digit angka.';
      }
    } else if (gameId === 'valorant') {
      const valRegex = /^.{3,16}#[a-zA-Z0-9]{2,5}$/;
      if (!valRegex.test(rawId)) {
        formatValid = false;
        formatHint = 'Format Riot ID salah. Gunakan Nama#Tagline, contoh: FansPlayer#2026.';
      }
    } else if (gameId === 'pubg') {
      const pubgRegex = /^\d{9,12}$/;
      if (!pubgRegex.test(rawId)) {
        formatValid = false;
        formatHint = 'Character ID PUBG Mobile harus berupa 9–12 digit angka.';
      }
    }

    if (!formatValid) {
      idCheckError.value = `ID Tidak Valid — ${formatHint}`;
      isCheckingId.value = false;
      showToast('ID tidak valid! Periksa kembali format ID.');
      return;
    }

    // 2. Cari di daftar akun yang benar-benar terdaftar pada server game
    const accountsList = registeredAccounts[gameId] || [];
    const foundAccount = accountsList.find(
      (acc) => normalize(acc.id) === normalize(rawId)
    );

    if (foundAccount) {
      checkedPlayer.value = {
        id: foundAccount.id,
        nickname: foundAccount.nickname,
        server: foundAccount.server
      };
      showToast(`Akun Ditemukan! Nickname: ${foundAccount.nickname}`);
    } else {
      idCheckError.value = `ID "${rawId}" tidak ditemukan di server ${selectedTopupGame.value.name}. Pastikan User ID & Server sudah benar.`;
      showToast('ID tidak ditemukan di server game!');
    }

    isCheckingId.value = false;
  }, 550);
};

// Masukkan Paket Top-Up ke Keranjang (Wajib ID Ditemukan Dulu)
const addTopupToCart = () => {
  if (!selectedTopupGame.value || !selectedNominal.value) return;
  if (!topupPlayerId.value.trim()) {
    showToast(`Masukkan ${selectedTopupGame.value.inputLabel} terlebih dahulu!`);
    return;
  }
  if (!checkedPlayer.value) {
    showToast('ID belum terverifikasi atau tidak ditemukan! Klik "Cek ID" terlebih dahulu.');
    return;
  }

  const uniqueCartId = `${selectedNominal.value.id}-${checkedPlayer.value.id}`;
  const existing = cart.value.find((item) => item.id === uniqueCartId);

  if (existing) {
    existing.qty++;
  } else {
    cart.value.push({
      id: uniqueCartId,
      title: `${selectedNominal.value.title} — ${checkedPlayer.value.nickname} (${checkedPlayer.value.id})`,
      category: 'Top-Up',
      platform: `${selectedTopupGame.value.name} • ${selectedNominal.value.amount}`,
      price: selectedNominal.value.price,
      image: selectedTopupGame.value.image,
      qty: 1
    });
  }

  showToast(`${selectedNominal.value.amount} untuk ${checkedPlayer.value.nickname} masuk keranjang!`);
};

// Computed Keranjang
const totalCartItems = computed(() => cart.value.reduce((sum, item) => sum + item.qty, 0));
const subtotalPrice = computed(() => cart.value.reduce((sum, item) => sum + item.price * item.qty, 0));
const discountAmount = computed(() => Math.round((subtotalPrice.value * discountPercent.value) / 100));
const finalPrice = computed(() => subtotalPrice.value - discountAmount.value);

const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
};

// Event Handlers Cart & Wishlist
const addToCart = (product) => {
  const existing = cart.value.find((item) => item.id === product.id);
  if (existing) {
    existing.qty++;
  } else {
    cart.value.push({ ...product, qty: 1 });
  }
  showToast(`"${product.title}" ditambahkan ke keranjang!`);
};

const updateQty = (id, delta) => {
  const index = cart.value.findIndex((item) => item.id === id);
  if (index !== -1) {
    cart.value[index].qty += delta;
    if (cart.value[index].qty <= 0) {
      cart.value.splice(index, 1);
    }
  }
};

const removeFromCart = (id) => {
  cart.value = cart.value.filter((item) => item.id !== id);
  showToast('Item dihapus dari keranjang.');
};

const toggleWishlist = (product) => {
  const index = wishlist.value.findIndex((item) => item.id === product.id);
  if (index !== -1) {
    wishlist.value.splice(index, 1);
    showToast('Dihapus dari Wishlist.');
  } else {
    wishlist.value.push(product);
    showToast(`"${product.title}" disimpan ke Wishlist!`);
  }
};

const isWishlisted = (id) => wishlist.value.some((item) => item.id === id);

const applyPromo = () => {
  if (promoInput.value.trim().toUpperCase() === 'FANS2026') {
    discountPercent.value = 15;
    showToast('Kode promo FANS2026 berhasil! Diskon 15% aktif.');
  } else {
    discountPercent.value = 0;
    showToast('Kode promo tidak valid. Gunakan: FANS2026');
  }
};

const generateKey = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const part = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `FANS-${part()}-${part()}-${part()}`;
};

const handleCheckout = () => {
  if (!checkoutForm.buyerName.trim() || !checkoutForm.email.trim()) {
    showToast('Harap isi Nama dan Email pengiriman!');
    return;
  }

  const purchaseDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  cart.value.forEach((item) => {
    for (let i = 0; i < item.qty; i++) {
      const isTopup = item.category === 'Top-Up';
      library.value.unshift({
        orderId: 'INV-' + Math.floor(100000 + Math.random() * 900000),
        title: item.title,
        category: item.category,
        platform: item.platform,
        image: item.image,
        redeemCode: isTopup ? 'DIRECT-TOPUP-SUCCESS' : generateKey(),
        date: purchaseDate,
        paymentMethod: checkoutForm.paymentMethod,
        shippingStage: isTopup ? 3 : 1,
        courier: isTopup ? 'Server Instan' : 'JNE Trucking / Kargo Kayu'
      });
    }
  });

  cart.value = [];
  discountPercent.value = 0;
  promoInput.value = '';
  activeTab.value = 'library';
  showToast('Pembayaran Berhasil! Cek status pesanan & resi di My Library.');
};

const advanceShippingStage = (index) => {
  const item = library.value[index];
  if (!item || item.category === 'Top-Up') return;

  if ((item.shippingStage || 1) < 3) {
    item.shippingStage = (item.shippingStage || 1) + 1;
    const stageNames = ['', 'Dikemas', 'Dikirim Kurir', 'Tiba di Tujuan'];
    showToast(`Status paket diperbarui: ${stageNames[item.shippingStage]}`);
  }
};

const copyCode = (code) => {
  navigator.clipboard.writeText(code);
  showToast(`Berhasil disalin: ${code}`);
};

const removeLibraryItem = (index) => {
  library.value.splice(index, 1);
  showToast('Riwayat pesanan berhasil dihapus.');
};

const clearAllLibrary = () => {
  library.value = [];
  showToast('Semua riwayat di My Library telah dikosongkan.');
};
</script>

<template>
  <div class="app-wrapper">
    <Navbar
      :active-tab="activeTab"
      :cart-count="totalCartItems"
      :wishlist-count="wishlist.length"
      :library-count="library.length"
      @change-tab="(tab) => (activeTab = tab)"
    />

    <main class="container main-content">
      <!-- HALAMAN 1: STORE -->
      <section v-if="activeTab === 'store'">
        <div class="hero-banner">
          <div class="hero-text">
            <span class="hero-tag">🔥 SEASON SALE 2026</span>
            <h1>Level Up Your Gaming Experience at <span class="text-accent">Fans Store</span></h1>
            <p>
              Dapatkan Rakitan Gaming PC Pro, Top-Up Voucher Instan (Mobile Legends, Free Fire, Valorant, PUBG),
              serta Mechanical Keyboard &amp; Gaming Mouse dengan promo spesial kode <strong>FANS2026</strong>.
            </p>
          </div>
        </div>

        <!-- Toolbar Kategori & Pencarian -->
        <div class="toolbar">
          <div class="category-tabs">
            <button
              :class="['tab-pill', { active: selectedCategory === 'All' }]"
              @click="selectCategory('All')"
            >
              All ({{ allCombinedProducts.length }})
            </button>
            <button
              :class="['tab-pill', { active: selectedCategory === 'PC' }]"
              @click="selectCategory('PC')"
            >
              PC ({{ pcProducts.length }})
            </button>
            <button
              :class="['tab-pill', { active: selectedCategory === 'Top-Up' }]"
              @click="selectCategory('Top-Up')"
            >
              Top-Up (4 Games)
            </button>
            <button
              :class="['tab-pill', { active: selectedCategory === 'Keyboard' }]"
              @click="selectCategory('Keyboard')"
            >
              Keyboard ({{ keyboardProducts.length }})
            </button>
            <button
              :class="['tab-pill', { active: selectedCategory === 'Mouse' }]"
              @click="selectCategory('Mouse')"
            >
              Mouse ({{ mouseProducts.length }})
            </button>
          </div>

          <div v-if="selectedCategory !== 'Top-Up'" class="search-sort">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari PC, keyboard, mouse, atau voucher..."
              class="search-input"
            />
            <select v-model="sortBy">
              <option value="default">Urutkan: Default</option>
              <option value="price-asc">Harga: Terendah</option>
              <option value="price-desc">Harga: Tertinggi</option>
              <option value="rating">Rating Tertinggi</option>
            </select>
          </div>
        </div>

        <!-- TAMPILAN KHUSUS TAB TOP-UP -->
        <div v-if="selectedCategory === 'Top-Up'">
          <div v-if="!selectedTopupGame">
            <h2 class="sub-heading">⚡ Pilih Game untuk Top-Up Instan</h2>
            <div class="game-selector-grid">
              <div
                v-for="game in topupGames"
                :key="game.id"
                class="game-select-card"
                @click="openTopupGame(game)"
              >
                <div class="game-img-wrap">
                  <img :src="game.image" :alt="game.name" />
                  <span class="game-badge">{{ game.badge }}</span>
                </div>
                <div class="game-card-info">
                  <small class="muted">{{ game.publisher }}</small>
                  <h3>{{ game.name }}</h3>
                  <p class="currency-label">Top-Up {{ game.currencyName }}</p>
                  <button class="select-game-btn">Pilih Nominal →</button>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="topup-detail-box">
            <button class="back-btn" @click="selectedTopupGame = null">
              ← Kembali ke Daftar Game
            </button>

            <div class="topup-header">
              <img :src="selectedTopupGame.image" :alt="selectedTopupGame.name" />
              <div>
                <span class="hero-tag">{{ selectedTopupGame.publisher }}</span>
                <h2>Top-Up {{ selectedTopupGame.name }} ({{ selectedTopupGame.currencyName }})</h2>
                <p class="muted">{{ selectedTopupGame.description }}</p>
              </div>
            </div>

            <!-- LANGKAH 1: INPUT ID + VALIDASI REALISTIS + PESAN JIKA ID TIDAK ADA -->
            <div class="topup-step">
              <h3>1. Masukkan &amp; Cek {{ selectedTopupGame.inputLabel }}</h3>
              <div class="id-check-row">
                <input
                  v-model="topupPlayerId"
                  type="text"
                  :placeholder="selectedTopupGame.inputPlaceholder"
                  class="id-input"
                  @keyup.enter="verifyPlayerId"
                />
                <button
                  type="button"
                  class="check-id-btn"
                  :disabled="isCheckingId"
                  @click="verifyPlayerId"
                >
                  {{ isCheckingId ? '⏳ Mengecek Server...' : '🔍 Cek ID' }}
                </button>
              </div>

              <!-- Contoh ID Valid yang bisa diklik langsung saat demo -->
              <div class="sample-ids-bar">
                <span class="muted">Contoh ID terdaftar:</span>
                <button
                  v-for="acc in registeredAccounts[selectedTopupGame.id]"
                  :key="acc.id"
                  type="button"
                  class="sample-chip"
                  @click="fillSampleId(acc.id)"
                >
                  {{ acc.id }}
                </button>
              </div>

              <!-- KOTAK HIJAU: JIKA ID BENERAN ADA -->
              <div v-if="checkedPlayer" class="nickname-verified-box">
                <span class="verified-icon">✅</span>
                <div>
                  <div class="verified-title">
                    Akun Ditemukan: <strong>{{ checkedPlayer.nickname }}</strong>
                  </div>
                  <small class="muted">
                    ID: {{ checkedPlayer.id }} • {{ checkedPlayer.server }}
                  </small>
                </div>
              </div>

              <!-- KOTAK MERAH: JIKA ID TIDAK ADA / SALAH FORMAT -->
              <div v-else-if="idCheckError" class="nickname-error-box">
                <span class="verified-icon">❌</span>
                <div>
                  <div class="error-title">
                    <strong>ID Tidak Ditemukan</strong>
                  </div>
                  <small class="error-desc">{{ idCheckError }}</small>
                </div>
              </div>
            </div>

            <!-- LANGKAH 2: PILIH NOMINAL -->
            <div class="topup-step">
              <h3>2. Pilih Nominal {{ selectedTopupGame.currencyName }}</h3>
              <div class="nominal-grid">
                <div
                  v-for="pkg in selectedTopupGame.packages"
                  :key="pkg.id"
                  :class="['nominal-card', { selected: selectedNominal && selectedNominal.id === pkg.id }]"
                  @click="selectedNominal = pkg"
                >
                  <div class="nom-top">
                    <span class="nom-amount">💎 {{ pkg.amount }}</span>
                    <span v-if="pkg.discount > 0" class="nom-disc">-{{ pkg.discount }}%</span>
                  </div>
                  <div class="nom-prices">
                    <span class="nom-price">{{ formatRupiah(pkg.price) }}</span>
                    <span class="nom-old">{{ formatRupiah(pkg.originalPrice) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="selectedNominal" class="topup-action-bar">
              <div>
                <small class="muted">
                  {{ checkedPlayer ? `Tujuan: ${checkedPlayer.nickname} (${checkedPlayer.id})` : 'Status: Wajib Cek ID Valid Terlebih Dahulu' }}
                </small>
                <div class="selected-summary">
                  {{ selectedNominal.title }} — <strong>{{ formatRupiah(selectedNominal.price) }}</strong>
                </div>
              </div>
              <button
                class="cta-topup-btn"
                :disabled="!checkedPlayer"
                @click="addTopupToCart"
              >
                + Tambah Top-Up ke Keranjang
              </button>
            </div>
          </div>
        </div>

        <!-- TAMPILAN PRODUK UNTUK TAB: ALL / PC / KEYBOARD / MOUSE -->
        <div v-else>
          <div class="result-info">
            Menampilkan <strong>{{ displayedProducts.length }}</strong> produk pada kategori <strong>{{ selectedCategory }}</strong>
          </div>

          <div v-if="displayedProducts.length > 0" class="product-grid">
            <ProductCard
              v-for="item in displayedProducts"
              :key="item.id"
              :product="item"
              :is-wishlisted="isWishlisted(item.id)"
              @add-to-cart="addToCart"
              @toggle-wishlist="toggleWishlist"
              @view-detail="(prod) => (selectedProduct = prod)"
            />
          </div>

          <div v-else class="empty-state">
            <h3>Produk tidak ditemukan 😢</h3>
            <p>Coba gunakan kata kunci pencarian atau pilih kategori lain.</p>
          </div>
        </div>
      </section>

      <!-- HALAMAN 2: WISHLIST -->
      <section v-else-if="activeTab === 'wishlist'">
        <h2 class="section-title">❤️ Wishlist Saya ({{ wishlist.length }})</h2>

        <div v-if="wishlist.length > 0" class="product-grid">
          <ProductCard
            v-for="item in wishlist"
            :key="item.id"
            :product="item"
            :is-wishlisted="true"
            @add-to-cart="addToCart"
            @toggle-wishlist="toggleWishlist"
            @view-detail="(prod) => (selectedProduct = prod)"
          />
        </div>

        <div v-else class="empty-state">
          <h3>Wishlist masih kosong</h3>
          <p>Simpan PC, keyboard, atau mouse impianmu agar mudah ditemukan nanti.</p>
          <button class="primary-btn" @click="activeTab = 'store'">Jelajahi Store</button>
        </div>
      </section>

      <!-- HALAMAN 3: KERANJANG & CHECKOUT -->
      <section v-else-if="activeTab === 'cart'">
        <h2 class="section-title">🛒 Keranjang Belanja</h2>

        <div v-if="cart.length > 0" class="cart-layout">
          <div class="cart-items">
            <div v-for="item in cart" :key="item.id" class="cart-row">
              <img :src="item.image" :alt="item.title" />
              <div class="cart-info">
                <h4>{{ item.title }}</h4>
                <span class="muted">{{ item.platform }}</span>
                <div class="item-price">{{ formatRupiah(item.price) }}</div>
              </div>

              <div class="qty-controls">
                <button @click="updateQty(item.id, -1)">-</button>
                <span>{{ item.qty }}</span>
                <button @click="updateQty(item.id, 1)">+</button>
              </div>

              <button class="del-btn" @click="removeFromCart(item.id)">🗑️</button>
            </div>
          </div>

          <div class="checkout-card">
            <h3>Ringkasan Pesanan</h3>

            <div class="promo-box">
              <input v-model="promoInput" type="text" placeholder="Kode Promo (FANS2026)" />
              <button @click="applyPromo">Pakai</button>
            </div>

            <div class="summary-line">
              <span>Subtotal</span>
              <span>{{ formatRupiah(subtotalPrice) }}</span>
            </div>
            <div v-if="discountPercent > 0" class="summary-line discount">
              <span>Diskon ({{ discountPercent }}%)</span>
              <span>- {{ formatRupiah(discountAmount) }}</span>
            </div>
            <div class="summary-line total">
              <span>Total Bayar</span>
              <span>{{ formatRupiah(finalPrice) }}</span>
            </div>

            <form @submit.prevent="handleCheckout" class="checkout-form">
              <label>Nama Lengkap / Nickname</label>
              <input v-model="checkoutForm.buyerName" type="text" placeholder="Contoh: Ahmad Fawaid" required />

              <label>Email Penerima Bukti / Resi</label>
              <input v-model="checkoutForm.email" type="email" placeholder="email@domain.com" required />

              <label>Metode Pembayaran</label>
              <select v-model="checkoutForm.paymentMethod">
                <optgroup label="⚡ QRIS (Instan)">
                  <option value="QRIS">QRIS (Semua E-Wallet &amp; M-Banking)</option>
                </optgroup>
                <optgroup label="📱 E-Wallet">
                  <option value="GoPay">GoPay</option>
                  <option value="OVO">OVO</option>
                  <option value="DANA">DANA</option>
                  <option value="ShopeePay">ShopeePay</option>
                  <option value="LinkAja">LinkAja</option>
                </optgroup>
                <optgroup label="🏦 Transfer Bank">
                  <option value="Bank BCA">Bank BCA</option>
                  <option value="Bank BRI">Bank BRI</option>
                  <option value="Bank BNI">Bank BNI</option>
                  <option value="Bank Mandiri">Bank Mandiri</option>
                  <option value="Bank BSI">Bank Syariah Indonesia (BSI)</option>
                  <option value="CIMB Niaga">Bank CIMB Niaga</option>
                  <option value="SeaBank">SeaBank</option>
                </optgroup>
              </select>

              <div class="payment-instruction-box">
                <div v-if="activePaymentDetail.type === 'qris'" class="qris-display">
                  <span class="pay-tag">SCAN QRIS OTOMATIS</span>
                  <div class="qr-white-frame">
                    <img
                      :src="`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=FANSSTORE-${finalPrice}`"
                      alt="QRIS Fans Store"
                    />
                  </div>
                  <p class="pay-acc-name">{{ activePaymentDetail.accountName }}</p>
                  <small class="muted">NMID: {{ activePaymentDetail.nmid }}</small>
                  <small class="pay-hint">Scan menggunakan GoPay, OVO, DANA, ShopeePay, atau M-Banking</small>
                </div>

                <div v-else-if="activePaymentDetail.type === 'ewallet'" class="account-display">
                  <span class="pay-tag">📱 TUJUAN TRANSFER {{ activePaymentDetail.label.toUpperCase() }}</span>
                  <div class="copy-number-row">
                    <strong>{{ activePaymentDetail.number }}</strong>
                    <button type="button" @click="copyCode(activePaymentDetail.rawNumber)">Salin Nomor</button>
                  </div>
                  <p class="pay-acc-name">A/N: {{ activePaymentDetail.accountName }}</p>
                  <small class="pay-hint">Transfer sesuai nominal total bayar agar terverifikasi otomatis.</small>
                </div>

                <div v-else-if="activePaymentDetail.type === 'bank'" class="account-display">
                  <span class="pay-tag">🏦 REKENING {{ activePaymentDetail.label.toUpperCase() }}</span>
                  <div class="copy-number-row">
                    <strong>{{ activePaymentDetail.number }}</strong>
                    <button type="button" @click="copyCode(activePaymentDetail.rawNumber)">Salin Rek</button>
                  </div>
                  <p class="pay-acc-name">A/N: {{ activePaymentDetail.accountName }}</p>
                  <small class="pay-hint">Mendukung transfer BI-FAST &amp; Real-Time Online 24 Jam.</small>
                </div>
              </div>

              <button type="submit" class="pay-btn">Konfirmasi &amp; Bayar Sekarang</button>
            </form>
          </div>
        </div>

        <div v-else class="empty-state">
          <h3>Keranjang belanjamu kosong</h3>
          <p>Yuk pilih PC gaming, top-up game, keyboard, atau mouse di Fans Store!</p>
          <button class="primary-btn" @click="activeTab = 'store'">Mulai Belanja</button>
        </div>
      </section>

      <!-- HALAMAN 4: MY LIBRARY & SIMULASI TRACKING PENGIRIMAN -->
      <section v-else-if="activeTab === 'library'">
        <div class="library-header-bar">
          <h2 class="section-title" style="margin-bottom: 0;">
            🎮 My Library &amp; Lacak Pesanan ({{ library.length }})
          </h2>
          <button
            v-if="library.length > 0"
            class="clear-all-btn"
            @click="clearAllLibrary"
          >
            🗑️ Kosongkan Semua
          </button>
        </div>

        <div v-if="library.length > 0" class="library-list">
          <div v-for="(owned, idx) in library" :key="idx" class="library-card">
            <img :src="owned.image" :alt="owned.title" />
            <div class="lib-details">
              <div class="lib-top">
                <span class="order-id">{{ owned.orderId }} • {{ owned.date }}</span>
                <div class="lib-top-actions">
                  <span class="paid-badge">LUNAS ({{ owned.paymentMethod }})</span>
                  <button
                    class="lib-del-btn"
                    @click="removeLibraryItem(idx)"
                    title="Hapus Riwayat Ini"
                  >
                    🗑️ Hapus
                  </button>
                </div>
              </div>
              <h3>{{ owned.title }}</h3>
              <p class="muted">{{ owned.platform }}</p>

              <!-- STATUS KHUSUS TOP-UP DIGITAL -->
              <div v-if="owned.category === 'Top-Up'" class="topup-status-banner">
                <span>⚡ <strong>Selesai / Terkirim Instan ke Akun Game</strong></span>
                <span class="status-pill-done">SUKSES</span>
              </div>

              <!-- SIMULASI TRACKING PENGIRIMAN KHUSUS HARDWARE (PC, KEYBOARD, MOUSE) -->
              <div v-else class="hardware-tracking-box">
                <div class="tracking-head">
                  <span class="tracking-title">🚚 Status Pengiriman Paket ({{ owned.courier || 'Kurir Kargo' }})</span>
                  <button
                    v-if="(owned.shippingStage || 1) < 3"
                    class="sim-step-btn"
                    @click="advanceShippingStage(idx)"
                  >
                    Simulasi Lanjut Tahap →
                  </button>
                  <span v-else class="status-pill-done">✅ Paket Diterima</span>
                </div>

                <div class="tracking-steps">
                  <div :class="['track-step', { active: (owned.shippingStage || 1) >= 1 }]">
                    <span class="step-dot">1</span>
                    <span>📦 Dikemas</span>
                  </div>
                  <div :class="['track-line', { active: (owned.shippingStage || 1) >= 2 }]"></div>
                  <div :class="['track-step', { active: (owned.shippingStage || 1) >= 2 }]">
                    <span class="step-dot">2</span>
                    <span>🚚 Dikirim Kurir</span>
                  </div>
                  <div :class="['track-line', { active: (owned.shippingStage || 1) >= 3 }]"></div>
                  <div :class="['track-step', { active: (owned.shippingStage || 1) >= 3 }]">
                    <span class="step-dot">3</span>
                    <span>🏠 Tiba di Tujuan</span>
                  </div>
                </div>
              </div>

              <div class="key-box">
                <code>{{ owned.redeemCode }}</code>
                <button @click="copyCode(owned.redeemCode)">Salin Kode / Resi</button>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="empty-state">
          <h3>Belum ada riwayat pembelian</h3>
          <p>Produk PC, Top-Up, Keyboard, atau Mouse yang sudah dibayar akan otomatis tercatat di sini.</p>
          <button class="primary-btn" @click="activeTab = 'store'">Ke Katalog Store</button>
        </div>
      </section>
    </main>

    <ProductModal
      :product="selectedProduct"
      @close="selectedProduct = null"
      @add-to-cart="addToCart"
    />

    <ToastNotification :message="toast.message" :visible="toast.visible" />
  </div>
</template>

<style scoped>
.main-content {
  padding-top: 28px;
  padding-bottom: 60px;
}

.hero-banner {
  background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 60%, #083344 100%);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 34px;
  margin-bottom: 26px;
}

.hero-tag {
  background: rgba(6, 182, 212, 0.15);
  color: var(--accent);
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
  display: inline-block;
}

.hero-text h1 {
  font-size: 2rem;
  margin: 12px 0 10px;
  max-width: 720px;
}

.text-accent {
  color: var(--accent);
}

.hero-text p {
  color: var(--text-muted);
  max-width: 680px;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tab-pill {
  background: var(--bg-card);
  color: var(--text-muted);
  border: 1px solid var(--border);
  padding: 9px 16px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.9rem;
}

.tab-pill.active, .tab-pill:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.search-sort {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.search-input {
  min-width: 240px;
}

.result-info {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 16px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(265px, 1fr));
  gap: 22px;
}

/* Top-Up Game Selection Styles */
.sub-heading {
  font-size: 1.3rem;
  margin-bottom: 18px;
}

.game-selector-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 22px;
}

.game-select-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.25s ease, border-color 0.25s ease;
}

.game-select-card:hover {
  transform: translateY(-6px);
  border-color: var(--accent);
}

.game-img-wrap {
  position: relative;
  height: 185px;
}

.game-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.game-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: var(--primary);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
}

.game-card-info {
  padding: 18px;
}

.game-card-info h3 {
  font-size: 1.2rem;
  margin: 4px 0;
}

.currency-label {
  color: var(--accent);
  font-size: 0.88rem;
  font-weight: 600;
  margin-bottom: 14px;
}

.select-game-btn {
  width: 100%;
  background: var(--bg-input);
  color: var(--text-main);
  border: 1px solid var(--border);
  padding: 10px;
  border-radius: 8px;
  font-weight: 600;
}

.game-select-card:hover .select-game-btn {
  background: var(--primary);
  border-color: var(--primary);
}

/* Top-Up Detail, Cek Nickname & Nominal Picker */
.topup-detail-box {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 26px;
}

.back-btn {
  background: var(--bg-input);
  color: var(--text-main);
  padding: 8px 14px;
  border-radius: 8px;
  font-weight: 600;
  margin-bottom: 20px;
}

.back-btn:hover {
  background: var(--primary);
}

.topup-header {
  display: flex;
  gap: 20px;
  align-items: center;
  padding-bottom: 22px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 24px;
}

.topup-header img {
  width: 140px;
  height: 95px;
  object-fit: cover;
  border-radius: 12px;
}

.topup-header h2 {
  margin: 6px 0;
}

.topup-step {
  margin-bottom: 26px;
}

.topup-step h3 {
  font-size: 1.05rem;
  margin-bottom: 12px;
}

.id-check-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.id-input {
  width: 100%;
  max-width: 340px;
  font-size: 1rem;
  padding: 12px 16px;
}

.check-id-btn {
  background: var(--primary);
  color: white;
  font-weight: 700;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 0.95rem;
  white-space: nowrap;
}

.check-id-btn:hover:not(:disabled) {
  background: var(--primary-hover);
}

.check-id-btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.sample-ids-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
}

.sample-chip {
  background: var(--bg-main);
  color: var(--accent);
  border: 1px solid var(--border);
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 600;
}

.sample-chip:hover {
  border-color: var(--accent);
  background: rgba(6, 182, 212, 0.12);
}

.nickname-verified-box {
  margin-top: 14px;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.45);
  padding: 12px 18px;
  border-radius: 10px;
}

.nickname-error-box {
  margin-top: 14px;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.45);
  padding: 12px 18px;
  border-radius: 10px;
}

.verified-icon {
  font-size: 1.3rem;
}

.verified-title {
  color: var(--success);
  font-size: 0.95rem;
}

.error-title {
  color: var(--danger);
  font-size: 0.95rem;
}

.error-desc {
  color: #fca5a5;
  font-size: 0.84rem;
}

.nominal-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 14px;
}

.nominal-card {
  background: var(--bg-main);
  border: 2px solid var(--border);
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nominal-card:hover {
  border-color: var(--primary);
}

.nominal-card.selected {
  border-color: var(--accent);
  background: rgba(6, 182, 212, 0.1);
}

.nom-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.nom-amount {
  font-weight: 700;
  font-size: 0.95rem;
}

.nom-disc {
  background: var(--success);
  color: #042f2e;
  font-size: 0.72rem;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 5px;
}

.nom-prices {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.nom-price {
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--accent);
}

.nom-old {
  font-size: 0.8rem;
  color: var(--text-muted);
  text-decoration: line-through;
}

.topup-action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  background: var(--bg-main);
  border: 1px solid var(--border);
  padding: 18px 22px;
  border-radius: 12px;
}

.selected-summary {
  font-size: 1.05rem;
  color: var(--text-main);
}

.cta-topup-btn {
  background: var(--success);
  color: #042f2e;
  font-weight: 800;
  padding: 12px 22px;
  border-radius: 10px;
  font-size: 0.95rem;
}

.cta-topup-btn:hover:not(:disabled) {
  filter: brightness(1.1);
}

.cta-topup-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 22px;
}

/* Cart Styles */
.cart-layout {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 24px;
  align-items: start;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.cart-row {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 14px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.cart-row img {
  width: 85px;
  height: 65px;
  object-fit: cover;
  border-radius: 8px;
}

.cart-info {
  flex: 1;
}

.muted {
  color: var(--text-muted);
  font-size: 0.85rem;
}

.item-price {
  font-weight: 700;
  color: var(--accent);
  margin-top: 4px;
}

.qty-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--bg-input);
  padding: 4px 10px;
  border-radius: 8px;
}

.qty-controls button {
  background: transparent;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  padding: 0 6px;
}

.del-btn {
  background: rgba(239, 68, 68, 0.15);
  padding: 8px 10px;
  border-radius: 8px;
}

.checkout-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 22px;
}

.checkout-card h3 {
  margin-bottom: 16px;
}

.promo-box {
  display: flex;
  gap: 8px;
  margin-bottom: 18px;
}

.promo-box input {
  flex: 1;
}

.promo-box button {
  background: var(--accent);
  color: #042f2e;
  font-weight: 700;
  padding: 0 16px;
  border-radius: 8px;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  color: var(--text-muted);
}

.summary-line.discount {
  color: var(--success);
}

.summary-line.total {
  border-top: 1px solid var(--border);
  padding-top: 12px;
  margin-top: 12px;
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--text-main);
}

.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 18px;
}

.checkout-form label {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.payment-instruction-box {
  background: var(--bg-main);
  border: 1px dashed var(--accent);
  border-radius: 12px;
  padding: 16px;
  margin-top: 4px;
}

.pay-tag {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 800;
  color: var(--accent);
  background: rgba(6, 182, 212, 0.15);
  padding: 3px 8px;
  border-radius: 6px;
  margin-bottom: 10px;
}

.qris-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.qr-white-frame {
  background: #ffffff;
  padding: 10px;
  border-radius: 10px;
  margin: 4px 0 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.qr-white-frame img {
  width: 150px;
  height: 150px;
  display: block;
}

.account-display {
  display: flex;
  flex-direction: column;
}

.copy-number-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 10px 12px;
  border-radius: 8px;
  margin-bottom: 8px;
  gap: 8px;
}

.copy-number-row strong {
  font-size: 1.05rem;
  color: var(--text-main);
  letter-spacing: 0.5px;
}

.copy-number-row button {
  background: var(--primary);
  color: white;
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 600;
  white-space: nowrap;
}

.copy-number-row button:hover {
  background: var(--primary-hover);
}

.pay-acc-name {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--text-main);
}

.pay-hint {
  font-size: 0.76rem;
  color: var(--text-muted);
  margin-top: 4px;
}

.pay-btn {
  margin-top: 10px;
  background: var(--success);
  color: #042f2e;
  font-weight: 800;
  padding: 13px;
  border-radius: 10px;
  font-size: 1rem;
}

.pay-btn:hover {
  filter: brightness(1.1);
}

/* Library & Tracking Styles */
.library-header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 22px;
}

.clear-all-btn {
  background: rgba(239, 68, 68, 0.15);
  color: var(--danger);
  border: 1px solid rgba(239, 68, 68, 0.4);
  padding: 8px 14px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.85rem;
}

.clear-all-btn:hover {
  background: var(--danger);
  color: white;
}

.library-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.library-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 18px;
  display: flex;
  gap: 20px;
  align-items: center;
}

.library-card img {
  width: 140px;
  height: 110px;
  object-fit: cover;
  border-radius: 10px;
}

.lib-details {
  flex: 1;
}

.lib-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 0.8rem;
  margin-bottom: 6px;
}

.lib-top-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.order-id {
  color: var(--text-muted);
}

.paid-badge {
  background: rgba(16, 185, 129, 0.15);
  color: var(--success);
  padding: 2px 8px;
  border-radius: 6px;
  font-weight: 700;
}

.lib-del-btn {
  background: rgba(239, 68, 68, 0.15);
  color: var(--danger);
  padding: 3px 9px;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 600;
}

.lib-del-btn:hover {
  background: var(--danger);
  color: white;
}

/* Banner Status Top-Up Digital */
.topup-status-banner {
  margin-top: 10px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.35);
  padding: 8px 14px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 0.86rem;
  color: var(--success);
}

.status-pill-done {
  background: var(--success);
  color: #042f2e;
  font-size: 0.74rem;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 6px;
}

/* Stepper Tracking Pengiriman Khusus Hardware */
.hardware-tracking-box {
  margin-top: 12px;
  background: var(--bg-main);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 12px 14px;
}

.tracking-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.tracking-title {
  font-size: 0.84rem;
  font-weight: 700;
  color: var(--text-main);
}

.sim-step-btn {
  background: var(--primary);
  color: white;
  font-size: 0.76rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
}

.sim-step-btn:hover {
  background: var(--primary-hover);
}

.tracking-steps {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.track-step {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.82rem;
  color: var(--text-muted);
  font-weight: 600;
}

.track-step.active {
  color: var(--accent);
}

.step-dot {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--bg-input);
  color: var(--text-muted);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.74rem;
  font-weight: 800;
}

.track-step.active .step-dot {
  background: var(--accent);
  color: #042f2e;
}

.track-line {
  flex: 1;
  min-width: 24px;
  height: 2px;
  background: var(--border);
}

.track-line.active {
  background: var(--accent);
}

.key-box {
  margin-top: 12px;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: var(--bg-main);
  border: 1px dashed var(--accent);
  padding: 8px 14px;
  border-radius: 8px;
}

.key-box code {
  color: var(--accent);
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 1px;
}

.key-box button {
  background: var(--primary);
  color: white;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
}

.empty-state p {
  color: var(--text-muted);
  margin: 8px 0 20px;
}

.primary-btn {
  background: var(--primary);
  color: white;
  padding: 10px 22px;
  border-radius: 8px;
  font-weight: 600;
}

@media (max-width: 820px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }
  .library-card, .topup-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .library-card img, .topup-header img {
    width: 100%;
    height: 160px;
  }
}
</style>