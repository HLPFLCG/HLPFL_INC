import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container-custom">
        <div className="max-w-xl mx-auto text-center">
          <div className="mb-8">
            <span className="font-display text-8xl md:text-9xl text-gold/20">404</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-400 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-primary text-center">
              Back to Home
            </Link>
            <Link href="/contact" className="btn-outline text-center">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
