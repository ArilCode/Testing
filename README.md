# Video tutorial ACE Converter (Remotion) v2

Dua video dibuat sekaligus:
- tutorial-horizontal.mp4 (1920x1080, 16:9)
- tutorial-vertical.mp4 (1080x1920, 9:16 ala TikTok)

Suara narasi AI dibuat otomatis (Bahasa Indonesia) dan durasi tiap adegan
mengikuti panjang suaranya.

## Cara dapat video lewat GitHub (tanpa laptop)
1. Upload semua isi folder ini ke repo GitHub (termasuk .github, public, src).
2. Buka tab Actions, tunggu "Render video" selesai (centang hijau).
3. Buka run terakhir, scroll ke Artifacts, unduh "video-tutorial".

## Ubah narasi / teks
- Teks suara: src/narration.json (urutan harus sama dengan STEPS di src/Tutorial.tsx)
- Teks di layar dan posisi sorotan: STEPS di src/Tutorial.tsx
- Ganti suara: ubah VOICE di gen_audio.py (id-ID-GadisNeural = perempuan, id-ID-ArdiNeural = laki-laki)
