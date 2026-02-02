import React, { useState, useRef, useEffect } from 'react';
import '../index.css';

const API_URL = 'https://desakarangkepoh2011.github.io/website-data/data/layanan.json';

export default function Layanan() {
  const [open, setOpen] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState({});
  const [data, setData] = useState(null);

  useEffect(() => {
    let mounted = true;
    let intervalId = null;

    async function fetchData() {
      try {
        const res = await fetch(API_URL, { cache: 'no-cache' });
        if (!res.ok) throw new Error('Network response was not ok');
        const json = await res.json();
        if (mounted && json) {
          setData(json);
          const defaults = {};
          if (Array.isArray(json.services)) {
            json.services.forEach((service) => {
              if (service.categories) {
                defaults[service.id] = Array.isArray(service.categories)
                  ? service.categories[0]
                  : service.categories;
              }
            });
          }
          setSelectedCategories(prev => (Object.keys(prev || {}).length ? prev : defaults));
        }
      } catch (err) {
        console.warn('Failed to fetch layanan.json, using fallback data.', err);
      }
    }

    fetchData();
    const POLL_INTERVAL = 60000;
    intervalId = setInterval(() => { if (document.visibilityState === 'visible') fetchData(); }, POLL_INTERVAL);

    return () => { mounted = false; if (intervalId) clearInterval(intervalId); };
  }, []);

  useEffect(() => {
    if (!data || !Array.isArray(data.services)) return;
    const params = new URLSearchParams(window.location.search);
    const openId = params.get('open');
    if (openId) {
      setOpen(openId);
      setTimeout(() => {
        const element = document.getElementById(openId);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
    }
  }, [data]);

  function toggle(id) {
    setOpen(prev => (prev === id ? null : id));
  }

  function handleCategoryChange(id, value) {
    setSelectedCategories(prev => ({ ...prev, [id]: value }));
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-gray-50 text-gray-800">
        <section className="container mx-auto px-4 py-12 max-w-5xl">
          <div className="text-center text-gray-600">Memuat data layanan...</div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* HEADER */}
      <header className="relative bg-gradient-to-r from-[var(--desa-primary)] to-emerald-500 py-16 px-6 text-center text-white overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight drop-shadow-md">{data.hero.title}</h1>
          <p className="text-emerald-50 text-lg md:text-xl font-light opacity-90">{data.hero.description}</p>
        </div>
      </header>

      {/* SERVICES LIST */}
      <section className="container mx-auto px-4 py-12 max-w-5xl -mt-8 relative z-20">
        <div className="grid gap-5">
          {data.services && data.services.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              open={open === service.id}
              onToggle={() => toggle(service.id)}
              data={service}
              selectedCategory={selectedCategories[service.id]}
              onCategoryChange={(val) => handleCategoryChange(service.id, val)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

function ServiceCard({ id, open, onToggle, data, selectedCategory, onCategoryChange }) {
  const contentRef = useRef(null);
  const [showLinks, setShowLinks] = useState(false);
  
  const iconBgClass = `bg-${data.accent}-50`;
  const iconTextClass = `text-${data.accent}-600`;
  const chevronRotate = open ? 'rotate-180' : '';
  const iconWrapperClass = `w-14 h-14 rounded-2xl ${iconBgClass} ${iconTextClass} flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform duration-300`;
  const headerTextClass = `flex items-center text-${data.accent}-700 font-bold mb-4 uppercase text-xs tracking-wider`;

  const currentReqs = data.requirements[selectedCategory];

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    
    if (open) {
      el.style.maxHeight = el.scrollHeight + 'px';
    } else {
      el.style.maxHeight = '0px';
    }
  }, [open, selectedCategory, showLinks]);

  return (
    <div id={id} className="group bg-white rounded-xl shadow-md border-l-4 hover:shadow-xl transition-all duration-300 animate-fade-in-up">
      
      {/* CARD HEADER */}
      <button onClick={onToggle} className="w-full flex justify-between items-center p-6 text-left focus:outline-none">
        <div className="flex items-center gap-5">
          <div className={iconWrapperClass}>
            <i className="fas fa-file-alt"></i>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-desa-primary transition-colors">{data.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{data.subtitle}</p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-700 transition-colors">
          <i className={`fas fa-chevron-down icon-transition ${chevronRotate}`}></i>
        </div>
      </button>

      {/* ACCORDION BODY */}
      <div ref={contentRef} className={`accordion-content bg-gray-50 ${open ? 'active' : ''}`}>
        <div className="p-4 md:p-6 border-t border-gray-100">
          
          {/* CATEGORY SELECTOR */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Pilih Jenis Layanan</label>
            <div className="relative">
              <select
                value={selectedCategory || ''}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:ring-2 focus:ring-desa-primary focus:border-desa-primary appearance-none shadow-sm"
              >
                    <option value="" disabled>Pilih...</option>
                    {Array.isArray(data.categories) ? (
                      data.categories.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))
                    ) : (
                      <option value={data.categories}>{data.categories}</option>
                    )}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                <i className="fas fa-chevron-down text-xs"></i>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 bg-white p-6 rounded-xl border border-gray-200">
            
            {/* COLUMN 1: REQUIREMENTS */}
            <div>
              <h4 className={headerTextClass}>
                <i className="fas fa-clipboard-list mr-2"></i> Dokumen Persyaratan
              </h4>
              {currentReqs ? (
                <ul className="space-y-3 text-sm text-gray-700">
                  {currentReqs.docs.map((doc, i) => (
                    <li key={i} className="flex items-start">
                      <i className="fas fa-check-circle text-green-500 mt-0.5 mr-3 flex-shrink-0"></i>
                      <span className="leading-snug">{doc}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 italic">Pilih kategori untuk melihat persyaratan.</p>
              )}
            </div>

            {/* COLUMN 2: STEPS & ATTACHMENTS */}
            <div>
              <h4 className="flex items-center text-gray-700 font-bold mb-4 uppercase text-xs tracking-wider">
                <i className="fas fa-route mr-2"></i> Alur Pelayanan
              </h4>
              
              <div className="ml-2 mb-6">
                {currentReqs ? (
                  <div className="relative border-l-2 border-gray-200 ml-3">
                    {currentReqs.steps.map((step, i) => (
                      <div key={i} className="relative pl-6 pb-4 last:pb-0">
                        <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-gray-600 border-4 border-white"></span>
                        <p className="text-sm text-gray-700 leading-snug">{step}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                   <p className="text-sm text-gray-500 italic">Pilih kategori untuk melihat alur.</p>
                )}
              </div>

              {/* Attachments Section */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Lampiran (Download)</label>
                </div>
                
                {data.attachments && data.attachments.length > 0 ? (
                  <div>
                    <button 
                      onClick={() => setShowLinks(!showLinks)} 
                      className="text-xs font-semibold text-desa-primary hover:text-desa-dark focus:outline-none flex items-center gap-1"
                    >
                      {showLinks ? 'Sembunyikan' : 'Tampilkan File'} 
                      <i className={`fas fa-chevron-down transition-transform ${showLinks ? 'rotate-180' : ''}`}></i>
                    </button>
                    
                    {showLinks && (
                      <ul className="mt-3 space-y-2 animate-fade-in-down">
                        {data.attachments.map((f, idx) => (
                          <li key={idx}>
                            <a 
                              href={f.url} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="flex items-center gap-2 text-sm text-gray-600 hover:text-desa-primary p-2 rounded hover:bg-gray-50 transition border border-transparent hover:border-gray-200"
                            >
                              <i className="fas fa-file-pdf text-red-500 text-lg"></i> 
                              <span>{f.name}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <span className="text-xs text-gray-400">Tidak ada lampiran.</span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* CARD FOOTER (NOTE) */}
        {data.note && (
           <div className="px-6 pb-6 md:px-8 md:pb-8">
             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3 text-sm text-yellow-800">
               <i className="fas fa-info-circle mt-1 flex-shrink-0"></i>
               <div><strong>Catatan:</strong> {data.note}</div>
             </div>
           </div>
        )}
      </div>
    </div>
  );
}