import React, { useState, useRef, useEffect } from 'react';
import './index.css';

import Home from './pages/Home';
import Profil from './pages/Profil';
import Layanan from './pages/Layanan';
import Kontak from './pages/Kontak';
import Informasi from './pages/Informasi';
import logo from './assets/logo-boyolali.png';

function useOutsideClick(refs, handler) {
  useEffect(() => {
    function listener(e) {
      if (refs.some(r => r.current && r.current.contains(e.target))) return;
      handler(e);
    }
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [refs, handler]);
}

function App() {
  const getRoute = () => {
    const raw = window.location.hash.replace(/^#/, '') || '/';
    const [path] = raw.split('#');
    return path || '/';
  };

  const [route, setRoute] = useState(getRoute());

  useEffect(() => {
    const onHashChange = () => {
      const raw = window.location.hash.replace(/^#/, '');
      const [path, frag] = raw.split('#');
      setRoute(path || '/');
      if (frag) {
        // retry scroll for a short period to allow target component/data to render
        let attempts = 0;
        const maxAttempts = 20; // ~2 seconds (20 * 100ms)
        const tryScroll = () => {
          const el = document.getElementById(frag);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else if (attempts < maxAttempts) {
            attempts += 1;
            setTimeout(tryScroll, 100);
          } else {
            window.scrollTo(0, 0);
          }
        };
        tryScroll();
      } else {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('hashchange', onHashChange);
    // handle initial hash (in case page loaded with fragment)
    onHashChange();
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  function navigate(to) {
    const path = to.startsWith('/') ? to : `/${to}`;
    window.location.hash = `#${path}`;
  }

  const [kontakData, setKontakData] = useState(null);
  const KONTAK_API = 'https://desakarangkepoh2011.github.io/website-data/data/kontak.json';

  useEffect(() => {
    let mounted = true;
    async function fetchKontak() {
      try {
        const res = await fetch(KONTAK_API, { cache: 'no-cache' });
        if (!res.ok) throw new Error('Network error');
        const json = await res.json();
        if (mounted) setKontakData(json);
      } catch (err) {
        console.warn('Failed fetch kontak.json', err);
      }
    }
    fetchKontak();
    const interval = setInterval(() => { if (document.visibilityState === 'visible') fetchKontak(); }, 60000);
    return () => { mounted = false; clearInterval(interval); };
  }, []);

  const mobileMenuRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  useOutsideClick([mobileMenuRef], () => setMobileOpen(false));

  const layananItems = [
    'KK', 'KTP', 'KIA', 'Pindah Datang', 'Pindah Keluar', 'Kutipan Ke-2 (Akta Kelahiran)'
  ];

  const renderPage = () => {
    switch (route) {
      case '/profil': return <Profil />;
      case '/layanan': return <Layanan />;
      case '/informasi': return <Informasi />;
      case '/kontak': return <Kontak />;
      default: return <Home layananItems={layananItems} navigate={navigate} />;
    }
  };

  const ensureUrl = (u) => {
    if (!u) return null;
    const s = String(u).trim();
    if (/^mailto:|^tel:|^https?:\/\//i.test(s)) return s;
    return s.startsWith('wa.me') || s.includes('wa.me') ? (s.startsWith('http') ? s : `https://${s}`) : (s.startsWith('http') ? s : `https://${s}`);
  };

  const formatWaLink = (numOrLink) => {
    if (!numOrLink) return null;
    const s = String(numOrLink).trim();
    if (/^[+0-9].*/.test(s) && !s.includes('http')) {
      const digits = s.replace(/[^0-9]/g, '');
      return digits ? `https://wa.me/${digits}` : null;
    }
    return ensureUrl(s);
  };

  const layananInfo = kontakData?.layananInfo;
  const mediaSosial = kontakData?.mediaSosial;
  const kantor = kontakData?.kantorDesa;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="relative w-full bg-white shadow-sm">
        <div className="site-container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-8 w-8" />
            <div className="font-bold">Desa Karangkepoh</div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#/" onClick={e => { e.preventDefault(); navigate('/'); }}>Beranda</a>
            <a href="#/profil" onClick={e => { e.preventDefault(); navigate('/profil'); }}>Profil</a>
            <a href="#/layanan" onClick={e => { e.preventDefault(); navigate('/layanan'); }}>Layanan</a>
            <a href="#/informasi" onClick={e => { e.preventDefault(); navigate('/informasi'); }}>Pusat Informasi</a>
            <a href="#/kontak" onClick={e => { e.preventDefault(); navigate('/kontak'); }}>Kontak</a>
          </div>

          <div className="md:hidden relative" ref={mobileMenuRef}>
            <button
              onClick={() => setMobileOpen(v => !v)}
              aria-expanded={mobileOpen}
              aria-label="Toggle menu"
              className="p-2 rounded-md focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {mobileOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded shadow-md z-50">
                <MobileMenu navigate={navigate} onClose={() => setMobileOpen(false)} />
              </div>
            )}
          </div>
        </div>
      </nav>

      <main>{renderPage()}</main>

      <footer className="bg-gray-900 text-white py-10">
        <div className="site-container grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-gray-800/40 p-4 rounded">
            <h4 className="font-semibold mb-3">{kantor?.title || 'Lokasi Kantor Desa'}</h4>
            <iframe
              title="Lokasi Kantor Desa"
              src={kantor?.mapUrl || 'https://www.google.com/maps?q=-7.357801800785103,110.67218976514518&z=15&output=embed'}
              width="100%"
              height="240"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>

          <div className="bg-gray-800/40 p-4 rounded">
            <h4 className="font-semibold mb-3">Kontak & Informasi</h4>
            {kontakData ? (
              <div className="text-sm space-y-2">

                {layananInfo && (
                  <div className="mt-2">
                    {layananInfo.description && <div className="text-sm">{layananInfo.description}</div>}
                    {layananInfo.waLink && <div>WhatsApp: <a href={formatWaLink(layananInfo.waLink)} target="_blank" rel="noreferrer" className="text-blue-300 underline">{layananInfo.phoneDisplay || layananInfo.waLink}</a></div>}
                  </div>
                )}

                {mediaSosial?.items && (
                  <div className="mt-2">
                    <div className="font-semibold">{mediaSosial.title || 'Medsos'}</div>
                    <div className="flex gap-2 mt-1">
                      {mediaSosial.items.map((m, i) => (
                        <a key={i} href={ensureUrl(m.url)} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 px-2 py-1 border rounded text-sm ${m.colorClass || ''}`}>
                          {m.icon && <i className={m.icon} aria-hidden />}
                          <span>{m.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {kantor && (
                  <div className="mt-2">
                    {kantor.address && <div>{kantor.address}</div>}
                    {kantor.email && <div>Email: <a href={`mailto:${kantor.email}`} className="text-blue-300 underline">{kantor.email}</a></div>}
                    {kantor.jamKerja && (
                      <div className="mt-1">
                        <div className="font-semibold">Jam Layanan</div>
                        <ul className="list-inside list-disc">
                          {kantor.jamKerja.map((j, idx) => (
                            <li key={idx}>{j.hari}: {j.jam}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm">Memuat data kontak...</p>
            )}
          </div>

          <div className="md:col-span-3 text-center text-sm text-gray-400 mt-4">© 2026 Pemerintah Desa Karangkepoh</div>
        </div>
      </footer>
    </div>
  );
}

function MobileMenu({ navigate, onClose }) {
  const handleNav = (e, to) => {
    e.preventDefault();
    navigate(to);
    if (onClose) onClose();
  };

  return (
    <div className="p-2">
      <a href="#/" onClick={e => handleNav(e, '/')} className="block p-2">Beranda</a>
      <a href="#/profil" onClick={e => handleNav(e, '/profil')} className="block p-2">Profil</a>
      <a href="#/layanan" onClick={e => handleNav(e, '/layanan')} className="block p-2">Layanan</a>
      <a href="#/informasi" onClick={e => handleNav(e, '/informasi')} className="block p-2">Informasi</a>
      <a href="#/kontak" onClick={e => handleNav(e, '/kontak')} className="block p-2">Kontak</a>
    </div>
  );
}

export default App;
