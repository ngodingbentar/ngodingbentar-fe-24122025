import { formatNumber } from "@/app/utils"

interface BookingOrderSummaryProps {
  duration: number
  price: number
  freeDays: number
  subtotal: number
  discountPercent: number
  discountAmount: number
  total: number
  handleBook: () => void
  isDisabled?: boolean
}

const BookingOrderSummary = ({
  duration,
  price,
  freeDays,
  subtotal,
  discountPercent,
  discountAmount,
  total,
  handleBook,
  isDisabled = false,
}: BookingOrderSummaryProps) => {
  return (
    <div className="w-full md:w-80">
      <div className="space-y-1 text-sm text-right mb-6">
        <div className="flex justify-between text-gray-500">
          <span>Rent: {duration} days</span>
          <span>Rp {formatNumber(duration * price)}</span>
        </div>
        {freeDays ? (
          <div className="flex justify-between text-gray-500">
            <span>Free: {freeDays} days</span>
            <span className="text-gray-500">-Rp {formatNumber(freeDays * price)}</span>
          </div>
        ) : null}

        <div className="flex justify-between text-gray-500 font-medium pt-1">
          <span>Subtotal</span>
          <span>Rp {formatNumber(subtotal)}</span>
        </div>
        {discountPercent ? (
          <div className="flex justify-between text-gray-500">
            <span>Discount: {discountPercent}%</span>
            <span>-Rp {formatNumber(discountAmount)}</span>
          </div>
        ) : null}

        <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t-0">
          <span>Total</span>
          <span>Rp {formatNumber(total)}</span>
        </div>
      </div>

      <button
        onClick={handleBook}
        disabled={isDisabled}
        className={`w-full font-bold py-3 text-lg rounded shadow-md transition-colors ${isDisabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-[#B8860B] hover:bg-[#9DA520] text-white cursor-pointer"
          }`}
      >
        {isDisabled ? "Unavailable" : "Book Now"}
      </button>
    </div>
  )
}

export default BookingOrderSummary
