import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdminPassword } from "@/lib/auth";

export async function GET(req: Request) {
  if (!verifyAdminPassword(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const registrations = await prisma.registration.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(registrations);
  } catch {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama, asalSekolah, programStudi, nim, alasanMasuk, harapan, nomorTelepon, cabangKampus } = body;

    // Validate simple required fields
    if (!nama || !asalSekolah || !programStudi || !nim || !alasanMasuk || !harapan || !nomorTelepon || !cabangKampus) {
      return NextResponse.json(
        { error: "Semua data harus diisi!" },
        { status: 400 }
      );
    }

    if (!/^\d+$/.test(String(nim))) {
      return NextResponse.json(
        { error: "NIM harus berupa angka yang valid!" },
        { status: 400 }
      );
    }

    // Check if NIM already registered
    const existingNim = await prisma.registration.findUnique({
      where: { nim },
    });

    if (existingNim) {
      return NextResponse.json(
        { error: "NIM ini sudah terdaftar di database." },
        { status: 409 }
      );
    }

    // Insert to DB
    const newRegistration = await prisma.registration.create({
      data: {
        nama,
        asalSekolah,
        programStudi,
        nim,
        alasanMasuk,
        harapan,
        nomorTelepon,
        cabangKampus,
      },
    });

    try {
      await fetch(process.env.DISCORD_WEBHOOK_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          embeds: [
            {
              title: "Anggota Baru HMIF",
              description:
                "Ada mahasiswa baru yang bergabung dengan **Himpunan Mahasiswa Informatika (HMIF)**.",
              fields: [
                {
                  name: "Nama Lengkap",
                  value: nama,
                  inline: false,
                },
                {
                  name: "NIM",
                  value: String(nim),
                  inline: true,
                },
                {
                  name: "Nomor Telepon",
                  value: nomorTelepon,
                  inline: true,
                },
                {
                  name: "Program Studi",
                  value: programStudi,
                  inline: true,
                },
                {
                  name: "Cabang Kampus",
                  value: cabangKampus,
                  inline: true,
                },
                {
                  name: "Alasan Masuk",
                  value: alasanMasuk,
                  inline: false,
                },
                {
                  name: "Harapan",
                  value: harapan,
                  inline: false,
                },
              ],
              footer: {
                text: "HMIF • Pendaftaran Anggota Baru",
              },
              timestamp: new Date().toISOString(),
            },
          ],
          allowed_mentions: {
            parse: [],
          },
        }),
      });
    } catch (error) {
      console.error("Failed to send Discord webhook:", error);
    }

    return NextResponse.json(
      { message: "Registrasi berhasil disimpan!", data: newRegistration },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error Registration API:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal server." },
      { status: 500 }
    );
  }
}
