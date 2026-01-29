import React, { useState } from 'react';
import '../index.css';

// --- DATA CONFIGURATION ---
const informasiData = {
  hero: {
    title: "Berita & Pengumuman",
    description: "Informasi terkini Desa Karangkepoh."
  },
  berita: {
    title: "Kabar Desa",
    items: [
      {
        id: 1,
        title: "Penyaluran Bantuan Langsung Tunai (BLT) Dana Desa Tahap I 2026",
        date: "24 Jan 2026",
        author: "Admin Desa",
        category: "Sosial",
        img: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80",
        body: "Pemerintah Desa Karangkepoh telah menyalurkan BLT Dana Desa kepada 45 KPM. Diharapkan bantuan ini dapat membantu meringankan beban ekonomi warga."
      },
      {
        id: 2,
        title: "Kerja Bakti Masal: Pembersihan Saluran Irigasi",
        date: "20 Jan 2026",
        author: "Kadus II",
        category: "Pembangunan",
        img: "https://images.unsplash.com/photo-1590053160893-6c8454236a29?auto=format&fit=crop&w=600&q=80",
        body: "Warga Dusun II bergotong royong membersihkan saluran irigasi pertanian untuk mengantisipasi musim hujan dan memastikan kelancaran air ke sawah."
      },
      {
        id: 3,
        title: "Musyawarah Desa Penetapan RKPDes Tahun 2026",
        date: "15 Jan 2026",
        author: "Sekdes",
        category: "Pemerintahan",
        img: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=600&q=80",
        body: "Telah dilaksanakan Musdes Penetapan RKPDes 2026 yang dihadiri oleh BPD, Perangkat Desa, dan Tokoh Masyarakat. Prioritas pembangunan tahun ini adalah infrastruktur jalan usaha tani."
      },
      {
        id: 4,
        title: "Posyandu Balita & Lansia 'Melati' Dusun I",
        date: "10 Jan 2026",
        author: "Bidan Desa",
        category: "Kesehatan",
        img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
        body: "Kegiatan rutin penimbangan balita dan pemeriksaan kesehatan lansia berjalan lancar. Tercatat 50 balita dan 30 lansia hadir dalam kegiatan ini."
      },
      {
        id: 5,
        title: "Pelatihan Pembuatan Pupuk Organik Bagi Kelompok Tani",
        date: "05 Jan 2026",
        author: "Kasi Kesejahteraan",
        category: "Pemberdayaan",
        img: "https://images.unsplash.com/photo-1625246333195-5848c4281413?auto=format&fit=crop&w=600&q=80",
        body: "Untuk mengurangi ketergantungan pada pupuk kimia, Pemdes mengadakan pelatihan pembuatan pupuk organik padat dan cair."
      },
      {
        id: 6,
        title: "Kunjungan Camat Karanggede Monitoring Dana Desa",
        date: "02 Jan 2026",
        author: "Admin Desa",
        category: "Pemerintahan",
        img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80",
        body: "Camat Karanggede melakukan monitoring dan evaluasi terhadap pelaksanaan proyek pembangunan talud di Dusun III."
      },
      {
        id: 7,
        title: "Pengumuman Pembayaran PBB-P2 Tahun 2026",
        date: "28 Des 2025",
        author: "Kaur Keuangan",
        category: "Pemerintahan",
        img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80",
        body: "SPPT PBB Tahun 2026 telah terbit. Warga dimohon segera melakukan pembayaran melalui petugas pungut di masing-masing dusun."
      }
    ]
  },
  pengumuman: {
    title: "Pengumuman & Undangan",
    items: [
      {
        id: 1,
        title: "Undangan Musrenbangdes Tahun 2026",
        date: "26 Jan 2026",
        type: "Undangan",
        desc: "Mengharap kehadiran Bapak/Ibu Saudara pada acara Musyawarah Perencanaan Pembangunan Desa.",
        linkText: "Download Undangan (PDF)",
        linkUrl: "#"
      },
      {
        id: 2,
        title: "Jadwal Piket Siskamling Terbaru",
        date: "20 Jan 2026",
        type: "Info",
        desc: "Berikut adalah jadwal ronda malam untuk periode Januari - Juni 2026.",
        linkText: "Lihat Jadwal (PDF)",
        linkUrl: "#"
      },
      {
        id: 3,
        title: "Daftar Penerima Bantuan Bibit Jagung",
        date: "15 Jan 2026",
        type: "Info",
        desc: "Daftar nama anggota kelompok tani yang berhak menerima bantuan bibit jagung hibrida.",
        linkText: "Cek Data (Excel)",
        linkUrl: "#"
      },
      {
        id: 4,
        title: "Lowongan Perangkat Desa: Kadus IV",
        date: "10 Jan 2026",
        type: "Lowongan",
        desc: "Dibuka pendaftaran seleksi calon Perangkat Desa untuk formasi Kepala Dusun IV.",
        linkText: "Syarat & Ketentuan",
        linkUrl: "#"
      },
      {
        id: 5,
        title: "Himbauan Waspada Demam Berdarah",
        date: "01 Jan 2026",
        type: "Himbauan",
        desc: "Surat Edaran Kepala Desa terkait gerakan 3M Plus untuk mencegah penyebaran DBD.",
        linkText: "Baca Surat Edaran",
        linkUrl: "#"
      },
       {
        id: 6,
        title: "Laporan Realisasi APBDes 2025",
        date: "31 Des 2025",
        type: "Laporan",
        desc: "Transparansi Anggaran: Laporan pertanggungjawaban realisasi APBDes Tahun Anggaran 2025.",
        linkText: "Download Laporan",
        linkUrl: "#"
      }
    ]
  }
};

