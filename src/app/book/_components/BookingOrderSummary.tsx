import { formatNumber } from "@/app/utils"

interface BookingOrderSummaryProps {
  duration: number
  price: number
  freeDays: number
  subtotal: number
  discountPercent: number
  discountAmount: number
  total: number
  onBook: () => void
}

const BookingOrderSummary = ({
  duration,
  price,
  freeDays,
  subtotal,
  discountPercent,
  discountAmount,
  total,
  onBook,
}: BookingOrderSummaryProps) => {
  return (
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
        onClick={onBook}
        className="w-full bg-[#B8860B] hover:bg-[#9DA520] text-white font-bold py-3 text-lg rounded shadow-md transition-colors"
      >
        Book Now
      </button>
    </div>
  )
}

export default BookingOrderSummary
