import React, { useState, useEffect } from 'react';
import '../index.css';

const API_URL = 'https://desakarangkepoh2011.github.io/website-data/data/informasi.json';

function formatDateString(str) {
  if (!str) return '';
  const parsed = Date.parse(str);
  if (!isNaN(parsed)) {
    return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(parsed));
  }

  const m = str.match(/(\d{1,2})\s+([^\d]+?)\s+(\d{4})/);
  if (!m) return str;
  const day = parseInt(m[1], 10);
  let monthToken = m[2].trim().replace('.', '').toLowerCase();

  const monthMap = {
    jan: 0, januari: 0,
    feb: 1, februari: 1,
    mar: 2, maret: 2,
    apr: 3, april: 3,
    mei: 4, may: 4,
    jun: 5, juni: 5,
    jul: 6, juli: 6,
    aug: 7, agt: 7, agustus: 7, august: 7,
    sep: 8, sept: 8, september: 8,
    oct: 9, okt: 9, oktober: 9, october: 9,
    nov: 10, november: 10,
    dec: 11, des: 11, desember: 11, december: 11
  };

  const monthIndex = monthMap[monthToken];
  if (monthIndex === undefined) return str;
  const year = parseInt(m[3], 10);
  const date = new Date(year, monthIndex, day);
  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
}

export default function Informasi() {
  const [data, setData] = useState(null);
  const [newsPage, setNewsPage] = useState(1);
  const [annoPage, setAnnoPage] = useState(1);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    if (!modal) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setModal(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [modal]);

  useEffect(() => {
    // prevent background scroll when modal is open
    if (modal) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
    return undefined;
  }, [modal]);

  const newsLimit = 6;
  const annoLimit = 5;

  useEffect(() => {
    let mounted = true;
    let intervalId = null;

    async function fetchData() {
      try {
        const res = await fetch(API_URL, { cache: 'no-cache' });
        if (!res.ok) throw new Error('Network response was not ok');
        const json = await res.json();
        if (mounted && json) setData(json);
      } catch (err) {
        console.warn('Failed to fetch informasi.json', err);
      }
    }

    fetchData();
    const POLL_INTERVAL = 60000;
    intervalId = setInterval(() => { if (document.visibilityState === 'visible') fetchData(); }, POLL_INTERVAL);

    return () => { mounted = false; if (intervalId) clearInterval(intervalId); };
  }, []);

  if (!data) {
    return (
      <main className="min-h-screen bg-gray-50 text-gray-800">
        <section className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="text-center text-gray-600">Memuat informasi...</div>
        </section>
      </main>
    );
  }

  const { hero, berita, pengumuman } = data;

  const totalNewsPages = Math.ceil((berita && berita.items ? berita.items.length : 0) / newsLimit);
  const totalAnnoPages = Math.ceil((pengumuman && pengumuman.items ? pengumuman.items.length : 0) / annoLimit);

  const showNews = (p) => setNewsPage(Math.max(1, Math.min(totalNewsPages || 1, p)));
  const showAnno = (p) => setAnnoPage(Math.max(1, Math.min(totalAnnoPages || 1, p)));

  const newsSlice = (berita && berita.items ? berita.items : []).slice((newsPage - 1) * newsLimit, newsPage * newsLimit);
  const annoSlice = (pengumuman && pengumuman.items ? pengumuman.items : []).slice((annoPage - 1) * annoLimit, annoPage * annoLimit);

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
              <article
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={() => setModal(item)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setModal(item); }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition group cursor-pointer"
              >
                <div className="relative w-full max-h-52 overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded text-xs font-bold shadow text-desa-dark">{item.category}</div>
                </div>
                <div className="p-5">
                  <div className="text-xs text-gray-400 mb-2 flex items-center gap-2">
                    <span><i className="far fa-calendar mr-1"></i> {formatDateString(item.date)}</span>
                    <span>•</span>
                    <span>{item.author}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 leading-snug group-hover:text-[var(--desa-primary)] transition line-clamp-2">{item.title}</h3>
                  <p className="mt-3 text-sm text-gray-600 line-clamp-3">{item.body}</p>
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
                    <span className="text-xs text-gray-400 font-medium">{formatDateString(a.date)}</span>
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
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in"
          onClick={(e) => { if (e.target === e.currentTarget) setModal(null); }}
        >
          <div className="bg-white rounded-xl max-w-2xl w-full shadow-2xl transform transition-all scale-100 relative overflow-hidden box-border flex flex-col" style={{ maxHeight: 'calc(100vh - 48px)' }}>
            <button
              onClick={() => setModal(null)}
              aria-label="Tutup detail berita"
              className="absolute top-3 right-3 z-50 bg-white/90 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition border"
            >
              <i className="fas fa-times"></i>
            </button>

            <div className="w-full flex flex-col overflow-hidden">
              <div className="w-full h-56 md:h-64 flex-shrink-0 overflow-hidden">
                <img src={modal.img} alt={modal.title} className="w-full h-full object-cover" />
              </div>

              <div className="p-6 md:p-8 overflow-y-auto" style={{ flex: '1 1 auto', WebkitOverflowScrolling: 'touch' }}>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <span className="font-semibold bg-gray-100 px-2 py-1 rounded">{modal.category}</span>
                  <span>•</span>
                  <span>{formatDateString(modal.date)}</span>
                  <span>•</span>
                  <span>{modal.author}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 leading-tight">{modal.title}</h3>
                <div className="prose prose-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: `<p>${modal.body}</p>` }} />
                <div className="mt-6 pt-4">
                  <div className="border-t border-gray-100" />
                  <div className="sticky bottom-0 bg-white/90 pt-4 pb-4 -mx-6 md:-mx-8 z-40">
                    <div className="flex justify-end px-6 md:px-8">
                      <button onClick={() => setModal(null)} className="px-5 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition">Tutup</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}