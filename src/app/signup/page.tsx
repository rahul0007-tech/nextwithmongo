'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Signuppage() {
  const router = useRouter()
  const [user, setUser]=useState({    //state maa json oject banako user vanni
    username:"",
    email:"",
    password:""
  })

  const [buttonDisabled, setButtonDisabled]=useState(false)  //buttonDisbled ko value false set gareko

  const [loading, setLoading]=useState(false)

  const onSignup = async()=>{

    try {
      setLoading(true)
      const response= await axios.post("/api/users/signup", user)  //axios library le kun server ko kun method maa jani paila path liyo ani user naam ko sate mathi bannako baata data lera tya insert garyo
      console.log("Sign Up Success", response.data)
      router.push('/login')

    } catch (error:any) {
      console.log("failed to signup")
      toast.error(error.message)      
    }
  }

  useEffect(()=>{
    if (user.username.length>0 && user.email.length>0 && user.password.length>0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }

  },[user])  //user state maa kunai pani chnage huna bittikai use Effect le monitor and work garna ko lagi [user] rakheko



  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "processing":"Signup"}</h1>
      <hr />
      {/* <label htmlFor='username'>username</label> */}
      <input 
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
      id='username'
      value={user.username}
      onChange={(e)=> setUser({...user, username:e.target.value})}  //spread opearator baata e.target.value le perticular thau maa value set garxa
      placeholder='username'
      type='text'
      />
            <input 
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
      id='email'
      value={user.email}
      onChange={(e)=> setUser({...user, email:e.target.value})}
      placeholder='email'
      type='text'
      />
            <input 
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
      id='password'
      value={user.password}
      onChange={(e)=> setUser({...user, password:e.target.value})}
      placeholder='password'
      type='password'
      />

      <button className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
      
      onClick={onSignup}
      
      >
        {buttonDisabled?"Fill the Form":"Signup"}
      </button>

      <Link href='/login'>Visit login page</Link>

    </div>
  )
}