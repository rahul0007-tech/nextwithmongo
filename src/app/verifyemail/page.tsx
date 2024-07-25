'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function VerifyEmailPage() {

    // const router= useRouter  //paxi next maa url token nikalna use garna ko lagi import garko
    
    const [token, setToken]=useState("")
    const[verified, setVerified]=useState(false)
    const[error, setError]=useState(false)

    const verifyUserEmail = async ()=>{
try {
            await axios.post("/api/users/verifyemail",{token})
            setVerified(true)
} catch (error:any) {
    setError(true)
    console.log(error.response.data)
    
}
    }

    useEffect(()=>{
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken||"")
    }, [])

    // const {query}:any=router      //mathui ko useEffect baata token nikalnu vada nextjs maa yo approach ramro maninxa but use gareko xaina kin ki malai thaa xaina 
    // const urlTokenTwo=query.token

    useEffect(()=>{
        if (token.length>0){
            verifyUserEmail()
        }
    }), [token]

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1 className='text-4xl'>Verify Email</h1>
        <h2 className='p-2 bg-orange-500 text-black'>{token?`${token}`:"No Token"}</h2>
        
        {verified && (
            <div>
                <h2>Verified</h2>
                <Link href='/login'>Login</Link>
            </div>
        )}

        {error &&(
            <div>
                <h2>Error</h2>
            </div>
        )}

    </div>
  )
}
