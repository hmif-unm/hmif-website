import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Tolong sertakan gambar." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Ubah menjadi Base64 Data URI untuk disimpan di database sebagai string
    const mimeType = file.type || 'image/jpeg';
    const base64Image = `data:${mimeType};base64,${buffer.toString('base64')}`;
    
    // Kembalikan base64 sebagai url yang nantinya akan disimpan ke database di frontend
    return NextResponse.json({ url: base64Image }, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Gagal mengunggah file. Internal server error." }, { status: 500 });
  }
}
