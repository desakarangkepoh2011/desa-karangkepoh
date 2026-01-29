import React from 'react';
import '../index.css';

// --- DATA CONFIGURATION ---
const homeData = {
  hero: {
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    preTitle: "Informasi & Layanan Desa",
    title: "Selamat Datang di",
    highlight: "Desa Karangkepoh",
    description: "Mewujudkan tata kelola pemerintahan desa yang transparan, akuntabel, dan pelayanan publik yang prima."
  },
  pengumuman: {
    badge: "TERBARU",
    kategori: "Agenda Desa",
    tanggal: "17 Januari 2026",
    judul: "Musyawarah Perencanaan Pembangunan Desa (Musrenbang) Tahun 2026",
    isi: "Pemerintah Desa Karangkepoh mengundang seluruh perwakilan masyarakat, Ketua RT/RW, dan Lembaga Desa untuk hadir dalam musyawarah penyusunan RKPDes. Partisipasi Anda sangat berarti bagi kemajuan desa kita.",
    link: "/informasi#pengumuman"
  },
  videoProfil: {
    judul: "Profil Desa Kami",
    deskripsi: "Menelusuri keindahan alam, budaya, dan potensi ekonomi warga Desa Karangkepoh.",
    youtubeSrc: "https://www.youtube.com/embed/WnCv6N0PrBs?si=BShYJXZKot6uDfEX"
  },
  statistik: [
    { label: "Total Penduduk", value: "2.696", icon: "users" },
    { label: "Kepala Keluarga", value: "925", icon: "home" },
    { label: "Luas (Ha)", value: "276,16", icon: "map" },
    { label: "Wilayah Dusun", value: "4", icon: "map-marked-alt" }
  ],
  layananSection: {
    judul: "Layanan Administrasi",
    deskripsi: "Pilih layanan surat yang Anda butuhkan di bawah ini.",
    list: [
      { label: "Kartu Keluarga", id: "kk" },
      { label: "Kartu Tanda Penduduk", id: "ktp" },
      { label: "Akta Kelahiran", id: "lahir" },
      { label: "Akta Kematian", id: "mati" },
      { label: "Kartu Identitas Anak", id: "kia" },
      { label: "Pindah Datang", id: "pindah_datang" },
      { label: "Pindah Keluar", id: "pindah_keluar" },
      { label: "Kutipan Ke-2 Akta Kelahiran", id: "kutipan_lahir_kedua" }
    ]
  }
};

export default function Home({ navigate }) {
  const { hero, pengumuman, videoProfil, statistik, layananSection } = homeData;

  return (
    <>
      {/* HERO SECTION */}
      <header className="relative h-[72vh] flex items-center justify-center bg-cover bg-center" style={{backgroundImage: `url('${hero.image}')`}}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto text-white">
          <span className="block text-desa-light font-semibold tracking-wider mb-2 uppercase">{hero.preTitle}</span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{hero.title} <span className="text-green-300">{hero.highlight}</span></h1>
          <p className="text-gray-200 mb-6">{hero.description}</p>
          <div className="flex gap-4 justify-center">
            <a href="/layanan" onClick={(e) => { e.preventDefault(); navigate('/layanan'); }} className="btn btn-primary">Layanan Desa</a>
            <a href="/profil" onClick={(e) => { e.preventDefault(); navigate('/profil'); }} className="btn btn-outline">Lihat Profil</a>
          </div>
        </div>
      </header>

      <main className="py-16">
        
        {/* PENGUMUMAN SECTION */}
        <section id="pengumuman" className="py-8 bg-white">
          <div className="site-container">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Info Desa Terkini</h2>
              <div className="h-1 w-20 bg-desa-primary mx-auto"></div>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden relative hover:shadow-2xl transition duration-300">
                <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl z-10 shadow-sm">{pengumuman.badge}</div>

                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide">{pengumuman.kategori}</span>
                    <span className="text-gray-400 text-sm font-medium flex items-center"><i className="far fa-clock mr-2"></i> {pengumuman.tanggal}</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">{pengumuman.judul}</h3>
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed">{pengumuman.isi}</p>

                  <div className="flex flex-col sm:flex-row items-center gap-4 border-t border-gray-100 pt-6">
                    <a href={pengumuman.link} onClick={(e) => { e.preventDefault(); navigate(pengumuman.link); }} className="btn btn-primary w-full sm:w-auto">Lihat lainnya</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROFIL VIDEO SECTION */}
        <section id="profil" className="py-12 bg-white">
          <div className="site-container text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{videoProfil.judul}</h2>
            <div className="h-1 w-20 bg-desa-primary mx-auto mb-6"></div>
            <p className="text-gray-600 mb-10">{videoProfil.deskripsi}</p>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-gray-200 max-w-4xl mx-auto">
              <iframe className="absolute top-0 left-0 w-full h-full" src={videoProfil.youtubeSrc} title="Video Profil Desa" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          </div>
        </section>

        {/* STATISTIK SECTION */}
        <section id="statistik" className="py-12 relative overflow-hidden" style={{backgroundColor: 'var(--desa-primary)'}}>
          <div className="site-container w-full px-6 relative z-10 text-center">
            <h2 className="text-3xl font-bold mb-8 text-desa-dark">Data Statistik Terkini</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-4xl mx-auto">
              {statistik.map((item, index) => (
                <div key={index} className="p-4">
                  <i className={`fas fa-${item.icon} text-4xl mb-4 text-green-200`}></i>
                  <div className="text-4xl font-bold mb-1 text-desa-dark">{item.value}</div>
                  <div className="text-sm uppercase tracking-wide text-gray-900 md:text-green-100">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LAYANAN SECTION */}
        <section id="layanan" className="py-12 bg-gray-50">
          <div className="site-container">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{layananSection.judul}</h2>
              <div className="h-1 w-20 bg-desa-primary mx-auto mb-4"></div>
              <p className="text-gray-600">{layananSection.deskripsi}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {layananSection.list.map((item) => (
                <div key={item.id} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 group text-center">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-desa-primary mb-6 group-hover:bg-desa-primary group-hover:text-white transition mx-auto">
                    <i className="fas fa-file-alt text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{item.label}</h3>
                  <p className="text-gray-500 mb-6 text-sm leading-relaxed">Permohonan layanan {item.label} secara online melalui sistem desa.</p>
                  {/* UPDATED: Navigasi mengirim parameter query ?open=ID */}
                  <a 
                    href={`/layanan?open=${item.id}`} 
                    onClick={(e) => { e.preventDefault(); navigate(`/layanan?open=${item.id}`); }} 
                    className="btn-link"
                  >
                    Buat Surat <i className="fas fa-arrow-right ml-2 text-xs"></i>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  );
}