import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <main className="min-h-screen pt-32 pb-20 relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white text-center">
          Blog & <span className="text-brand-500">Berita</span>
        </h1>
        <p className="text-slate-300 mb-16 text-lg text-center">
          Artikel, opini, dan berita terbaru seputar teknologi dan kehidupan kampus.
        </p>

        {blogs.length === 0 ? (
          <div className="text-center py-20 border border-white/10 rounded-2xl bg-white/5">
            <h2 className="text-2xl text-slate-300 font-bold mb-2">Belum ada artikel</h2>
            <p className="text-slate-300">Klik ikon + di pojok kanan bawah untuk menulis artikel pertama.</p>
          </div>
        ) : (
          <StaggerContainer className="flex flex-col">
            {blogs.map((blog) => (
              <StaggerItem key={blog.id}>
                <article className="group flex flex-col md:flex-row justify-between gap-8 py-10 border-b border-white/10 last:border-0">
                  
                  {/* Left Side: Content */}
                  <div className="flex flex-col flex-1 min-w-0">
                    {/* Meta Top */}
                    <div className="flex items-center gap-2 text-sm text-slate-300 mb-3">
                      <div className="w-6 h-6 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 text-xs font-bold">
                        {blog.author.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-slate-300">{blog.author}</span>
                      <span className="text-slate-300">|</span>
                      <span className="text-brand-400 font-medium">{blog.category}</span>
                      <span className="text-slate-300">•</span>
                      <span>
                        {new Date(blog.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric", month: "short", year: "numeric"
                        })}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-snug group-hover:text-brand-400 transition-colors break-all line-clamp-2">
                      <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h2>
                    
                    {/* Excerpt */}
                    <p className="text-slate-300 text-base md:text-lg mb-4 line-clamp-2 leading-relaxed break-words">
                      {blog.excerpt}
                    </p>
                    
                    {/* Meta Bottom */}
                    <div className="flex items-center gap-3 text-xs text-slate-300 mt-auto">
                      <span>{blog.readTime}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-700" />
                      <span>Artikel</span>
                    </div>
                  </div>

                  {/* Right Side: Image */}
                  <div className="w-full md:w-56 h-40 relative overflow-hidden rounded-xl flex-shrink-0 bg-[#0c1322] hidden md:block hw-accel">
                    <Link href={`/blog/${blog.slug}`}>
                      <Image 
                        src={blog.image} 
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                    {blog.featured && (
                      <div className="absolute top-2 right-2 bg-brand-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase shadow-lg">
                        Unggulan
                      </div>
                    )}
                  </div>

                  {/* Mobile Image (shows below content on small screens) */}
                  <div className="w-full h-48 relative overflow-hidden rounded-xl flex-shrink-0 bg-[#0c1322] md:hidden mt-4 hw-accel">
                    <Link href={`/blog/${blog.slug}`}>
                      <Image 
                        src={blog.image} 
                        alt={blog.title}
                        fill
                        className="object-cover"
                      />
                    </Link>
                  </div>

                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>

    </main>
  );
}
