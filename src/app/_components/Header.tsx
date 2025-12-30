"use client"

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, Suspense, useEffect, useTransition } from 'react'

const SearchBar = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialSearch = searchParams?.get('search') || ''
  const [search, setSearch] = useState(initialSearch)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search !== initialSearch) {
        startTransition(() => {
          if (!search.trim()) {
            router.push('/')
          } else {
            router.push(`/?search=${encodeURIComponent(search)}`)
          }
        })
      }
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [search, router, initialSearch])

  return (
    <div className="relative w-full md:w-96">
      <input
        type="text"
        placeholder="Cari Disini..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-300 rounded-full py-2.5 pl-5 pr-20 text-sm outline-none focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B] transition-all bg-gray-50 focus:bg-white"
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
        {isPending && (
          <svg className="animate-spin h-4 w-4 text-[#B8860B]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        <button className="text-gray-400 hover:text-[#B8860B] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>
    </div>
  )
}

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
