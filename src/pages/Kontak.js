import React from 'react';
import '../index.css';

export default function Kontak() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      <header className="py-10 text-center shadow-md" style={{backgroundColor: 'var(--desa-primary)'}}>
        <h1 className="text-3xl font-bold text-white mb-2">Hubungi Kami</h1>
        <p className="text-emerald-100">Saluran informasi dan komunikasi resmi Pemerintah Desa Karangkepoh.</p>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center hover:shadow-lg transition duration-300">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
              <i className="fab fa-whatsapp"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Layanan Informasi</h2>
            <p className="text-gray-500 mb-6">Butuh bantuan atau informasi pelayanan? Hubungi nomor resmi desa kami (Chat Only).</p>
            <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200">
              <p className="text-3xl font-black text-gray-800 tracking-wider">0812-3456-7890</p>
            </div>
            <a href="https://wa.me/6281234567890" className="inline-flex items-center justify-center w-full bg-[var(--desa-primary)] hover:opacity-90 text-white font-bold py-3 px-6 rounded-lg transition shadow-md">
              <i className="fab fa-whatsapp mr-2"></i> Chat WhatsApp Sekarang
            </a>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center hover:shadow-lg transition duration-300 flex flex-col justify-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
              <i className="fas fa-share-alt"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Ikuti Media Sosial</h2>
            <p className="text-gray-500 mb-8">Dapatkan update kegiatan, dokumentasi, dan berita terbaru melalui akun resmi kami.</p>
            <div className="grid grid-cols-2 gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition group">
                <i className="fab fa-facebook text-xl text-gray-400 group-hover:text-blue-600"></i>
                <span className="font-semibold">Facebook</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-pink-600 hover:text-pink-600 hover:bg-pink-50 transition group">
                <i className="fab fa-instagram text-xl text-gray-400 group-hover:text-pink-600"></i>
                <span className="font-semibold">Instagram</span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-red-600 hover:text-red-600 hover:bg-red-50 transition group">
                <i className="fab fa-youtube text-xl text-gray-400 group-hover:text-red-600"></i>
                <span className="font-semibold">YouTube</span>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-black hover:text-black hover:bg-gray-100 transition group">
                <i className="fab fa-tiktok text-xl text-gray-400 group-hover:text-black"></i>
                <span className="font-semibold">TikTok</span>
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-900 text-white p-6 md:p-8 flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-2xl">
              <i className="fas fa-landmark"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Kantor Kepala Desa Karangkepoh</h2>
              <p className="text-gray-400 text-sm">Pusat Pelayanan Administratif</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Alamat Kantor</h4>
                  <p className="text-gray-600 text-sm leading-relaxed mt-1">Jl. Raya Karangkepoh No. 1, RT 01 / RW 01, Kecamatan Karanggede, Kabupaten Boyolali, Jawa Tengah 57381.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Email Resmi</h4>
                  <a href="mailto:admin@karangkepoh.desa.id" className="text-[var(--desa-primary)] text-sm hover:underline mt-1 block">admin@karangkepoh.desa.id</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="w-full">
                  <h4 className="font-bold text-gray-900 mb-2">Jam Pelayanan</h4>
                  <div className="bg-gray-50 rounded-lg p-3 text-sm border border-gray-200">
                    <div className="flex justify-between border-b border-gray-200 pb-2 mb-2">
                      <span className="text-gray-600">Senin - Kamis</span>
                      <span className="font-bold text-gray-800">08.00 - 15.00 WIB</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-2 mb-2">
                      <span className="text-gray-600">Jumat</span>
                      <span className="font-bold text-gray-800">08.00 - 11.00 WIB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sabtu - Minggu</span>
                      <span className="font-bold text-red-500">Libur</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative bg-gray-200 min-h-[350px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d608.8321717890612!2d110.67218976514518!3d-7.357801800785103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a748ee518d1fd%3A0x7e04f480b436e510!2sKantor%20Kepala%20Desa!5e1!3m2!1sid!2sid!4v1768735919178!5m2!1sid!2sid"
                className="absolute inset-0 w-full h-full border-0"
                title="Peta Karanggede"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </main>
    </main>
  );
}
