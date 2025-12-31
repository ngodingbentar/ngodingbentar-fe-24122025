"use client"

import { useState, useMemo } from "react"
import { addDays, calculateDays, formatNumber } from "@/app/utils"
import { toast } from "react-hot-toast"
import DateTimeLocationPicker from "./DateTimeLocationPicker"
import BookingProductSummary from "./BookingProductSummary"
import BookingPackageList from "./BookingPackageList"
import BookingOrderSummary from "./BookingOrderSummary"
import PriceChart from "@/app/_components/PriceChart"

interface BookingFormProps {
  product: any
}

const BookingForm = ({ product }: BookingFormProps) => {
  const [pickupDate, setPickupDate] = useState("2025-12-21T09:00")
  const [returnDate, setReturnDate] = useState("2025-12-28T09:00")
  const [pickupLoc, setPickupLoc] = useState("Jakarta")
  const [returnLoc, setReturnLoc] = useState("Jakarta")
  const [showPriceChart, setShowPriceChart] = useState(false)

  const price = useMemo(() => product.price, [product])
  const packageItems = useMemo(() => product.default_package?.components || [], [product])
  const duration = useMemo(() => calculateDays(pickupDate, returnDate), [pickupDate, returnDate])
  const isUnavailable = useMemo(() => {
    const avail = product.availability?.find((item: any) => item.city === pickupLoc)
    return avail?.status === "unavailable"
  }, [product.availability, pickupLoc])
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
    toast.success(`Pesan berhasil !\nProduct: ${product.name}\nLokasi: ${pickupLoc}\nTotal: Rp ${formatNumber(total)}`)
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
        selectedCity={pickupLoc}
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
          isDisabled={isUnavailable}
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
