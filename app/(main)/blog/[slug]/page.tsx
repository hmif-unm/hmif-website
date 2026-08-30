import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Heart, Share, Bookmark, MoreHorizontal } from "lucide-react";
import { AdminActions } from "@/components/ui/AdminActions";

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const blog = await prisma.blog.findUnique({
    where: { slug: resolvedParams.slug }
  });

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-32 pb-20 relative bg-[#060a14]">
      <article className="container mx-auto px-4 max-w-3xl">
        
        <Link href="/blog" className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 font-medium mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Blog
        </Link>

        {/* Header / Title */}
        <h1 className="text-4xl md:text-[2.75rem] font-bold text-white mb-4 leading-tight tracking-tight">
          {blog.title}
        </h1>
        
        {/* Excerpt / Subtitle */}
        <p className="text-xl text-slate-300 mb-8 leading-relaxed font-serif">
          {blog.excerpt}
        </p>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 text-lg font-bold flex-shrink-0">
              {blog.author.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-medium text-slate-300 text-base">{blog.author}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300 mt-1">
                <span>{blog.readTime}</span>
                <span className="text-slate-300">•</span>
                <span>
                  {new Date(blog.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric", month: "short", year: "numeric"
                  })}
                </span>
              </div>
            </div>
          </div>
          <AdminActions id={blog.id} type="blog" redirectUrl="/blog" />
        </div>

        {/* Hero Image */}
        <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-12 bg-white/5">
          <Image 
            src={blog.image} 
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          {/* We use whitespace-pre-wrap to respect newlines entered in the textarea */}
          {blog.content ? (
            <div className="whitespace-pre-wrap break-words font-serif text-[1.25rem] leading-[2] text-[#d1d5db]">
              {blog.content}
            </div>
          ) : (
            <div className="text-slate-300 italic">
              (Isi artikel belum ditambahkan. Konten ini hanya menampilkan excerpt.)
              <br /><br />
              {blog.excerpt}
            </div>
          )}
        </div>
      </article>
    </main>
  );
}
