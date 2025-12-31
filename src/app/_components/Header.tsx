"use client"

import Link from 'next/link'
import { Suspense } from 'react'
import SearchBar from './SearchBar'

export const Header = () => {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between py-6 px-0 md:px-4 mb-8 bg-white shrink-0 gap-4">
      <Link href="/" className="group flex items-center gap-3">
        <div className="flex flex-col">
          <span className="font-serif italic font-bold text-xl uppercase tracking-wider group-hover:opacity-80 transition-opacity text-black">Pondok Lensa</span>
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">Photo & Video Equipment Rental</span>
        </div>
      </Link>

      <Suspense fallback={<div className="w-96 h-10 bg-gray-100 rounded-full animate-pulse" />}>
        <SearchBar />
      </Suspense>
    </header>
  )
}

export default Header
