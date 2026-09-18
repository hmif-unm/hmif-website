"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon } from "lucide-react";

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormFields = "nama" | "umur" | "asalSekolah" | "programStudi" | "nim" | "alasanMasuk" | "harapan" | "nomorTelepon" | "cabangKampus";

interface StepQuestion {
  field: FormFields;
  label: string;
  isNumeric?: boolean;
  options?: string[];
  prompt?: string;
  validate: (val: string) => string | null;
}

const initialFormData: Record<FormFields, string> = {
  nama: "",
  umur: "",
  asalSekolah: "",
  programStudi: "",
  nim: "",
  alasanMasuk: "",
  harapan: "",
  nomorTelepon: "",
  cabangKampus: ""
};

const questions: StepQuestion[] = [
  {
    field: "nama",
    label: "Masukkan Nama Lengkap:",
    isNumeric: false,
    validate: (val: string) => {
      if (!/^[a-zA-Z\s]+$/.test(val)) {
        return "Error: Nama hanya boleh berisi huruf dan spasi.";
      }
      if (val.length < 2) {
        return "Error: Nama terlalu pendek.";
      }
      return null;
    }
  },
  {
    field: "umur",
    label: "Masukkan Umur (Angka):",
    isNumeric: true,
    validate: (val: string) => {
      if (!/^\d+$/.test(val)) {
        return "Error: Umur harus berupa angka (tidak boleh huruf/teks).";
      }
      const num = parseInt(val, 10);
      if (isNaN(num) || num <= 0 || num > 100) {
        return "Error: Umur harus berupa angka valid (contoh: 19).";
      }
      return null;
    }
  },
  {
    field: "asalSekolah",
    label: "Asal Sekolah:",
    isNumeric: false,
    validate: (val: string) => {
      if (val.length < 2) {
        return "Error: Asal sekolah tidak boleh kosong.";
      }
      return null;
    }
  },
  {
    field: "programStudi",
    label: "Program Studi (contoh: Informatika):",
    isNumeric: false,
    validate: (val: string) => {
      if (val.length < 2) {
        return "Error: Program studi tidak boleh kosong.";
      }
      return null;
    }
  },
  {
    field: "nim",
    label: "Masukkan NIM:",
    isNumeric: true,
    validate: (val: string) => {
      if (!/^\d+$/.test(val)) {
        return "Error: NIM harus berupa angka (tidak boleh huruf/teks).";
      }
      if (val.length < 5) {
        return "Error: NIM harus berupa angka valid (minimal 5 digit).";
      }
      return null;
    }
  },
  {
    field: "alasanMasuk",
    label: "Alasan Masuk HMIF:",
    isNumeric: false,
    validate: (val: string) => {
      if (val.length < 3) {
        return "Error: Alasan masuk minimal 3 karakter.";
      }
      return null;
    }
  },
  {
    field: "harapan",
    label: "Harapan bila diterima di HMIF:",
    isNumeric: false,
    validate: (val: string) => {
      if (val.length < 3) {
        return "Error: Harapan minimal 3 karakter.";
      }
      return null;
    }
  },
  {
    field: "nomorTelepon",
    label: "Nomor Telepon / WA:",
    isNumeric: true,
    validate: (val: string) => {
      if (!/^\d+$/.test(val)) {
        return "Error: Nomor telepon harus berupa angka (tidak boleh huruf/teks).";
      }
      if (val.length < 9 || val.length > 15) {
        return "Error: Nomor telepon harus valid (9-15 digit angka, contoh: 08123456789).";
      }
      return null;
    }
  },
  {
    field: "cabangKampus",
    label: "Pilih Cabang Kampus:",
    options: [
      "[1] Margonda",
      "[2] Jatiwaringin",
      "[3] Rawamangun"
    ],
    prompt: "Pilihan [1/2/3]:",
    isNumeric: true,
    validate: (val: string) => {
      if (val !== "1" && val !== "2" && val !== "3") {
        return "Error: Pilihan tidak valid. Masukkan angka 1, 2, atau 3 (tidak boleh teks).";
      }
      return null;
    }
  }
];

