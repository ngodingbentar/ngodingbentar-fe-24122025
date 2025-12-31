import Image from "next/image"
import { formatNumber } from "@/app/utils"
import { FaInfoCircle } from "react-icons/fa"
import PriceChartButton from "@/app/_components/PriceChartButton"

interface BookingProductSummaryProps {
  product: any
  setShowPriceChart: (show: boolean) => void
  selectedCity: string
}

const BookingProductSummary = ({ product, setShowPriceChart, selectedCity }: BookingProductSummaryProps) => {
  const availability = product.availability?.find((item: any) => item.city === selectedCity)
  const status = availability?.status || "unavailable"

  let statusColor = "bg-red-500"
  let statusText = "Tidak Tersedia"

  if (status === "available") {
    statusColor = "bg-green-500"
    statusText = "Tersedia"
  } else if (status === "request") {
    statusColor = "bg-yellow-400"
    statusText = "Tersedia berdasarkan pesanan"
  }

  return (
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
          <span className="text-gray-400 bg-orange-100 rounded-full w-4 h-4 flex items-center justify-center border border-orange-200">
            <FaInfoCircle className="text-[10px]" />
          </span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="text-[#B8860B] font-bold text-sm">
            Rp {formatNumber(product.price * 2)} <span className="text-gray-400 font-normal">/ 3 days</span>
          </div>
          <PriceChartButton onClick={() => setShowPriceChart(true)} />
        </div>

        <div className="flex items-center gap-2 mb-1">
          <span className={`w-3 h-3 rounded-full ${statusColor}`}></span>
          <span className="font-bold text-gray-700 text-sm">{statusText}</span>
        </div>
      </div>
    </div>
  )
}

export default BookingProductSummary
