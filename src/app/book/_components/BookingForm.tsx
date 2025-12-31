"use client"

import { useState, useMemo } from "react"
import { calculateDays, formatNumber } from "@/app/utils"
import { useBookingStore } from "@/store/useBookingStore"
import { useOrderStore } from "@/store/useOrderStore"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import DateTimeLocationPicker from "./DateTimeLocationPicker"
import BookingProductSummary from "./BookingProductSummary"
import BookingOrderSummary from "./BookingOrderSummary"
import PriceChart from "@/app/_components/PriceChart"
import BookingPackageList from "@/app/_components/BookingPackageList"

interface BookingFormProps {
  product: any
}

const BookingForm = ({ product }: BookingFormProps) => {
  const {
    pickupDate,
    returnDate,
    pickupLoc,
    returnLoc,
    setDuration
  } = useBookingStore()

  const [showPriceChart, setShowPriceChart] = useState(false)

  const price = useMemo(() => product.price, [product])
  const packageItems = useMemo(() => product.default_package?.components || [], [product])
  const duration = useMemo(() => calculateDays(pickupDate, returnDate), [pickupDate, returnDate])
  const isUnavailable = useMemo(() => {
    const avail = product.availability?.find((item: any) => item.city.toLowerCase() === pickupLoc.toLowerCase())
    return avail?.status.toLowerCase() === "unavailable"
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

  const router = useRouter()
  const { addOrder } = useOrderStore()

  const handleBook = () => {
    console.log("Booking...", product)
    const order = {
      id: crypto.randomUUID(),
      product: {
        slug: product.slug,
        name: product.name,
        image: product.images[0].image,
        price: product.price,
      },
      bookingDetails: {
        pickupDate,
        returnDate,
        pickupLoc,
        returnLoc,
        duration,
      },
      paymentDetails: {
        total,
        subtotal,
        discountAmount,
        discountPercent,
        freeDays,
      },
      createdAt: new Date().toISOString(),
    }

    addOrder(order)
    toast.success("Pesanan berhasil dibuat!")
    router.push("/order-list")
  }

  const handleDurationChange = (newDuration: number) => {
    if (newDuration < 0) return
    setDuration(newDuration)
  }

  return (
    <div className="bg-white p-6 pt-2 font-sans text-gray-700">
      <DateTimeLocationPicker
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
          handleBook={handleBook}
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
