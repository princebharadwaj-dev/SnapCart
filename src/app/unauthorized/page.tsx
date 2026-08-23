'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { ShieldAlert, Home, ArrowLeft, Lock } from 'lucide-react'
import Link from 'next/link'

export default function AccessDenied() {
  return (
    <div className="relative w-full h-screen bg-gray-950 text-white flex items-center justify-center px-4 overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[140px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-md w-full text-center bg-gray-900/60 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl shadow-black"
      >
        {/* Glowing Lock Icon */}
        <div className="relative w-20 h-20 mx-auto mb-6 bg-red-500/10 border border-red-500/20 rounded-3xl flex items-center justify-center text-red-400 shadow-lg shadow-red-500/10">
          <Lock className="w-10 h-10 animate-pulse" />
          <div className="absolute -top-1 -right-1 bg-red-500 text-gray-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
            403
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-3">
          Access Restricted
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8">
          Oops! It looks like you don't have the necessary permissions to view this page or access this delivery zone.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
          <Link 
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-gray-950 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-emerald-500/20"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>

          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white px-6 py-3.5 rounded-2xl font-semibold text-sm transition-all border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

        {/* Footer Support Info */}
        <div className="mt-8 pt-6 border-t border-white/10 text-xs text-gray-500">
          If you think this is a mistake, please contact our <span className="text-emerald-400 underline cursor-pointer">Support Team</span>.
        </div>
      </motion.div>

    </div>
  )
}