export default function Informasi() {
  // Mengambil data dari object konfigurasi
  const { hero, berita, pengumuman } = informasiData;
  
  // State untuk Pagination
  const [newsPage, setNewsPage] = useState(1);
  const [annoPage, setAnnoPage] = useState(1);
  const [modal, setModal] = useState(null);

  // Konfigurasi Limit per Halaman
  const newsLimit = 6;
  const annoLimit = 5;

  // Hitung Total Halaman
  const totalNewsPages = Math.ceil(berita.items.length / newsLimit);
  const totalAnnoPages = Math.ceil(pengumuman.items.length / annoLimit);

  // Handler Ganti Halaman
  const showNews = (p) => setNewsPage(Math.max(1, Math.min(totalNewsPages, p)));
  const showAnno = (p) => setAnnoPage(Math.max(1, Math.min(totalAnnoPages, p)));

  // Slice Data untuk Tampilan saat ini
  const newsSlice = berita.items.slice((newsPage - 1) * newsLimit, newsPage * newsLimit);
  const annoSlice = pengumuman.items.slice((annoPage - 1) * annoLimit, annoPage * annoLimit);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      
      {/* HEADER */}
      <header className="bg-[var(--desa-primary)] py-8 px-6 text-center text-white shadow-md">
        <h1 className="text-3xl font-bold mb-2">{hero.title}</h1>
        <p className="text-emerald-100 text-sm">{hero.description}</p>
      </header>

      <div className="container mx-auto px-4 py-10 max-w-6xl space-y-12">
        
        {/* BAGIAN BERITA */}
        <section id="berita">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold border-l-4 border-[var(--desa-primary)] pl-3">{berita.title}</h2>
            <div className="text-sm text-gray-600">Hal {newsPage} / {totalNewsPages}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsSlice.map(item => (
              <article key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition group">
                <div className="relative h-48 overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded text-xs font-bold shadow text-desa-dark">{item.category}</div>
                </div>
                <div className="p-5">
                  <div className="text-xs text-gray-400 mb-2 flex items-center gap-2">
                    <span><i className="far fa-calendar mr-1"></i> {item.date}</span>
                    <span>•</span>
                    <span>{item.author}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 leading-snug group-hover:text-[var(--desa-primary)] transition line-clamp-2">{item.title}</h3>
                  <p className="mt-3 text-sm text-gray-600 line-clamp-3">{item.body}</p>
                  <div className="mt-4 flex gap-2">
                    <button onClick={() => setModal(item)} className="text-xs font-bold text-[var(--desa-primary)] uppercase tracking-wide hover:underline">Baca Detail &rarr;</button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination Berita */}
          {totalNewsPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-6">
              <button 
                onClick={() => showNews(newsPage - 1)} 
                className={`px-3 py-2 rounded border hover:bg-gray-100 ${newsPage === 1 ? 'opacity-50 pointer-events-none' : ''}`}
              >
                &larr;
              </button>
              <div className="px-4 py-2 bg-gray-100 rounded border font-medium">Hal {newsPage} / {totalNewsPages}</div>
              <button 
                onClick={() => showNews(newsPage + 1)} 
                className={`px-3 py-2 rounded border hover:bg-gray-100 ${newsPage === totalNewsPages ? 'opacity-50 pointer-events-none' : ''}`}
              >
                &rarr;
              </button>
            </div>
          )}
        </section>

        {/* BAGIAN PENGUMUMAN */}
        <section id="pengumuman" className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
            <h2 className="text-2xl font-bold border-l-4 border-red-500 pl-3">{pengumuman.title}</h2>
            <div className="text-sm text-gray-600">Hal {annoPage} / {totalAnnoPages}</div>
          </div>

          <div className="space-y-4">
            {annoSlice.map(a => (
              <div key={a.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100 hover:border-[var(--desa-primary)] transition group">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase">{a.type || 'Info'}</span>
                    <span className="text-xs text-gray-400 font-medium">{a.date}</span>
                  </div>
                  <h4 className="font-bold text-gray-800 text-lg group-hover:text-[var(--desa-primary)] transition">{a.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{a.desc}</p>
                </div>
                <a href={a.linkUrl} onClick={(e) => e.preventDefault()} className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:text-white hover:bg-[var(--desa-primary)] hover:border-[var(--desa-primary)] transition shadow-sm whitespace-nowrap">
                  <i className={`fas ${a.linkText.toLowerCase().includes('pdf') ? 'fa-file-pdf' : 'fa-download'}`}></i> {a.linkText}
                </a>
              </div>
            ))}
          </div>

          {/* Pagination Pengumuman */}
          {totalAnnoPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-6">
              <button 
                onClick={() => showAnno(annoPage - 1)} 
                className={`px-3 py-2 rounded border hover:bg-gray-100 ${annoPage === 1 ? 'opacity-50 pointer-events-none' : ''}`}
              >
                &larr;
              </button>
              <div className="px-4 py-2 bg-gray-100 rounded border font-medium">Hal {annoPage} / {totalAnnoPages}</div>
              <button 
                onClick={() => showAnno(annoPage + 1)} 
                className={`px-3 py-2 rounded border hover:bg-gray-100 ${annoPage === totalAnnoPages ? 'opacity-50 pointer-events-none' : ''}`}
              >
                &rarr;
              </button>
            </div>
          )}
        </section>
      </div>

      {/* MODAL DETAIL BERITA */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-xl max-w-2xl w-full overflow-hidden shadow-2xl transform transition-all scale-100">
            <div className="relative h-64 bg-gray-200">
              <img src={modal.img} alt={modal.title} className="w-full h-full object-cover" />
              <button 
                onClick={() => setModal(null)} 
                className="absolute top-4 right-4 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/80 transition"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                <span className="font-semibold bg-gray-100 px-2 py-1 rounded">{modal.category}</span>
                <span>•</span>
                <span>{modal.date}</span>
                <span>•</span>
                <span>{modal.author}</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 leading-tight">{modal.title}</h3>
              <div className="prose prose-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: `<p>${modal.body}</p><p className='italic mt-4 text-gray-400'>*Informasi lebih lanjut dapat menghubungi Kantor Desa.</p>` }} />
              <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
                <button onClick={() => setModal(null)} className="px-5 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition">Tutup</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}