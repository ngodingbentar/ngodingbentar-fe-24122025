"use client"

import { useState, useMemo } from "react"
import { formatNumber } from "@/app/utils"
import PriceChart from "../../product/_components/PriceChart"
import DateTimeLocationPicker from "./DateTimeLocationPicker"
import BookingProductSummary from "./BookingProductSummary"
import BookingPackageList from "./BookingPackageList"
import BookingOrderSummary from "./BookingOrderSummary"

interface BookingFormProps {
  product: any
}

const BookingForm = ({ product }: BookingFormProps) => {
  const [pickupDate, setPickupDate] = useState("2025-12-21T09:00")
  const [returnDate, setReturnDate] = useState("2025-12-28T09:00")
  const [pickupLoc, setPickupLoc] = useState("Jakarta")
  const [returnLoc, setReturnLoc] = useState("Jakarta")
  const [showPriceChart, setShowPriceChart] = useState(false)

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

  const addDays = (dateStr: string, days: number) => {
    const date = new Date(dateStr)
    date.setDate(date.getDate() + days)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  const handleDurationChange = (newDuration: number) => {
    if (newDuration < 0) return
    const newReturnDate = addDays(pickupDate, newDuration)
    setReturnDate(newReturnDate)
  }

  return (
    <div className="bg-white p-6 pt-2 font-sans text-gray-700">
      <DateTimeLocationPicker
        pickupDate={pickupDate}
        setPickupDate={setPickupDate}
        returnDate={returnDate}
        setReturnDate={setReturnDate}
        pickupLoc={pickupLoc}
        setPickupLoc={setPickupLoc}
        returnLoc={returnLoc}
        setReturnLoc={setReturnLoc}
        duration={duration}
        handleDurationChange={handleDurationChange}
      />

      <BookingProductSummary
        product={product}
        setShowPriceChart={setShowPriceChart}
      />

      <div className="flex flex-col md:flex-row gap-8">
        <BookingPackageList packageItems={packageItems} />

        <BookingOrderSummary
          duration={duration}
          price={price}
          freeDays={freeDays}
          subtotal={subtotal}
          discountPercent={discountPercent}
          discountAmount={discountAmount}
          total={total}
          onBook={handleBook}
        />
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

export default BookingForm
