"use client"

import { formatNumber } from "@/app/utils"

interface PriceChartProps {
  price: number
  isOpen: boolean
  productName: string
  onClose: () => void
}

const CellItem = ({ children }: { children: React.ReactNode }) => (
  <div className="py-2 px-4 border-b border-gray-100">
    {children}
  </div>
);

const HeaderItem = ({ children }: { children: React.ReactNode }) => (
  <div className="py-3 px-4 text-left font-medium">{children}</div>
);

const PriceChart = ({ price, isOpen, onClose, productName }: PriceChartProps) => {
  if (!isOpen) return null

  const daysToCheck = [1, 3, 7, 10, 12, 15]

  const calculateRow = (days: number, index: number) => {
    const freeDays = Math.floor(days / 3)
    const billableDays = days - freeDays
    let subtotal = billableDays * price

    let discountPct = 0
    if (days >= 14) discountPct = 0.2
    else if (days >= 7) discountPct = 0.1

    const total = subtotal * (1 - discountPct)
    const pricePerDay = total / days

    return { days, total, pricePerDay }
  }

  const rows = daysToCheck.map(calculateRow)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="p-6 bg-white rounded-lg shadow-xl w-full max-w-175 overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="pb-4 border-b flex justify-between items-start">
          <h3 className="font-bold text-gray-800 line-clamp-1">Price chart - {productName}</h3>
        </div>

        <div className="w-full text-sm">
          <div className="grid grid-cols-3 bg-[#5C6B89] text-white">
            <HeaderItem>Days</HeaderItem>
            <HeaderItem>Rental Price</HeaderItem>
            <HeaderItem>Price per day</HeaderItem>
          </div>
          <div>
            {rows.map((row, idx) => (
              <div key={row.days} className={`grid grid-cols-3 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                <CellItem>{row.days}</CellItem>
                <CellItem>{`Rp ${formatNumber(Math.round(row.total))}`}</CellItem>
                <CellItem>{`Rp ${formatNumber(Math.round(row.pricePerDay))}`}</CellItem>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button className="px-4 py-2 text-white bg-[#5C6B89] cursor-pointer rounded-md hover:bg-[#4B5B77]" onClick={onClose}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  )
}

export default PriceChart
