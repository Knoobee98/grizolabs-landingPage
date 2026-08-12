# 🚀 Grizolabs IT Consulting & MSME Software Platform

> **Platform Konsultasi IT, Automated PRD Estimator, System Control Admin, & Generator SPK Kontrak Otomatis untuk UMKM Indonesia.**

---

## 📌 Short Description (Untuk Kolom About di GitHub)
> **Modern IT Consulting Platform for MSMEs powered by React 19, Vite, Express, & Gemini AI. Features PRD cost estimator, live project status tracker, client ticket management, and automated A4 SPK PDF contract generation.**

---

## 🌟 Fitur Utama (Key Features)

### 1. 🤖 AI-Powered PRD Estimator & Scope Calculator
- Simulasi estimasi waktu (minggu) dan biaya pengerjaan software secara transparan.
- Didukung **Google Gemini 3.6 Flash AI** untuk penyusunan Dokumen PRD (Product Requirement Document) otomatis.

### 2. 📊 IT Diagnostic Audit for MSMEs
- Self-service audit maturitas IT untuk pemilik usaha (F&B, Retail, Logistics).
- Memberikan skor kesiapan digital dan saran arsitektur secara real-time.

### 3. 🎛️ Admin Dashboard & Project Control
- **Live Server Status Tracking**: Pengawasan server live (`🟢 ONLINE`, `🟡 STAGING`, `🔵 MAINTENANCE`, `⚪ OFFLINE`) dengan tombol *1-Click Live App Preview*.
- **Dual-Layer ID Architecture**: Menggabungkan `UUID v4` untuk database/route backend dan `GZ-PRJ-2026-XXX` acak untuk tampilan UI & SPK.
- **Status-Bound Progress Bar**: Persentase progres otomatis menyesuaikan status pengerjaan (`In Progress` = 50-78%, `Under Review` = 85%, `Completed` = 100%).
- **Manual Project Entry**: Form pendaftaran proyek manual untuk deal yang didapatkan via WhatsApp atau meeting offline.

### 4. 📄 Automated Legal SPK Contract Generator
- Pembuat **Surat Perjanjian Kerja (SPK) PDF Resmi** 1-klik.
- Parameter lengkap (DP %, SLA garansi, pasal hak cipta/NDA, dan blok tanda tangan).
- Engine cetak `@media print` A4 presisi tinggi dengan nama file otomatis: `SPK_[Nama_Perusahaan]_[Nama_PIC]_[Tanggal].pdf`.

### 5. 🎟️ Client Complaint & Ticket Management
- Manajemen tiket komplain klien pasca Go-Live berbasis prioritas (`High`, `Medium`, `Low`) dan status SLA.
- Integrasi tombol 1-klik balasan solusi terformat langsung ke WhatsApp klien.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 19, TypeScript, Vite 6, Tailwind CSS v4, Lucide React Icons.
- **Backend API**: Express.js 4 (Node.js).
- **AI Integration**: `@google/genai` (Gemini 3.6 Flash API).
- **Styling & Print Engine**: Vanilla CSS Design Tokens & Native `@media print` CSS Engine.

---

## 🚀 Quick Start (Menjalankan Lokal)

### Prerequisites
- Node.js (v18 atau lebih baru)
- npm / pnpm / yarn

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/username/Grizolabs-IT-Consulting.git
cd Grizolabs-IT-Consulting
npm install
```

### 2. Konfigurasi Environment Variable
Buat file `.env` di root project dan masukkan Gemini API Key Anda:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
```

### 3. Jalankan Server Dev (Frontend & Backend API)
```bash
npm run dev
```
Buka browser di `http://localhost:3000`.

---

## 🏷️ Recommended GitHub Topics / Tags
`react19` • `typescript` • `vite` • `tailwindcss` • `express` • `gemini-ai` • `it-consulting` • `spk-generator` • `admin-dashboard` • `umkm-indonesia` • `pdf-generator`

---

<div align="center">
  <sub>Built with ❤️ for MSMEs by <b>Grizolabs Tech Team</b></sub>
</div>