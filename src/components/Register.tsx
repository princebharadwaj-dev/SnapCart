"use client"
import { ArrowLeft, Leaf, User, Mail, Lock, ArrowRight, EyeOff, EyeIcon, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { motion } from "motion/react"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

type propType = {
    previousStep: (s: number) => void
    nextStep?: (s: number) => void // Agar aage ke step par bhejna ho toh
}

function RegisterForm({ previousStep, nextStep }: propType) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setshowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    // Check if all fields are filled
    const isFormValid = name.trim() !== "" && email.trim() !== "" && password.trim() !== ""
     
  const handleSubmit=async (e:React.FormEvent)=>{
        e.preventDefault()
        setLoading(true)
        try {
            const result=await axios.post("/api/auth/register",{
                name,email,password
            })
            router.push("/login")
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    
   
    return (
        <div className='flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-gradient-to-b from-green-50/50 via-white to-orange-50/30 relative overflow-hidden'>
          
          {/* Background Ambient Blobs */}
          <div className="absolute top-10 right-10 w-72 h-72 bg-green-200/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl pointer-events-none" />

          {/* Back Button */}
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className='absolute top-6 left-6 flex items-center gap-2 text-gray-700 hover:text-green-700 transition-colors cursor-pointer bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm border border-gray-100' 
            onClick={() => previousStep(1)}
          >
            <ArrowLeft className='w-4 h-4'  />
            <span className='font-medium text-sm'>Back</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ y: -15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className='text-3xl md:text-4xl font-black text-gray-900 tracking-tight text-center mb-2'
          >
            Create Account
          </motion.h1>

          {/* Subtitle */}
          <motion.div 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className='text-gray-600 mb-8 flex items-center gap-1.5 font-medium text-sm md:text-base'
          >
            <span>Join Snapcart Today</span> 
            <Leaf className='h-4 w-4 text-green-600' />
          </motion.div>

          {/* Form Card */}
          <motion.form
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            onSubmit={handleSubmit}
            className='flex flex-col gap-4 w-full max-w-md bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-green-100/50 z-10'
          >
            {/* Name Field */}
            <div className='flex flex-col gap-1.5 text-left'>
              <label className='text-xs font-semibold text-gray-600 uppercase tracking-wider'>Full Name</label>
              <div className='relative'>
                <User className='absolute left-3.5 top-3.5 w-5 h-5 text-gray-400' />
                <input 
                  type='text' 
                  placeholder='John Doe' 
                  className='w-full bg-gray-50/50 border border-gray-200 rounded-2xl py-3 pl-11 pr-4 text-gray-800 text-sm focus:bg-white focus:ring-2 focus:ring-green-500 focus:outline-none transition-all' 
                  onChange={(e) => setName(e.target.value)} 
                  value={name}
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className='flex flex-col gap-1.5 text-left'>
              <label className='text-xs font-semibold text-gray-600 uppercase tracking-wider'>Email Address</label>
              <div className='relative'>
                <Mail className='absolute left-3.5 top-3.5 w-5 h-5 text-gray-400' />
                <input 
                  type='email' 
                  placeholder='john@example.com' 
                  className='w-full bg-gray-50/50 border border-gray-200 rounded-2xl py-3 pl-11 pr-4 text-gray-800 text-sm focus:bg-white focus:ring-2 focus:ring-green-500 focus:outline-none transition-all' 
                  onChange={(e) => setEmail(e.target.value)} 
                  value={email}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className='flex flex-col gap-1.5 text-left'>
              <label className='text-xs font-semibold text-gray-600 uppercase tracking-wider'>Password</label>
              <div className='relative'>
                <Lock className='absolute left-3.5 top-3.5 w-5 h-5 text-gray-400' />
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder='••••••••' 
                  className='w-full bg-gray-50/50 border border-gray-200 rounded-2xl py-3 pl-11 pr-4 text-gray-800 text-sm focus:bg-white focus:ring-2 focus:ring-green-500 focus:outline-none transition-all' 
                  onChange={(e) => setPassword(e.target.value)} 
                  value={password}
                  required
                />
                {
                  showPassword ? 
                  <EyeOff onClick={() => setshowPassword(false)} className='absolute right-3 top-3.5 w-5 h-5 text-gray-500 cursor-pointer' /> : 
                  <EyeIcon onClick={() => setshowPassword(true)} className='absolute right-3 top-3.5 w-5 h-5 text-gray-500 cursor-pointer' />
                }
              </div>
            </div>

            {/* Submit Button with Loading State */}
            <motion.button
              whileHover={isFormValid && !loading ? { scale: 1.02 } : {}}
              whileTap={isFormValid && !loading ? { scale: 0.98 } : {}}
              type='submit'
              disabled={!isFormValid || loading}
              className={`inline-flex items-center justify-center gap-2 font-semibold py-3.5 px-6 rounded-2xl shadow-lg transition-all duration-200 mt-2 text-base ${
                isFormValid 
                  ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-green-600/25 cursor-pointer' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className='w-5 h-5 animate-spin' />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <ArrowRight className='w-5 h-5' />
                </>
              )}
            </motion.button>

            {/* Divider */}
            <div className="flex items-center my-2">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="px-3 text-gray-400 text-xs uppercase font-medium">Or</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Continue with Google Button */}
            <button
              type='button'
              onClick={() =>signIn("google")}
              className='w-full flex items-center justify-center gap-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-2xl shadow-sm transition-all cursor-pointer text-sm'
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.18v3.14C3.15 21.32 7.22 24 12 24z"/>
                <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.62H1.18C.43 8.12 0 9.8 0 12s.43 3.88 1.18 5.38l4.09-3.14z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.22 0 3.15 2.68 1.18 6.62l4.09 3.14c.95-2.85 3.6-4.96 6.73-4.96z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Already have an account */}
            <div className='text-center mt-3 text-sm text-gray-600'>
              Already have an account?{' '}
              <span 
                onClick={() => router.push("/login")}
                className='text-green-600 font-semibold hover:underline cursor-pointer'
              >
                Sign in
              </span>
            </div>

          </motion.form>
        </div>
    )
}

export default RegisterForm