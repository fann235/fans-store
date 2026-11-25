// Data Produk Lengkap Fans Store:
// - 16 Produk PC Gaming
// - 12 Produk Keyboard Mechanical
// - 10 Produk Gaming Mouse
// - 4 Game Top-Up (Mobile Legends, Free Fire, Valorant, PUBG Mobile) dengan gambar lokal dari public/images/

const pcImages = [
  "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&w=800&q=80"
];

const kbImages = [
  "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800&q=80"
];

const mouseImages = [
  "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1629429408209-1f912961dbd8?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1563297007-0686b7003af7?auto=format&fit=crop&w=800&q=80"
];

export const pcProducts = [
  { id: 101, title: "FansRig Titan RTX 4090 Ultimate", category: "PC", price: 48500000, originalPrice: 52000000, discount: 7, rating: 5.0, platform: "i9-14900K • 64GB DDR5 • 2TB NVMe", image: pcImages[0], description: "PC Gaming flagship rata kanan 4K 144Hz dengan liquid cooling 360mm dan casing tempered glass." },
  { id: 102, title: "FansRig Valkyrie RTX 4080 Super", category: "PC", price: 36900000, originalPrice: 39500000, discount: 7, rating: 4.9, platform: "Ryzen 9 7950X3D • 32GB DDR5", image: pcImages[1], description: "Ditenagai prosesor 3D V-Cache terbaik untuk gaming kompetitif FPS tinggi dan rendering berat." },
  { id: 103, title: "FansRig Phantom RTX 4070 Ti", category: "PC", price: 26500000, originalPrice: 28900000, discount: 8, rating: 4.9, platform: "i7-14700KF • 32GB DDR5", image: pcImages[2], description: "Performa 1440p Ultra lancar jaya dengan airflow maksimal dan pencahayaan ARGB sinkron." },
  { id: 104, title: "FansRig Striker RTX 4070 White", category: "PC", price: 22800000, originalPrice: 24500000, discount: 7, rating: 4.8, platform: "Ryzen 7 7800X3D • 32GB DDR5", image: pcImages[3], description: "Rakitan full-white aesthetic dengan kabel braided putih dan GPU triple-fan super senyap." },
  { id: 105, title: "FansRig Apex RTX 4060 Ti Pro", category: "PC", price: 16900000, originalPrice: 18500000, discount: 9, rating: 4.8, platform: "i5-14600K • 32GB DDR5", image: pcImages[0], description: "Pilihan ideal untuk streamer dan gamer AAA 1080p/1440p dengan teknologi DLSS 3 Frame Generation." },
  { id: 106, title: "FansRig Nova RTX 4060 Esports", category: "PC", price: 13200000, originalPrice: 14500000, discount: 9, rating: 4.7, platform: "Ryzen 5 7600 • 16GB DDR5", image: pcImages[1], description: "Dirancang khusus untuk Valorant, CS2, dan Apex Legends di atas 300 FPS stabil." },
  { id: 107, title: "FansRig Shadow RX 7900 XTX", category: "PC", price: 31500000, originalPrice: 34000000, discount: 7, rating: 4.9, platform: "Ryzen 9 7900X • 32GB DDR5", image: pcImages[2], description: "VRAM 24GB GDDR6 siap melibas game open-world dengan mod tekstur resolusi ultra." },
  { id: 108, title: "FansRig Horizon RX 7800 XT", category: "PC", price: 19400000, originalPrice: 21000000, discount: 8, rating: 4.8, platform: "Ryzen 7 7700X • 32GB DDR5", image: pcImages[3], description: "Raja price-to-performance untuk resolusi QHD 2K dengan pendingin heatsink tembaga." },
  { id: 109, title: "FansRig Pulse RX 7600 Compact", category: "PC", price: 11200000, originalPrice: 12300000, discount: 9, rating: 4.6, platform: "i5-13400F • 16GB DDR4", image: pcImages[0], description: "Casing Micro-ATX ringkas yang hemat ruang meja tanpa mengorbankan sirkulasi udara." },
  { id: 110, title: "FansRig Mini-ITX Cyber Cube", category: "PC", price: 24900000, originalPrice: 27000000, discount: 8, rating: 4.9, platform: "i7-13700F • RTX 4070 • 32GB", image: pcImages[1], description: "PC Gaming portabel berukuran ringkas dengan panel mesh aluminium dan handle bawaan." },
  { id: 111, title: "FansRig Creator Studio Z790", category: "PC", price: 39800000, originalPrice: 43000000, discount: 7, rating: 5.0, platform: "i9-13900K • 64GB • RTX 4080", image: pcImages[2], description: "Workstation sekaligus mesin gaming kelas atas untuk Blender 3D, Unreal Engine 5, dan editing 4K." },
  { id: 112, title: "FansRig Starter RTX 3060 12GB", category: "PC", price: 9850000, originalPrice: 10900000, discount: 10, rating: 4.7, platform: "i5-12400F • 16GB • 1TB SSD", image: pcImages[3], description: "PC Gaming entry-level terbaik dengan VRAM 12GB yang awet untuk game modern." },
  { id: 113, title: "FansRig Blaze Ryzen 5600G", category: "PC", price: 6750000, originalPrice: 7500000, discount: 10, rating: 4.6, platform: "Ryzen 5 5600G • 16GB • 512GB", image: pcImages[0], description: "PC siap pakai hemat daya, siap upgrade kartu grafis kapan saja dengan PSU 650W Bronze." },
  { id: 114, title: "FansRig Specter Dual-Chamber", category: "PC", price: 29500000, originalPrice: 32000000, discount: 8, rating: 4.9, platform: "i7-14700K • RTX 4070 Ti Super", image: pcImages[1], description: "Casing panoramic dual-chamber tanpa pilar depan dengan 9 kipas ARGB infinity mirror." },
  { id: 115, title: "FansRig Cobalt Liquid Custom", category: "PC", price: 54000000, originalPrice: 58500000, discount: 8, rating: 5.0, platform: "i9-14900KS • RTX 4090 • 64GB", image: pcImages[2], description: "Edisi kolektor dengan hard-tube watercooling khusus CPU & GPU serta sensor suhu digital." },
  { id: 116, title: "FansRig Streamer Bundle Pro", category: "PC", price: 18500000, originalPrice: 20200000, discount: 8, rating: 4.8, platform: "Ryzen 7 5700X3D • RTX 4060 Ti", image: pcImages[3], description: "Dilengkapi capture card internal dan dual NVMe SSD untuk rekaman gameplay tanpa drop FPS." }
];

