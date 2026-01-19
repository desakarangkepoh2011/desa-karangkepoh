import React from 'react';

export default function Profil() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">

      <section id="sejarah" className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-1/3">
              <img src="https://images.unsplash.com/photo-1597816827038-f86015b63795?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                   alt="Sejarah Desa"
                   className="rounded-lg shadow-xl rotate-2 hover:rotate-0 transition duration-500" />
            </div>
            <div className="w-full md:w-2/3">
              <span className="text-desa-primary font-bold tracking-wider uppercase text-sm mb-2 block">Tentang Kami</span>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Sejarah Desa</h2>
              <div className="prose prose-lg text-gray-600 text-justify leading-relaxed space-y-4">
                <p>
                  Desa Karangkepoh memiliki akar sejarah yang kuat yang bermula sejak masa pra-kemerdekaan. Nama "Karangkepoh" dipercaya berasal dari sebuah pohon Kepoh raksasa yang dahulu tumbuh subur di tengah pemukiman warga ("Karang"). Pohon ini menjadi simbol pengayoman dan tempat berkumpulnya para sesepuh desa untuk bermusyawarah.
                </p>
                <p>
                  Secara administratif, pemerintahan desa mulai tertata rapi sejak tahun 1950-an. Seiring berjalannya waktu, Desa Karangkepoh bertransformasi dari desa agraris tradisional menjadi desa yang mulai berkembang dengan inovasi di bidang pertanian modern dan UMKM, tanpa meninggalkan nilai-nilai gotong royong yang diwariskan leluhur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="visi-misi" className="py-16 bg-desa-light/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Visi & Misi</h2>
            <div className="h-1 w-20 bg-desa-primary mx-auto mt-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-desa-primary flex flex-col items-center text-center hover:shadow-xl transition">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-desa-primary text-2xl mb-4">
                <i className="fas fa-eye"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Visi</h3>
              <p className="text-lg text-gray-600 italic font-medium">
                "Terwujudnya Desa Karangkepoh yang Mandiri, Sejahtera, Religius, dan Berbudaya melalui Tata Kelola Pemerintahan yang Transparan dan Akuntabel."
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-blue-500 hover:shadow-xl transition">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl">
                  <i className="fas fa-list-ul"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Misi</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <i className="fas fa-check-circle text-desa-primary mt-1"></i>
                  <span className="text-gray-700">Meningkatkan kualitas pelayanan publik yang prima dan digitalisasi administrasi desa.</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fas fa-check-circle text-desa-primary mt-1"></i>
                  <span className="text-gray-700">Membangun infrastruktur desa yang merata guna mendukung perekonomian warga.</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fas fa-check-circle text-desa-primary mt-1"></i>
                  <span className="text-gray-700">Mengembangkan potensi pertanian dan pemberdayaan BUMDes.</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fas fa-check-circle text-desa-primary mt-1"></i>
                  <span className="text-gray-700">Melestarikan seni budaya dan kearifan lokal masyarakat.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="pejabat" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Perangkat Desa</h2>
            <p className="text-gray-500 mt-2">Mengenal jajaran pemerintahan yang siap melayani Anda.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="sm:col-span-2 lg:col-span-4 flex justify-center order-first">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center w-full max-w-xs transform hover:-translate-y-2 transition duration-300">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-desa-primary p-1">
                  <img src="https://ui-avatars.com/api/?name=Sutarto&background=16a34a&color=fff&size=128" className="w-full h-full rounded-full object-cover" alt="Kades" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Bpk. Sutarto</h3>
                <div className="bg-desa-primary text-white text-xs font-bold uppercase py-1 px-3 rounded-full inline-block mt-2">Kepala Desa</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow border border-gray-100 text-center hover:shadow-lg transition">
              <img src="https://ui-avatars.com/api/?name=Achmad+Kurniawan&background=random&size=128" className="w-24 h-24 mx-auto mb-4 rounded-full object-cover bg-gray-100" alt="Sekdes" />
              <h4 className="font-bold text-gray-900">Achmad Kurniawan, S.Sy</h4>
              <p className="text-gray-500 text-sm">Sekretaris Desa</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow border border-gray-100 text-center hover:shadow-lg transition">
              <img src="https://ui-avatars.com/api/?name=Andri+Setiawan&background=random&size=128" className="w-24 h-24 mx-auto mb-4 rounded-full object-cover bg-gray-100" alt="Kaur" />
              <h4 className="font-bold text-gray-900">Andri Setiawan</h4>
              <p className="text-gray-500 text-sm">Kasi Perintahan</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow border border-gray-100 text-center hover:shadow-lg transition">
              <img src="https://ui-avatars.com/api/?name=Ramelan&background=random&size=128" className="w-24 h-24 mx-auto mb-4 rounded-full object-cover bg-gray-100" alt="Kasi" />
              <h4 className="font-bold text-gray-900">Ramelan</h4>
              <p className="text-gray-500 text-sm">Kasi Kesra & Pelayanan</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow border border-gray-100 text-center hover:shadow-lg transition">
              <img src="https://ui-avatars.com/api/?name=Suwarno&background=random&size=128" className="w-24 h-24 mx-auto mb-4 rounded-full object-cover bg-gray-100" alt="Kasi" />
              <h4 className="font-bold text-gray-900">Suwarno</h4>
              <p className="text-gray-500 text-sm">Kaur Keuangan</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow border border-gray-100 text-center hover:shadow-lg transition">
              <img src="https://ui-avatars.com/api/?name=Erny+Yuliyanti&background=random&size=128" className="w-24 h-24 mx-auto mb-4 rounded-full object-cover bg-gray-100" alt="Kasi" />
              <h4 className="font-bold text-gray-900">Erny Yuliyanti</h4>
              <p className="text-gray-500 text-sm">Kaur Umum & Perencanaan</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow border border-gray-100 text-center hover:shadow-lg transition">
              <img src="https://ui-avatars.com/api/?name=Joko+Santoso&background=random&size=128" className="w-24 h-24 mx-auto mb-4 rounded-full object-cover bg-gray-100" alt="Kasi" />
              <h4 className="font-bold text-gray-900">Joko Santoso</h4>
              <p className="text-gray-500 text-sm">Kadus 1</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow border border-gray-100 text-center hover:shadow-lg transition">
              <img src="https://ui-avatars.com/api/?name=Suyono&background=random&size=128" className="w-24 h-24 mx-auto mb-4 rounded-full object-cover bg-gray-100" alt="Kasi" />
              <h4 className="font-bold text-gray-900">Suyono</h4>
              <p className="text-gray-500 text-sm">Kadus 2</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow border border-gray-100 text-center hover:shadow-lg transition">
              <img src="https://ui-avatars.com/api/?name=Tri+Hartono&background=random&size=128" className="w-24 h-24 mx-auto mb-4 rounded-full object-cover bg-gray-100" alt="Kasi" />
              <h4 className="font-bold text-gray-900">Tri Hartono, S.T</h4>
              <p className="text-gray-500 text-sm">Kadus 3</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow border border-gray-100 text-center hover:shadow-lg transition">
              <img src="https://ui-avatars.com/api/?name=Esther+Evyani&background=random&size=128" className="w-24 h-24 mx-auto mb-4 rounded-full object-cover bg-gray-100" alt="Kasi" />
              <h4 className="font-bold text-gray-900">Esther Evayani</h4>
              <p className="text-gray-500 text-sm">Kadus 4</p>
            </div>

          </div>
        </div>
      </section>

      <section id="geografis" className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6 border-l-4 border-desa-primary pl-4">Kondisi Geografis</h2>
              <p className="text-gray-300 mb-8 leading-relaxed text-justify">
                Desa Karangkepoh terletak di dataran rendah dengan ketinggian rata-rata 150 mdpl. Kondisi tanah yang subur dan irigasi teknis yang memadai menjadikan desa ini sebagai salah satu lumbung padi di kecamatan.
              </p>
              <h4 className="text-xl font-bold mb-4 text-desa-primary">Batas Wilayah</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-3 border border-gray-700">
                  <i className="fas fa-arrow-up text-desa-primary"></i>
                  <div>
                    <span className="block text-xs text-gray-400">Utara</span>
                    <span className="font-semibold">Desa Sukamaju</span>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-3 border border-gray-700">
                  <i className="fas fa-arrow-down text-desa-primary"></i>
                  <div>
                    <span className="block text-xs text-gray-400">Selatan</span>
                    <span className="font-semibold">Sungai Bengawan</span>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-3 border border-gray-700">
                  <i className="fas fa-arrow-right text-desa-primary"></i>
                  <div>
                    <span className="block text-xs text-gray-400">Timur</span>
                    <span className="font-semibold">Desa Harapan Jaya</span>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-3 border border-gray-700">
                  <i className="fas fa-arrow-left text-desa-primary"></i>
                  <div>
                    <span className="block text-xs text-gray-400">Barat</span>
                    <span className="font-semibold">Kecamatan Kota</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
              <h4 className="text-xl font-bold mb-6">Penggunaan Lahan</h4>
              <div className="space-y-4">
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Sawah Irigasi</span>
                    <span className="text-desa-primary font-bold">120 Ha</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-desa-primary h-2 rounded-full" style={{width: '65%'}}></div>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Pemukiman Warga</span>
                    <span className="text-orange-400 font-bold">45 Ha</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-orange-400 h-2 rounded-full" style={{width: '25%'}}></div>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Kebun & Ladang</span>
                    <span className="text-blue-400 font-bold">15 Ha</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{width: '10%'}}></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section id="demografis" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Data Demografis</h2>
            <p className="text-gray-500">Statistik kependudukan Desa Karangkepoh.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <i className="fas fa-briefcase text-desa-primary"></i> Mata Pencaharian
              </h3>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Petani / Buruh Tani</span>
                    <span className="font-bold">60%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '60%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Wiraswasta / Pedagang</span>
                    <span className="font-bold">25%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '25%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>PNS / TNI / Polri</span>
                    <span className="font-bold">15%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{width: '15%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <i className="fas fa-graduation-cap text-desa-primary"></i> Pendidikan
              </h3>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-white p-3 rounded shadow-sm border border-gray-100">
                  <div className="text-xl font-bold text-desa-primary">45%</div>
                  <div className="text-xs text-gray-500">SD/Sederajat</div>
                </div>
                <div className="bg-white p-3 rounded shadow-sm border border-gray-100">
                  <div className="text-xl font-bold text-desa-primary">30%</div>
                  <div className="text-xs text-gray-500">SMP/SMA</div>
                </div>
                <div className="bg-white p-3 rounded shadow-sm border border-gray-100">
                  <div className="text-xl font-bold text-desa-primary">15%</div>
                  <div className="text-xs text-gray-500">Diploma/S1</div>
                </div>
                <div className="bg-white p-3 rounded shadow-sm border border-gray-100">
                  <div className="text-xl font-bold text-desa-primary">10%</div>
                  <div className="text-xs text-gray-500">Lainnya</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <i className="fas fa-praying-hands text-desa-primary"></i> Agama
              </h3>
              <ul className="space-y-2">
                <li className="flex justify-between items-center p-3 bg-white rounded border-l-4 border-green-500 shadow-sm">
                  <span>Islam</span>
                  <span className="font-bold">95%</span>
                </li>
                <li className="flex justify-between items-center p-3 bg-white rounded border-l-4 border-blue-500 shadow-sm">
                  <span>Kristen</span>
                  <span className="font-bold">3%</span>
                </li>
                <li className="flex justify-between items-center p-3 bg-white rounded border-l-4 border-yellow-500 shadow-sm">
                  <span>Katolik</span>
                  <span className="font-bold">2%</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