export function TerminalModal({ isOpen, onClose }: TerminalModalProps) {
  const [step, setStep] = useState(0);
  const [inputVal, setInputVal] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [valError, setValError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Record<FormFields, string>>(initialFormData);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const resetForm = () => {
    setStep(0);
    setFormData(initialFormData);
    setInputVal("");
    setSubmitError(null);
    setValError(null);
    setIsSubmitting(false);
    setIsSuccess(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Auto-focus input when step changes or modal opens
  useEffect(() => {
    if (isOpen && step < questions.length && !isSubmitting && !isSuccess && !submitError) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, step, isSubmitting, isSuccess, submitError]);

  // Scroll to bottom when step changes
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [step, isSubmitting, submitError, isSuccess]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const currentQ = questions[step];

    if (currentQ?.isNumeric) {
      if (!/^\d*$/.test(val)) {
        setValError("Error: Input harus berupa angka, tidak boleh huruf atau teks.");
        return;
      }
    }

    setValError(null);
    setInputVal(val);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const val = inputVal.trim();
      
      if (val === "") {
        setValError("Error: Input tidak boleh kosong.");
        return;
      }
      
      const currentQ = questions[step];
      if (!currentQ) return;

      const validationError = currentQ.validate(val);
      if (validationError) {
        setValError(validationError);
        return;
      }

      const currentData = { ...formData };
      
      if (currentQ.field === "cabangKampus") {
        if (val === "1") currentData.cabangKampus = "UNM Margonda";
        else if (val === "2") currentData.cabangKampus = "UNM Jatiwaringin";
        else if (val === "3") currentData.cabangKampus = "UNM Rawamangun";
      } else {
        currentData[currentQ.field] = val;
      }

      setValError(null);
      setFormData(currentData);
      setInputVal("");
      
      if (step === questions.length - 1) {
        // Last step answered, submit to DB!
        setStep(questions.length);
        setIsSubmitting(true);
        setSubmitError(null);

        try {
          const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(currentData),
          });

          const data = await res.json();
          setIsSubmitting(false);

          if (!res.ok) {
            setSubmitError(data.error || "Gagal menyimpan data ke server.");
          } else {
            setIsSuccess(true);
          }
        } catch {
          setIsSubmitting(false);
          setSubmitError("Gagal menghubungi server. Periksa koneksi.");
        }
      } else {
        setStep(prev => prev + 1);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Terminal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#0c0c0c] border border-[#222] rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden font-mono"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#161616] border-b border-[#222]">
              <div className="flex items-center gap-2">
                <button onClick={handleClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex items-center gap-2 text-[#888] text-xs font-medium">
                <TerminalIcon className="w-3.5 h-3.5" />
                <span>bash — hmif_registration — 80x24</span>
              </div>
              <div className="w-10" />
            </div>

            {/* Terminal Body */}
            <div 
              className="p-6 text-sm text-green-400 h-[450px] overflow-y-auto"
              onClick={() => step < questions.length && inputRef.current?.focus()}
            >
              <div className="mb-4 text-slate-300">
                <p>Welcome to HMIF Core System (v2.0.26).</p>
                <p>Type your responses and press [ENTER] to continue.</p>
                <p className="mt-2 text-yellow-400">WARNING: Database connection established.</p>
              </div>

              <div className="space-y-3">
                {/* Init */}
                <div>
                  <span className="text-blue-400">guest@hmif</span>:<span className="text-brand-400">~</span>$ ./register.sh
                  <br />
                  <span className="text-slate-300">Initializing Open Recruitment sequence...</span>
                  <br />
                  <span className="text-green-400">Status: OK</span>
                </div>

                {/* Prompts map */}
                {questions.map((q, idx) => (
                  step >= idx && (
                    <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      {q.options ? (
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center">
                            <span className="text-purple-400">hmif</span> <span className="text-slate-300 ml-1">{q.label}</span>
                          </div>
                          <div className="pl-6 py-0.5 space-y-0.5 font-mono">
                            {q.options.map((opt, oIdx) => (
                              <div key={oIdx} className="text-emerald-400">
                                {opt}
                              </div>
                            ))}
                          </div>
                          <div className="flex flex-wrap items-center">
                            <span className="text-purple-400">hmif</span> <span className="text-slate-300 ml-1">{q.prompt || "Pilihan [1/2/3]:"}</span>
                            {step > idx && <span className="text-white ml-2 font-semibold">{formData[q.field]}</span>}
                            {step === idx && (
                              <input
                                ref={inputRef}
                                type="text"
                                inputMode="numeric"
                                value={inputVal}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                className="bg-transparent border-none outline-none text-white ml-2 flex-1 min-w-[150px] focus:ring-0 p-0 font-mono"
                                autoComplete="off"
                                spellCheck="false"
                              />
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-wrap items-center">
                          <span className="text-purple-400">hmif</span> <span className="text-slate-300 ml-1">{q.label}</span> 
                          {step > idx && <span className="text-white ml-2">{formData[q.field]}</span>}
                          {step === idx && (
                            <input
                              ref={inputRef}
                              type="text"
                              inputMode={q.isNumeric ? "numeric" : "text"}
                              value={inputVal}
                              onChange={handleInputChange}
                              onKeyDown={handleKeyDown}
                              className="bg-transparent border-none outline-none text-white ml-2 flex-1 min-w-[150px] focus:ring-0 p-0 font-mono"
                              autoComplete="off"
                              spellCheck="false"
                            />
                          )}
                        </div>
                      )}
                      {step === idx && valError && (
                        <div className="text-red-400 mt-1 pl-6">
                          {valError}
                        </div>
                      )}
                    </motion.div>
                  )
                ))}

                {/* Submitting state */}
                {isSubmitting && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-yellow-400">
                    <p>Compiling data...</p>
                    <p>Executing INSERT query into hmif_db.registration...</p>
                    <p className="animate-pulse">Awaiting server response...</p>
                  </motion.div>
                )}

                {/* Error State */}
                {submitError && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 border border-red-500/30 bg-red-500/10 p-4 rounded-lg">
                    <p className="text-red-400 font-bold mb-2">ERROR: TRANSACTION FAILED</p>
                    <p className="text-slate-300">{submitError}</p>
                    <button 
                      onClick={resetForm}
                      className="mt-4 px-4 py-1.5 bg-red-500/20 text-red-400 font-bold text-sm hover:bg-red-500/40 transition-colors rounded border border-red-500/50"
                    >
                      Retry ./register.sh
                    </button>
                  </motion.div>
                )}

                {/* Success Message */}
                {isSuccess && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="mt-6 border border-green-500/30 bg-green-500/10 p-4 rounded-lg"
                  >
                    <p className="text-green-400 font-bold mb-2">ACCESS GRANTED: RECORD SAVED</p>
                    <p className="text-slate-300">Data successfully appended to PostgreSQL database.</p>
                    <p className="text-slate-300 mt-2">Welcome aboard, {formData.nama}!</p>
                    <p className="text-slate-300">Program Studi: {formData.programStudi}</p>
                    <p className="text-slate-300">Your registration ID has been generated securely.</p>
                    
                    <button 
                      onClick={handleClose}
                      className="mt-4 px-4 py-1.5 bg-green-500 text-black font-bold text-sm hover:bg-green-400 transition-colors rounded"
                    >
                      Exit Terminal
                    </button>
                  </motion.div>
                )}
                
                <div ref={terminalEndRef} className="h-4" />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
