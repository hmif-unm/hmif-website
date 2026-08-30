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
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama, umur, asalSekolah, nim, alasanMasuk, harapan, nomorTelepon, cabangKampus } = body;

    // Validate simple required fields
    if (!nama || !umur || !asalSekolah || !nim || !alasanMasuk || !harapan || !nomorTelepon || !cabangKampus) {
      return NextResponse.json(
        { error: "Semua data harus diisi!" },
        { status: 400 }
      );
    }

    if (isNaN(parseInt(umur)) || parseInt(umur) <= 0) {
      return NextResponse.json(
        { error: "Umur harus berupa angka yang valid!" },
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
        umur: parseInt(umur),
        asalSekolah,
        nim,
        alasanMasuk,
        harapan,
        nomorTelepon,
        cabangKampus,
      },
    });

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
