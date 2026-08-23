'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Clock, ShoppingCart, ArrowRight, ShieldCheck, Bike } from 'lucide-react'

// 1. 10-Min Quick Commerce Specific Slides & HD Images
const heroSlides = [
  {
    id: 1,
    title: "Groceries Delivered in 10 Minutes",
    subtitle: "From fresh farm vegetables to daily dairy & snacks — everything you need, right at your doorstep in a flash.",
    cta: "Order Now",
    badge: "⚡ Superfast 10-Min Delivery",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    // Fresh grocery delivery / basket image
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Lightning Fast Delivery Partners",
    subtitle: "Our riders zoom through traffic to bring your essentials before you even start cooking.",
    cta: "Start Shopping",
    badge: "🚀 Live Order Tracking",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    // Delivery rider / fast logistics image
    image: "https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "100% Freshness & Quality Guaranteed",
    subtitle: "Handpicked fresh fruits, crisp veggies, and top-tier brands packed with utmost hygiene.",
    cta: "Explore Store",
    badge: "🌿 Farm Fresh Daily",
    color: "text-sky-400",
    bgColor: "bg-sky-500/10",
    // Fresh vegetables close up
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=1600&auto=format&fit=crop"
  },
]

export default function QuickCommerceHero() {
  const [current, setCurrent] = useState(0)
  const slideDuration = 5000 // 5 seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length)
    }, slideDuration)
    return () => clearInterval(timer)
  }, [])

  const currentSlide = heroSlides[current]

  return (
    // Full screen height experience (h-[90vh] to h-screen range)
    <section className="relative w-full h-[92vh] min-h-[650px] bg-gray-950 text-white overflow-hidden flex items-center">
      
      {/* Background Images with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            className="w-full h-full object-cover object-center filter brightness-[0.55] contrast-[1.05]"
          />
          {/* Dark Gradient Overlay for high-end modern dark look */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-8 lg:col-span-7 flex flex-col items-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-start"
              >
                {/* Dynamic Quick Badge */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${currentSlide.color} ${currentSlide.bgColor} mb-6 backdrop-blur-md border border-white/10 shadow-lg`}>
                  <Zap className="w-4 h-4 fill-current animate-pulse" />
                  <span>{currentSlide.badge}</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6 drop-shadow-md">
                  {currentSlide.title}
                </h1>

                {/* Subtitle */}
                <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl font-normal leading-relaxed">
                  {currentSlide.subtitle}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-gray-950 px-8 py-4 rounded-2xl font-black text-lg shadow-xl shadow-emerald-500/20 transition-all"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {currentSlide.cta}
                  </motion.button>
                  
                  <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white font-medium text-base">
                    <Clock className="w-5 h-5 text-amber-400 animate-spin-slow" />
                    <span>Avg delivery in <strong>9 mins</strong></span>
                  </div>
                </div>

                {/* Trust Badges Footer inside Hero */}
                <div className="grid grid-cols-3 gap-6 mt-14 pt-8 border-t border-white/10 w-full max-w-xl">
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <Bike className="w-5 h-5 text-emerald-400" />
                    <span>No Surge Fee</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <ShieldCheck className="w-5 h-5 text-amber-400" />
                    <span>Quality Checked</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <Zap className="w-5 h-5 text-sky-400" />
                    <span>Superfast Apps</span>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Slide Indicators on Bottom Right */}
      <div className='absolute bottom-8 right-8 z-20 flex gap-3 bg-black/40 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10'>
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              current === index 
                ? "bg-emerald-400 w-8" 
                : "bg-white/40 w-2.5 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </section>
  )
}