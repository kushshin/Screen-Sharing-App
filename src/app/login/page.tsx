'use client'
import React, { ReactHTMLElement, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useAuth } from '@/Context/AuthContext';
import Button from '@/Components/Button';

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const { setToken } = useAuth()




  const handleLogin = (e: React.ChangeEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setError("Both email and password are required.");
      setEmail("")
      setPassword("")
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      setEmail("")
      setPassword("")
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setEmail("")
      setPassword("")
      return;
    }

    const token = "authToken"
    localStorage.setItem("Token", token)
    setToken(token);
    router.push("/");
  };



  return (
    <div className='min-h-screen flex items-center justify-center text-white px-4'>
      <div className='w-full max-w-md border-2 border-white rounded-2xl p-8 shadow-lg bg-blue-100'>
        <h1 className='text-2xl font-semibold text-center mb-6 text-blue-500'>Login</h1>
        <form className='space-y-6' onSubmit={handleLogin}>
          <div>
            <label className='block mb-1 font-medium text-blue-500'>Email</label>
            <input type="email" value={email} name="email" placeholder='Enter your email' className='w-full border-b border-white py-2 px-1  text-blue-900 outline-none placeholder-gray-400' onChange={(e) => setEmail(e.target.value)} />
          </div>
          <p className='text-red-500'>{error}</p>
          <div>
            <label className='block mb-1 font-medium text-blue-500'>Password</label>
            <input type="password" value={password} name="password" placeholder='Enter your password' className='w-full border-b border-white py-2 px-1  text-blue-900 outline-none placeholder-gray-400' onChange={(e) => setPassword(e.target.value)} />
          </div>
          {/* <p className='text-sm text-center mt-1' onClick={()=>router.push('/register')}>Don't have an account ? <span className='text-blue-400 cursor-pointer'>Register</span></p> */}

          {/* <button className='w-full py-2 px-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors'>Login</button> */}
          <Button>Login</Button>
        </form>
      </div>
    </div>
  )
}

export default Login