import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sandy-light">
      <div className="container-custom">
        <div className="max-w-xl mx-auto text-center">
          {/* Decorative 404 */}
          <div className="mb-8" aria-hidden="true">
            <span
              className="font-display font-bold"
              style={{ fontSize: "8rem", color: "rgba(14, 154, 167, 0.15)", lineHeight: 1 }}
            >
              404
            </span>
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-jungle mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on the trail.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-primary text-center px-8 py-3">
              Return Home
            </Link>
            <Link href="/explore" className="btn-outline text-center px-8 py-3">
              Explore the Coast
            </Link>
          </div>

          <p className="mt-10 text-gray-400 text-sm">
            Cahuita · Puerto Viejo · Playa Cocles · Punta Uva · Manzanillo
          </p>
        </div>
      </div>
    </div>
  );
}
