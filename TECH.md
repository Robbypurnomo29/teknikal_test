# Dokumentasi Teknis

## Ruang lingkup

`src/index.html` adalah aplikasi satu halaman (single-page) statis. Template, CSS, dan logika aplikasi berada dalam berkas terpisah; Vue 3 dimuat melalui CDN dan berjalan seluruhnya di peramban. Tidak ada package manager, server aplikasi, database, atau test suite.

## Arsitektur saat ini

| Lapisan | Implementasi | Tanggung jawab |
| --- | --- | --- |
| Tampilan | `src/index.html` dengan directive Vue | Header, pencarian, area produk, indikator loading, panel keranjang, toast, dan dialog |
| Gaya | `assets/css/style.css` | Grid produk, kartu, panel samping, state terbuka, toast, dialog, dan breakpoint sederhana |
| Framework | Vue 3 global build dari CDN | Binding reaktif, computed value, rendering daftar, dan event handler |
| State | `data()` pada satu Vue app di `assets/js/app.js` | Menyimpan katalog, keranjang, pencarian, dialog, toast, serta state sidebar |
| Interaksi | `methods` di `assets/js/app.js` dan event directive Vue | Memuat produk, mengubah keranjang, membuka dialog, dan checkout |
| Data/API | Array lokal dan `setTimeout` | Menirukan respons katalog dan proses checkout |

## Alur aplikasi

1. Saat instance Vue dipasang, lifecycle `mounted()` memanggil `loadProducts()` dan menampilkan indikator loading.
2. Setelah 1,5 detik, fungsi tersebut mengisi state `products` dengan delapan produk contoh. Vue memperbarui template secara reaktif.
3. `v-model` pada kotak pencarian memperbarui `searchKeyword`; computed `filteredProducts` menyaring katalog berdasarkan nama.
4. `addToCart(product)` menambah atau menaikkan kuantitas item lalu mengaktifkan toast.
5. Computed `cartTotalQuantity` dan `cartTotal` menghitung total unit dan harga. Template otomatis memperbarui sidebar tanpa manipulasi DOM manual.
6. `removeFromCart()` dan `checkout()` mengisi `pendingAction`, yang membuka dialog konfirmasi. Konfirmasi penghapusan menghapus item; konfirmasi checkout menunggu 2 detik, mengosongkan state, menutup panel, dan menampilkan notifikasi sukses.

## Kontrak data

Setiap produk contoh memiliki bentuk berikut:

```js
{
  id: 1,
  name: '無線藍牙耳機',
  price: 2999,
  image: 'earphones.jpg'
}
```

Saat dimasukkan ke keranjang, produk dibungkus dengan kuantitas:

```js
{
  product: /* objek produk */,
  quantity: 1
}
```

Properti `image` belum digunakan untuk menampilkan gambar sungguhan. Kartu produk dan item keranjang menggunakan placeholder CSS.

## Responsivitas

- Di atas 768px, grid menggunakan empat kolom dan `.container` memiliki lebar tetap 1200px.
- Pada lebar maksimal 768px, container menjadi selebar viewport dan grid menjadi dua kolom.
- Panel keranjang tetap berlebar 400px pada semua viewport.

## Batasan dan isu yang diketahui

Keterbatasan yang masih relevan setelah migrasi Vue:

| Area | Dampak |
| --- | --- |
| Framework | Vue dimuat dari CDN; kegagalan jaringan atau CDN akan membuat aplikasi tidak dapat diinisialisasi. |
| Layout | Lebar container dan panel keranjang yang tetap dapat melampaui layar kecil; breakpoint belum menangani layar sangat sempit. |
| CSS | Selektor placeholder terlalu spesifik sehingga pemeliharaan dan override style lebih sulit. |
| Data jaringan | Katalog dan checkout hanya simulasi; tidak ada kegagalan jaringan, validasi respons, atau recovery state. |
| Pencarian | Pencarian nama reaktif tersedia, tetapi belum didebounce untuk katalog berukuran besar. |
| Umpan balik | Notifikasi dan dialog konfirmasi sekarang tersedia, namun belum ada variasi status gagal dari API nyata. |
| Aksesibilitas | Dialog belum memiliki focus trap atau handler tombol Escape; panel keranjang juga belum mengelola fokus sepenuhnya. |
| Keamanan | Data lokal saat ini tepercaya. Saat API nyata ditambahkan, payload harus tetap divalidasi sebelum digunakan. |

## Arah perbaikan yang disarankan

1. Gunakan layout fluid, misalnya `max-width`, `minmax()`, dan breakpoint untuk panel keranjang satu layar penuh pada ponsel.
2. Saat menghubungkan API nyata, gunakan `fetch` dengan `try/catch`, state loading/error yang jelas, abort untuk request usang, serta validasi payload.
3. Tampilkan gambar produk yang benar, format harga dengan `Intl.NumberFormat('zh-TW', { style: 'currency', currency: 'TWD' })`, dan simpan keranjang bila persistence dibutuhkan.
4. Tambahkan focus trap, tombol Escape, manajemen fokus setelah dialog ditutup, dan pengujian keyboard.
5. Untuk penggunaan produksi, pin versi Vue dan pertimbangkan proses build yang membundel dependency secara lokal.

## Verifikasi manual

Setelah halaman dibuka, pastikan katalog muncul, pencarian menyaring produk, penambahan produk memunculkan toast dan meningkatkan total unit, kontrol `+`/`-` serta input angka memperbarui total, penghapusan dan checkout meminta konfirmasi, klik di luar panel menutup keranjang, dan checkout mengosongkan keranjang setelah simulasi selesai.
