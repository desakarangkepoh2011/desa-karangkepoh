import React, { useState, useRef, useEffect } from 'react';
import '../index.css';

// --- DATA CONFIGURATION ---
const layananData = {
  hero: {
    title: "Layanan Kependudukan",
    description: "Informasi persyaratan, prosedur, dan alur pengurusan dokumen administrasi Desa Karangkepoh."
  },
  services: [
    {
      id: 'kk',
      title: 'Kartu Keluarga (KK)',
      subtitle: 'Buat Baru / Pecah KK / Hilang',
      accent: 'blue',
      note: 'Jika KK hilang, wajib menyertakan Surat Keterangan Kehilangan dari Kepolisian (Polsek).',
      attachments: [{ name: 'Contoh Form KK', url: '/lampiran/kk-form.pdf' }],
      categories: ['Baru', 'Hilang/Rusak', 'Perubahan Elemen Data', 'Penghapusan Data', 'Penambahan Data'],
      requirements: {
        'Baru': {
          docs: ['Surat Pengantar RT/RW', 'Formulir F-1.01', 'KK Lama (jika ada)', 'Buku Nikah/Akta Cerai'],
          steps: ['Pemohon meminta pengantar RT/RW', 'Verifikasi berkas di Kantor Desa', 'Penyusunan draft KK Baru', 'Proses cetak di Kecamatan/Disdukcapil']
        },
        'Hilang/Rusak': {
          docs: ['Surat Keterangan Kehilangan (Polisi)', 'Formulir F-1.01', 'KTP-el Pelapor'],
          steps: ['Lapor kehilangan ke Polisi', 'Pengajuan cetak ulang di Desa', 'Verifikasi data', 'Pencetakan KK']
        },
        'Perubahan Elemen Data': {
          docs: ['KK Lama (Asli)', 'Dokumen pendukung (Ijazah/Akta/Buku Nikah)', 'Formulir Perubahan Data'],
          steps: ['Verifikasi bukti perubahan', 'Update data di SIAK', 'Cetak KK Baru']
        },
        'Penghapusan Data': {
          docs: ['KK Lama', 'Surat Kematian (jika meninggal) / Surat Pindah'],
          steps: ['Verifikasi dokumen dasar', 'Update database desa', 'Cetak KK Baru']
        },
        'Penambahan Data': {
          docs: ['KK Lama', 'Surat Kelahiran / Surat Pindah Datang'],
          steps: ['Verifikasi berkas penambahan', 'Input anggota keluarga baru', 'Cetak KK']
        }
      }
    },
    {
      id: 'ktp',
      title: 'KTP Elektronik (KTP-el)',
      subtitle: 'Perekaman Baru / Cetak Ulang',
      accent: 'desa',
      note: 'Saat foto perekaman, wajib menggunakan pakaian sopan berkerah (Kemeja/Batik).',
      attachments: [{ name: 'Formulir KTP', url: '/lampiran/ktp-form.pdf' }],
      categories: ['Baru', 'Rusak/Hilang', 'Perubahan Data'],
      requirements: {
        'Baru': {
          docs: ['Berusia minimal 17 tahun', 'Fotokopi KK Terbaru', 'Fotokopi Akta Kelahiran/Ijazah'],
          steps: ['Daftar antrian perekaman', 'Verifikasi data biometrik', 'Foto & Sidik Jari', 'Tunggu info pengambilan']
        },
        'Rusak/Hilang': {
          docs: ['Surat Ket. Kehilangan (jika hilang)', 'Fisik KTP (jika rusak)', 'Fotokopi KK'],
          steps: ['Lapor ke Desa', 'Pengajuan cetak ulang', 'Proses di Kecamatan']
        },
        'Perubahan Data': {
          docs: ['KK Terbaru (sudah diubah datanya)', 'KTP Lama'],
          steps: ['Pastikan data KK sudah update', 'Ajukan cetak KTP baru sesuai KK']
        }
      }
    },
    {
      id: 'lahir',
      title: 'Akta Kelahiran',
      subtitle: 'Pencatatan Bayi Baru Lahir',
      accent: 'pink',
      note: 'Segera urus sebelum bayi berusia 60 hari agar terhindar dari denda keterlambatan administratif.',
      attachments: [{ name: 'Formulir Akta Kelahiran', url: '/lampiran/lahir-form.pdf' }],
      categories: ['Pencatatan Baru', 'Perubahan'],
      requirements: {
        'Pencatatan Baru': {
          docs: ['Surat Ket. Lahir (Bidan/RS/Desa)', 'Buku Nikah Orang Tua (Legalisir)', 'KK & KTP Orang Tua', 'KTP 2 Orang Saksi'],
          steps: ['Isi formulir kelahiran', 'Verifikasi berkas di Desa', 'Input data kelahiran', 'Pencetakan Akta']
        },
        'Perubahan': {
          docs: ['Penetapan Pengadilan (untuk ganti nama)', 'Akta Lama', 'KK & KTP'],
          steps: ['Verifikasi penetapan hukum', 'Pengajuan perubahan akta']
        }
      }
    },
    {
      id: 'mati',
      title: 'Akta Kematian',
      subtitle: 'Laporan Warga Meninggal',
      accent: 'gray',
      note: 'Penting untuk urusan waris, klaim asuransi, dan validasi data pemilih.',
      attachments: [{ name: 'Formulir Akta Kematian', url: '/lampiran/mati-form.pdf' }],
      categories: ['Laporan Kematian'],
      requirements: {
        'Laporan Kematian': {
          docs: ['Surat Keterangan Kematian (RS/Desa)', 'KTP-el Asli Jenazah (Ditarik)', 'KK Asli (untuk update)', 'KTP Pelapor'],
          steps: ['Lapor kematian ke RT/Desa', 'Penerbitan Surat Kematian Desa', 'Penarikan KTP Jenazah', 'Pencetakan Akta Kematian']
        }
      }
    },
    {
      id: 'kia',
      title: 'KIA (Kartu Identitas Anak)',
      subtitle: 'Pendaftaran / Perubahan',
      accent: 'teal',
      note: 'Pastikan data anak sesuai dengan KK. Untuk anak > 5 tahun wajib melampirkan pas foto 4x6 (2 lembar).',
      attachments: [{ name: 'Formulir KIA', url: '/lampiran/kia-form.pdf' }],
      categories: ['Pendaftaran KIA', 'Perubahan'],
      requirements: {
        'Pendaftaran KIA': {
          docs: ['Fotokopi KK', 'Fotokopi Akta Kelahiran', 'Pas Foto 4x6 (jika > 5 tahun)'],
          steps: ['Pengajuan berkas kolektif/mandiri', 'Verifikasi data anak', 'Pencetakan KIA']
        },
        'Perubahan': {
          docs: ['KIA Lama', 'KK Terbaru', 'Dokumen pendukung perubahan'],
          steps: ['Verifikasi data', 'Cetak ulang KIA']
        }
      }
    },
    {
      id: 'pindah_datang',
      title: 'Pindah Datang',
      subtitle: 'Pelaporan Pindah Datang',
      accent: 'orange',
      note: 'Wajib lapor 1x24 jam setelah kedatangan.',
      attachments: [{ name: 'Formulir Pindah Datang', url: '/lampiran/pindah-datang.pdf' }],
      categories: ['Pindah Datang'],
      requirements: {
        'Pindah Datang': {
          docs: ['SKPWNI (Surat Pindah) dari daerah asal', 'KTP & KK Penjamin (jika numpang KK)', 'Surat Domisili'],
          steps: ['Lapor ke RT/RW setempat', 'Serahkan berkas pindah ke Desa', 'Penerbitan KK Baru domisili sini']
        }
      }
    },
    {
      id: 'pindah_keluar',
      title: 'Pindah Keluar',
      subtitle: 'Pengajuan Pindah Keluar',
      accent: 'red',
      note: 'Setelah surat pindah terbit, KTP & KK lama akan ditarik/dinonaktifkan.',
      attachments: [{ name: 'Formulir Pindah Keluar', url: '/lampiran/pindah-keluar.pdf' }],
      categories: ['Pindah Keluar'],
      requirements: {
        'Pindah Keluar': {
          docs: ['Surat Pengantar RT/RW', 'KK Asli', 'KTP Asli', 'Alamat Lengkap Tujuan Pindah'],
          steps: ['Verifikasi berkas di Desa', 'Isi formulir pindah (F-1.03)', 'Penerbitan SKPWNI oleh Disdukcapil']
        }
      }
    },
    {
      id: 'kutipan_lahir_kedua',
      title: 'Kutipan Ke-2 (Akta Kelahiran)',
      subtitle: 'Akta Hilang / Rusak',
      accent: 'violet',
      note: 'Proses ini membutuhkan surat kehilangan dari kepolisian.',
      attachments: [{ name: 'Formulir Kutipan Akta', url: '/lampiran/kutipan-akta.pdf' }],
      categories: ['Kutipan Ke-2'],
      requirements: {
        'Kutipan Ke-2': {
          docs: ['Surat Kehilangan Polisi (jika hilang)', 'Fisik Akta Rusak (jika rusak)', 'Fotokopi KK & KTP'],
          steps: ['Verifikasi dokumen', 'Cek database kelahiran', 'Pencetakan Salinan/Kutipan Kedua']
        }
      }
    }
  ]
};

