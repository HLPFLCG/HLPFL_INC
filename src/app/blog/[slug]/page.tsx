import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, Tag, ArrowRight } from "lucide-react";
import { getAllPosts, getBlogPost, formatDate, type BlogPost } from "@/lib/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const categoryStyles: Record<BlogPost["category"], { bg: string; text: string }> = {
  "press-release": { bg: "bg-blue-500/20", text: "text-blue-400" },
  "case-study": { bg: "bg-gold/20", text: "text-gold" },
  news: { bg: "bg-green-500/20", text: "text-green-400" },
  guide: { bg: "bg-purple-500/20", text: "text-purple-400" },
};

const categoryLabels: Record<BlogPost["category"], string> = {
  "press-release": "Press Release",
  "case-study": "Case Study",
  news: "News",
  guide: "Guide",
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "HLPFL INC - Empowering Creative Entrepreneurs",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ["/og-image.png"],
    },
  };
}

// Simple markdown-like rendering for blog content
function renderContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];
  let listType: "ul" | "ol" | null = null;

  const flushList = () => {
    if (currentList.length > 0) {
      if (listType === "ul") {
        elements.push(
          <ul key={elements.length} className="list-disc list-inside space-y-2 mb-6 text-gray-300">
            {currentList.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );
      } else {
        elements.push(
          <ol key={elements.length} className="list-decimal list-inside space-y-2 mb-6 text-gray-300">
            {currentList.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        );
      }
      currentList = [];
      listType = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      continue;
    }

    // Headers
    if (trimmed.startsWith("# ")) {
      flushList();
      elements.push(
        <h1 key={i} className="font-display text-3xl lg:text-4xl mb-6 mt-8 first:mt-0">
          {trimmed.slice(2)}
        </h1>
      );
    } else if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={i} className="font-display text-2xl lg:text-3xl mb-4 mt-8 text-gold">
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={i} className="font-display text-xl lg:text-2xl mb-3 mt-6">
          {trimmed.slice(4)}
        </h3>
      );
    }
    // Blockquotes
    else if (trimmed.startsWith("> ")) {
      flushList();
      elements.push(
        <blockquote
          key={i}
          className="border-l-4 border-gold pl-6 py-2 my-6 text-xl text-gray-300 italic"
        >
          {trimmed.slice(2)}
        </blockquote>
      );
    }
    // Horizontal rule
    else if (trimmed === "---") {
      flushList();
      elements.push(<hr key={i} className="border-gold/20 my-8" />);
    }
    // Bold text line
    else if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
      flushList();
      elements.push(
        <p key={i} className="text-white font-semibold mb-4">
          {trimmed.slice(2, -2)}
        </p>
      );
    }
    // Unordered list
    else if (trimmed.startsWith("- ")) {
      if (listType !== "ul") {
        flushList();
        listType = "ul";
      }
      currentList.push(trimmed.slice(2).replace(/\*\*(.*?)\*\*/g, "$1"));
    }
    // Ordered list
    else if (/^\d+\.\s/.test(trimmed)) {
      if (listType !== "ol") {
        flushList();
        listType = "ol";
      }
      currentList.push(trimmed.replace(/^\d+\.\s/, "").replace(/\*\*(.*?)\*\*/g, "$1"));
    }
    // Regular paragraph
    else {
      flushList();
      // Handle inline bold
      const parts = trimmed.split(/(\*\*.*?\*\*)/);
      const content = parts.map((part, j) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={j}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });
      elements.push(
        <p key={i} className="text-gray-300 leading-relaxed mb-4">
          {content}
        </p>
      );
    }
  }

  flushList();
  return elements;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  const style = categoryStyles[post.category];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <article className="container-custom max-w-4xl">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-gold transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}
            >
              {categoryLabels[post.category]}
            </span>
          </div>

          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-400">
            <span className="flex items-center gap-2">
              <User size={16} />
              {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              {formatDate(post.date)}
            </span>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-invert prose-gold max-w-none">
          {renderContent(post.content)}
        </div>

        {/* Share / CTA */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-gold/10 to-transparent border border-gold/20">
          <h3 className="font-display text-2xl mb-4">Ready to Get Started?</h3>
          <p className="text-gray-400 mb-6">
            Join the creative entrepreneurs who are building their businesses with HLPFL&apos;s support.
            Zero upfront costs. We earn when you earn.
          </p>
          <Link
            href="/portal"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold hover:bg-gold-light text-void font-semibold rounded-lg transition-colors"
          >
            Apply Now
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl mb-6">More Stories</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="block p-5 rounded-xl bg-void-light border border-gold/10 hover:border-gold/30 transition-all group"
                >
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-medium mb-2 ${
                      categoryStyles[relatedPost.category].bg
                    } ${categoryStyles[relatedPost.category].text}`}
                  >
                    {categoryLabels[relatedPost.category]}
                  </span>
                  <h3 className="font-display text-lg group-hover:text-gold transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-2">
                    {formatDate(relatedPost.date)}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
