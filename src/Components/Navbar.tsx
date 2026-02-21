"use client"
import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/Context/AuthContext"
import { IoClose } from "react-icons/io5"
import { GiHamburgerMenu } from "react-icons/gi"

function Navbar() {
  const { token, setToken } = useAuth()
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("Token")
    setToken(null)
    router.replace("/")
    setOpen(false)
  }

  return (
    <div>
      {/* Top Navbar */}
      <div className="h-20 flex px-6 md:px-32 justify-between items-center bg-blue-200 text-black">
        {/* Logo Section */}
        <div className="flex  justify-between gap-40 ">
          <div className="flex items-center gap-2">
          <img src="/imgs/SS2.png" alt="logo" className="w-[90px] h-[80px]" />
          <img src="/imgs/share1.png" alt="logo-text" className="w-[150px] h-[65px]" />
          </div>
          {/* Mobile Toggle Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-[24px] text-blue-600  cursor-pointer"
          >
            {open ? <IoClose /> : <GiHamburgerMenu />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center text-blue-600 text-[18px] font-semibold">
          <Link href="/">Home</Link>

          {token ? (
            
            <button onClick={handleLogout} className="cursor-pointer">
              Logout
            </button>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden text-center transition-all duration-300 bg-blue-100 ${
          open ? "max-h-40 py-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-4 px-6 text-blue-600 font-semibold">
          <Link href="/" onClick={() => setOpen(false)}>
            Home
          </Link>

          {token ? (
            <div className="text-center cursor-pointer">

            <button onClick={handleLogout} className="text-left">
              Logout
            </button>
            </div>
          ) : (
            <Link href="/login" onClick={() => setOpen(false)} className="cursor-pointer">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar