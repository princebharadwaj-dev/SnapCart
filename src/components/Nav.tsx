'use client'
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { LogOut, Package, Search, ShoppingCartIcon, User } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import { signOut } from 'next-auth/react'

interface IUser {
    _id?: string
    name: string
    email: string
    password?: string
    mobile?: string
    role: "user" | "deliveryBoy" | "admin"
    image?: string
}

function Nav({ user }: { user: IUser }) {
    const [search, setSearch] = useState("")
    const [open, setOpen] = useState(false)
    const profileDropDown = useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileDropDown.current && !profileDropDown.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <nav className='w-[95%] fixed top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-green-700 rounded-2xl shadow-lg shadow-black/20 flex justify-between items-center h-20 px-4 md:px-8 z-50 backdrop-blur-md'>
            
            {/* Logo */}
            <Link href={"/"} className='text-white font-extrabold text-2xl sm:text-3xl tracking-wide hover:scale-105 transition-transform'>
                Snapcart
            </Link>

            {/* Search Bar */}
            <form onSubmit={(e) => e.preventDefault()} className='hidden md:flex items-center bg-white rounded-full px-4 py-2 w-1/2 max-w-lg shadow-md'>
                <Search className='text-gray-400 w-5 h-5 mr-2' />
                <input 
                    type="text" 
                    placeholder='Search groceries...' 
                    className='w-full outline-none text-gray-700 placeholder-gray-400 text-sm font-medium' 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>

            {/* Right Actions (Cart & Profile) */}
            <div className='flex items-center gap-3 md:gap-5 relative'>
                
                {/* Cart Icon */}
                <Link href={"/cart"} className='relative bg-white/10 hover:bg-white/20 text-white rounded-full w-11 h-11 flex items-center justify-center shadow-md transition'>
                    <ShoppingCartIcon className='w-5 h-5' />
                    <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold shadow'>
                        0
                    </span>
                </Link>

                {/* Profile Dropdown */}
                <div className='relative' ref={profileDropDown}>
                    <div 
                        className='bg-white rounded-full w-11 h-11 flex items-center justify-center overflow-hidden shadow-md hover:scale-105 transition-transform cursor-pointer border-2 border-white/80' 
                        onClick={() => setOpen(prev => !prev)}
                    >
                        {user?.image ? (
                            <Image src={user.image} alt={user.name || 'user'} fill className='object-cover rounded-full' />
                        ) : (
                            <User className='text-gray-600 w-5 h-5' />
                        )}
                    </div>

                    <AnimatePresence>
                        {open && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.2 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                className='absolute right-0 mt-3 w-60 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 z-50 text-gray-700'
                            >
                                {/* User Info Header */}
                                <div className='flex items-center gap-3 px-3 py-2.5 border-b border-gray-100'>
                                    <div className='w-10 h-10 relative rounded-full bg-green-100 flex items-center justify-center overflow-hidden shrink-0'>
                                        {user?.image ? (
                                            <Image src={user.image} alt={user.name || 'user'} fill className='object-cover rounded-full' />
                                        ) : (
                                            <User className='text-green-700 w-5 h-5' />
                                        )}
                                    </div>
                                    <div className='overflow-hidden'>
                                        <div className='text-gray-900 font-bold truncate text-sm'>{user?.name || 'User'}</div>
                                        <div className='text-xs text-green-600 font-semibold capitalize tracking-wider'>{user?.role}</div>
                                    </div>
                                </div>

                                {/* Menu Links */}
                                <div className='py-1'>
                                    {user?.role === "user" && (
                                        <Link 
                                            href={"/user/my-orders"} 
                                            className='flex items-center gap-3 px-3 py-2.5 hover:bg-green-50 rounded-xl text-gray-700 font-medium text-sm transition-colors' 
                                            onClick={() => setOpen(false)}
                                        >
                                            <Package className='w-4 h-4 text-green-600' />
                                            My Orders
                                        </Link>
                                    )}

                                    <button 
                                        className='flex items-center gap-3 w-full text-left px-3 py-2.5 hover:bg-red-50 rounded-xl text-red-600 font-medium text-sm transition-colors mt-1' 
                                        onClick={() => {
                                            setOpen(false)
                                            signOut({ callbackUrl: "/login" })
                                        }}
                                    >
                                        <LogOut className='w-4 h-4' />
                                        Log Out
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </nav>
    )
}

export default Nav