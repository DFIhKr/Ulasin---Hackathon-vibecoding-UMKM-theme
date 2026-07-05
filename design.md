# Panduan Desain & UI/UX: UMKM Maps Automator

## 1. Filosofi UI/UX (Gaptek-Friendly)
- **Satu Layar, Satu Fokus:** Jangan gunakan form panjang yang di-*scroll*. Gunakan model *Wizard* (Step-by-step). Satu pertanyaan per halaman.
- **Bahasa Manusia:** Hindari istilah teknis. Ganti "Deskripsi Bisnis" menjadi "Ceritakan jualan bapak/ibu".
- **Tombol Super Besar:** Area klik (*tap target*) harus besar dan jelas.
- **Kontras Tinggi:** Gunakan teks hitam/gelap pada latar belakang putih/terang.

## 2. Tech Stack Frontend
- **Framework:** React + TypeScript (via Vite)
- **Styling:** Tailwind CSS
- **Iconography:** Lucide-React (simpel dan modern)
- **State Management:** React Hook Form (opsional, atau cukup state lokal per step)

## 3. Alur Pengguna (User Flow)

### Step 1: Layar Pembuka (Landing/Welcome)
- **Headline:** "Bikin Tokomu Masuk Google Maps, Cukup 3 Menit!"
- **Sub-headline:** "Biar pelanggan gampang cari alamatmu. Tinggal jawab pertanyaan santai, kami yang urus sisanya."
- **Aksi:** Tombol raksasa "Mulai Daftar Sekarang" (Warna utama: Biru Google `#4285F4` atau Hijau mencolok).

### Step 2: Nama Usaha
- **Pertanyaan:** "Apa nama warung atau usahanya?"
- **Input:** *Text field* besar dengan *placeholder* "Misal: Warung Soto Banjar Acil Mida"
- **Aksi:** Tombol "Lanjut" di bagian bawah.

### Step 3: Cerita Bisnis (Magic AI Area)
- **Pertanyaan:** "Ceritakan sedikit soal usahanya. Jual apa saja dan buka jam berapa?"
- **Input:** *Textarea* besar. 
- **Bantuan Teks:** "Ketik santai aja pak/bu. Misal: Ulun jualan soto banjar tiap hari dari jam 8 pagi sampai sore di pinggir jalan raya."
- **Aksi:** Tombol "Lanjut".

### Step 4: Alamat & Kontak
- **Pertanyaan:** "Di mana lokasinya dan berapa nomor HP yang bisa dihubungi?"
- **Input 1:** *Text field* untuk patokan alamat.
- **Input 2:** *Text field* untuk Nomor HP (Pastikan menggunakan `type="tel"` agar *keyboard* angka muncul otomatis di HP).
- **Aksi:** Tombol "Buat Titik Lokasi" (Saat diklik, muncul efek *loading* yang ramah: "Sedang merapikan data toko bapak/ibu...").

### Step 5: Verifikasi OTP
- **UI:** Muncul setelah API dikirim ke *backend*.
- **Pesan:** "Google baru saja mengirim SMS angka rahasia ke nomor bapak/ibu. Tolong masukkan angkanya di sini ya."
- **Input:** 6 kotak angka besar (*OTP Input*).

### Step 6: Sukses & QR Code
- **UI:** Konfeti animasi (opsional tapi bagus untuk apresiasi).
- **Pesan:** "Selamat! Toko bapak/ibu sudah terdaftar di Google Maps."
- **Aset:** Menampilkan gambar QR Code yang rapi.
- **Aksi:** Tombol "Download QR Code untuk Dicetak" atau "Bagikan ke WhatsApp".

## 4. Panduan Komponen (Tailwind)
- **Tombol Utama:** `w-full bg-blue-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg active:scale-95 transition-transform`
- **Input Teks:** `w-full border-2 border-gray-300 rounded-xl p-4 text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none`
- **Teks Judul:** `text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-4`