export const keyboardProducts = [
  { id: 201, title: "FansMech K75 Pro Gasket RGB", category: "Keyboard", price: 890000, originalPrice: 1050000, discount: 15, rating: 4.9, platform: "75% Layout • Hot-Swap • Wireless", image: kbImages[0], description: "Keyboard mekanikal gasket mount dengan peredam poron 5 lapis dan knob volume aluminium." },
  { id: 202, title: "FansMech TKL-87 Esports Edition", category: "Keyboard", price: 750000, originalPrice: 880000, discount: 15, rating: 4.8, platform: "Tenkeyless • Linear Red Switch", image: kbImages[1], description: "Layout TKL tanpa numpad memberi ruang gerak mouse lebih luas saat turnamen FPS." },
  { id: 203, title: "FansMech Mini-60 Pocket Carbon", category: "Keyboard", price: 620000, originalPrice: 720000, discount: 14, rating: 4.7, platform: "60% Compact • Tri-Mode", image: kbImages[2], description: "Ukuran super ringkas 61 tombol dengan keycaps PBT double-shot anti pudar." },
  { id: 204, title: "FansMech Magnetic Rapid Trigger", category: "Keyboard", price: 1450000, originalPrice: 1690000, discount: 14, rating: 5.0, platform: "Hall Effect Switch • 8000Hz", image: kbImages[3], description: "Switch magnetik dengan aktuasi yang dapat diatur 0.1mm–4.0mm untuk counter-strafe instan." },
  { id: 205, title: "FansMech Fullsize 104 Command", category: "Keyboard", price: 820000, originalPrice: 950000, discount: 14, rating: 4.8, platform: "Fullsize 104 Keys • Tactile Brown", image: kbImages[0], description: "Dilengkapi numpad penuh, sandaran tangan magnetik empuk, dan tombol makro khusus." },
  { id: 206, title: "FansMech Alice Ergonomic Split", category: "Keyboard", price: 1180000, originalPrice: 1350000, discount: 13, rating: 4.9, platform: "Alice Layout • CNC Aluminum", image: kbImages[1], description: "Desain melengkung ergonomis mengikuti posisi alami pergelangan tangan agar tidak cepat lelah." },
  { id: 207, title: "FansMech Low-Profile Air 75", category: "Keyboard", price: 960000, originalPrice: 1120000, discount: 14, rating: 4.8, platform: "Ultra-Slim • Bluetooth 5.3 / 2.4G", image: kbImages[2], description: "Bodi tipis 16mm dengan switch mekanikal low-profile yang cepat dan responsif." },
  { id: 208, title: "FansMech Cyber-Transparent 82", category: "Keyboard", price: 790000, originalPrice: 920000, discount: 14, rating: 4.7, platform: "Clear Polycarbonate • South-Facing RGB", image: kbImages[3], description: "Casing dan keycaps transparan kristal yang memancarkan efek cahaya RGB ke seluruh meja." },
  { id: 209, title: "FansMech Silent Office & Night", category: "Keyboard", price: 680000, originalPrice: 790000, discount: 14, rating: 4.8, platform: "65% Layout • Silent Peach Switch", image: kbImages[0], description: "Suara ketikan nyaris tanpa bunyi, cocok untuk bermain game atau ngoding di malam hari." },
  { id: 210, title: "FansMech Retro Classic 1989", category: "Keyboard", price: 840000, originalPrice: 980000, discount: 14, rating: 4.9, platform: "75% Layout • Dye-Sub PBT", image: kbImages[1], description: "Nuansa warna retro abu-abu klasik dengan performa modern wireless 2.4GHz anti-delay." },
  { id: 211, title: "FansMech OLED Display 98", category: "Keyboard", price: 1290000, originalPrice: 1490000, discount: 13, rating: 4.9, platform: "98% Compact Full • Smart Screen", image: kbImages[2], description: "Dilengkapi layar mini OLED untuk menampilkan GIF animasi, indikator baterai, dan status koneksi." },
  { id: 212, title: "FansMech Starter K68 Wired", category: "Keyboard", price: 385000, originalPrice: 450000, discount: 14, rating: 4.6, platform: "65% Wired • Braided USB-C", image: kbImages[3], description: "Keyboard mekanikal terjangkau dengan hot-swappable socket dan 18 mode backlight." }
];

