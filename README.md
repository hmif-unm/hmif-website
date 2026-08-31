# HMIF Website

Official website of **Himpunan Mahasiswa Informatika (HMIF) Universitas Nusa Mandiri**.

Website ini dikembangkan sebagai platform digital resmi HMIF Universitas Nusa Mandiri untuk menyediakan informasi mengenai organisasi, kegiatan, program kerja, publikasi, serta berbagai informasi lainnya yang berkaitan dengan HMIF.

Project ini dirancang dengan arsitektur modern menggunakan Next.js dan TypeScript, dengan PostgreSQL sebagai database serta Prisma sebagai ORM. Website di-deploy menggunakan Vercel untuk menyediakan akses yang cepat dan reliable.

## Tech Stack

* **Next.js** — React framework untuk membangun aplikasi web
* **TypeScript** — Type-safe development
* **Tailwind CSS** — Utility-first CSS framework
* **Prisma ORM** — Database toolkit dan ORM
* **PostgreSQL** — Relational database
* **Vercel** — Deployment dan hosting

## Development

Clone repository:

```bash
git clone https://github.com/hmif-unm/hmif-website.git
cd hmif-website
```

Install dependencies:

```bash
bun install
```

Buat file `.env` dan konfigurasi database:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

Generate Prisma Client:

```bash
bunx prisma generate
```

Jalankan development server:

```bash
bun run dev
```

Website dapat diakses melalui:

```text
http://localhost:3000
```

## Production

Build project:

```bash
bun run build
```

Jalankan production server:

```bash
bun run start
```

Untuk deployment menggunakan Vercel, pastikan `DATABASE_URL` telah dikonfigurasi pada environment variables dan Prisma Client di-generate pada proses build.

## License

Copyright © 2026 **Himpunan Mahasiswa Informatika Universitas Nusa Mandiri**.
