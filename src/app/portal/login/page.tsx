"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Sparkles, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await login(email, password);

    if (result.success) {
      router.push("/portal");
    } else {
      setError(result.error || "Login failed");
    }

    setIsLoading(false);
  };

  const fillDemoCredentials = () => {
    setEmail("demo@hlpfl.org");
    setPassword("demo123");
    setError("");
  };

  return (
    <div className="min-h-screen bg-void flex items-center justify-center px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="font-display text-4xl tracking-wider">
              HLPFL<span className="text-gold">.</span>
            </span>
          </Link>
          <p className="text-gray-400 mt-2">Creative Entrepreneur Portal</p>
        </div>

        {/* Demo Banner */}
        <motion.button
          onClick={fillDemoCredentials}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mb-6 p-4 rounded-xl bg-gold/10 border border-gold/30 hover:border-gold/50 transition-all group"
        >
          <div className="flex items-center justify-center gap-2 text-gold">
            <Sparkles size={18} />
            <span className="font-medium">Try Demo Mode</span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Click to fill: demo@hlpfl.org / demo123
          </p>
        </motion.button>

        {/* Login Card */}
        <div className="bg-void-light border border-gold/20 rounded-2xl p-8">
          <h1 className="font-display text-2xl text-center mb-6">Sign In</h1>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-3"
            >
              <AlertCircle size={20} className="text-red-500 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-400 mb-2"
              >
                Email
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-void border border-gold/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm text-gray-400 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-void border border-gold/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading || authLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gold hover:bg-gold-light text-void font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-void/30 border-t-void rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gold/20" />
            <span className="text-gray-500 text-sm">or</span>
            <div className="flex-1 h-px bg-gold/20" />
          </div>

          {/* Back to Home */}
          <Link
            href="/"
            className="block text-center text-gray-400 hover:text-gold transition-colors text-sm"
          >
            ← Back to Homepage
          </Link>
        </div>

        {/* Footer Text */}
        <p className="text-center text-gray-500 text-sm mt-6">
          No account yet?{" "}
          <Link href="/contact" className="text-gold hover:underline">
            Apply to join
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