export default function Layanan() {
  const [open, setOpen] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState({});

  // Initialize default categories and handle Deep Linking
  useEffect(() => {
    // 1. Set default categories
    const defaults = {};
    layananData.services.forEach(service => {
      if (service.categories && service.categories.length > 0) {
        defaults[service.id] = service.categories[0];
      }
    });
    setSelectedCategories(defaults);

    // 2. Handle URL Query Param (e.g., /layanan?open=kk)
    const params = new URLSearchParams(window.location.search);
    const openId = params.get('open');
    if (openId) {
      setOpen(openId);
      // Wait a bit for DOM to render then scroll
      setTimeout(() => {
        const element = document.getElementById(openId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    }
  }, []);

  function toggle(id) {
    setOpen(prev => (prev === id ? null : id));
  }

  function handleCategoryChange(id, value) {
    setSelectedCategories(prev => ({ ...prev, [id]: value }));
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* HEADER */}
      <header className="relative bg-gradient-to-r from-[var(--desa-primary)] to-emerald-500 py-16 px-6 text-center text-white overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight drop-shadow-md">{layananData.hero.title}</h1>
          <p className="text-emerald-50 text-lg md:text-xl font-light opacity-90">{layananData.hero.description}</p>
        </div>
      </header>

      {/* SERVICES LIST */}
      <section className="container mx-auto px-4 py-12 max-w-5xl -mt-8 relative z-20">
        <div className="grid gap-5">
          {layananData.services.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id} // Passing ID for HTML attribute
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

// --- REUSABLE COMPONENT ---
function ServiceCard({ id, open, onToggle, data, selectedCategory, onCategoryChange }) {
  const contentRef = useRef(null);
  const [showLinks, setShowLinks] = useState(false);
  
  // Dynamic styling classes
  const iconBgClass = `bg-${data.accent}-50`;
  const iconTextClass = `text-${data.accent}-600`;
  const chevronRotate = open ? 'rotate-180' : '';
  const iconWrapperClass = `w-14 h-14 rounded-2xl ${iconBgClass} ${iconTextClass} flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform duration-300`;
  const headerTextClass = `flex items-center text-${data.accent}-700 font-bold mb-4 uppercase text-xs tracking-wider`;

  // Determine current requirements based on selection
  const currentReqs = data.requirements[selectedCategory];

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    
    // Calculate Height for Accordion Animation
    if (open) {
      el.style.maxHeight = el.scrollHeight + 'px';
    } else {
      el.style.maxHeight = '0px';
    }
  }, [open, selectedCategory, showLinks]); // Recalculate if these change

  return (
    // UPDATED: Added id={id} to the outer div for scrolling
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
                {data.categories.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
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