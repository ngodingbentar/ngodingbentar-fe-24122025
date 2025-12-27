"use client"

import { useState } from "react"
import { formatNumber } from "@/app/utils"
import Link from "next/link"
import Image from "next/image"
import PriceChart from "../_components/PriceChart"

interface ProductDetailPageProps {
  product: any
}

const ProductClientPage = ({ product }: ProductDetailPageProps) => {
  const [showPriceChart, setShowPriceChart] = useState(false)
  const [showAvailTooltip, setShowAvailTooltip] = useState(false)

  const packageItems = product.default_package?.components || []

  return (
    <div className="container mx-auto px-4 py-8 font-sans">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <div className="border rounded-t-lg bg-white p-4 relative aspect-[4/3] w-full flex items-center justify-center">
            <Image
              src={`/product-images/${product.images[0]?.image}`}
              alt={product.name}
              width={600}
              height={450}
              className="object-contain max-h-[400px]"
              priority
            />
          </div>
          {/* Thumbnails */}
          <div className="flex bg-white border-x border-b p-2 gap-2 overflow-x-auto">
            {product.images.map((img: any) => (
              <div key={img.id} className="w-16 h-16 relative border cursor-pointer hover:border-gray-400">
                <Image src={`/product-images/${img.image}`} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-[#D4AF37] font-bold text-lg mb-4 border-b pb-2 inline-block">Package</h3>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {packageItems.length > 0 ? packageItems.map((item: any) => (
                <div key={item.id} className="flex flex-col items-center min-w-[100px] text-center">
                  <div className="w-16 h-16 relative mb-2">
                    <Image
                      src={`/product-images/${item.product?.image?.image || 'placeholder.jpg'}`}
                      alt={item.product?.name}
                      fill
                      className="object-contain"
                    />
                    <div className="absolute -top-1 -right-1 bg-gray-200 text-[10px] px-1 rounded-full">
                      {item.quantity > 0 ? `${item.quantity} *` : ''}
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 line-clamp-3 max-w-[100px] leading-tight">
                    {item.quantity > 1 ? `${item.quantity} * ` : ''}
                    {item.product?.name}
                  </div>
                </div>
              )) : (
                <p className="text-sm text-gray-400">No package items.</p>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <h1 className="text-xl font-bold text-gray-800 mb-1 leading-tight">
            {product.title || product.name}
          </h1>
          <div className="text-sm text-gray-500 mb-6">
            Brand <span className="text-orange-400 font-medium cursor-pointer">{product.manufacturer?.name || 'Sony'}</span>
          </div>

          <div className="bg-white rounded-lg p-0 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <span className="font-bold text-gray-800 text-lg">Rp {formatNumber(product.price)}</span>
                  <span className="text-gray-500 text-sm">/ day</span>
                  <span className="text-gray-400 text-xs cursor-help border border-gray-400 rounded-full w-3 h-3 flex items-center justify-center ml-1">i</span>
                </div>
                <div className="text-orange-400 text-sm font-medium">
                  Rp {formatNumber(product.price * 2)} <span className="text-gray-400 font-normal">/ 3 days</span>
                </div>
              </div>
              <button
                onClick={() => setShowPriceChart(true)}
                className="text-[#D4AF37] text-xs font-bold flex items-center gap-1 hover:underline"
              >
                Price Chart <span className="text-xs">☰</span>
              </button>
            </div>
            <div className="flex gap-4 mt-2 text-xs text-gray-500 bg-gray-50 p-2 rounded">
              <div>1 day = 24 hours</div>
              <div>Rent 2 days, free 1 day</div>
            </div>
          </div>

          <div className="mb-6 relative">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-gray-800 text-sm">Availability</h3>
              <span
                onMouseEnter={() => setShowAvailTooltip(true)}
                onMouseLeave={() => setShowAvailTooltip(false)}
                className="text-gray-400 text-xs cursor-help border border-gray-400 rounded-full w-3 h-3 flex items-center justify-center"
              >i</span>
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
            <span className="mt-0.5">ⓘ</span>
            <p>Place the item in the project to view the estimated rental cost and confirm the booking to our Online Customer Service.</p>
          </div>

        </div>
      </div>

      <PriceChart
        isOpen={showPriceChart}
        onClose={() => setShowPriceChart(false)}
        price={product.price}
        productName={product.name}
      />
    </div>
  )
}

export default ProductClientPage
