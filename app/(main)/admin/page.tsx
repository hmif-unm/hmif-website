"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  KeyRound,
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  Layers,
  Pencil,
  Trash2,
  Loader2,
  AlertTriangle,
  Plus,
  LogOut,
  Users,
} from "lucide-react";

const ADMIN_PASSWORD = "PASSWORDUPLOADHMIFWEB2026CIHUYHMIFUNM";
const SESSION_KEY = "hmif_admin_session";

type TabType = "karya" | "acara" | "blog" | "pendaftar";

type Item = {
  id: string;
  title: string;
  image: string;
  createdAt: string;
  slug?: string; // for blog
};

type Registration = {
  id: string;
  nama: string;
  nim: string;
  umur: string;
  asalSekolah: string;
  nomorTelepon: string;
  cabangKampus: string;
  alasanMasuk: string;
  harapan: string;
  createdAt: string;
};

// ── Delete Modal ──────────────────────────────────────────────────────────────
function DeleteModal({
  item,
  type,
  password,
  onClose,
  onDeleted,
}: {
  item: Item;
  type: Exclude<TabType, "pendaftar">;
  password: string;
  onClose: () => void;
  onDeleted: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    setError("");
    try {
      const ep =
        type === "karya"
          ? `/api/projects/${item.id}`
          : type === "acara"
          ? `/api/events/${item.id}`
          : `/api/blogs/${item.id}`;

      const res = await fetch(ep, {
        method: "DELETE",
        headers: { "x-admin-password": password },
      });
      if (!res.ok) throw new Error("Gagal menghapus. Coba lagi.");
      onDeleted();
      onClose();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0c1322] border border-white/10 rounded-2xl p-7 w-full max-w-md shadow-[0_0_60px_rgba(0,0,0,0.7)] animate-in zoom-in-95 duration-200">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Hapus Item?</h3>
            <p className="text-slate-400 text-sm mt-0.5 line-clamp-1">"{item.title}"</p>
          </div>
        </div>
        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
          Item ini akan dihapus secara permanen dari database dan tidak dapat dikembalikan.
        </p>
        {error && <p className="text-red-400 text-sm mb-4 font-medium">{error}</p>}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2.5 rounded-xl font-bold text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            Batal
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold text-sm shadow-lg transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            {loading ? "Menghapus..." : "Ya, Hapus"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Item Card ─────────────────────────────────────────────────────────────────
function ItemCard({
  item,
  type,
  password,
  onDeleted,
}: {
  item: Item;
  type: Exclude<TabType, "pendaftar">;
  password: string;
  onDeleted: () => void;
}) {
  const [showDelete, setShowDelete] = useState(false);

  const detailHref =
    type === "karya"
      ? `/projects/${item.id}`
      : type === "acara"
      ? `/events/${item.id}`
      : `/blog/${item.slug}`;

  const editHref = `/upload?type=${type}&editId=${item.id}`;

  return (
    <>
      <div className="group flex items-center gap-4 p-4 bg-[#0c1322] border border-white/10 rounded-2xl hover:border-brand-500/30 transition-all">
        {/* Thumbnail */}
        <div className="relative w-20 h-14 flex-shrink-0 rounded-xl overflow-hidden bg-white/5">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm line-clamp-1 break-all">{item.title}</p>
          <p className="text-slate-500 text-xs mt-0.5">
            {new Date(item.createdAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={detailHref}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors text-xs font-bold"
            title="Lihat Detail"
          >
            ↗
          </Link>
          <Link
            href={editHref}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 rounded-lg text-xs font-bold transition-colors border border-brand-500/20"
          >
            <Pencil className="w-3 h-3" /> Edit
          </Link>
          <button
            onClick={() => setShowDelete(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs font-bold transition-colors border border-red-500/20"
          >
            <Trash2 className="w-3 h-3" /> Hapus
          </button>
        </div>
      </div>

      {showDelete && (
        <DeleteModal
          item={item}
          type={type}
          password={password}
          onClose={() => setShowDelete(false)}
          onDeleted={onDeleted}
        />
      )}
    </>
  );
}

// ── Main Admin Panel ──────────────────────────────────────────────────────────
export default function AdminPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("karya");
  const [items, setItems] = useState<Item[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(false);

  const activeTabRef = useRef<TabType>(activeTab);
  activeTabRef.current = activeTab;

  // Restore session on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved === ADMIN_PASSWORD) {
        setPassword(saved);
        setIsAuthorized(true);
      }
    } catch {}
  }, []);

  const fetchItems = async (tab: TabType, pwd = password) => {
    setLoading(true);
    setItems([]);
    setRegistrations([]);

    const controller = new AbortController();

    try {
      if (tab === "pendaftar") {
        const res = await fetch("/api/register", {
          headers: { "x-admin-password": pwd || ADMIN_PASSWORD },
          signal: controller.signal,
        });
        const data = await res.json();
        // Guard against race condition: only update state if tab hasn't changed
        if (activeTabRef.current === "pendaftar") {
          setRegistrations(Array.isArray(data) ? data : []);
        }
      } else {
        const ep =
          tab === "karya"
            ? "/api/projects"
            : tab === "acara"
            ? "/api/events"
            : "/api/blogs";
        const res = await fetch(ep, { signal: controller.signal });
        const data = await res.json();
        // Guard against race condition: only update state if tab matches
        if (activeTabRef.current === tab) {
          setItems(Array.isArray(data) ? data : []);
        }
      }
    } catch (err: any) {
      if (err.name !== "AbortError") {
        if (activeTabRef.current === tab) {
          setItems([]);
          setRegistrations([]);
        }
      }
    } finally {
      if (activeTabRef.current === tab) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      fetchItems(activeTab);
    }
  }, [isAuthorized, activeTab]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, password);
      setIsAuthorized(true);
      setAuthError("");
    } else {
      setAuthError("Password salah!");
    }
  };

  const handleLogout = () => {
    try { sessionStorage.removeItem(SESSION_KEY); } catch {}
    setIsAuthorized(false);
    setPassword("");
    setItems([]);
    setRegistrations([]);
  };

  // ── Login Screen ─────────────────────────────────────────────────────────
  if (!isAuthorized) {
    return (
      <main className="min-h-screen pt-32 pb-20 flex items-start justify-center bg-[#060a14]">
        <div className="w-full max-w-md mx-4">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-brand-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <LayoutDashboard className="w-8 h-8 text-brand-400" />
            </div>
            <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
            <p className="text-slate-400 text-sm mt-2">HMIF UNM — Kelola konten website</p>
          </div>

          <form
            onSubmit={handleLogin}
            className="bg-[#0c1322] border border-white/10 rounded-2xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)]"
          >
            <label className="block text-sm font-medium text-slate-300 mb-2">Password Admin</label>
            <div className="relative mb-5">
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="password"
                placeholder="Masukkan password admin..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#131d32] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition-all placeholder:text-slate-600"
              />
            </div>
            {authError && (
              <p className="text-red-400 text-sm mb-4 font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> {authError}
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 rounded-xl transition-colors"
            >
              <Lock className="w-4 h-4 inline-block mr-2 mb-0.5" />
              Masuk ke Admin Panel
            </button>
          </form>
        </div>
      </main>
    );
  }

  // ── Dashboard Tabs ─────────────────────────────────────────────────────────────
  const tabs: { id: TabType; label: string; icon: React.ReactNode; addHref?: string }[] = [
    { id: "karya", label: "Karya", icon: <Layers className="w-4 h-4" />, addHref: "/upload?type=karya" },
    { id: "acara", label: "Acara", icon: <CalendarDays className="w-4 h-4" />, addHref: "/upload?type=acara" },
    { id: "blog", label: "Blog", icon: <BookOpen className="w-4 h-4" />, addHref: "/upload?type=blog" },
    { id: "pendaftar", label: "Pendaftar", icon: <Users className="w-4 h-4" /> },
  ];

  const activeTabData = tabs.find((t) => t.id === activeTab)!;

  return (
    <main className="min-h-screen pt-24 pb-20 bg-[#060a14]">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <LayoutDashboard className="w-7 h-7 text-brand-400" />
              Admin Panel
            </h1>
            <p className="text-slate-400 text-sm mt-1">Kelola konten Karya, Acara, Blog, dan Calon Pendaftar</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-xl text-sm font-medium border border-white/10 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Keluar
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6 bg-white/5 rounded-xl p-1 border border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-brand-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">
            {activeTab === "pendaftar" ? "Data Pendaftar" : `Semua ${activeTabData.label}`}
            <span className="ml-2 text-slate-500 font-normal text-sm">
              ({activeTab === "pendaftar" ? registrations.length : items.length} item)
            </span>
          </h2>
          {activeTabData.addHref && (
            <Link
              href={activeTabData.addHref}
              className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-sm font-bold transition-colors shadow-lg"
            >
              <Plus className="w-4 h-4" /> Tambah {activeTabData.label}
            </Link>
          )}
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
          </div>
        ) : activeTab === "pendaftar" ? (
          /* Pendaftar Table */
          registrations.length === 0 ? (
            <div className="text-center py-20 border border-white/10 rounded-2xl bg-white/5">
              <Users className="w-12 h-12 text-slate-500 mx-auto mb-3 opacity-50" />
              <p className="text-slate-400 text-lg font-medium">Belum ada calon pendaftar</p>
              <p className="text-slate-500 text-sm mt-1">Data pendaftaran dari terminal akan muncul di sini.</p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-[#0c1322] border border-white/10 rounded-2xl shadow-xl">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="text-xs uppercase bg-white/5 text-slate-300 border-b border-white/10">
                  <tr>
                    <th scope="col" className="px-5 py-4">No</th>
                    <th scope="col" className="px-5 py-4 font-bold text-white whitespace-nowrap">Nama Lengkap</th>
                    <th scope="col" className="px-5 py-4 font-mono">NIM</th>
                    <th scope="col" className="px-5 py-4">Umur</th>
                    <th scope="col" className="px-5 py-4">Asal Sekolah</th>
                    <th scope="col" className="px-5 py-4 font-mono">No Telp</th>
                    <th scope="col" className="px-5 py-4">Cabang Kampus</th>
                    <th scope="col" className="px-5 py-4 max-w-[200px]">Alasan Masuk</th>
                    <th scope="col" className="px-5 py-4 max-w-[200px]">Harapan</th>
                    <th scope="col" className="px-5 py-4 whitespace-nowrap">Waktu Daftar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {registrations.map((reg, index) => (
                    <tr key={reg.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-5 py-4 text-slate-400">{index + 1}</td>
                      <td className="px-5 py-4 font-semibold text-white whitespace-nowrap">{reg.nama}</td>
                      <td className="px-5 py-4 font-mono text-brand-400 whitespace-nowrap">{reg.nim}</td>
                      <td className="px-5 py-4">{reg.umur}</td>
                      <td className="px-5 py-4">{reg.asalSekolah}</td>
                      <td className="px-5 py-4 font-mono text-brand-400 whitespace-nowrap">{reg.nomorTelepon}</td>
                      <td className="px-5 py-4 whitespace-nowrap">{reg.cabangKampus}</td>
                      <td className="px-5 py-4 text-slate-300 truncate max-w-[200px]" title={reg.alasanMasuk}>
                        {reg.alasanMasuk}
                      </td>
                      <td className="px-5 py-4 text-slate-300 truncate max-w-[200px]" title={reg.harapan}>
                        {reg.harapan}
                      </td>
                      <td className="px-5 py-4 text-slate-400 whitespace-nowrap text-xs">
                        {new Date(reg.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          /* Karya, Acara, Blog List */
          items.length === 0 ? (
            <div className="text-center py-20 border border-white/10 rounded-2xl bg-white/5">
              <p className="text-slate-400 text-lg font-medium">Belum ada {activeTabData.label}</p>
              {activeTabData.addHref && (
                <Link
                  href={activeTabData.addHref}
                  className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-sm font-bold transition-colors"
                >
                  <Plus className="w-4 h-4" /> Tambah sekarang
                </Link>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  type={activeTab as Exclude<TabType, "pendaftar">}
                  password={password}
                  onDeleted={() => fetchItems(activeTab)}
                />
              ))}
            </div>
          )
        )}
      </div>
    </main>
  );
}
