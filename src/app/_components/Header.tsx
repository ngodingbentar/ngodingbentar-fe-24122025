"use client"

import Link from 'next/link'
import SearchBar from './SearchBar'
import { Suspense } from 'react'
import { useProjectStore } from '@/store/useProjectStore'
import { MdOutlineDashboard } from 'react-icons/md'
import { FaClipboardList } from 'react-icons/fa'
import ProjectDropdown from './ProjectDropdown'
import { Popover } from 'antd'
import { useOrderStore } from '@/store/useOrderStore'

const CounterItem = ({ total }: { total: number }) => {
  return (
    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] mobile:text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
      {total}
    </span>
  )
}

export const Header = () => {
  const { items, isOpen, setIsOpen } = useProjectStore()
  const { orders } = useOrderStore();

  return (
    <header className="flex flex-col md:flex-row items-center justify-between py-6 px-0 md:px-4 mb-1 bg-white shrink-0 gap-4">
      <Link href="/" className="group flex items-center gap-3">
        <div className="flex flex-col">
          <span className="italic font-bold text-xl uppercase">Pondok Lensa</span>
          <span className="text-[10px] text-gray-500 uppercase font-medium">Photo & Video Equipment Rental</span>
        </div>
      </Link>

      <div className="flex items-center gap-4 w-full md:w-auto z-50">
        <Suspense fallback={<div className="w-full md:w-96 h-10 bg-gray-100 rounded-full animate-pulse" />}>
          <SearchBar />
        </Suspense>

        <Popover
          content={<ProjectDropdown />}
          trigger="click"
          open={isOpen}
          onOpenChange={setIsOpen}
          placement="bottomRight"
          overlayInnerStyle={{ padding: 0 }}
        >
          <button
            className="relative p-2 text-gray-600 hover:text-[#B8860B] transition-colors"
            title="My Project"
          >
            <MdOutlineDashboard size={28} />
            {items.length > 0 && (
              <CounterItem total={items.length} />
            )}
          </button>
        </Popover>

        <Link
          href="/order-list"
          className="relative p-2 text-gray-600 hover:text-[#B8860B] transition-colors"
          title="My Orders"
        >
          <FaClipboardList size={24} />
          {orders.length > 0 && (
            <CounterItem total={orders.length} />
          )}
        </Link>
      </div>
    </header>
  )
}

export default Header
