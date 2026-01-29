import React from 'react';
import '../index.css';

// --- DATA CONFIGURATION ---
const kontakData = {
  hero: {
    title: "Hubungi Kami",
    description: "Saluran informasi dan komunikasi resmi Pemerintah Desa Karangkepoh."
  },
  layananInfo: {
    title: "Layanan Informasi",
    description: "Butuh bantuan atau informasi pelayanan? Hubungi nomor resmi desa kami (Chat Only).",
    phoneDisplay: "0812-3456-7890",
    waLink: "https://wa.me/6281234567890"
  },
  mediaSosial: {
    title: "Ikuti Media Sosial",
    description: "Dapatkan update kegiatan, dokumentasi, dan berita terbaru melalui akun resmi kami.",
    items: [
      {
        name: "Instagram",
        url: "https://instagram.com",
        icon: "fab fa-instagram",
        colorClass: "hover:border-pink-600 hover:text-pink-600 hover:bg-pink-50"
      },
      {
        name: "YouTube",
        url: "https://youtube.com",
        icon: "fab fa-youtube",
        colorClass: "hover:border-red-600 hover:text-red-600 hover:bg-red-50"
      }
    ]
  },
  kantorDesa: {
    title: "Kantor Kepala Desa Karangkepoh",
    subtitle: "Pusat Pelayanan Administratif",
    address: "Jalan Raya Karanggede - Gemolong, Desa Karangkepoh, Kec. Karanggede, Kab. Boyolali",
    email: "desakarangkepoh1@gmail.com",
    jamKerja: [
      { hari: "Senin - Kamis", jam: "08.00 - 14.00 WIB" },
      { hari: "Jumat", jam: "08.00 - 11.00 WIB" }
    ],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d346.5271219609976!2d110.67237546849056!3d-7.3580690263974695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a748ee518d1fd%3A0x7e04f480b436e510!2sKantor%20Kepala%20Desa!5e1!3m2!1sid!2sid!4v1769477247786!5m2!1sid!2sid"
  }
};

export default function Kontak() {
  const { hero, layananInfo, mediaSosial, kantorDesa } = kontakData;

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      
      {/* HERO SECTION */}
      <header className="py-10 text-center shadow-md" style={{backgroundColor: 'var(--desa-primary)'}}>
        <h1 className="text-3xl font-bold text-white mb-2">{hero.title}</h1>
        <p className="text-emerald-100">{hero.description}</p>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          {/* KONTAK WHATSAPP */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center hover:shadow-lg transition duration-300">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
              <i className="fab fa-whatsapp"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{layananInfo.title}</h2>
            <p className="text-gray-500 mb-6">{layananInfo.description}</p>
            <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200">
              <p className="text-3xl font-black text-gray-800 tracking-wider">{layananInfo.phoneDisplay}</p>
            </div>
            <a href={layananInfo.waLink} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-full bg-[var(--desa-primary)] hover:opacity-90 text-white font-bold py-3 px-6 rounded-lg transition shadow-md">
              <i className="fab fa-whatsapp mr-2"></i> Chat WhatsApp Sekarang
            </a>
          </div>

          {/* MEDIA SOSIAL */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center hover:shadow-lg transition duration-300 flex flex-col justify-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
              <i className="fas fa-share-alt"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{mediaSosial.title}</h2>
            <p className="text-gray-500 mb-8">{mediaSosial.description}</p>
            <div className="grid grid-cols-2 gap-4">
              {mediaSosial.items.map((sosmed, index) => (
                <a 
                  key={index}
                  href={sosmed.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`flex items-center justify-center gap-2 p-3 rounded-lg border border-gray-200 transition group ${sosmed.colorClass}`}
                >
                  <i className={`${sosmed.icon} text-xl text-gray-400 group-hover:text-inherit`}></i>
                  <span className="font-semibold">{sosmed.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* INFO KANTOR & PETA */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-900 text-white p-6 md:p-8 flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-2xl">
              <i className="fas fa-landmark"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{kantorDesa.title}</h2>
              <p className="text-gray-400 text-sm">{kantorDesa.subtitle}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 space-y-6">
              
              {/* Alamat */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Alamat Kantor</h4>
                  <p className="text-gray-600 text-sm leading-relaxed mt-1">{kantorDesa.address}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Email</h4>
                  <a href={`mailto:${kantorDesa.email}`} className="text-[var(--desa-primary)] text-sm hover:underline mt-1 block">{kantorDesa.email}</a>
                </div>
              </div>

              {/* Jam Pelayanan */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="w-full">
                  <h4 className="font-bold text-gray-900 mb-2">Jam Pelayanan</h4>
                  <div className="bg-gray-50 rounded-lg p-3 text-sm border border-gray-200">
                    {kantorDesa.jamKerja.map((jadwal, idx) => (
                      <div key={idx} className={`flex justify-between ${idx !== kantorDesa.jamKerja.length - 1 ? 'border-b border-gray-200 pb-2 mb-2' : ''}`}>
                        <span className="text-gray-600">{jadwal.hari}</span>
                        <span className={`font-bold ${jadwal.isLibur ? 'text-red-500' : 'text-gray-800'}`}>{jadwal.jam}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Peta (Embed Google Maps) */}
            <div className="relative bg-gray-200 min-h-[350px]">
              <iframe
                src={kantorDesa.mapUrl}
                className="absolute inset-0 w-full h-full border-0"
                title="Peta Kantor Desa"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </main>
    </main>
  );
}