export const mouseProducts = [
  { id: 301, title: "FansPro X1 Superlight 52g", category: "Mouse", price: 690000, originalPrice: 820000, discount: 16, rating: 5.0, platform: "PAW3395 • 26.000 DPI • 52g", image: mouseImages[0], description: "Mouse wireless ultra-ringan 52 gram tanpa lubang dengan sensor flagship PAW3395 dan baterai 80 jam." },
  { id: 302, title: "FansPro Viper 4K Polling", category: "Mouse", price: 850000, originalPrice: 990000, discount: 14, rating: 4.9, platform: "4000Hz Wireless • Optical Switch", image: mouseImages[1], description: "Polling rate 4000Hz untuk pergerakan kursor super mulus di monitor 240Hz–360Hz." },
  { id: 303, title: "FansPro Ergo Palm D2", category: "Mouse", price: 540000, originalPrice: 640000, discount: 16, rating: 4.8, platform: "Ergonomic Right-Hand • Tri-Mode", image: mouseImages[2], description: "Bentuk asimetris ergonomis yang pas untuk palm grip maupun claw grip." },
  { id: 304, title: "FansPro MMO 12-Button Titan", category: "Mouse", price: 620000, originalPrice: 730000, discount: 15, rating: 4.7, platform: "12 Side Macro Buttons • RGB", image: mouseImages[3], description: "Dilengkapi 12 tombol samping yang dapat diprogram untuk MMO, MOBA, dan shortcut produktivitas." },
  { id: 305, title: "FansPro Honeycomb Air 49g", category: "Mouse", price: 430000, originalPrice: 510000, discount: 16, rating: 4.7, platform: "Ultralight 49g • Paracord Cable", image: mouseImages[0], description: "Cangkang sarang lebah berventilasi menjaga telapak tangan tetap sejuk saat sesi gaming panjang." },
  { id: 306, title: "FansPro Dock Edition RGB", category: "Mouse", price: 760000, originalPrice: 890000, discount: 15, rating: 4.9, platform: "Magnetic Charging Dock • 26K DPI", image: mouseImages[1], description: "Sudah termasuk dock pengisian daya magnetik dengan cincin lampu RGB di meja." },
  { id: 307, title: "FansPro Mini Claw Edition", category: "Mouse", price: 580000, originalPrice: 680000, discount: 15, rating: 4.8, platform: "Small Hand Size • Huano Pink Dot", image: mouseImages[2], description: "Ukuran compact khusus pengguna fingertip dan claw grip dengan klik renyah." },
  { id: 308, title: "FansPro Dual-Wheel Creator", category: "Mouse", price: 650000, originalPrice: 760000, discount: 14, rating: 4.8, platform: "Horizontal Scroll • Silent Click", image: mouseImages[3], description: "Memiliki scroll wheel samping untuk timeline editing video sekaligus sensor gaming presisi." },
  { id: 309, title: "FansPro Magnesium Alloy X", category: "Mouse", price: 1350000, originalPrice: 1550000, discount: 13, rating: 5.0, platform: "Magnesium Body • 45g • 8K Hz", image: mouseImages[0], description: "Rangka logam magnesium eksotis seberat 45g yang kokoh tanpa flex sedikit pun." },
  { id: 310, title: "FansPro Strike M1 Wired", category: "Mouse", price: 245000, originalPrice: 295000, discount: 17, rating: 4.6, platform: "12.000 DPI • PTFE Feet • RGB", image: mouseImages[1], description: "Mouse gaming kabel ringan dengan kaki teflon murni dan software pengaturan makro lengkap." }
];

