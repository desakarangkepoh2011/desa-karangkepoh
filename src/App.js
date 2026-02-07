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
  const getRoute = () => window.location.hash.replace('#', '') || '/';
  const [route, setRoute] = useState(getRoute());

  useEffect(() => {
    const onHashChange = () => { setRoute(getRoute()); window.scrollTo(0,0); };
    window.addEventListener('hashchange', onHashChange);
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

  const layananRef = useRef(null);
  useOutsideClick([layananRef], () => {});

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

          <div className="md:hidden">
            <MobileMenu navigate={navigate} />
          </div>
        </div>
      </nav>

      <main>{renderPage()}</main>

      <footer className="bg-gray-900 text-white py-10">
        <div className="site-container grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-gray-800/40 p-4 rounded">
            <h4 className="font-semibold mb-3">Lokasi Kantor Desa</h4>
            <iframe
              title="Lokasi Kantor Desa"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d608.8321717890612!2d110.67218976514518!3d-7.357801800785103!"
              width="100%"
              height="240"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>

          <div className="bg-gray-800/40 p-4 rounded">
            <h4 className="font-semibold mb-3">Kontak & Informasi</h4>
            {kontakData?.kantorDesa ? (
              <p className="text-sm">{kontakData.kantorDesa.address}</p>
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

function MobileMenu({ navigate }) {
  return (
    <div className="relative">
      <a href="#/" onClick={e => { e.preventDefault(); navigate('/'); }} className="block p-2">Beranda</a>
      <a href="#/profil" onClick={e => { e.preventDefault(); navigate('/profil'); }} className="block p-2">Profil</a>
      <a href="#/layanan" onClick={e => { e.preventDefault(); navigate('/layanan'); }} className="block p-2">Layanan</a>
      <a href="#/informasi" onClick={e => { e.preventDefault(); navigate('/informasi'); }} className="block p-2">Informasi</a>
      <a href="#/kontak" onClick={e => { e.preventDefault(); navigate('/kontak'); }} className="block p-2">Kontak</a>
    </div>
  );
}

export default App;
