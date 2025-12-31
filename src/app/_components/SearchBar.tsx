"use client"

import { AiOutlineLoading } from 'react-icons/ai'
import { GoSearch } from 'react-icons/go'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, useTransition } from 'react'

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
        className="w-full border border-gray-300 rounded-full py-2.5 pl-5 pr-20 text-sm outline-none focus:border-[#B8860B] focus:ring-1 focus:ring-gray-100 transition-all bg-gray-50 focus:bg-white"
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
        {isPending && (
          <AiOutlineLoading className="animate-spin h-4 w-4 text-[#B8860B]" />
        )}
        <button className="text-gray-400">
          <GoSearch size={18} />
        </button>
      </div>
    </div>
  )
}

export default SearchBar