export const topupGames = [
  {
    id: "mlbb",
    name: "Mobile Legends",
    publisher: "Moonton",
    currencyName: "Diamonds",
    badge: "Proses 1 Detik",
    inputLabel: "User ID & Zone ID",
    inputPlaceholder: "Contoh: 12345678 (2026)",
    image: "/images/mlbb.jpg",
    description: "Top-Up Diamond Mobile Legends resmi 100% legal. Cukup masukkan User ID dan Zone ID tanpa perlu login akun.",
    packages: [
      { id: "ml-86", title: "Mobile Legends — 86 Diamonds", amount: "86 Diamonds (78 + 8 Bonus)", price: 22000, originalPrice: 25000, discount: 12 },
      { id: "ml-172", title: "Mobile Legends — 172 Diamonds", amount: "172 Diamonds (156 + 16 Bonus)", price: 43000, originalPrice: 48000, discount: 10 },
      { id: "ml-257", title: "Mobile Legends — 257 Diamonds", amount: "257 Diamonds (234 + 23 Bonus)", price: 64000, originalPrice: 72000, discount: 11 },
      { id: "ml-514", title: "Mobile Legends — 514 Diamonds", amount: "514 Diamonds (468 + 46 Bonus)", price: 126000, originalPrice: 142000, discount: 11 },
      { id: "ml-1412", title: "Mobile Legends — 1412 Diamonds", amount: "1412 Diamonds (1280 + 132 Bonus)", price: 340000, originalPrice: 380000, discount: 11 },
      { id: "ml-wdp", title: "Mobile Legends — Weekly Diamond Pass", amount: "220 Diamonds + Starlight Point", price: 27500, originalPrice: 32000, discount: 14 }
    ]
  },
  {
    id: "ff",
    name: "Free Fire",
    publisher: "Garena",
    currencyName: "Diamonds",
    badge: "Bonus Top-Up",
    inputLabel: "Player ID (UID)",
    inputPlaceholder: "Contoh: 987654321",
    image: "/images/ff.jpg",
    description: "Top-Up Diamond Free Fire & Booyah Pass instan langsung masuk ke akun menggunakan Player ID.",
    packages: [
      { id: "ff-70", title: "Free Fire — 70 Diamonds", amount: "70 Diamonds", price: 10000, originalPrice: 12000, discount: 17 },
      { id: "ff-140", title: "Free Fire — 140 Diamonds", amount: "140 Diamonds", price: 19500, originalPrice: 23000, discount: 15 },
      { id: "ff-355", title: "Free Fire — 355 Diamonds", amount: "355 Diamonds", price: 48000, originalPrice: 55000, discount: 13 },
      { id: "ff-720", title: "Free Fire — 720 Diamonds", amount: "720 Diamonds", price: 95000, originalPrice: 110000, discount: 14 },
      { id: "ff-1450", title: "Free Fire — 1450 Diamonds", amount: "1450 Diamonds", price: 190000, originalPrice: 220000, discount: 14 },
      { id: "ff-member", title: "Free Fire — Membership Mingguan", amount: "450 Diamonds Total", price: 29000, originalPrice: 35000, discount: 17 }
    ]
  },
  {
    id: "valorant",
    name: "Valorant",
    publisher: "Riot Games",
    currencyName: "Valorant Points",
    badge: "Riot Direct",
    inputLabel: "Riot ID & Tagline",
    inputPlaceholder: "Contoh: FansPlayer#2026",
    image: "/images/valorant.png",
    description: "Top-Up Valorant Points (VP) resmi untuk membeli bundle skin senjata dan Battle Pass terbaru.",
    packages: [
      { id: "val-475", title: "Valorant — 475 Points", amount: "475 VP", price: 54000, originalPrice: 60000, discount: 10 },
      { id: "val-1000", title: "Valorant — 1000 Points", amount: "1000 VP", price: 108000, originalPrice: 120000, discount: 10 },
      { id: "val-2050", title: "Valorant — 2050 Points", amount: "2050 VP", price: 215000, originalPrice: 240000, discount: 10 },
      { id: "val-3650", title: "Valorant — 3650 Points", amount: "3650 VP", price: 375000, originalPrice: 415000, discount: 10 },
      { id: "val-5350", title: "Valorant — 5350 Points", amount: "5350 VP", price: 540000, originalPrice: 600000, discount: 10 },
      { id: "val-11000", title: "Valorant — 11000 Points", amount: "11000 VP", price: 1070000, originalPrice: 1180000, discount: 9 }
    ]
  },
  {
    id: "pubg",
    name: "PUBG Mobile",
    publisher: "Tencent / Level Infinite",
    currencyName: "UC (Unknown Cash)",
    badge: "Global / Indo",
    inputLabel: "Character ID (UID)",
    inputPlaceholder: "Contoh: 5123456789",
    image: "/images/pubg.webp",
    description: "Top-Up UC PUBG Mobile resmi untuk membuka Royale Pass, crate eksklusif, dan upgrade senjata.",
    packages: [
      { id: "pubg-60", title: "PUBG Mobile — 60 UC", amount: "60 UC", price: 14500, originalPrice: 17000, discount: 15 },
      { id: "pubg-325", title: "PUBG Mobile — 325 UC", amount: "325 UC (300 + 25 Bonus)", price: 72000, originalPrice: 82000, discount: 12 },
      { id: "pubg-660", title: "PUBG Mobile — 660 UC", amount: "660 UC (600 + 60 Bonus)", price: 142000, originalPrice: 160000, discount: 11 },
      { id: "pubg-1800", title: "PUBG Mobile — 1800 UC", amount: "1800 UC (1500 + 300 Bonus)", price: 355000, originalPrice: 400000, discount: 11 },
      { id: "pubg-3850", title: "PUBG Mobile — 3850 UC", amount: "3850 UC (3000 + 850 Bonus)", price: 710000, originalPrice: 790000, discount: 10 },
      { id: "pubg-8100", title: "PUBG Mobile — 8100 UC", amount: "8100 UC (6000 + 2100 Bonus)", price: 1420000, originalPrice: 1580000, discount: 10 }
    ]
  }
];

// Gabungan seluruh produk untuk tab "All" (16 PC + 12 Keyboard + 10 Mouse)
export const allHardwareProducts = [
  ...pcProducts,
  ...keyboardProducts,
  ...mouseProducts
];