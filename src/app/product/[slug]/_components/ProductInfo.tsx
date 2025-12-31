"use client"

import { useState } from "react"
import { formatNumber } from "@/app/utils"
import Link from "next/link"
import { FaInfoCircle } from "react-icons/fa"
import PriceChartButton from "@/app/_components/PriceChartButton"
import { MdOutlineDashboard } from "react-icons/md"

import { useProjectStore } from "@/store/useProjectStore"

interface ProductInfoProps {
  product: any
  onOpenPriceChart: () => void
}

const ProductInfo = ({ product, onOpenPriceChart }: ProductInfoProps) => {
  const [showAvailTooltip, setShowAvailTooltip] = useState(false)
  const [showPriceTooltip, setShowPriceTooltip] = useState(false)
  const { addItem } = useProjectStore()

  const handleAddToProject = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0]?.image,
      price: product.price
    })
  }

  return (
    <>
      <h1 className="text-xl font-bold text-gray-800 mb-1 leading-tight">
        {product.title || product.name}
      </h1>
      <div className="text-sm text-gray-500">
        Brand <span className="text-orange-400 font-medium cursor-pointer">{product.manufacturer?.name || 'Sony'}</span>
      </div>

      <div className="w-full h-[1px] bg-gray-300 my-3" />

      <div className="bg-white p-0 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-1 mb-1 relative">
              <span className="font-bold text-gray-800 text-lg">Rp {formatNumber(product.price)}</span>
              <span className="text-gray-500 text-sm">/ day</span>
              <span
                className="text-gray-400 text-xs cursor-help ml-1"
                onMouseEnter={() => setShowPriceTooltip(true)}
                onMouseLeave={() => setShowPriceTooltip(false)}
              >
                <FaInfoCircle />
              </span>
              {showPriceTooltip && (
                <div className="absolute top-0 left-[180px] w-48 bg-white border shadow-md p-3 rounded z-20 text-xs text-gray-500">
                  <div className="mb-1">1 day = 24 hours</div>
                  <div>Rent 2 days, free 1 day</div>
                </div>
              )}
            </div>
            <div className="text-orange-400 text-sm font-medium">
              Rp {formatNumber(product.price * 2)} <span className="text-gray-400 font-normal">/ 3 days</span>
            </div>
          </div>
          <PriceChartButton onClick={onOpenPriceChart} />
        </div>
      </div>

      <div className="mb-6 relative">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-bold text-gray-800 text-sm">Availability</h3>
          <span
            onMouseEnter={() => setShowAvailTooltip(true)}
            onMouseLeave={() => setShowAvailTooltip(false)}
            className="text-gray-400 text-xs cursor-help"
          >
            <FaInfoCircle />
          </span>
        </div>

        {showAvailTooltip && (
          <div className="absolute top-6 left-10 bg-white shadow-lg border p-3 rounded-md z-10 text-xs w-64">
            <div className="font-bold mb-2">Availability info</div>
            <div className="flex items-center gap-2 mb-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Tersedia</div>
            <div className="flex items-center gap-2 mb-1"><span className="w-2 h-2 rounded-full bg-yellow-400"></span> Tersedia berdasarkan pesanan</div>
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span> Tidak Tersedia</div>
          </div>
        )}

        <div className="space-y-1">
          {product.availability ? (
            product.availability.map((item: any) => {
              let color = "bg-gray-300"
              if (item.status === "available") color = "bg-green-500"
              else if (item.status === "request") color = "bg-yellow-400"
              else if (item.status === "unavailable") color = "bg-red-500"

              return (
                <div key={item.city} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className={`w-2 h-2 rounded-full ${color}`}></span> {item.city}
                </div>
              )
            })
          ) : (
            <>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="w-2 h-2 rounded-full bg-green-500"></span> Jakarta
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="w-2 h-2 rounded-full bg-green-500"></span> Surabaya
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex gap-3 mb-2">
        <button
          onClick={handleAddToProject}
          className="flex w-1/2 justify-center items-center gap-2 bg-[#c99947] hover:bg-[#929c10] text-white font-bold py-3 px-4 rounded transition-colors text-sm"
        >
          <span>Add to Project</span>
          <span><MdOutlineDashboard /></span>
        </button>
        <Link
          href={`/book?slug=${product.slug}`}
          className="flex w-1/2 bg-white border border-[#c99947] text-[#c99947] hover:bg-orange-50 font-bold py-3 px-4 rounded transition-colors text-sm text-center flex items-center justify-center"
        >
          Book Now
        </Link>
      </div>

      <div className="flex items-start gap-2 text-[10px] text-gray-500 bg-gray-100 p-2 rounded">
        <FaInfoCircle className="mt-0.5 shrink-0" />
        <p>Place the item in the project to view the estimated rental cost and confirm the booking to our Online Customer Service.</p>
      </div>
    </>
  )
}

export default ProductInfo
