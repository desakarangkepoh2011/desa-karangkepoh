import React, { useState, useRef, useEffect } from 'react';
import './index.css';
import Home from './pages/Home';
import Profil from './pages/Profil';
import Layanan from './pages/Layanan';
import Kontak from './pages/Kontak';
import Informasi from './pages/Informasi';

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
  const layananRef = useRef(null);

  const [route, setRoute] = useState(window.location.pathname || '/');

  useEffect(() => {
    function onPop() {
      setRoute(window.location.pathname || '/');
      // if there's a hash on popstate, attempt to scroll to it
      if (window.location.hash) {
        const id = window.location.hash.slice(1);
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 60);
      }
    }
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  function navigate(to) {
    // Parse target URL so we separate pathname and hash
    const url = new URL(to, window.location.origin);
    const targetPath = url.pathname || '/';
    const targetHash = url.hash || '';

    // if pathname and hash are unchanged, do nothing
    if (targetPath === window.location.pathname && targetHash === window.location.hash) return;

    window.history.pushState({}, '', to);
    setRoute(targetPath);

    if (targetHash) {
      const id = targetHash.slice(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    } else {
      window.scrollTo(0, 0);
    }
  }

  useOutsideClick([layananRef], () => {});

  // on first mount, if URL contains a hash, scroll to it
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    }
  }, []);

  const layananItems = [
    'KK',
    'KTP',
    'KIA',
    'Pindah Datang',
    'Pindah Keluar',
    'Kutipan Ke-2 (Akta Kelahiran)'
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="relative w-full bg-white shadow-sm">
        <div className="site-container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img src="/logo-boyolali.png" alt="Logo" className="h-8 w-8" />
            <div className="font-bold">
              Desa Karangkepoh
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="hover:text-desa-dark">Beranda</a>
            <a href="/profil" onClick={(e) => { e.preventDefault(); navigate('/profil'); }} className="hover:text-desa-dark">Profil</a>

            <div className="relative" ref={layananRef}>
              <button
                onClick={() => navigate('/layanan')}
                className="flex items-center gap-2 hover:text-desa-dark"
              >
                Layanan
              </button>
            </div>

            <div>
              <a href="/informasi" onClick={(e) => { e.preventDefault(); navigate('/informasi'); }} className="hover:text-desa-dark">Pusat Informasi</a>
            </div>

            <a href="/kontak" onClick={(e) => { e.preventDefault(); navigate('/kontak'); }} className="hover:text-desa-dark">Kontak</a>
          </div>

          <div className="md:hidden">
            <MobileMenu layananItems={layananItems} navigate={navigate} />
          </div>
        </div>
      </nav>

      {route === '/profil' ? <Profil /> : route === '/layanan' ? <Layanan /> : route === '/kontak' ? <Kontak /> : route === '/informasi' ? <Informasi /> : <Home layananItems={layananItems} navigate={navigate} />}

      <footer className="bg-gray-900 text-white py-10">
        <div className="site-container grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2 bg-gray-800/40 p-4 rounded-lg">
            <h4 className="text-lg font-semibold mb-3">Lokasi Kantor Desa</h4>
            <div className="w-full rounded overflow-hidden border border-gray-700">
              <iframe
                title="Lokasi Kantor Kepala Desa Karangkepoh"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d608.8321717890612!2d110.67218976514518!3d-7.357801800785103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a748ee518d1fd%3A0x7e04f480b436e510!2sKantor%20Kepala%20Desa!5e1!3m2!1sid!2sid!4v1768735919178!5m2!1sid!2sid"
                width="100%"
                height="240"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="bg-gray-800/40 p-4 rounded-lg">
            <h4 className="text-lg font-semibold mb-3">Kontak & Informasi</h4>
            <p className="text-sm text-gray-300 mb-2"><strong>Alamat:</strong> Jl. Raya Karangkepoh No.1, Kecamatan, Kabupaten</p>
            <p className="text-sm text-gray-300 mb-2"><strong>Telepon / WA:</strong> <a href="https://wa.me/6281234567890" className="text-emerald-300 hover:underline">+62 812-3456-7890</a></p>
            <p className="text-sm text-gray-300 mb-4"><strong>Jam Layanan:</strong><br/>Senin - Jumat: 08.00 - 15.00<br/>Sabtu: 08.00 - 12.00</p>

            <div className="border-t border-gray-700 pt-3">
              <h5 className="text-sm font-semibold mb-2">Quick Links</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="/layanan" onClick={(e) => { e.preventDefault(); navigate('/layanan'); }} className="text-gray-200 hover:text-emerald-300">Layanan Administrasi</a></li>
                <li><a href="/profil" onClick={(e) => { e.preventDefault(); navigate('/profil'); }} className="text-gray-200 hover:text-emerald-300">Profil Desa</a></li>
                <li><a href="#pengumuman" className="text-gray-200 hover:text-emerald-300">Pengumuman</a></li>
                <li><a href="#kontak" className="text-gray-200 hover:text-emerald-300">Hubungi Kami</a></li>
              </ul>
            </div>
          </div>

          <div className="md:col-span-3 text-center text-sm text-gray-400 mt-4">© 2026 Pemerintah Desa Karangkepoh — Dilindungi Undang-Undang.</div>
        </div>
      </footer>
    </div>
  );
}

function MobileMenu({ layananItems, navigate }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useOutsideClick([ref], () => {
    setOpen(false);
  });

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(v => !v)} className="p-2 rounded bg-gray-100">
        <i className="fas fa-bars"></i>
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-2 w-64 sm:w-56 bg-white border rounded shadow-md py-2 z-30">
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="block px-4 py-2 text-sm">Beranda</a>
          <a href="/profil" onClick={(e) => { e.preventDefault(); navigate('/profil'); }} className="block px-4 py-2 text-sm">Profil</a>
          <div className="border-t my-1" />
          <a href="/layanan" onClick={(e) => { e.preventDefault(); navigate('/layanan'); }} className="block px-4 py-2 text-sm font-semibold">Layanan</a>

          <div className="border-t my-1" />
          <a href="/informasi" onClick={(e) => { e.preventDefault(); navigate('/informasi'); }} className="block px-4 py-2 text-sm font-semibold">Pusat Informasi</a>

          <div className="border-t my-1" />
          <a href="/kontak" onClick={(e) => { e.preventDefault(); navigate('/kontak'); }} className="block px-4 py-2 text-sm">Kontak</a>
        </div>
      )}
    </div>
  );
}

export default App;
