import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="text-center">
        <div className="font-display text-8xl md:text-[12rem] text-gold/10 leading-none select-none mb-4">404</div>
        <h1 className="font-display text-4xl md:text-5xl text-night tracking-wide mb-4">Page Not Found</h1>
        <p className="text-fog text-base mb-8 max-w-md mx-auto">
          This page doesn&apos;t exist. If you were looking for something specific, head back to the home page.
        </p>
        <Link href="/" className="btn-primary">Back to Home</Link>
      </div>
    </div>
  );
}
