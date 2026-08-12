# Git Workflow Rules — Grizolabs IT Consulting

## ⚠️ WAJIB DIIKUTI: Branch & Pull Request Workflow

Setiap kali membuat fitur baru atau perbaikan fitur/modul, HARUS mengikuti alur berikut:

### 1. Buat Branch Baru
```bash
# Format nama branch:
git checkout -b feat/<nama-fitur>       # untuk fitur baru
git checkout -b fix/<nama-perbaikan>    # untuk bug fix
git checkout -b chore/<nama-tugas>      # untuk maintenance/refactor
```

**Contoh:**
- `feat/admin-export-csv`
- `fix/mobile-responsive-header`
- `chore/update-dependencies`

### 2. Kerjakan Perubahan di Branch Tersebut
Semua commit dilakukan di branch baru, BUKAN di `main`.

### 3. Push Branch ke GitHub
```bash
git push origin <nama-branch>
```

### 4. Buat Pull Request (PR) di GitHub
- Buat PR dari branch ke `main` di https://github.com/Knoobee98/grizolabs-landingPage
- Judul PR harus deskriptif
- Deskripsi PR mencantumkan apa yang berubah

### 5. Merge ke Main
Setelah PR disetujui, merge ke `main` (Vercel akan auto-deploy).

---

## ❌ DILARANG
- Push langsung ke `main` tanpa branch dan PR
- Mengerjakan lebih dari satu fitur dalam satu branch
