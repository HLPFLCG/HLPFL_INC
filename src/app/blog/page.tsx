import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, User, Tag } from "lucide-react";
import { getAllPosts, getFeaturedPosts, formatDate, type BlogPost } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "News, case studies, and insights from HLPFL INC. Learn how we're empowering creative entrepreneurs and read success stories from our community.",
  keywords: [
    "creative entrepreneur blog",
    "nonprofit news",
    "artist success stories",
    "creator economy insights",
    "HLPFL news",
  ],
};

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

function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const style = categoryStyles[post.category];

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <article
        className={`p-6 rounded-xl bg-void-light border border-gold/10 hover:border-gold/30 transition-all duration-300 h-full ${
          featured ? "lg:p-8" : ""
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}
          >
            {categoryLabels[post.category]}
          </span>
          <span className="text-gray-500 text-sm flex items-center gap-1">
            <Calendar size={14} />
            {formatDate(post.date)}
          </span>
        </div>

        <h2
          className={`font-display mb-3 group-hover:text-gold transition-colors ${
            featured ? "text-2xl lg:text-3xl" : "text-xl"
          }`}
        >
          {post.title}
        </h2>

        <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>

        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-sm flex items-center gap-1">
            <User size={14} />
            {post.author}
          </span>
          <span className="text-gold flex items-center gap-1 group-hover:gap-2 transition-all">
            Read more
            <ArrowRight size={16} />
          </span>
        </div>
      </article>
    </Link>
  );
}

export default function BlogPage() {
  const allPosts = getAllPosts();
  const featuredPosts = getFeaturedPosts();
  const regularPosts = allPosts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-widest text-sm mb-4 block">
            Blog & News
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
            Stories & <span className="text-gradient">Insights</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            News, case studies, and resources for creative entrepreneurs.
            Learn from our community and stay updated on HLPFL initiatives.
          </p>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="font-display text-2xl mb-6 flex items-center gap-2">
              <Tag className="text-gold" size={24} />
              Featured Stories
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} featured />
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section>
          <h2 className="font-display text-2xl mb-6">All Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="mt-16 p-8 lg:p-12 rounded-2xl bg-gradient-to-br from-gold/10 to-transparent border border-gold/20 text-center">
          <h2 className="font-display text-2xl lg:text-3xl mb-4">
            Stay in the Loop
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Get the latest news, case studies, and resources for creative
            entrepreneurs delivered to your inbox.
          </p>
          <Link
            href="/newsletter"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold hover:bg-gold-light text-void font-semibold rounded-lg transition-colors"
          >
            Subscribe to Newsletter
            <ArrowRight size={18} />
          </Link>
        </section>
      </div>
    </div>
  );
}
