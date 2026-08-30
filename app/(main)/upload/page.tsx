"use client";

import { useState, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { UploadCloud, Loader2, ArrowLeft, KeyRound, Lock } from "lucide-react";
import Link from "next/link";

function UploadFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const rawType = searchParams.get("type");
  const editId = searchParams.get("editId");
  
  // Validate type
  const type = (rawType === "karya" || rawType === "acara" || rawType === "blog") ? rawType : null;

  const [isLoadingData, setIsLoadingData] = useState(!!editId);

  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [toast, setToast] = useState<string | null>(null);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // Auto-login from admin session
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("hmif_admin_session");
      if (saved === "PASSWORDUPLOADHMIFWEB2026CIHUYHMIFUNM") {
        setPassword(saved);
        setIsAuthorized(true);
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (editId && type) {
      let endpoint = "";
      if (type === "karya") endpoint = `/api/projects/${editId}`;
      else if (type === "acara") endpoint = `/api/events/${editId}`;
      else if (type === "blog") endpoint = `/api/blogs/${editId}`;

      fetch(endpoint)
        .then(res => res.json())
        .then(data => {
          if (!data.error) {
            setFormData(data);
            setPreviewUrl(data.image);
          }
          setIsLoadingData(false);
        })
        .catch(() => setIsLoadingData(false));
    }
  }, [editId, type]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  if (!type) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl text-white font-bold mb-4">Tipe Upload Tidak Valid</h2>
        <button onClick={() => router.back()} className="text-brand-400 hover:underline">Kembali</button>
      </div>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Trim data
    const data = Object.keys(formData).reduce((acc, key) => {
      acc[key] = typeof formData[key] === 'string' ? formData[key].trim() : formData[key];
      return acc;
    }, {} as any);

    // Common validations
    if (!file && !editId) return showToast("Pilih satu gambar terlebih dahulu!");
    if (!data.title || data.title.length < 5) return showToast("Judul terlalu pendek (minimal 5 karakter).");

    // Specific validations
    if (type === "karya") {
      if (!data.description || data.description.length < 10) return showToast("Deskripsi terlalu singkat (minimal 10 karakter).");
      if (data.link && !/^https?:\/\//i.test(data.link)) return showToast("Link harus diawali dengan http:// atau https://");
    }

    if (type === "acara") {
      if (!data.location || data.location.length < 5) return showToast("Lokasi acara kurang jelas (minimal 5 karakter).");
      if (!data.time || !data.time.includes(':')) return showToast("Waktu harus mengandung titik dua ':' (contoh: 08:00 - Selesai).");
      if (!data.description || data.description.length < 10) return showToast("Deskripsi terlalu singkat (minimal 10 karakter).");
    }

    if (type === "blog") {
      if (!data.author || data.author.length < 3 || !/^[a-zA-Z\s]+$/.test(data.author)) {
        return showToast("Nama Penulis salah. Hanya boleh pakai huruf (minimal 3 huruf).");
      }
      if (!data.readTime || !/min|menit/i.test(data.readTime)) {
        return showToast("Waktu baca harus mengandung kata 'min' atau 'menit'.");
      }
      if (!data.excerpt || data.excerpt.length < 15 || data.excerpt.length > 200) {
        return showToast("Panjang cuplikan artikel harus antara 15 hingga 200 karakter.");
      }
      if (!data.content || data.content.length < 50) {
        return showToast("Isi artikel terlalu pendek (minimal 50 karakter).");
      }
    }
    
    setIsUploading(true);
    try {
      // 1. Upload Image
      let url = formData.image || "";
      if (file) {
        const imgData = new FormData();
        imgData.append("file", file);
        const uploadRes = await fetch("/api/upload", { method: "POST", body: imgData });
        if (!uploadRes.ok) throw new Error("Gagal upload gambar baru");
        const uploadJson = await uploadRes.json();
        url = uploadJson.url;
      }

      setIsUploading(false);
      setIsSubmitting(true);

      // 2. Submit Data
      let endpoint = "";
      let payload = { ...data, image: url };
      let redirectUrl = "";

      if (type === "karya") {
        endpoint = `/api/projects${editId ? `/${editId}` : ""}`;
        redirectUrl = "/projects";
      } else if (type === "acara") {
        endpoint = `/api/events${editId ? `/${editId}` : ""}`;
        payload = { ...payload, status: payload.status || "upcoming" };
        redirectUrl = "/events";
      } else if (type === "blog") {
        endpoint = `/api/blogs${editId ? `/${editId}` : ""}`;
        payload = { ...payload, featured: payload.featured === true || payload.featured === "true" };
        if (!payload.slug) payload.slug = payload.title.toLowerCase().replace(/ /g, '-');
        redirectUrl = "/blog";
      }

      const method = editId ? "PUT" : "POST";
      const dbRes = await fetch(endpoint, {
        method,
        headers: { 
          "Content-Type": "application/json",
          "x-admin-password": password
        },
        body: JSON.stringify(payload),
      });

      if (!dbRes.ok) throw new Error("Gagal menyimpan data ke database");

      router.push(redirectUrl + "?success=true");
      router.refresh();
    } catch (error: any) {
      showToast(error.message);
      setIsUploading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {!isAuthorized ? (
        <div className="max-w-md mx-auto text-center mt-10 p-8 bg-[#0c1322] border border-white/10 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 bg-brand-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-brand-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Gembok Admin</h2>
          <p className="text-slate-300 text-sm mb-8">
            Hanya pengurus HMIF yang dapat mengakses halaman ini.
          </p>
          <form onSubmit={(e) => {
            e.preventDefault();
            if (password === "PASSWORDUPLOADHMIFWEB2026CIHUYHMIFUNM") {
              setIsAuthorized(true);
              setAuthError("");
            } else {
              setAuthError("Password salah!");
            }
          }}>
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
              Buka Kunci
            </button>
          </form>
        </div>
      ) : (
        <>
          <div className="mb-8 border-b border-white/10 pb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-3xl font-bold text-white uppercase tracking-wider mb-2">
              {editId ? "Edit" : "Upload"} {type}
            </h1>
            <p className="text-slate-300">Silakan isi form di bawah ini dengan lengkap.</p>
          </div>

      {isLoadingData ? (
        <div className="flex justify-center items-center py-20 text-brand-500">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
      <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Upload Gambar Utama (Wajib)</label>
          <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:bg-white/5 transition-colors relative min-h-[200px] flex items-center justify-center">
            <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" required={!editId && !previewUrl} />
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={previewUrl} alt="Preview" className="max-h-64 mx-auto rounded-lg object-contain" />
            ) : (
              <div className="text-slate-300">
                <UploadCloud className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <span className="font-medium text-slate-300 block mb-1">Klik atau seret gambar ke sini</span>
                <span className="text-sm">Rekomendasi format: JPG, PNG (Max 5MB)</span>
              </div>
            )}
          </div>
        </div>

        {/* Form Karya */}
        {type === "karya" && (
          <>
            <input name="title" value={formData.title || ""} onChange={handleInputChange} placeholder="Judul Karya" className="w-full bg-[#0c1322] border border-white/10 rounded-xl p-4 text-white focus:border-brand-500 outline-none transition-colors" required />
            <textarea name="description" value={formData.description || ""} onChange={handleInputChange} placeholder="Deskripsi Singkat" className="w-full bg-[#0c1322] border border-white/10 rounded-xl p-4 text-white focus:border-brand-500 outline-none transition-colors" rows={4} required />
            <input name="link" value={formData.link || ""} onChange={handleInputChange} placeholder="Link Proyek (Opsional)" className="w-full bg-[#0c1322] border border-white/10 rounded-xl p-4 text-white focus:border-brand-500 outline-none transition-colors" />
          </>
        )}

        {/* Form Acara */}
        {type === "acara" && (
          <>
            <input name="title" value={formData.title || ""} onChange={handleInputChange} placeholder="Nama Acara" className="w-full bg-[#0c1322] border border-white/10 rounded-xl p-4 text-white focus:border-brand-500 outline-none transition-colors" required />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="date" value={formData.date || ""} onChange={handleInputChange} placeholder="Tanggal (Contoh: 15 Agustus 2026)" className="w-full bg-[#0c1322] border border-white/10 rounded-xl p-4 text-white focus:border-brand-500 outline-none transition-colors" required />
              <input name="time" value={formData.time || ""} onChange={handleInputChange} placeholder="Waktu (Contoh: 08:00 - Selesai)" className="w-full bg-[#0c1322] border border-white/10 rounded-xl p-4 text-white focus:border-brand-500 outline-none transition-colors" required />
            </div>
            <input name="location" value={formData.location || ""} onChange={handleInputChange} placeholder="Lokasi (Contoh: Auditorium Kampus)" className="w-full bg-[#0c1322] border border-white/10 rounded-xl p-4 text-white focus:border-brand-500 outline-none transition-colors" required />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="category" value={formData.category || ""} onChange={handleInputChange} placeholder="Kategori (Seminar/Kompetisi)" className="w-full bg-[#0c1322] border border-white/10 rounded-xl p-4 text-white focus:border-brand-500 outline-none transition-colors" required />
              
              {/* Custom Dropdown */}
              <div className="relative">
                <div 
                  onClick={() => setIsStatusOpen(!isStatusOpen)}
                  className="w-full bg-[#0c1322] border border-white/10 rounded-xl p-4 text-white hover:border-white/20 transition-colors cursor-pointer flex justify-between items-center"
                >
                  <span className={formData.status ? "text-white" : "text-slate-300"}>
                    {formData.status === "past" ? "Selesai" : formData.status === "upcoming" ? "Akan Datang" : "Pilih Status (Akan Datang/Selesai)"}
                  </span>
                  <span className={`text-xs text-slate-300 transition-transform ${isStatusOpen ? "rotate-180" : ""}`}>▼</span>
                </div>
                
                {isStatusOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a2235] border border-white/10 rounded-xl overflow-hidden z-20 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                    <div 
                      onClick={() => { setFormData({...formData, status: "upcoming"}); setIsStatusOpen(false); }}
                      className="px-4 py-4 hover:bg-white/5 cursor-pointer text-white flex justify-between items-center border-b border-white/5"
                    >
                      Akan Datang {formData.status === "upcoming" && <div className="w-2 h-2 rounded-full bg-brand-400 shadow-[0_0_8px_rgba(99,102,241,1)]" />}
                    </div>
                    <div 
                      onClick={() => { setFormData({...formData, status: "past"}); setIsStatusOpen(false); }}
                      className="px-4 py-4 hover:bg-white/5 cursor-pointer text-white flex justify-between items-center"
                    >
                      Selesai {formData.status === "past" && <div className="w-2 h-2 rounded-full bg-brand-400 shadow-[0_0_8px_rgba(99,102,241,1)]" />}
                    </div>
                  </div>
                )}
                {/* Hidden input to make it required/part of form if needed, but we handle it manually in submit */}
                <input type="hidden" name="status" value={formData.status || ""} required />
              </div>
            </div>
            <textarea name="description" value={formData.description || ""} onChange={handleInputChange} placeholder="Deskripsi Singkat" className="w-full bg-[#0c1322] border border-white/10 rounded-xl p-4 text-white focus:border-brand-500 outline-none transition-colors" rows={4} required />
          </>
        )}

        {/* Form Blog */}
        {type === "blog" && (
          <>
            <input name="title" value={formData.title || ""} onChange={handleInputChange} placeholder="Judul Artikel (Menarik & Jelas)" className="w-full bg-[#0c1322] border border-white/10 rounded-xl p-4 text-white focus:border-brand-500 outline-none transition-colors text-lg font-bold" required />
            <input name="author" value={formData.author || ""} onChange={handleInputChange} placeholder="Nama Penulis" className="w-full bg-[#0c1322] border border-white/10 rounded-xl p-4 text-white focus:border-brand-500 outline-none transition-colors" required />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="category" value={formData.category || ""} onChange={handleInputChange} placeholder="Kategori (Contoh: Teknologi, Opini)" className="w-full bg-[#0c1322] border border-white/10 rounded-xl p-4 text-white focus:border-brand-500 outline-none transition-colors" required />
              <input name="readTime" value={formData.readTime || ""} onChange={handleInputChange} placeholder="Waktu Baca (Misal: 5 min read)" className="w-full bg-[#0c1322] border border-white/10 rounded-xl p-4 text-white focus:border-brand-500 outline-none transition-colors" required />
            </div>
            <textarea name="excerpt" value={formData.excerpt || ""} onChange={handleInputChange} placeholder="Cuplikan Artikel Singkat (Muncul di bawah judul)" className="w-full bg-[#0c1322] border border-white/10 rounded-xl p-4 text-white focus:border-brand-500 outline-none transition-colors" rows={3} required />
            <textarea name="content" value={formData.content || ""} onChange={handleInputChange} placeholder="Isi Lengkap Artikel (Gunakan enter untuk paragraf baru)" className="w-full bg-[#0c1322] border border-white/10 rounded-xl p-4 text-white focus:border-brand-500 outline-none transition-colors font-serif text-lg leading-relaxed min-h-[300px]" required />
          </>
        )}

        <button 
          type="submit" 
          disabled={isUploading || isSubmitting}
          className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 rounded-xl flex justify-center items-center gap-3 transition-colors disabled:opacity-50 text-lg mt-8"
        >
          {(isUploading || isSubmitting) ? <Loader2 className="w-6 h-6 animate-spin" /> : <UploadCloud className="w-6 h-6" />}
          {isUploading ? "Sedang Mengunggah Gambar..." : isSubmitting ? "Menyimpan ke Database..." : "Simpan & Publikasikan"}
        </button>
      </form>
      </>
      )}
      </>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#0c1322] border border-white/10 text-white px-6 py-3 rounded-full shadow-[0_0_40px_rgba(0,0,0,0.5)] z-50 flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
          <span className="font-medium text-sm">{toast}</span>
        </div>
      )}
    </div>
  );
}

export default function UploadPage() {
  const router = useRouter();
  
  return (
    <main className="min-h-screen pt-32 pb-20 relative bg-[#060a14]">
      <div className="container mx-auto px-4 max-w-2xl">
        <button 
          onClick={() => router.back()} 
          className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-slate-300 hover:text-white rounded-full font-medium mb-10 transition-all hover:-translate-x-1"
        >
          <ArrowLeft className="w-4 h-4" /> 
          Kembali
        </button>
        <Suspense fallback={
          <div className="flex justify-center items-center py-20 text-brand-500">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        }>
          <UploadFormContent />
        </Suspense>
      </div>
    </main>
  );
}
