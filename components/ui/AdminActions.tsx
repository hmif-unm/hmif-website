"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Loader2, AlertTriangle, KeyRound } from "lucide-react";
import Link from "next/link";

interface AdminActionsProps {
  id: string;
  type: "karya" | "acara" | "blog";
  redirectUrl: string;
}

export function AdminActions({ id, type, redirectUrl }: AdminActionsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const confirmDelete = async () => {
    if (!password) {
      setErrorMsg("Password wajib diisi!");
      return;
    }
    setIsDeleting(true);
    setErrorMsg("");
    try {
      let endpoint = "";
      if (type === "karya") endpoint = `/api/projects/${id}`;
      else if (type === "acara") endpoint = `/api/events/${id}`;
      else if (type === "blog") endpoint = `/api/blogs/${id}`;

      const res = await fetch(endpoint, { 
        method: "DELETE",
        headers: {
          "x-admin-password": password
        }
      });

      if (!res.ok) {
        if (res.status === 401) throw new Error("Password salah!");
        throw new Error("Gagal menghapus data");
      }

      router.push(`${redirectUrl}?deleted=true`);
      router.refresh();
    } catch (error: any) {
      setErrorMsg(error.message);
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <Link 
          href={`/upload?type=${type}&editId=${id}`}
          className="flex items-center gap-2 px-4 py-2.5 bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 rounded-xl text-sm font-bold transition-all hover:scale-105 border border-brand-500/20"
        >
          <Pencil className="w-4 h-4" /> Edit
        </Link>
        <button 
          onClick={() => {
            setShowModal(true);
            setPassword("");
            setErrorMsg("");
          }}
          disabled={isDeleting}
          className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-sm font-bold transition-all hover:scale-105 border border-red-500/20 disabled:opacity-50"
        >
          {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
          {isDeleting ? "Menghapus..." : "Hapus"}
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0c1322] backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0c1322] border border-white/10 rounded-2xl p-7 w-full max-w-md shadow-[0_0_40px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-5 mb-5">
              <div className="w-14 h-14 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-7 h-7 text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Konfirmasi Hapus</h3>
                <p className="text-slate-300 text-sm mt-1">
                  Menghapus {type} secara permanen?
                </p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                Tindakan ini tidak dapat dibatalkan. Masukkan password admin untuk melanjutkan.
              </p>
              
              <div className="relative">
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input
                  type="password"
                  placeholder="Password Admin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#131d32] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all placeholder:text-slate-300"
                />
              </div>
              {errorMsg && (
                <p className="text-red-400 text-sm mt-2 font-medium animate-in slide-in-from-top-1">{errorMsg}</p>
              )}
            </div>

            <div className="flex items-center justify-end gap-3">
              <button 
                onClick={() => setShowModal(false)}
                disabled={isDeleting}
                className="px-5 py-2.5 rounded-xl font-bold text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50"
              >
                Batal
              </button>
              <button 
                onClick={confirmDelete}
                disabled={isDeleting || !password}
                className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold text-sm shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-colors disabled:opacity-50"
              >
                {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                {isDeleting ? "Menghapus..." : "Ya, Hapus Data"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
