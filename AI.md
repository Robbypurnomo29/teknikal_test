# Pedoman AI untuk Pengembangan Lanjutan

Dokumen ini memberikan konteks bagi asisten AI atau kontributor yang akan mengubah proyek. Ini bukan deskripsi fitur tambahan yang telah diimplementasikan.

## Konteks proyek

- Bahasa antarmuka sumber adalah Mandarin Tradisional (`lang="zh-TW"`), sedangkan dokumentasi ini ditulis dalam Bahasa Indonesia.
- Template aplikasi berada di `src/index.html`, gaya di `assets/css/style.css`, dan logika Vue di `assets/js/app.js`. Vue 3 global build dimuat dari CDN untuk state dan rendering reaktif.
- Tidak ada backend, aset gambar lokal, atau konfigurasi build yang boleh diasumsikan tersedia.
- Perilaku data saat ini merupakan simulasi dan harus dipertahankan bila tugas tidak secara eksplisit meminta integrasi API nyata.

## Prinsip perubahan

1. Baca `src/index.html`, `assets/css/style.css`, dan `assets/js/app.js` sebelum mengubah alur tampilan atau interaksi.
2. Gunakan state Vue (`data`, `computed`, dan `methods`) untuk perilaku baru; jangan kembali ke manipulasi DOM manual atau event inline.
3. Pertahankan fungsi inti: memuat dan mencari produk, menambah/menghapus item dengan konfirmasi, mengubah kuantitas, memperbarui total, membuka/menutup keranjang, dan checkout tiruan.
4. Bila menambahkan data dari luar kode, gunakan interpolasi atau binding Vue; hindari `v-html` kecuali kontennya telah disanitasi dengan tepat.
5. Bila melakukan refactor, lakukan secara inkremental dan pastikan UI tetap dapat dipakai hanya dengan mouse dan keyboard.
6. Jangan menambahkan dependency tambahan untuk perubahan kecil. Bila memperkenalkan proses build, dokumentasikan alasan serta dampak deployment-nya.

## Checklist implementasi

- Pastikan tampilan berfungsi pada viewport sempit, khususnya panel keranjang yang saat ini lebar tetap 400px.
- Gunakan elemen `button` untuk aksi yang dapat diklik dan sediakan label yang dapat diakses.
- Gunakan binding event Vue (misalnya `@click`) dan pertahankan perhitungan turunan di `computed`.
- Tangani state loading, gagal, dan sukses ketika menambahkan request asinkron.
- Format nominal TWD secara konsisten dan jangan menganggap harga selalu integer tanpa kebutuhan yang jelas.
- Pertimbangkan persistence keranjang hanya jika fitur tersebut diminta; state sekarang sengaja sementara.
- Perbarui `README.md` dan `TECH.md` bila perilaku, struktur, atau teknologi proyek berubah.

## Cara memvalidasi perubahan

Lakukan pemeriksaan manual di peramban untuk alur berikut:

1. Produk muncul setelah status loading selesai.
2. Pencarian menyaring produk dan menampilkan pesan ketika tidak ada hasil.
3. Menambah produk baru dan produk yang sama menghasilkan jumlah serta total yang benar, serta menampilkan toast.
4. Input jumlah bilangan bulat dan tombol `+`/`-` memperbarui total unit dengan benar.
5. Menghapus item dan checkout memerlukan konfirmasi; pembatalan tidak mengubah isi keranjang.
6. Keranjang dapat dibuka, ditutup dengan tombol, serta ditutup dengan klik di luar area panel.
7. Checkout keranjang kosong menampilkan penolakan; checkout keranjang berisi mengosongkan keranjang setelah simulasi.
8. Layout tidak menyebabkan overflow horizontal pada ukuran ponsel yang didukung.

## Prompt kerja yang berguna

Contoh instruksi yang terarah untuk tugas berikutnya:

> Perluas `src/index.html` berbasis Vue 3 tanpa mengubah struktur visualnya: tambahkan state error untuk pemuatan produk tiruan, pertahankan bahasa UI Mandarin Tradisional, dan verifikasi semua computed value keranjang tetap benar.

Gunakan instruksi yang menyebutkan batas perubahan, perilaku yang harus dipertahankan, dan cara validasinya. Hindari meminta AI “memperbaiki semuanya” tanpa prioritas karena daftar isu di sumber mencakup responsivitas, arsitektur, performa, aksesibilitas, dan integrasi data.
