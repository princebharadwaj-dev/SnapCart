'use client'
import React, { useState } from 'react'
import { motion } from "motion/react"
import { ArrowRight, Bike, User, UserCog, CheckCircle2, PhoneCall } from 'lucide-react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'


function EditRoleMobile() {
  const [roles] = useState([
    { id: "Admin", label: "Admin", icon: UserCog, desc: "Manage system & dashboard" },
    { id: "User", label: "User", icon: User, desc: "Explore & place orders" },
    { id: "Delivery Boy", label: "Delivery Boy", icon: Bike, desc: "Deliver orders swiftly" }
  ])
  const [selectedRole, setSelectedRole] = useState("")
  const [mobile, setMobile] = useState("")
  const [loading, setLoading] = useState(false)
  const { update } = useSession()
  const router = useRouter()

  const handleEdit = async () => {
    try {
      setLoading(true)
      await axios.post("/api/user/edit-role-mobile", {
        role: selectedRole,
        mobile
      })
      await update({ role: selectedRole })
      router.push("/")
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = mobile.length === 10 && selectedRole

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 via-white to-green-50/30 p-6 w-full'>
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='text-center max-w-lg mb-8'
      >
        <span className='px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 tracking-wide uppercase'>
          Account Setup
        </span>
        <h1 className='text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mt-3'>
          Select Your <span className='text-green-600'>Role</span>
        </h1>
        <p className='text-gray-500 text-sm md:text-base mt-2'>
          Choose how you'd like to experience the platform and verify your contact details.
        </p>
      </motion.div>

      {/* Role Selection Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl w-full mt-4'>
        {roles.map((role) => {
          const Icon = role.icon
          const isSelected = selectedRole === role.id
          return (
            <motion.div
              key={role.id}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedRole(role.id)}
              className={`relative flex flex-col items-center text-center p-6 rounded-3xl border-2 transition-all cursor-pointer backdrop-blur-sm ${
                isSelected
                  ? "border-green-600 bg-green-50/80 shadow-xl shadow-green-600/10"
                  : "border-gray-200/80 bg-white/80 hover:border-green-300 hover:shadow-md"
              }`}
            >
              {isSelected && (
                <span className='absolute top-3 right-3 text-green-600'>
                  <CheckCircle2 size={20} />
                </span>
              )}
              <div className={`p-4 rounded-2xl mb-4 transition-colors ${isSelected ? "bg-green-600 text-white shadow-md shadow-green-600/30" : "bg-gray-100 text-gray-600"}`}>
                <Icon size={28} />
              </div>
              <h3 className='font-bold text-gray-900 text-lg'>{role.label}</h3>
              <p className='text-xs text-gray-500 mt-1 leading-relaxed'>{role.desc}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Mobile Input Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className='flex flex-col items-center mt-10 w-full max-w-xs'
      >
        <label htmlFor="mobile" className='text-gray-700 text-sm font-semibold mb-2 self-start flex items-center gap-1.5'>
          <PhoneCall size={15} className="text-green-600" />
          Mobile Number
        </label>
        <div className='relative w-full'>
          <span className='absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 font-medium text-sm'>
            +91
          </span>
          <input 
            type="tel" 
            id='mobile' 
            maxLength={10}
            className='w-full pl-14 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-white/80 focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none text-gray-800 font-medium tracking-wide shadow-sm transition-all' 
            placeholder='9876543210'
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
          />
        </div>
        <span className='text-xs text-gray-400 mt-1.5 self-end'>
          {mobile.length}/10 digits
        </span>
      </motion.div>

      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className='mt-8'
      >
        <button
          disabled={!isFormValid || loading}
          className={`inline-flex items-center justify-center gap-3 font-semibold py-4 px-10 rounded-2xl shadow-lg transition-all duration-300 w-64 md:w-72 ${
            isFormValid && !loading
              ? "bg-green-600 hover:bg-green-700 text-white shadow-green-600/25 hover:scale-[1.02] active:scale-[0.98]"
              : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
          }`}
          onClick={handleEdit}
        >
          {loading ? (
            <span className='flex items-center gap-2'>
              <span className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
              Updating...
            </span>
          ) : (
            <>
              <span>Continue to Home</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </motion.div>
    </div>
  )
}

export default EditRoleMobile 