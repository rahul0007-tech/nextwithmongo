'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import Link from 'next/link'

export default function Profilepage() {
  const router = useRouter()
  const [data,setData]=useState("nothing")

  const getUserDetails= async ()=>{
try {
      const res = await axios.post("api/users/me")
      setData(res.data.data._id)
} catch (error:any) {
  console.log(error.message)
  toast.error(error.message) 
}
  }


  const logout = async()=>{
try {
      await axios.get("api/users/logout")
      toast.success("Logout success")
      router.push("/login")
} catch (error:any) {
  console.log(error.message)
  toast.error(error.message)
  
}
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
    <h1>Profile page</h1>
    <hr/>
    <h2>{data==="nothing"?"noting":<Link href={`/profile${data}`}>{data}</Link>}</h2>
    <hr/>
    <button className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 rounded' onClick={logout}>logout</button>
    <button className='bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 rounded' onClick={getUserDetails}>Get User Details</button>
    </div>
  )
}
