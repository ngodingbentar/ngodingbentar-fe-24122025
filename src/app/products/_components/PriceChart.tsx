"use client"

import { formatNumber } from "@/app/utils"

interface PriceChartProps {
  price: number
  isOpen: boolean
  onClose: () => void
  productName: string
}

const PriceChart = ({ price, isOpen, onClose, productName }: PriceChartProps) => {
  if (!isOpen) return null

  const daysToCheck = [1, 3, 7, 10, 12, 15]

  const calculateRow = (days: number) => {
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
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b flex justify-between items-start">
          <h3 className="font-bold text-gray-800 text-sm">Price chart - {productName}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
        </div>

        <div className="p-0">
          <table className="w-full text-sm">
            <thead className="bg-[#5C6B89] text-white">
              <tr>
                <th className="py-3 px-4 text-left font-medium">Days</th>
                <th className="py-3 px-4 text-left font-medium">Rental Price</th>
                <th className="py-3 px-4 text-left font-medium">Price per day</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={row.days} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="py-2 px-4 border-b border-gray-100">{row.days}</td>
                  <td className="py-2 px-4 border-b border-gray-100">Rp {formatNumber(Math.round(row.total))}</td>
                  <td className="py-2 px-4 border-b border-gray-100">Rp {formatNumber(Math.round(row.pricePerDay))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-gray-50 text-right">
          <button onClick={onClose} className="text-sm text-blue-600 hover:underline">Close</button>
        </div>
      </div>
    </div>
  )
}

export default PriceChart
