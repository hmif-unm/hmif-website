"use client";

import { useState, useEffect } from "react";
import { Lock, KeyRound, Loader2, Users } from "lucide-react";

export default function PendaftarPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "PASSWORDUPLOADHMIFWEB2026CIHUYHMIFUNM") {
      setIsAuthorized(true);
      setAuthError("");
      fetchData(password);
    } else {
      setAuthError("Password salah!");
    }
  };

  const fetchData = async (pwd: string) => {
    setIsLoading(true);
    setFetchError("");
    try {
      const res = await fetch("/api/register", {
        headers: {
          "x-admin-password": pwd
        }
      });
      
      if (!res.ok) {
        throw new Error("Gagal mengambil data dari server.");
      }
      
      const data = await res.json();
      setRegistrations(data);
    } catch (err: any) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthorized) {
    return (
      <main className="min-h-screen pt-32 pb-20 relative bg-[#060a14] flex items-center justify-center">
        <div className="max-w-md w-full mx-4 text-center p-8 bg-[#0c1322] border border-white/10 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 bg-brand-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-brand-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Data Rahasia Pendaftar</h2>
          <p className="text-slate-300 text-sm mb-8">
            Hanya admin HMIF yang memiliki akses untuk melihat database calon pendaftar.
          </p>
          <form onSubmit={handleLogin}>
            <div className="relative mb-6">
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input
                type="password"
                placeholder="Masukkan Password Admin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#131d32] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition-all placeholder:text-slate-300"
              />
            </div>
            {authError && <p className="text-red-400 text-sm mb-4 font-medium animate-in slide-in-from-top-2">{authError}</p>}
            <button type="submit" className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3.5 rounded-xl transition-colors text-sm uppercase tracking-wide">
              Buka Kunci Database
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-20 relative bg-[#060a14]">
      <div className="container mx-auto px-6 max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-3">
              <Users className="text-brand-400" /> Database Pendaftar
            </h1>
            <p className="text-slate-300">Daftar mahasiswa yang telah mengisi form registrasi di terminal.</p>
          </div>
          <div className="px-4 py-2 bg-brand-500/10 border border-brand-500/20 text-brand-400 rounded-lg text-sm font-bold flex items-center gap-2">
            <Lock className="w-4 h-4" /> Admin Access Granted
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col justify-center items-center py-32 text-brand-500">
            <Loader2 className="w-10 h-10 animate-spin mb-4" />
            <p className="text-slate-300">Mengambil data dari server...</p>
          </div>
        ) : fetchError ? (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-2xl text-center">
            {fetchError}
          </div>
        ) : registrations.length === 0 ? (
          <div className="glass border border-white/5 p-16 rounded-3xl text-center">
            <Users className="w-16 h-16 text-slate-300 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-white mb-2">Belum ada Pendaftar</h3>
            <p className="text-slate-300">Saat ini database pendaftaran masih kosong.</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-[#0c1322] border border-white/5 rounded-2xl shadow-xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="text-xs uppercase bg-white/5 text-slate-300 border-b border-white/10">
                <tr>
                  <th scope="col" className="px-6 py-4">No</th>
                  <th scope="col" className="px-6 py-4 font-bold text-white">Nama Lengkap</th>
                  <th scope="col" className="px-6 py-4">NIM</th>
                  <th scope="col" className="px-6 py-4">Umur</th>
                  <th scope="col" className="px-6 py-4">Asal Sekolah</th>
                  <th scope="col" className="px-6 py-4">No Telp</th>
                  <th scope="col" className="px-6 py-4">Cabang Kampus</th>
                  <th scope="col" className="px-6 py-4 max-w-[200px]">Alasan Masuk</th>
                  <th scope="col" className="px-6 py-4 max-w-[200px]">Harapan</th>
                  <th scope="col" className="px-6 py-4">Waktu Daftar</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg, index) => (
                  <tr key={reg.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4 font-bold text-white whitespace-nowrap">{reg.nama}</td>
                    <td className="px-6 py-4 font-mono text-brand-400">{reg.nim}</td>
                    <td className="px-6 py-4">{reg.umur}</td>
                    <td className="px-6 py-4">{reg.asalSekolah}</td>
                    <td className="px-6 py-4 font-mono text-brand-400">{reg.nomorTelepon}</td>
                    <td className="px-6 py-4">{reg.cabangKampus}</td>
                    <td className="px-6 py-4 text-slate-300 truncate max-w-[200px]" title={reg.alasanMasuk}>
                      {reg.alasanMasuk}
                    </td>
                    <td className="px-6 py-4 text-slate-300 truncate max-w-[200px]" title={reg.harapan}>
                      {reg.harapan}
                    </td>
                    <td className="px-6 py-4 text-slate-300 whitespace-nowrap">
                      {new Date(reg.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'short', year: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
