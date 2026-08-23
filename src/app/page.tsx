
import { auth } from '@/auth'
import AdminDashboard from '@/components/AdminDashboard'
import Delivery from '@/components/Delivery'
import EditRoleMobile from '@/components/EditRoleMobile'
import Nav from '@/components/Nav'
import UserDashboard from '@/components/UserDashboard'
import connectDb from '@/lib/db'
import User from '@/models/userModel'
import { redirect } from 'next/navigation'

import React from 'react'

async function Home() {

  await connectDb()
  const session = await auth()
  const user = await User.findById(session?.user?.id)
  if(!user) {
    redirect('/login')
  }

  const inComplete = !user.mobile || !user.role || (!user.mobile && user.role == "User")

  if(inComplete) {
    return <EditRoleMobile />
  }

  const plainUser = JSON.parse(JSON.stringify(user))
  return (
    <div>
      <Nav user = {plainUser}/>

      {user.role == "User"?(
        <UserDashboard />
      ):user.role == "Admin"? (
        <AdminDashboard /> 
      ):<Delivery />}
    </div>
  )
}

export default Home
