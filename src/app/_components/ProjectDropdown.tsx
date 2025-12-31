"use client"

import { useProjectStore } from "@/store/useProjectStore"
import Image from "next/image"
import Link from "next/link"
import { IoTrash } from "react-icons/io5"
import { formatNumber } from "@/app/utils"

const ProjectDropdown = () => {
  const { items, removeItem, closeDrawer } = useProjectStore()

  return (
    <div className="w-80 md:w-96 bg-white font-sans text-gray-800">
      <div className="p-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-lg">
        <h3 className="font-bold text-gray-700 text-sm">Projects ({items.length})</h3>
      </div>

      <div className="max-h-[320px] overflow-y-auto p-0">
        {items.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">
            <div className="mb-2">Projects is empty</div>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 p-3 hover:bg-gray-50 transition-colors group relative">
                <div className="relative w-16 h-16 shrink-0 bg-white rounded border border-gray-200 overflow-hidden">
                  <Image
                    src={`/product-images/${item.image}`}
                    alt={item.name}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h4 className="font-bold text-gray-800 text-sm truncate pr-4" title={item.name}>{item.name}</h4>
                    <span className="font-bold text-orange-500 text-sm whitespace-nowrap">Rp {formatNumber(item.price)}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-gray-400">Per hari</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Hapus"
                      >
                        <IoTrash size={16} />
                      </button>
                      <Link
                        href={`/book?slug=${item.slug}`}
                        onClick={closeDrawer}
                        className="bg-[#c99947] hover:bg-[#929c10] text-white text-xs font-bold py-1 px-3 rounded"
                      >
                        Book
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectDropdown
