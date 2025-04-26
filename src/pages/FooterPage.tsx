import React from "react";
import { faRotate, faSitemap, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function FooterPage() {
  return (
    <div className="max-w-6xl mx-auto text-gray-800 dark:text-gray-200">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3 md:pr-6 ">
          {/* TATA CARA PEMAKAIAN */}
          <h3 className="text-base font-semibold mb-3 text-gray-900 dark:text-gray-100">Tata Cara Pemakaian Aplikasi</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm sm:text-xs">
            <li>
              <strong>Pilih Group:</strong> Di bagian atas, klik tab group (misalnya Group A, Group B dst.) untuk memilih group yang ingin kamu simulasikan.
            </li>
            <li>
              <strong>Simulasi Stage 1:</strong>
              <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                <li className="flex items-start space-x-3 rtl:space-x-reverse">
                  <svg className="shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" d="M1 5.917 5.724 10.5 15 1.5" />
                  </svg>
                  <span>Lihat pertandingan yang tersedia di Stage 1 (2 Pertandingan / stage).</span>
                </li>
                <li className="flex items-start space-x-3 rtl:space-x-reverse">
                  <svg className="shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" d="M1 5.917 5.724 10.5 15 1.5" />
                  </svg>
                  <span>
                    Atur skor untuk setiap pertandingan menggunakan tombol <FontAwesomeIcon icon={faPlus} className="ml-1 bg-slate-200 text-slate-800 p-0.5" /> atau{" "}
                    <FontAwesomeIcon icon={faMinus} className="ml-1 bg-slate-200 text-slate-800 p-0.5" />, atau membiarkan <strong>0-0</strong>
                  </span>
                </li>
                <li className="flex items-start space-x-3 rtl:space-x-reverse">
                  <svg className="shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" d="M1 5.917 5.724 10.5 15 1.5" />
                  </svg>
                  <span>
                    Klik tombol{" "}
                    <strong className="p-0.5 rounded-sm text-white uppercase font-bold bg-blue-500">
                      {" "}
                      Laga <FontAwesomeIcon icon={faSitemap} className="ml-1" />{" "}
                    </strong>{" "}
                    &nbsp;untuk menyimpan hasil. Setelah ini, <strong>Stage 1</strong> akan terkunci, dan <strong>Stage 2</strong> akan muncul
                  </span>
                </li>
              </ul>
            </li>

            <li>
              <strong>Simulasi Stage 2 dan Stage 3:</strong>
              <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                <li className="flex items-start space-x-3 rtl:space-x-reverse">
                  <svg className="shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" d="M1 5.917 5.724 10.5 15 1.5" />
                  </svg>
                  <span>
                    Ulangi langkah yang sama seperti <strong>Stage 1</strong> untuk <strong>Stage 2</strong> & <strong>Stage 3</strong>.
                  </span>
                </li>
                <li className="flex items-start space-x-3 rtl:space-x-reverse">
                  <svg className="shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" d="M1 5.917 5.724 10.5 15 1.5" />
                  </svg>
                  <span>Setiap stage akan terkunci setelah disimulasikan, dan stage berikutnya akan muncul.</span>
                </li>
              </ul>
            </li>

            <li>
              <strong>Lihat Hasil di Tabel Klasemen:</strong>
              <ul className="list-inside ml-4 mt-1 space-y-1">
                <li className="flex items-start space-x-3 rtl:space-x-reverse">
                  <svg className="shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" d="M1 5.917 5.724 10.5 15 1.5" />
                  </svg>
                  <span>Setelah simulasi, tabel klasemen di atas akan otomatis di perbaharui.</span>
                </li>
                <li className="flex items-start space-x-3 rtl:space-x-reverse">
                  <svg className="shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" d="M1 5.917 5.724 10.5 15 1.5" />
                  </svg>
                  <span>
                    Kamu bisa melihat poin <strong className="text-lime-600">(PTS)</strong>, jumlah kemenangan <strong className="text-emerald-800">(W)</strong>, imbang <strong className="text-yellow-600">(D)</strong>, Kalah{" "}
                    <strong className="text-violet-600">(L)</strong>, Total Tanding <strong className="text-red-600">(MP)</strong>, Gol dicetak <strong className="text-orange-600">(GF)</strong>, Gol kebobolan{" "}
                    <strong className="text-lime-600">(GA)</strong>, & Selisih Gol <strong className="text-teal-700">(GD)</strong>
                  </span>
                </li>
              </ul>
            </li>

            <li>
              <strong>Reset Simulasi:</strong>
              <ul className="list-inside ml-4 mt-1 space-y-1">
                <li className="flex items-start space-x-3 rtl:space-x-reverse">
                  <svg className="shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400 mt-1" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" d="M1 5.917 5.724 10.5 15 1.5" />
                  </svg>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Jika ingin memulai ulang simulasi untuk group tertentu,&nbsp;
                    <span className="inline-flex items-center gap-1">
                      klik tombol
                      <FontAwesomeIcon icon={faRotate} className="p-1 text-white bg-red-500 rounded-full text-xs" />
                    </span>
                  </span>
                </li>

                <li className="flex items-start space-x-3 rtl:space-x-reverse">
                  <svg className="shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" d="M1 5.917 5.724 10.5 15 1.5" />
                  </svg>
                  <span>Setelah reset, semua skor, stage, dan klasemen akan kembali ke kondisi awal.</span>
                </li>
              </ul>
            </li>

            <li>
              <strong>Ganti Group:</strong>
              <ul className="list-inside ml-4 mt-1 space-y-1">
                <li className="flex items-start space-x-3 rtl:space-x-reverse">
                  <svg className="shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" d="M1 5.917 5.724 10.5 15 1.5" />
                  </svg>
                  <span>Kamu bisa pindah ke group lain kpan saja dengan klik tab group.</span>
                </li>
                <li className="flex items-start space-x-3 rtl:space-x-reverse">
                  <svg className="shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" d="M1 5.917 5.724 10.5 15 1.5" />
                  </svg>
                  <span>Hasil simulasi di group sebelumnya akan tetap tersimpan, dan stage yang sudah disimulasikan akan terkunci</span>
                </li>
              </ul>
            </li>
          </ol>
        </div>

        {/* Garis Divider: Vertikal di Desktop, Horizontal di Mobile */}
        <div className="border-b md:border-b-0 md:border-r border-gray-300 dark:border-gray-700 my-4 md:my-0"></div>

        <div className="md:w-1/3 flex items-center">
          <div className="text-center">
            {/* DESKRIPSI APLIKASI */}
            <h2 className="text-end text-base font-semibold mb-4 text-gray-900 dark:text-gray-100">Tentang Simulasi Turnament</h2>
            <p className="text-end mb-6 font-light text-sm/8">
              Aplikasi ini adalah simulator turnamen sepak bola sederhana yang memungkinkan kamu untuk mensimulasikan pertandingan antar tim dalam group. Kamu bisa mengatur skor pertandingan, melihat hasilnya di tabel klasemen, dan mereset
              simulasi jika diperlukan. Aplikasi ini mendukung simulasi hingga 3 stage per group, dengan adanya aplikasi ini anda tidak perlu lagi melakukan kalkulasi atau perhitungan poin, jumlah kemenangan, total tanding, gol dicetak, gol
              kebobolan, dan selisih gol yang diperoleh satu tim, dengan langsung melihat hasil dari yang kita simulasikan maka kita akan tau tim yang mana akan lolos ke fase gugur.
            </p>
          </div>
        </div>
      </div>

      {/* CATATAN TAMBAHAN */}
      <div className="mt-6 font-extralight text-xs text-center text-gray-600 dark:text-gray-400">
        <p>
          &copy; 2025 - Muhammad Azwar Anas <strong> Aplikasi Simulasi Turnamen. Dibuat untuk membantu penggemar sepak bola mensimulasikan turnamen dengan mudah.</strong>
        </p>
      </div>
    </div>
  );
}
