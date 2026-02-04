"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Heart,
  ExternalLink,
  X,
  Plus,
  Minus,
  CreditCard,
  Sparkles,
  Gift,
  Truck,
} from "lucide-react";
import { Button, Card, ScrollReveal } from "@/components/ui";
import { TiltHover, GlowHover } from "@/components/animations";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stripeLink?: string;
  badge?: string;
}

const products: Product[] = [
  {
    id: "hlpfl-tee",
    name: "HLPFL Logo Tee",
    description: "Premium cotton tee with embroidered HLPFL logo. 100% proceeds support creators.",
    price: 35,
    image: "/images/store/tee.jpg",
    category: "Apparel",
    stripeLink: "https://buy.stripe.com/test_hlpfl_tee",
    badge: "Best Seller",
  },
  {
    id: "creator-hoodie",
    name: "Creator Hoodie",
    description: "Heavyweight hoodie with 'Empowering Creative Entrepreneurs' print.",
    price: 65,
    image: "/images/store/hoodie.jpg",
    category: "Apparel",
    stripeLink: "https://buy.stripe.com/test_creator_hoodie",
  },
  {
    id: "notebook",
    name: "Creator's Notebook",
    description: "Premium leather-bound notebook for ideas, sketches, and business plans.",
    price: 28,
    image: "/images/store/notebook.jpg",
    category: "Accessories",
    stripeLink: "https://buy.stripe.com/test_notebook",
  },
  {
    id: "cap",
    name: "HLPFL Cap",
    description: "Embroidered cap with gold HLPFL logo. Adjustable fit.",
    price: 32,
    image: "/images/store/cap.jpg",
    category: "Apparel",
    stripeLink: "https://buy.stripe.com/test_cap",
    badge: "New",
  },
  {
    id: "creator-kit",
    name: "Creator Starter Kit",
    description: "Everything you need: tee, notebook, stickers, and welcome guide.",
    price: 75,
    image: "/images/store/kit.jpg",
    category: "Bundles",
    stripeLink: "https://buy.stripe.com/test_kit",
    badge: "Value Pack",
  },
  {
    id: "sticker-pack",
    name: "Sticker Pack",
    description: "Set of 10 premium vinyl stickers with HLPFL designs.",
    price: 12,
    image: "/images/store/stickers.jpg",
    category: "Accessories",
    stripeLink: "https://buy.stripe.com/test_stickers",
  },
];

const features = [
  {
    icon: Heart,
    title: "100% to Mission",
    description: "All profits support creative entrepreneurs",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $50",
  },
  {
    icon: Gift,
    title: "Premium Quality",
    description: "Ethically sourced materials",
  },
];

interface CartItem extends Product {
  quantity: number;
}

export default function StorePage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    // For now, redirect to Stripe payment link for the first item
    // In production, you'd create a checkout session with all items
    if (cart.length > 0 && cart[0].stripeLink) {
      window.open(cart[0].stripeLink, "_blank");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section pt-24 md:pt-32 pb-8">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <span className="text-gold uppercase tracking-widest text-sm mb-4 block">
                Official Store
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
                Wear the <span className="text-gradient">Mission</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-gray-400 text-lg mb-8">
                100% of profits support creative entrepreneurs. Look good while doing good.
              </p>
            </ScrollReveal>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {features.map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 0.1}>
                <Card variant="bordered" className="text-center">
                  <div className="p-3 rounded-lg bg-gold/10 text-gold w-fit mx-auto mb-3">
                    <feature.icon size={24} />
                  </div>
                  <h3 className="font-display text-lg mb-1">{feature.title}</h3>
                  <p className="text-gray-500 text-sm">{feature.description}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-y border-gold/10 bg-void-light sticky top-16 z-30">
        <div className="container-custom">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-gold text-void font-medium"
                    : "bg-void border border-gold/20 text-gray-400 hover:border-gold/50 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section">
        <div className="container-custom">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <TiltHover>
                    <Card
                      variant="bordered"
                      padding="none"
                      hover
                      className="group overflow-hidden"
                    >
                      {/* Product Image Placeholder */}
                      <div className="relative aspect-square bg-void-lighter overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <ShoppingBag size={48} className="text-gold/20" />
                        </div>

                        {/* Badge */}
                        {product.badge && (
                          <div className="absolute top-4 left-4 px-3 py-1 bg-gold text-void text-xs font-bold rounded-full flex items-center gap-1">
                            <Sparkles size={12} />
                            {product.badge}
                          </div>
                        )}

                        {/* Hover overlay */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6"
                          initial={false}
                        >
                          <Button
                            onClick={() => addToCart(product)}
                            size="sm"
                            className="transform translate-y-4 group-hover:translate-y-0 transition-transform"
                          >
                            Add to Cart
                          </Button>
                        </motion.div>
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <p className="text-gold text-xs uppercase tracking-wider mb-1">
                          {product.category}
                        </p>
                        <h3 className="font-display text-xl mb-2 group-hover:text-gold transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="font-display text-2xl text-gold">
                            ${product.price}
                          </span>
                          <button
                            onClick={() => addToCart(product)}
                            className="p-2 rounded-lg bg-gold/10 text-gold hover:bg-gold hover:text-void transition-all"
                          >
                            <Plus size={20} />
                          </button>
                        </div>
                      </div>
                    </Card>
                  </TiltHover>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Cart Button (Fixed) */}
      <motion.button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-8 right-8 z-40 p-4 bg-gold text-void rounded-full shadow-lg shadow-gold/25 hover:bg-gold-light transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ShoppingBag size={24} />
        {cartCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
          >
            {cartCount}
          </motion.span>
        )}
      </motion.button>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-void/80 backdrop-blur-sm z-50"
              onClick={() => setIsCartOpen(false)}
            />

            {/* Cart Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-void-light border-l border-gold/20 z-50 flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-gold/10 flex items-center justify-between">
                <h2 className="font-display text-2xl">Your Cart</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-void-lighter rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag size={48} className="text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500">Your cart is empty</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      onClick={() => setIsCartOpen(false)}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex gap-4 p-4 bg-void rounded-xl"
                      >
                        <div className="w-20 h-20 bg-void-lighter rounded-lg flex items-center justify-center flex-shrink-0">
                          <ShoppingBag size={24} className="text-gold/30" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{item.name}</h3>
                          <p className="text-gold">${item.price}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 hover:bg-void-lighter rounded"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 hover:bg-void-lighter rounded"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-display text-lg">
                            ${item.price * item.quantity}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-gold/10 space-y-4">
                  <div className="flex items-center justify-between text-lg">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="font-display text-2xl text-gold">
                      ${cartTotal}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">
                    Shipping calculated at checkout
                  </p>
                  <Button
                    fullWidth
                    size="lg"
                    onClick={handleCheckout}
                    className="group"
                  >
                    <CreditCard size={20} />
                    Checkout with Stripe
                    <ExternalLink
                      size={16}
                      className="ml-1 opacity-50 group-hover:opacity-100"
                    />
                  </Button>
                  <p className="text-center text-gray-500 text-xs">
                    Secure checkout powered by Stripe
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
