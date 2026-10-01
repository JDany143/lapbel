"use client"; 
 
import Link from "next/link"; 
import { useEffect, useState } from "react"; 
 
type Stats = { 
  attendance: { 
    hadir: number; 
    total: number; 
    percent: number; 
  }; 
  quiz: { 
    benar: number; 
    total: number; 
    percent: number; 
  }; 
}; 
 
export default function Home() { 
  const [stats, setStats] = useState<Stats | null>(null); 
  const [loading, setLoading] = useState(true); 
 
  async function loadStats() { 
    try { 
      const res = await fetch("/api/stats"); 
      const data = await res.json(); 
 
      setStats(data); 
    } catch (err) { 
      console.error(err); 
    } finally { 
      setLoading(false); 
    } 
  } 
 
  useEffect(() => { 
    loadStats(); 
  }, []); 
 
  if (loading) { 
    return ( 
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center"> 
        <div className="text-center"> 
          <div className="w-14 h-14 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-5" /> 
 
          <h1 className="text-3xl font-bold"> 
            Memuat Dashboard... 
          </h1> 
        </div> 
      </main> 
    ); 
  } 
 
  const progress = Math.round( 
    ((stats?.attendance.percent ?? 0) + 
      (stats?.quiz.percent ?? 0)) / 2 
  ); 
 
  return ( 
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6 md:p-8"> 
      <div className="max-w-6xl mx-auto"> 
 
        <div className="mb-12"> 
 
          <p className="text-cyan-400 font-semibold mb-3"> 
            Selamat Datang 👋 
          </p> 
 
          <h1 
            className=" 
            text-5xl 
            md:text-7xl 
            font-black 
            bg-gradient-to-r 
            from-cyan-400 
            to-blue-500 
            bg-clip-text 
            text-transparent 
          " 
          > 
            Laporan Belajar AI 
          </h1> 
 
          <p className="text-slate-400 mt-4 text-lg"> 
            Dashboard Monitoring Belajar Siswa 
          </p> 
 
        </div> 
 
        <div className="grid md:grid-cols-2 gap-8"> 
 
          <div 
            className=" 
            bg-slate-900 
            rounded-3xl 
            p-8 
            shadow-xl 
            border 
            border-slate-800 
            hover:border-green-500 
            hover:scale-[1.02] 
            transition-all 
            duration-300 
          " 
          > 
            <h2 className="text-2xl font-bold mb-6"> 
              📅 Absensi 
            </h2> 
 
            <p className="text-6xl font-black text-green-400"> 
              {stats?.attendance.percent ?? 0}% 
            </p> 
 
            <div className="mt-5 text-slate-300"> 
              Hadir: {stats?.attendance.hadir} 
            </div> 
 
            <div className="text-slate-300"> 
              Total: {stats?.attendance.total} 
            </div> 
          </div> 
 
          <div 
            className=" 
            bg-slate-900 
            rounded-3xl 
            p-8 
            shadow-xl 
            border 
            border-slate-800 
            hover:border-cyan-500 
            hover:scale-[1.02] 
            transition-all 
            duration-300 
          " 
          > 
            <h2 className="text-2xl font-bold mb-6"> 
              🧠 Quiz 
            </h2> 
 
            <p className="text-6xl font-black text-cyan-400"> 
              {stats?.quiz.percent ?? 0}% 
            </p> 
 
            <div className="mt-5 text-slate-300"> 
              Jawaban Benar: {stats?.quiz.benar} 
            </div> 
 
            <div className="text-slate-300"> 
              Total Soal: {stats?.quiz.total} 
            </div> 
          </div> 
 
        </div> 
 
        <div className="mt-8 bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-800"> 
 
          <h2 className="text-2xl font-bold mb-6"> 
            🚀 Menu Cepat 
          </h2> 
 
          <div className="grid md:grid-cols-3 gap-5 mb-10"> 
 
            <Link 
              href="/absensi" 
              className=" 
              group 
              bg-slate-800/80 
              hover:bg-slate-700 
              rounded-3xl 
              p-6 
              transition-all 
              duration-300 
              hover:-translate-y-1 
              border 
              border-slate-700 
            " 
            > 
              <div className="text-4xl mb-4 group-hover:scale-110 transition"> 
                📅 
              </div> 
 
              <h3 className="text-xl font-bold"> 
                Absensi 
              </h3> 
 
              <p className="text-slate-400 mt-2"> 
                Kelola kehadiran siswa 
              </p> 
            </Link> 
 
            <Link 
              href="/quiz" 
              className=" 
              group 
              bg-slate-800/80 
              hover:bg-slate-700 
              rounded-3xl 
              p-6 
              transition-all 
              duration-300 
              hover:-translate-y-1 
              border 
              border-slate-700 
            " 
            > 
              <div className="text-4xl mb-4 group-hover:scale-110 transition"> 
                🧠 
              </div> 
 
              <h3 className="text-xl font-bold"> 
                Quiz AI 
              </h3> 
 
              <p className="text-slate-400 mt-2"> 
                Latihan soal otomatis 
              </p> 
            </Link> 
 
            <Link 
              href="/laporan" 
              className=" 
              group 
              bg-slate-800/80 
              hover:bg-slate-700 
              rounded-3xl 
              p-6 
              transition-all 
              duration-300 
              hover:-translate-y-1 
              border 
              border-slate-700 
            " 
            > 
              <div className="text-4xl mb-4 group-hover:scale-110 transition"> 
                📄 
              </div> 
 
              <h3 className="text-xl font-bold"> 
                Laporan 
              </h3> 
 
              <p className="text-slate-400 mt-2"> 
                Export laporan belajar 
              </p> 
            </Link> 
 
          </div> 
 
          <div className="border-t border-slate-700 pt-8"> 
 
            <h3 className="text-xl font-bold mb-4"> 
              📊 Ringkasan Statistik 
            </h3> 
 
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4"> 
 
              <div className="bg-slate-800 rounded-2xl p-5"> 
                <p className="text-slate-400"> 
                  Kehadiran 
                </p> 
 
                <p className="text-3xl font-black"> 
                  {stats?.attendance.hadir} 
                </p> 
              </div> 
 
              <div className="bg-slate-800 rounded-2xl p-5"> 
                <p className="text-slate-400"> 
                  Total Absensi 
                </p> 
 
                <p className="text-3xl font-black"> 
                  {stats?.attendance.total} 
                </p> 
              </div> 
 
              <div className="bg-slate-800 rounded-2xl p-5"> 
                <p className="text-slate-400"> 
                  Benar Quiz 
                </p> 
 
                <p className="text-3xl font-black"> 
                  {stats?.quiz.benar} 
                </p> 
              </div> 
 
              <div className="bg-slate-800 rounded-2xl p-5"> 
                <p className="text-slate-400"> 
                  Total Soal 
                </p> 
 
                <p className="text-3xl font-black"> 
                  {stats?.quiz.total} 
                </p> 
              </div> 
 
            </div> 
 
            <div className="mt-8"> 
 
              <div className="flex justify-between mb-2"> 
                <span className="text-slate-400"> 
                  Progress Belajar 
                </span> 
 
                <span className="font-bold text-cyan-400"> 
                  {progress}% 
                </span> 
              </div> 
 
              <div className="h-4 bg-slate-800 rounded-full overflow-hidden"> 
 
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-green-500 transition-all duration-700" 
                  style={{ 
                    width: `${progress}%`, 
                  }} 
                /> 
 
              </div> 
 
            </div> 
 
          </div> 
 
        </div> 
 
      </div> 
    </main> 
  ); 
}