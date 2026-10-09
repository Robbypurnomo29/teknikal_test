# 精品商店 / Premium Shop Demo

Proyek ini adalah halaman demonstrasi toko sederhana berbasis satu berkas HTML. Antarmukanya menggunakan bahasa Mandarin Tradisional dan memperlihatkan daftar produk, keranjang belanja samping, pengaturan kuantitas, serta alur checkout tiruan.

Seluruh implementasi berada di [src/index.html](src/index.html). Halaman menggunakan Vue 3.5.43 dari CDN sehingga tidak membutuhkan proses build atau package manager, tetapi membutuhkan koneksi internet saat pertama kali memuat framework. Tidak ada backend maupun API eksternal.

## Fitur saat ini

- Memuat delapan data produk contoh setelah jeda simulasi 1,5 detik.
- Mencari produk berdasarkan nama melalui kotak pencarian.
- Menampilkan produk dalam grid dan memberi notifikasi saat produk dimasukkan ke keranjang.
- Menggabungkan produk yang sama dengan menaikkan kuantitasnya; kuantitas juga dapat diisi langsung dengan bilangan bulat lebih dari satu.
- Menampilkan total unit produk dan total harga dalam format nominal NT$.
- Membuka atau menutup panel keranjang dari sisi kanan layar, termasuk saat area luar panel diklik.
- Meminta konfirmasi sebelum menghapus item atau melanjutkan checkout.
- Mensimulasikan checkout selama 2 detik, lalu mengosongkan keranjang dan menampilkan notifikasi sukses.

## Menjalankan proyek

Halaman dapat dibuka langsung dengan peramban dari `src/index.html`. Untuk perilaku yang lebih menyerupai server web, jalankan server statis dari direktori proyek:

```bash
python3 -m http.server 8000
```

Kemudian buka `http://localhost:8000/src/`.

## Struktur direktori

```text
.
├── src/
│   └── index.html  # Template Vue, CSS, data contoh, dan logika aplikasi
├── README.md       # Ringkasan proyek dan cara menjalankan
├── TECH.md         # Arsitektur, perilaku teknis, dan batasan
└── AI.md           # Pedoman penggunaan AI untuk pengembangan lanjutan
```

## Catatan penting

Ini adalah prototipe front-end, bukan toko siap produksi. Produk, gambar, proses checkout, dan data keranjang hanya berada di memori peramban selama halaman terbuka. Lihat [TECH.md](TECH.md) untuk rincian keputusan teknis dan isu yang telah ditandai di kode.

## Lisensi

Lisensi belum ditentukan dalam repositori ini.
