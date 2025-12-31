"use client"

import Link from 'next/link'
import SearchBar from './SearchBar'

export const Header = () => {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between py-6 px-0 md:px-4 mb-8 bg-white shrink-0 gap-4">
      <Link href="/" className="group flex items-center gap-3">
        <div className="flex flex-col">
          <span className="italic font-bold text-xl uppercase">Pondok Lensa</span>
          <span className="text-[10px] text-gray-500 uppercase font-medium">Photo & Video Equipment Rental</span>
        </div>
      </Link>
      <SearchBar />
    </header>
  )
}

export default Header
