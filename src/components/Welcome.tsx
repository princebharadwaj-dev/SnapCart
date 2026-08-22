"use client"
import React from 'react'
import { motion } from "motion/react"
import { ArrowRight, Bike, ShoppingBasket, Sparkles, ShieldCheck, Clock } from 'lucide-react'

type propType = {
  nextStep: (s: number) => void
}

function Welcome({ nextStep }: propType) {
  return (
    <div className='relative flex flex-col items-center justify-center min-h-screen text-center p-6 bg-gradient-to-b from-green-50/50 via-white to-orange-50/30 overflow-hidden'>
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-green-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Header / Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className='flex items-center gap-3 z-10'
      >
        <div className='p-3 bg-green-100 rounded-2xl shadow-inner'>
          <ShoppingBasket className='w-10 h-10 text-green-600' />
        </div>
        <h1 className='text-4xl md:text-5xl font-black text-gray-900 tracking-tight'>
          Snap<span className='text-green-600'>cart</span>
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className='mt-4 text-gray-600 text-lg md:text-xl max-w-xl font-medium z-10 leading-relaxed'
      >
        Your one-stop destination for fresh groceries, organic products, and daily essentials delivered right to your doorstep.
      </motion.p>

      {/* Hero Icons Graphic */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        className='flex items-center justify-center gap-6 md:gap-12 mt-10 z-10'
      >
        <div className='p-6 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-green-100/50 hover:scale-105 transition-transform'>
          <ShoppingBasket className='w-20 h-20 md:w-28 md:h-28 text-green-600 drop-shadow-sm' />
        </div>
        
        <motion.div 
          animate={{ x: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className='text-green-600 font-bold text-2xl'
        >
          →
        </motion.div>

        <div className='p-6 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-orange-100/50 hover:scale-105 transition-transform'>
          <Bike className='w-20 h-20 md:w-28 md:h-28 text-orange-500 drop-shadow-sm' />
        </div>
      </motion.div>

      {/* Feature Badges (Naya Addition) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        className='flex flex-wrap items-center justify-center gap-4 mt-8 z-10 text-sm text-gray-600 font-medium'
      >
        <div className='flex items-center gap-1.5 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100'>
          <Clock className='w-4 h-4 text-green-600' />
          <span>Fast Delivery</span>
        </div>
        <div className='flex items-center gap-1.5 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100'>
          <ShieldCheck className='w-4 h-4 text-green-600' />
          <span>100% Organic</span>
        </div>
        <div className='flex items-center gap-1.5 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100'>
          <Sparkles className='w-4 h-4 text-orange-500' />
          <span>Best Prices</span>
        </div>
      </motion.div>

      {/* Next Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className='inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-4 px-10 rounded-2xl shadow-lg shadow-green-600/25 transition-all duration-200 mt-10 z-10 cursor-pointer text-lg'
        onClick={() => nextStep(2)} 
      >
        <span>Get Started</span>
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    </div>
  )
}

export default Welcome