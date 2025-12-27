"use client"

import { useState, useMemo } from "react"
import { formatNumber } from "@/app/utils"
import Image from "next/image"

interface BookingFormProps {
  product: any
}

const BookingForm = ({ product }: BookingFormProps) => {
  const [pickupDate, setPickupDate] = useState("2025-12-21T09:00")
  const [returnDate, setReturnDate] = useState("2025-12-28T09:00")
  const [pickupLoc, setPickupLoc] = useState("Jakarta")
  const [returnLoc, setReturnLoc] = useState("Jakarta")

  const price = product.price

  const calculateDays = (start: string, end: string) => {
    if (!start || !end) return 0
    const startDate = new Date(start)
    const endDate = new Date(end)
    const diffTime = endDate.getTime() - startDate.getTime()
    if (diffTime < 0) return 0
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays || 0
  }

  const duration = useMemo(() => calculateDays(pickupDate, returnDate), [pickupDate, returnDate])

  const { total, subtotal, discountAmount, discountPercent, freeDays } = useMemo(() => {
    if (duration <= 0) return { total: 0, subtotal: 0, discountAmount: 0, discountPercent: 0, freeDays: 0 }

    const freeDaysCount = Math.floor(duration / 3)
    const billableDays = duration - freeDaysCount
    const subTotalVal = billableDays * price

    let discountPct = 0
    if (duration >= 14) {
      discountPct = 0.2
    } else if (duration >= 7) {
      discountPct = 0.1
    }

    const discountAmt = subTotalVal * discountPct
    const finalTotal = subTotalVal - discountAmt

    return {
      total: finalTotal,
      subtotal: subTotalVal,
      discountAmount: discountAmt,
      discountPercent: discountPct * 100,
      freeDays: freeDaysCount
    }
  }, [duration, price])

  const handleBook = () => {
    alert(`Booking Confirmed!\nProduct: ${product.name}\nTotal: Rp ${formatNumber(total)}`)
  }

  const packageItems = product.default_package?.components || []

  return (
    <div className="bg-white p-6 pt-2 font-sans text-gray-700">
      {/* Top Row: Inputs */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <label className="block text-xs font-bold text-red-500 mb-1">Pickup <span className="text-red-500">*</span></label>
          <div className="flex border rounded overflow-hidden">
            <input
              type="datetime-local"
              value={pickupDate}
              onChange={e => setPickupDate(e.target.value)}
              className="flex-1 px-3 py-2 text-sm outline-none bg-white text-gray-600"
            />
            <div className="bg-gray-100 flex items-center px-3 text-xs text-gray-500 border-l border-r">WIB</div>
            <div className="relative min-w-[100px]">
              <select
                value={pickupLoc}
                onChange={e => setPickupLoc(e.target.value)}
                className="w-full h-full px-3 py-2 text-sm appearance-none outline-none bg-white text-gray-600 cursor-pointer"
              >
                <option>Jakarta</option>
                <option>Surabaya</option>
              </select>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▼</span>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <label className="block text-xs font-bold text-red-500 mb-1">Return <span className="text-red-500">*</span></label>
          <div className="flex border rounded overflow-hidden">
            <input
              type="datetime-local"
              value={returnDate}
              onChange={e => setReturnDate(e.target.value)}
              className="flex-1 px-3 py-2 text-sm outline-none bg-white text-gray-600"
            />
            <div className="bg-gray-100 flex items-center px-3 text-xs text-gray-500 border-l border-r">WIB</div>
            <div className="relative min-w-[100px]">
              <select
                value={returnLoc}
                onChange={e => setReturnLoc(e.target.value)}
                className="w-full h-full px-3 py-2 text-sm appearance-none outline-none bg-white text-gray-600 cursor-pointer"
              >
                <option>Jakarta</option>
                <option>Surabaya</option>
              </select>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▼</span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-32">
          <label className="block text-xs font-bold text-red-500 mb-1">Day Count <span className="text-red-500">*</span></label>
          <div className="border rounded px-3 py-2 bg-white text-sm">
            <div className="flex justify-between items-center h-[22px]">
              <span>{duration}</span>
              <div className="flex flex-col text-[8px] text-gray-400 leading-none gap-0.5">
                <span>▲</span>
                <span>▼</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row: Product Card */}
      <div className="border rounded-lg p-6 flex flex-col md:flex-row gap-8 items-start mb-8 bg-white shadow-sm">
        <div className="w-full md:w-1/3 flex justify-center">
          <div className="relative w-64 h-48">
            <Image
              src={`/product-images/${product.images[0]?.image}`}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-800 mb-4 lh-tight">
            {product.title || product.name}
          </h2>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl font-bold text-gray-800">Rp {formatNumber(product.price)}</span>
            <span className="text-gray-500 text-sm">/ day</span>
            <span className="text-gray-400 bg-orange-100 rounded-full w-4 h-4 text-[10px] flex items-center justify-center border border-orange-200">i</span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="text-[#B8860B] font-bold text-sm">
              Rp {formatNumber(product.price * 2)} <span className="text-gray-400 font-normal">/ 3 days</span>
            </div>
            <button className="text-[#B8860B] text-xs font-bold flex items-center gap-1">
              Price Chart <span className="text-[10px]">☰</span>
            </button>
          </div>

          <div className="flex items-center gap-2 mb-1">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <span className="font-bold text-gray-700 text-sm">Available</span>
          </div>
        </div>
      </div>

      {/* Bottom Row: Package & Pricing */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Package */}
        <div className="flex-1">
          <h3 className="text-[#B8860B] font-bold text-sm mb-4">Package</h3>
          <div className="flex gap-6 overflow-x-auto pb-2">
            {packageItems.length > 0 ? packageItems.map((item: any) => (
              <div key={item.id} className="text-center w-24">
                <div className="relative w-20 h-16 mx-auto mb-2">
                  <Image
                    src={`/product-images/${item.product?.image?.image}`}
                    alt={item.product?.name}
                    fill
                    className="object-contain"
                  />
                  <span className="absolute top-0 right-0 text-[10px] bg-white text-blue-500 rounded-full w-4 h-4 flex items-center justify-center border border-blue-200">i</span>
                </div>
                <div className="text-[10px] leading-tight text-gray-600 line-clamp-3">
                  {item.quantity > 1 && `${item.quantity} * `} {item.product?.name}
                </div>
              </div>
            )) : <div className="text-xs text-gray-400">No package items</div>}
          </div>
        </div>

        {/* Right: Breakdown */}
        <div className="w-full md:w-80">
          <div className="space-y-1 text-sm text-right mb-6">
            <div className="flex justify-between text-gray-500">
              <span>Rent: {duration} days</span>
              <span>Rp {formatNumber(duration * price)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Free: {freeDays} days</span>
              <span className="text-gray-500">-Rp {formatNumber(freeDays * price)}</span>
            </div>

            <div className="flex justify-between text-gray-500 font-medium pt-1">
              <span>Subtotal</span>
              <span>Rp {formatNumber(subtotal)}</span>
            </div>

            <div className="flex justify-between text-gray-500">
              <span>Discount: {discountPercent}%</span>
              <span>-Rp {formatNumber(discountAmount)}</span>
            </div>

            <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t-0">
              <span>Total</span>
              <span>Rp {formatNumber(total)}</span>
            </div>
          </div>

          <button
            onClick={handleBook}
            className="w-full bg-[#B8860B] hover:bg-[#9DA520] text-white font-bold py-3 text-lg rounded shadow-md transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookingForm
