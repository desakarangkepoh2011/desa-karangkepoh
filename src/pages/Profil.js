import React, { useEffect, useState } from 'react';

// --- DATA CONFIGURATION ---
const defaultProfileData = {
  sejarah: {
    image: "",
    title: "Sejarah Desa",
    content: [
      "Pada sekitar tahun 1912, wilayah Boyolali masih berada di bawah Kasunanan Surakarta dan di daerah Karanggede dibentuk tiga kademangan, yaitu Kademangan Jatitengah, Klodran, dan Blimbing. Kademangan Jatitengah dipimpin oleh Demang Gito Saronto (1912–1924) dengan wilayah bawahan beberapa dukuh, termasuk Karangkepoh.",
      "Sekitar tahun 1914, nama Kademangan Jatitengah diubah menjadi Kademangan 'Karangkepoh' karena banyaknya pohon kepoh di wilayah tersebut. Setelah Demang Gito Saronto wafat, kepemimpinan dilanjutkan oleh Demang Karto Diwongso pada tahun 1924–1943.",
      "Pada tahun 1943, sistem pemerintahan kademangan diganti menjadi kalurahan dan dilakukan pemilihan lurah yang dimenangkan oleh Gito Diwiryo sebagai Lurah pertama (1943–1948). Tahun 1950, Mitro Wijoyo diangkat menjadi Lurah setelah berhasil menangkap pencuri yang meresahkan warga, memindahkan pusat pemerintahan ke Dukuh Lemahmendak."
    ]
  },
  visiMisi: {
    visi: "Tetap Bersama Membangun Desa Karangkepoh",
    misi: [
      "Membangun sinergitas Aparatur Pemerintah Desa Karangkepoh yang berfungsi sebagai pelayan masyarakat, berdaya guna, produktif, transparan, bersih dan professional.",
      "Membangun Perilaku masyarakat Desa Karangkepoh yang sesuai dengan ajaran agama dan kepercayaannya.",
      "Membangun tingkat partisipasi masyarakat dalam perencanaan dan pelaksanaan Pemerintahan, Pembangunan dan Kemasyarakatan.",
      "Membangun serta Mewujudkan Desa Karangkepoh yang mandiri dengan mensupport berjalannya BUMDesa.",
      "Membangun serta Mewujudkan Desa Karangkepoh yang Maju dibidang Pendidikan, Kesehatan, pertanian dan perdagangan.",
      "Meningkatkan upaya pemerataan pembangunan sehingga menjadikan seluruh wilayah Desa Karangkepoh maju dan berkembang.",
      "Memberikan kemudahan ijin dan penyediaan lahan industri kepada investor untuk berinvestasi di Desa Karangkepoh."
    ]
  },
  perangkatDesa: {
    struktural: [
      { name: "Sutarto", jabatan: "Kepala Desa", image: "", isPrimary: true },
      { name: "Achmad Kurniawan", jabatan: "Sekretaris Desa", image: "" },
      { name: "Esther Evayani", jabatan: "Kasi Pemerintahan", image: "" },
      { name: "Ramelan", jabatan: "Kasi Kesejahteraan & Pelayanan", image: "" },
      { name: "Erny Yuliyanti", jabatan: "Kaur Umum & Perencanaan", image: "" },
      { name: "Suwarno", jabatan: "Kaur Keuangan", image: "" }
    ],
    wilayah: [
      { name: "Joko Santoso", jabatan: "Kadus I", image: "" },
      { name: "Suyono", jabatan: "Kadus II", image: "" },
      { name: "Tri Hartono", jabatan: "Kadus III", image: "" },
      { name: "Esther Evayani", jabatan: "Kadus IV", image: "" }
    ]
  },
  geografis: {
    description: "Desa Karangkepoh merupakan salah satu desa di Kecamatan Karanggede, Kabupaten Boyolali, dengan luas wilayah 276,16 Ha. Wilayah ini terbagi menjadi 4 Dusun, 5 RW, dan 21 RT dengan topografi yang mendukung sektor pertanian dan pemukiman.",
    batasWilayah: [
      { arah: "Utara", desa: "Desa Dologan", icon: "arrow-up" },
      { arah: "Selatan", desa: "Desa Pengkol", icon: "arrow-down" },
      { arah: "Timur", desa: "Desa Klego (Kec. Klego)", icon: "arrow-right" },
      { arah: "Barat", desa: "Desa Sendang", icon: "arrow-left" }
    ],
    penggunaanLahan: [
      { label: "Sawah (Irigasi & Tadah Hujan)", luas: "115,1 Ha", percent: 41, colorClass: "bg-desa-primary" },
      { label: "Pekarangan / Bangunan", luas: "103,8 Ha", percent: 37, colorClass: "bg-orange-400" },
      { label: "Tegal / Kebun", luas: "43,7 Ha", percent: 16, colorClass: "bg-blue-400" },
      { label: "Fasilitas Umum & Sosial", luas: "13,5 Ha", percent: 6, colorClass: "bg-purple-400" }
    ]
  },
  demografis: {
    penduduk: {
      total: "2.696",
      kk: "925",
      dusun: "4",
      note: "Rasio gender seimbang (±50:50)"
    },
    ekonomi: [
      { sector: "Pertanian & Perkebunan", percent: 45, colorClass: "bg-green-500" },
      { sector: "Industri & Karyawan Swasta", percent: 35, colorClass: "bg-blue-500" },
      { sector: "Wiraswasta & Perdagangan", percent: 20, colorClass: "bg-orange-400" }
    ],
    sdm: [
      "Mayoritas penduduk telah menuntaskan program Wajib Belajar 9 Tahun (SD & SMP).",
      "Tingkat partisipasi pendidikan menengah (SMA/SMK) terus meningkat setiap tahunnya.",
      "Terdapat sarana pendidikan lengkap mulai dari PAUD, TK, SD, hingga MTs di dalam desa."
    ]
  }
};

