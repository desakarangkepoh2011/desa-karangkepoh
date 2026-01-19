import React, { useState } from 'react';
import '../index.css';

const makeNews = (n) => Array.from({ length: n }, (_, i) => ({
  id: i + 1,
  title: `Berita Kegiatan Desa Topik Ke-${i + 1}`,
  date: `${(i % 30) + 1} Jan 2026`,
  author: 'Admin Desa',
  category: i % 2 === 0 ? 'Pembangunan' : 'Sosial',
  img: `https://picsum.photos/seed/news${i}/600/300`,
  body: `Ini adalah ringkasan berita nomor ${i + 1}.`,
}));

const makeAnno = (n) => Array.from({ length: n }, (_, i) => ({
  id: i + 1,
  title: `Surat Edaran / Undangan Nomor ${i + 1}/Ds/2026`,
  date: `${(i % 28) + 1} Jan 2026`,
  desc: `Diberitahukan kepada seluruh warga untuk ${i % 2 === 0 ? 'menghadiri rapat desa' : 'mengambil bantuan sosial'}.`,
  linkText: i % 2 === 0 ? 'Download Undangan (PDF)' : 'Cek Data Penerima (G-Sheet)',
  linkUrl: '#',
}));

export default function Informasi() {
  const [news] = useState(makeNews(18));
  const [annos] = useState(makeAnno(12));
  const [newsPage, setNewsPage] = useState(1);
  const [annoPage, setAnnoPage] = useState(1);
  const [modal, setModal] = useState(null);

  const newsLimit = 6;
  const annoLimit = 5;

  const totalNewsPages = Math.ceil(news.length / newsLimit);
  const totalAnnoPages = Math.ceil(annos.length / annoLimit);

  const showNews = (p) => setNewsPage(Math.max(1, Math.min(totalNewsPages, p)));
  const showAnno = (p) => setAnnoPage(Math.max(1, Math.min(totalAnnoPages, p)));

  const newsSlice = news.slice((newsPage - 1) * newsLimit, newsPage * newsLimit);
  const annoSlice = annos.slice((annoPage - 1) * annoLimit, annoPage * annoLimit);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-[var(--desa-primary)] py-8 px-6 text-center text-white shadow-md">
        <h1 className="text-3xl font-bold mb-2">Berita & Pengumuman</h1>
        <p className="text-emerald-100 text-sm">Informasi terkini Pemerintah Desa Karangkepoh.</p>
      </header>

      <div className="container mx-auto px-4 py-10 max-w-6xl space-y-12">
        <section id="berita">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold border-l-4 border-[var(--desa-primary)] pl-3">Kabar Desa</h2>
            <div className="text-sm text-gray-600">Hal {newsPage} / {totalNewsPages}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsSlice.map(item => (
              <article key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition group">
                <div className="relative h-48 overflow-hidden">
                  <img src={item.img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded text-xs font-bold shadow">{item.category}</div>
                </div>
                <div className="p-5">
                  <div className="text-xs text-gray-400 mb-2"><i className="far fa-calendar mr-1"></i> {item.date}</div>
                  <h3 className="font-bold text-gray-900 leading-snug group-hover:text-[var(--desa-primary)] transition">{item.title}</h3>
                  <p className="mt-3 text-sm text-gray-600">{item.body}</p>
                  <div className="mt-4 flex gap-2">
                    <button onClick={() => setModal(item)} className="text-xs font-bold text-[var(--desa-primary)] uppercase tracking-wide">Baca Detail &rarr;</button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 mt-6">
            <button onClick={() => showNews(newsPage - 1)} className={`px-3 py-2 rounded border ${newsPage === 1 ? 'opacity-50 pointer-events-none' : ''}`}>&larr;</button>
            <div className="px-4 py-2 bg-gray-100 rounded border">Hal {newsPage} / {totalNewsPages}</div>
            <button onClick={() => showNews(newsPage + 1)} className={`px-3 py-2 rounded border ${newsPage === totalNewsPages ? 'opacity-50 pointer-events-none' : ''}`}>&rarr;</button>
          </div>
        </section>

        <section id="pengumuman" className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
            <h2 className="text-2xl font-bold border-l-4 border-red-500 pl-3">Pengumuman & Undangan</h2>
            <div className="text-sm text-gray-600">Hal {annoPage} / {totalAnnoPages}</div>
          </div>

          <div className="space-y-4">
            {annoSlice.map(a => (
              <div key={a.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100 hover:border-[var(--desa-primary)] transition">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Info</span>
                    <span className="text-xs text-gray-400 font-medium">{a.date}</span>
                  </div>
                  <h4 className="font-bold text-gray-800 text-lg">{a.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{a.desc}</p>
                </div>
                <a href={a.linkUrl} className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:text-[var(--desa-primary)] hover:border-[var(--desa-primary)] transition shadow-sm whitespace-nowrap">
                  <i className={`fas ${a.linkUrl.includes('pdf') ? 'fa-file-pdf' : 'fa-table'}`}></i> {a.linkText}
                </a>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 mt-6">
            <button onClick={() => showAnno(annoPage - 1)} className={`px-3 py-2 rounded border ${annoPage === 1 ? 'opacity-50 pointer-events-none' : ''}`}>&larr;</button>
            <div className="px-4 py-2 bg-gray-100 rounded border">Hal {annoPage} / {totalAnnoPages}</div>
            <button onClick={() => showAnno(annoPage + 1)} className={`px-3 py-2 rounded border ${annoPage === totalAnnoPages ? 'opacity-50 pointer-events-none' : ''}`}>&rarr;</button>
          </div>
        </section>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full overflow-hidden">
            <div className="relative h-48 bg-gray-200">
              <img src={modal.img} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <div className="text-xs text-gray-500 mb-2"><span className="font-semibold">{modal.date}</span> — {modal.author}</div>
              <h3 className="text-xl font-bold mb-3">{modal.title}</h3>
              <div className="prose prose-sm text-gray-600" dangerouslySetInnerHTML={{ __html: `<p>${modal.body}</p><p>Detail lengkap tersedia di kantor desa.</p>` }} />
              <div className="mt-4 text-right"><button onClick={() => setModal(null)} className="px-4 py-2 bg-gray-100 rounded">Tutup</button></div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
