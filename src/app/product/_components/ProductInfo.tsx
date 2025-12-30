"use client"

import { useState } from "react"
import { formatNumber } from "@/app/utils"
import Link from "next/link"
import PriceChartButton from "./PriceChartButton"
import { FaInfoCircle } from "react-icons/fa"

interface ProductInfoProps {
  product: any
  onOpenPriceChart: () => void
}

const ProductInfo = ({ product, onOpenPriceChart }: ProductInfoProps) => {
  const [showAvailTooltip, setShowAvailTooltip] = useState(false)
  const [showPriceTooltip, setShowPriceTooltip] = useState(false)

  return (
    <>
      <h1 className="text-xl font-bold text-gray-800 mb-1 leading-tight">
        {product.title || product.name}
      </h1>
      <div className="text-sm text-gray-500 mb-6">
        Brand <span className="text-orange-400 font-medium cursor-pointer">{product.manufacturer?.name || 'Sony'}</span>
      </div>

      <div className="bg-white rounded-lg p-0 mb-6">
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
          <div className="absolute top-6 left-10 bg-white shadow-lg border p-3 rounded-md z-10 text-xs w-48">
            <div className="font-bold mb-2">Availability info</div>
            <div className="flex items-center gap-2 mb-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Available</div>
            <div className="flex items-center gap-2 mb-1"><span className="w-2 h-2 rounded-full bg-yellow-400"></span> Available by request</div>
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span> Unavailable</div>
          </div>
        )}

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="w-2 h-2 rounded-full bg-green-500"></span> Jakarta
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="w-2 h-2 rounded-full bg-green-500"></span> Surabaya
          </div>
        </div>
      </div>

      <div className="flex gap-3 mb-2">
        <button className="flex-1 bg-[#B8860B] hover:bg-[#9DA520] text-white font-bold py-3 px-4 rounded transition-colors text-sm">
          Add to Project
        </button>
        <Link
          href={`/book?slug=${product.slug}`}
          className="flex-1 bg-white border border-[#B8860B] text-[#B8860B] hover:bg-orange-50 font-bold py-3 px-4 rounded transition-colors text-sm text-center flex items-center justify-center"
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
