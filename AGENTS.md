# AGENTS.md — Aturan Kerja Bersama

Repo ini dikerjakan bersama oleh beberapa agent secara paralel. Ikuti aturan
berikut untuk menghindari konflik di GitHub.

## Wajib: Branch Baru untuk Setiap Pekerjaan

- Setiap fitur atau fix dikerjakan di **branch baru**, bukan di `main`.
- Penamaan branch:
  - Fitur: `feat/<deskripsi-singkat>`
  - Perbaikan: `fix/<deskripsi-singkat>`
- Buat branch dari `origin/main` yang paling baru.

## Wajib: Pull Terbaru Sebelum Mulai

- Sebelum mulai mengerjakan apa pun, selalu ambil versi terbaru:
  - `git fetch origin`
  - `git pull` (atau `git checkout -b <branch> origin/main` untuk branch baru).
- Jangan mulai kerja dari state yang sudah lama/ketinggalan dari remote.

## Sebelum Push / Buka PR

- Merge/rebase `main` terbaru ke branch kerja:
  - `git fetch origin && git merge origin/main`
  - (atau `git rebase origin/main`) lalu selesaikan konflik yang muncul.
- Pastikan tidak ada konflik sebelum push.

## Lainnya

- Jangan pernah commit `.env` atau file secret (sudah di-`.gitignore`).
- Jangan push ke remote tanpa diminta user.
- Setiap pekerjaan selesai di-commit ke branch masing-masing, bukan ke `main`.