// --- REMOTE API FOR PROFILE ---
const API_PROFILE_URL = 'https://desakarangkepoh2011.github.io/website-data/data/profile.json';

function ensureImage(url, name) {
  if (url && url.trim()) return url;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&background=random&size=128`;
}

function normalizeProfileData(api) {
  if (!api) return defaultProfileData;

  const sejarah = {
    image: api.sejarah?.image || defaultProfileData.sejarah.image,
    title: api.sejarah?.title || defaultProfileData.sejarah.title,
    content: api.sejarah?.content || defaultProfileData.sejarah.content
  };

  const visiMisi = {
    visi: api.visiMisi?.visi || defaultProfileData.visiMisi.visi,
    misi: api.visiMisi?.misi || defaultProfileData.visiMisi.misi
  };

  const perangkatDesaApi = api.perangkatDesa || {};
  const struktural = (perangkatDesaApi.struktural || defaultProfileData.perangkatDesa.struktural).map((p, i) => ({
    name: p.name || defaultProfileData.perangkatDesa.struktural[i]?.name || 'Nama',
    jabatan: p.jabatan || defaultProfileData.perangkatDesa.struktural[i]?.jabatan || '',
    image: ensureImage(p.image || '', p.name || defaultProfileData.perangkatDesa.struktural[i]?.name),
    isPrimary: !!p.isPrimary
  }));

  const wilayah = (perangkatDesaApi.wilayah || defaultProfileData.perangkatDesa.wilayah).map((p, i) => ({
    name: p.name || defaultProfileData.perangkatDesa.wilayah[i]?.name || 'Nama',
    jabatan: p.jabatan || defaultProfileData.perangkatDesa.wilayah[i]?.jabatan || '',
    image: ensureImage(p.image || '', p.name || defaultProfileData.perangkatDesa.wilayah[i]?.name)
  }));

  const geografis = {
    description: api.geografis?.description || defaultProfileData.geografis.description,
    batasWilayah: api.geografis?.batasWilayah || defaultProfileData.geografis.batasWilayah,
    penggunaanLahan: api.geografis?.penggunaanLahan || defaultProfileData.geografis.penggunaanLahan
  };

  const demografis = {
    penduduk: api.demografis?.penduduk || defaultProfileData.demografis.penduduk,
    ekonomi: api.demografis?.ekonomi || defaultProfileData.demografis.ekonomi,
    sdm: api.demografis?.sdm || defaultProfileData.demografis.sdm
  };

  return { sejarah, visiMisi, perangkatDesa: { struktural, wilayah }, geografis, demografis };
}

// --- COMPONENT ---
export default function Profil() {
  const [profileData, setProfileData] = useState(defaultProfileData);

  useEffect(() => {
    let mounted = true;
    let intervalId = null;
    const fetchProfile = async () => {
      try {
        const res = await fetch(API_PROFILE_URL, {
          method: 'GET',
          redirect: 'follow',
          cache: 'no-cache',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' }
        });
        if (!res.ok) throw new Error('Network response was not ok');
        const json = await res.json();
        if (!mounted) return;
        const normalized = normalizeProfileData(json);
        setProfileData(normalized);
      } catch (err) {
        console.error('Gagal mengambil profile:', err);
      }
    };

    fetchProfile();
    const POLL_INTERVAL = 60000;
    intervalId = setInterval(() => { if (document.visibilityState === 'visible') fetchProfile(); }, POLL_INTERVAL);

    return () => { mounted = false; if (intervalId) clearInterval(intervalId); };
  }, []);

  const { sejarah, visiMisi, perangkatDesa, geografis, demografis } = profileData;

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">

      {/* SEJARAH */}
      <section id="sejarah" className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-1/3">
              <img src={sejarah.image} alt={sejarah.title} className="rounded-lg shadow-xl rotate-2 hover:rotate-0 transition duration-500" />
            </div>
            <div className="w-full md:w-2/3">
              <span className="text-desa-primary font-bold tracking-wider uppercase text-sm mb-2 block">Tentang Kami</span>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{sejarah.title}</h2>
              <div className="prose prose-lg text-gray-600 text-justify leading-relaxed space-y-4">
                {sejarah.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISI MISI */}
      <section id="visi-misi" className="py-16 bg-desa-light/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Visi & Misi</h2>
            <div className="h-1 w-20 bg-desa-primary mx-auto mt-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Visi */}
            <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-desa-primary flex flex-col items-center text-center hover:shadow-xl transition">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-desa-primary text-2xl mb-4">
                <i className="fas fa-eye"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Visi</h3>
              <p className="text-lg text-gray-600 italic font-medium">"{visiMisi.visi}"</p>
            </div>

            {/* Misi */}
            <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-blue-500 hover:shadow-xl transition">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl">
                  <i className="fas fa-list-ul"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Misi</h3>
              </div>
              <ul className="space-y-3">
                {visiMisi.misi.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <i className="fas fa-check-circle text-desa-primary mt-1"></i>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PERANGKAT DESA */}
      <section id="pejabat" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Perangkat Desa</h2>
            <p className="text-gray-500 mt-2">Mengenal jajaran pemerintahan yang siap melayani Anda.</p>
          </div>

          <div className="max-w-6xl mx-auto">
            
            {/* Kategori: Struktural (Kades & Perangkat) */}
            <div className="mb-12">
              <h3 className="text-xl font-bold text-gray-800 mb-6 border-l-4 border-desa-primary pl-3">Pemerintahan Desa</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {perangkatDesa.struktural.map((pejabat, index) => (
                  <div 
                    key={index} 
                    className={`bg-white p-6 rounded-xl shadow border border-gray-100 text-center hover:shadow-lg transition ${pejabat.isPrimary ? 'sm:col-span-2 lg:col-span-4 flex flex-col items-center justify-center order-first transform hover:-translate-y-2 duration-300 mb-4 lg:mb-8' : ''}`}
                  >
                    <div className={`${pejabat.isPrimary ? 'w-32 h-32 border-4 p-1' : 'w-24 h-24 bg-gray-100'} mx-auto mb-4 rounded-full overflow-hidden border-desa-primary`}>
                      <img src={pejabat.image} className="w-full h-full rounded-full object-cover" alt={pejabat.jabatan} />
                    </div>
                    <h3 className={`${pejabat.isPrimary ? 'text-xl' : 'text-base'} font-bold text-gray-900`}>{pejabat.name}</h3>
                    {pejabat.isPrimary ? (
                      <div className="bg-desa-primary text-white text-xs font-bold uppercase py-1 px-3 rounded-full inline-block mt-2">{pejabat.jabatan}</div>
                    ) : (
                      <p className="text-gray-500 text-sm">{pejabat.jabatan}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Kategori: Kepala Kewilayahan (Kadus) */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6 border-l-4 border-blue-500 pl-3">Kepala Kewilayahan</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {perangkatDesa.wilayah.map((pejabat, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow border border-gray-100 text-center hover:shadow-lg transition">
                    <div className="w-24 h-24 bg-gray-100 mx-auto mb-4 rounded-full overflow-hidden border-2 border-blue-100">
                      <img src={pejabat.image} className="w-full h-full rounded-full object-cover" alt={pejabat.jabatan} />
                    </div>
                    <h3 className="text-base font-bold text-gray-900">{pejabat.name}</h3>
                    <p className="text-gray-500 text-sm">{pejabat.jabatan}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* GEOGRAFIS */}
      <section id="geografis" className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6 border-l-4 border-desa-primary pl-4">Kondisi Geografis</h2>
              <p className="text-gray-300 mb-8 leading-relaxed text-justify">{geografis.description}</p>
              
              <h4 className="text-xl font-bold mb-4 text-desa-primary">Batas Wilayah</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {geografis.batasWilayah.map((batas, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded-lg flex items-center gap-3 border border-gray-700">
                    <i className={`fas fa-${batas.icon} text-desa-primary`}></i>
                    <div>
                      <span className="block text-xs text-gray-400">{batas.arah}</span>
                      <span className="font-semibold">{batas.desa}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
              <h4 className="text-xl font-bold mb-6">Penggunaan Lahan</h4>
              <div className="space-y-4">
                {geografis.penggunaanLahan.map((lahan, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{lahan.label}</span>
                      <span className={`${lahan.colorClass.replace('bg-', 'text-')} font-bold`}>{lahan.luas}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className={`${lahan.colorClass} h-2 rounded-full`} style={{width: `${lahan.percent}%`}}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEMOGRAFIS (UMUM) */}
      <section id="demografis" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Gambaran Demografis</h2>
            <p className="text-gray-500">Statistik umum kependudukan dan potensi SDM Desa Karangkepoh.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Kependudukan */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-center hover:shadow-md transition">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl mx-auto mb-4">
                <i className="fas fa-users"></i>
              </div>
              <h3 className="font-bold text-gray-800 text-lg mb-2">Total Penduduk</h3>
              <p className="text-4xl font-bold text-desa-primary mb-2">{demografis.penduduk.total} <span className="text-base font-normal text-gray-500">Jiwa</span></p>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Terdiri dari <strong>{demografis.penduduk.kk}</strong> Kepala Keluarga</p>
                <p>Tersebar di <strong>{demografis.penduduk.dusun} Dusun</strong></p>
                <p className="text-xs text-gray-400 mt-2">{demografis.penduduk.note}</p>
              </div>
            </div>

            {/* Sektor Ekonomi */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-md transition">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 justify-center md:justify-start">
                <i className="fas fa-chart-pie text-desa-primary"></i> Sektor Ekonomi Utama
              </h3>
              <div className="space-y-4">
                {demografis.ekonomi.map((eko, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="font-medium text-gray-700">{eko.sector}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className={`${eko.colorClass} h-2.5 rounded-full`} style={{width: `${eko.percent}%`}}></div>
                    </div>
                  </div>
                ))}
                <p className="text-xs text-center text-gray-400 mt-3">*Estimasi distribusi mata pencaharian warga</p>
              </div>
            </div>

            {/* SDM / Pendidikan */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-md transition">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 justify-center md:justify-start">
                <i className="fas fa-user-graduate text-desa-primary"></i> Kualitas SDM
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                {demografis.sdm.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <i className="fas fa-check text-green-500 mt-1"></i>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}