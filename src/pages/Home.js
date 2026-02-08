import React, { useEffect, useState } from 'react';
import '../index.css';

// --- DEFAULT / FALLBACK DATA ---
const defaultHomeData = {
  hero: {
    image: "",
    preTitle: "Informasi & Layanan Desa",
    title: "Selamat Datang di",
    highlight: "Desa Karangkepoh",
    description: "Mewujudkan tata kelola pemerintahan desa yang transparan, akuntabel, dan pelayanan publik yang prima."
  },
  pengumuman: {
    badge: "TERBARU",
    kategori: "LOADING...",
    tanggal: "NOW",
    judul: "Mohon Tunggu, Data Sedang Dimuat...",
    isi: "Mohon bersabar sementara kami memuat informasi terbaru dari desa. Kami berkomitmen untuk memberikan informasi terkini secepat mungkin.",
    link: "/informasi#pengumuman"
  },
  videoProfil: {
    judul: "Profil Desa Kami",
    deskripsi: "Menelusuri keindahan alam, budaya, dan potensi ekonomi warga Desa Karangkepoh.",
    youtubeSrc: ""
  },
  statistik: [
    { label: "Total Penduduk", value: "", icon: "users" },
    { label: "Kepala Keluarga", value: "", icon: "home" },
    { label: "Luas (Ha)", value: "", icon: "map" },
    { label: "Wilayah Dusun", value: "", icon: "map-marked-alt" }
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

// --- REMOTE API ---
const API_URL = 'https://desakarangkepoh2011.github.io/website-data/data/home.json';
const INFO_URL = 'https://desakarangkepoh2011.github.io/website-data/data/informasi.json';

function formatDate(dateStr) {
  try {
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

function formatNumberId(value) {
  if (value == null) return value;
  if (typeof value === 'number') return new Intl.NumberFormat('id-ID').format(value);
  return value;
}

function truncateText(text, max = 220) {
  if (!text) return '';
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + '…';
}

function normalizeApiData(api) {
  if (!api) return defaultHomeData;

  const hero = {
    image: api.hero?.image || api.hero?.imageUrl || defaultHomeData.hero.image,
    preTitle: api.hero?.pretitle || api.hero?.preTitle || defaultHomeData.hero.preTitle,
    title: api.hero?.title || defaultHomeData.hero.title,
    highlight: api.hero?.highlight || defaultHomeData.hero.highlight,
    description: api.hero?.description || defaultHomeData.hero.description
  };

  const pengumuman = {
    badge: api.pengumuman?.badge || defaultHomeData.pengumuman.badge,
    kategori: api.pengumuman?.kategori || defaultHomeData.pengumuman.kategori,
    tanggal: api.pengumuman?.tanggal ? formatDate(api.pengumuman.tanggal) : defaultHomeData.pengumuman.tanggal,
    judul: api.pengumuman?.judul || defaultHomeData.pengumuman.judul,
    isi: api.pengumuman?.isi || defaultHomeData.pengumuman.isi,
    link: (() => {
      const raw = api.pengumuman?.link;
      if (!raw) return defaultHomeData.pengumuman.link;
      let s = String(raw).trim();
      if (s.startsWith('#')) s = `/informasi${s}`;
      else if (!/^https?:\/\//i.test(s) && !s.startsWith('/')) s = `/${s}`;
      // Ensure link targets informasi pengumuman section
      if (!s.includes('informasi') && !s.includes('#pengumuman')) return '/informasi#pengumuman';
      return s;
    })()
  };

  const videoProfil = {
    judul: api.videoProfil?.judul || defaultHomeData.videoProfil.judul,
    deskripsi: api.videoProfil?.deskripsi || defaultHomeData.videoProfil.deskripsi,
    youtubeSrc: api.videoProfil?.youtubeSrc
  };

  const statistik = (api.statistik || defaultHomeData.statistik).map((s, i) => ({
    label: s.label || defaultHomeData.statistik[i]?.label || '',
    value: formatNumberId(s.value ?? defaultHomeData.statistik[i]?.value),
    icon: s.icon || defaultHomeData.statistik[i]?.icon || 'chart-bar'
  }));

  const layananSection = {
    judul: api.layananSection?.judul || defaultHomeData.layananSection.judul,
    deskripsi: api.layananSection?.deskripsi || defaultHomeData.layananSection.deskripsi,
    list: (api.layananSection?.list || defaultHomeData.layananSection.list).map(item => ({
      label: item.label,
      id: item.id
    }))
  };

  return { hero, pengumuman, videoProfil, statistik, layananSection };
}

export default function Home({ navigate }) {
  const [homeData, setHomeData] = useState(defaultHomeData);
  const [latestNews, setLatestNews] = useState([]);

  useEffect(() => {
    let mounted = true;
    let intervalId = null;

    const fetchData = async () => {
      try {
        const response = await fetch(API_URL, {
          redirect: 'follow',
          method: 'GET',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
        });

        if (!response.ok) throw new Error('Network response was not ok');
        const json = await response.json();
        if (!mounted) return;
        const normalized = normalizeApiData(json);
        setHomeData(normalized);
      } catch (error) {
        console.error('Gagal mengambil data:', error);
      }
    };

    fetchData();

    const POLL_INTERVAL = 60000;
    intervalId = setInterval(() => {
      if (document.visibilityState === 'visible') fetchData();
    }, POLL_INTERVAL);

    return () => { mounted = false; if (intervalId) clearInterval(intervalId); };
  }, []);

  useEffect(() => {
    let mounted = true;
    async function fetchInformasi() {
      try {
        const res = await fetch(INFO_URL, { cache: 'no-cache' });
        if (!res.ok) throw new Error('Network response was not ok');
        const json = await res.json();
        if (!mounted) return;
        const items = Array.isArray(json?.berita?.items) ? json.berita.items.slice() : [];
        items.sort((a, b) => new Date(b.date) - new Date(a.date));
        setLatestNews(items.slice(0, 3));
      } catch (err) {
        console.warn('Failed to fetch informasi.json for latest news', err);
      }
    }

    fetchInformasi();
    const POLL_INTERVAL = 60000;
    const id = setInterval(() => { if (document.visibilityState === 'visible') fetchInformasi(); }, POLL_INTERVAL);
    return () => { mounted = false; clearInterval(id); };
  }, []);

  const { hero, pengumuman, videoProfil, statistik, layananSection } = homeData;
  const cardWidthClass = (() => {
    return 'w-full';
  })();
  const containerGridClass = (() => {
    if (latestNews.length === 1) return 'grid grid-cols-1 gap-4 max-w-2xl mx-auto';
    if (latestNews.length === 2) return 'grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto';
    return 'grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-6xl mx-auto';
  })();

  return (
    <>
      {/* HERO SECTION */}
      <header className="relative h-[72vh] flex items-center justify-center bg-cover bg-center" style={{backgroundImage: `url('${hero.image}')`}}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto text-white">
          <span className="block text-desa-light font-semibold tracking-wider mb-2 uppercase">{hero.preTitle}</span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {hero.title}
            <span className="block text-green-300">{hero.highlight}</span>
          </h1>
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
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed" title={pengumuman.isi}>{truncateText(pengumuman.isi, 220)}</p>

                  <div className="flex flex-col sm:flex-row items-center gap-4 border-t border-gray-100 pt-6">
                    <a href={pengumuman.link} onClick={(e) => { e.preventDefault(); navigate(pengumuman.link); }} className="btn btn-primary w-full sm:w-auto">Lihat selengkapnya</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BERITA TERBARU */}
        <section id="berita-terbaru" className="py-12 bg-gray-50">
          <div className="site-container">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Berita Terbaru</h2>
              <div className="h-1 w-20 bg-desa-primary mx-auto"></div>
            </div>

            {latestNews.length === 0 ? (
              <div className="text-center text-gray-500 max-w-6xl mx-auto">Memuat berita...</div>
            ) : (
              <div className={`${containerGridClass} mb-6 px-2`}> 
                {latestNews.map((item) => (
                  <article key={item.id} className={`flex flex-col bg-white p-0 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition overflow-hidden ${cardWidthClass}`}>
                    {item.img && (
                      <div className="w-full h-40 flex-shrink-0 overflow-hidden">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="text-xs text-gray-400 mb-2">{formatDate(item.date)}</div>
                      <h3 className="font-bold text-gray-900 mb-2 leading-tight">{item.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{truncateText(item.body, 120)}</p>
                      <div className="mt-auto flex justify-end">
                        <a href="/informasi" onClick={(e) => { e.preventDefault(); navigate('/informasi'); }} className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:text-white hover:bg-[var(--desa-primary)] hover:border-[var(--desa-primary)] transition">Selengkapnya</a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <div className="text-center">
              <a href="/informasi" onClick={(e) => { e.preventDefault(); navigate('/informasi'); }} className="btn btn-primary">Lihat semua berita</a>
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
                  <p className="text-gray-500 mb-6 text-sm leading-relaxed">Permohonan layanan {item.label} oleh desa.</p>
                  {/* UPDATED: Navigasi mengirim parameter query ?open=ID */}
                  <a 
                    href={`/layanan?open=${item.id}`} 
                    onClick={(e) => { e.preventDefault(); navigate(`/layanan?open=${item.id}`); }} 
                    className="btn-link"
                  >
                    Lihat Persyaratan <i className="fas fa-arrow-right ml-2 text-xs"></i>
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