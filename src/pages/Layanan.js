import React, { useState, useRef, useEffect } from 'react';
import '../index.css';

export default function Layanan() {
  const [open, setOpen] = useState(null);

  function toggle(id) {
    setOpen(prev => (prev === id ? null : id));
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      <header className="relative bg-gradient-to-r from-[var(--desa-primary)] to-emerald-500 py-16 px-6 text-center text-white overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold mb-4 border border-white/30">
            <i className="fas fa-landmark mr-2"></i> Pelayanan Terpadu Satu Pintu
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight drop-shadow-md">Layanan Kependudukan</h1>
          <p className="text-emerald-50 text-lg md:text-xl font-light opacity-90">Informasi lengkap persyaratan, prosedur, dan alur pengurusan dokumen administrasi Desa Karangkepoh.</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-5xl -mt-8 relative z-20">
        <div className="grid gap-5">

          {/* KK */}
          <ServiceCard
            id="kk"
            open={open === 'kk'}
            onToggle={() => toggle('kk')}
            title="Kartu Keluarga (KK)"
            subtitle="Buat Baru / Pecah KK / Hilang"
            accent="blue"
            body={(
              <>
                <h4 className="flex items-center text-blue-700 font-bold mb-4 uppercase text-xs tracking-wider"><i className="fas fa-file-alt mr-2"></i> Dokumen Persyaratan</h4>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-3 flex-shrink-0"></i>Surat Pengantar RT/RW.</li>
                  <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-3 flex-shrink-0"></i>Formulir F-1.01 (Dari Desa).</li>
                  <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-3 flex-shrink-0"></i>KK Lama (Asli).</li>
                  <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-3 flex-shrink-0"></i>Buku Nikah / Akta Cerai (Fotokopi).</li>
                </ul>
              </>
            )}
            footer={(
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3 text-sm text-yellow-800"><i className="fas fa-exclamation-triangle mt-1"></i><div><strong>Penting:</strong> Jika KK hilang, wajib menyertakan Surat Keterangan Kehilangan dari Kepolisian (Polsek).</div></div>
            )}
          />

          {/* KTP */}
          <ServiceCard
            id="ktp"
            open={open === 'ktp'}
            onToggle={() => toggle('ktp')}
            title="KTP Elektronik (KTP-el)"
            subtitle="Perekaman Baru / Cetak Ulang"
            accent="desa"
            body={(
              <>
                <h4 className="flex items-center text-emerald-700 font-bold mb-4 uppercase text-xs tracking-wider"><i className="fas fa-file-alt mr-2"></i> Dokumen Persyaratan</h4>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-3 flex-shrink-0"></i>Usia min. 17 tahun.</li>
                  <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-3 flex-shrink-0"></i>Fotokopi KK Terbaru.</li>
                  <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-3 flex-shrink-0"></i>Fotokopi Akta Lahir / Ijazah.</li>
                </ul>
              </>
            )}
            footer={(
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3 text-sm text-yellow-800"><i className="fas fa-tshirt mt-1"></i><div><strong>Dresscode:</strong> Saat foto perekaman, wajib menggunakan pakaian sopan berkerah (Kemeja/Batik).</div></div>
            )}
          />

          {/* Akta Kelahiran */}
          <ServiceCard
            id="lahir"
            open={open === 'lahir'}
            onToggle={() => toggle('lahir')}
            title="Akta Kelahiran"
            subtitle="Pencatatan Bayi Baru Lahir"
            accent="pink"
            body={(
              <>
                <h4 className="flex items-center text-pink-700 font-bold mb-4 uppercase text-xs tracking-wider"><i className="fas fa-file-alt mr-2"></i> Dokumen Persyaratan</h4>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-3 flex-shrink-0"></i>Surat Ket. Lahir (Asli) Bidan/RS.</li>
                  <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-3 flex-shrink-0"></i>Buku Nikah Ortu (Legalisir).</li>
                </ul>
              </>
            )}
            footer={(
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3 text-sm text-yellow-800"><i className="fas fa-clock mt-1"></i><div><strong>Waktu:</strong> Segera urus sebelum bayi berusia 60 hari agar terhindar dari denda keterlambatan administratif.</div></div>
            )}
          />

          {/* Akta Kematian */}
          <ServiceCard
            id="mati"
            open={open === 'mati'}
            onToggle={() => toggle('mati')}
            title="Akta Kematian"
            subtitle="Laporan Warga Meninggal"
            accent="gray"
            body={(
              <>
                <h4 className="flex items-center text-gray-700 font-bold mb-4 uppercase text-xs tracking-wider"><i className="fas fa-file-alt mr-2"></i> Dokumen Persyaratan</h4>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-3 flex-shrink-0"></i>Surat Keterangan Kematian (RS/Desa).</li>
                  <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-3 flex-shrink-0"></i>KTP-el Asli Jenazah (Ditarik).</li>
                </ul>
              </>
            )}
            footer={(
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3 text-sm text-yellow-800"><i className="fas fa-info-circle mt-1"></i><div><strong>Manfaat:</strong> Penting untuk urusan waris, klaim asuransi, dan validasi data pemilih.</div></div>
            )}
          />

        </div>
      </main>
    </main>
  );
}

function ServiceCard({ id, open, onToggle, title, subtitle, accent, body, footer }) {
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    if (open) {
      el.style.maxHeight = el.scrollHeight + 'px';
    } else {
      el.style.maxHeight = '0px';
    }
  }, [open]);

  return (
    <div className="group bg-white rounded-xl shadow-md border-l-4 hover:shadow-xl transition-all duration-300 animate-fade-in-up">
      <button onClick={onToggle} className="w-full flex justify-between items-center p-6 text-left focus:outline-none">
        <div className="flex items-center gap-5">
          <div className={`w-14 h-14 rounded-2xl bg-${accent}-50 text-${accent}-600 flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform duration-300`}>
            <i className="fas fa-file-alt"></i>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-desa-primary transition-colors">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-700 transition-colors">
          <i className={`fas fa-chevron-down icon-transition ${open ? 'rotate-180' : ''}`}></i>
        </div>
      </button>

      <div ref={contentRef} className={`accordion-content bg-gray-50/50 ${open ? 'active' : ''}`}>
        <div className="p-6 md:p-8 border-t border-gray-100 grid md:grid-cols-2 gap-8">
          <div>{body}</div>
          <div>
            <h4 className="flex items-center text-gray-700 font-bold mb-4 uppercase text-xs tracking-wider"><i className="fas fa-route mr-2"></i> Alur Pelayanan</h4>
            <div className="relative border-l-2 border-gray-200 ml-3 space-y-6">
              <div className="relative pl-6">
                <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-gray-600 ring-4 ring-white"></span>
                <p className="text-sm font-semibold">Langkah Pelayanan</p>
                <p className="text-xs text-gray-500">Ikuti petunjuk di kantor desa dan kecamatan.</p>
              </div>
              <div className="relative pl-6">
                <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-gray-300 ring-4 ring-white"></span>
                <p className="text-sm font-semibold">Proses Lanjutan</p>
                <p className="text-xs text-gray-500">Pencetakan dan pengambilan dokumen.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 pb-6 md:px-8 md:pb-8">{footer}</div>
      </div>
    </div>
  );
}
