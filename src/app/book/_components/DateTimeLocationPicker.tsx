import { useBookingStore } from "@/store/useBookingStore"
import { FaChevronDown } from "react-icons/fa"

interface DateTimeLocationPickerProps {
  duration: number
  handleDurationChange: (duration: number) => void
}

const DateTimeLocationPicker = ({
  duration,
  handleDurationChange,
}: DateTimeLocationPickerProps) => {

  const {
    pickupDate,
    returnDate,
    pickupLoc,
    returnLoc,
    setPickupDate,
    setReturnDate,
    setPickupLoc,
    setReturnLoc
  } = useBookingStore()

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="flex-1">
        <label className="block text-xs font-bold mb-1">Pickup <span className="text-red-500">*</span></label>
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
              <option>Bandung</option>
              <option>Bali</option>
              <option>Jakarta</option>
              <option>Surabaya</option>
            </select>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">
              <FaChevronDown />
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <label className="block text-xs font-bold mb-1">Return <span className="text-red-500">*</span></label>
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
              <option>Bandung</option>
              <option>Bali</option>
              <option>Jakarta</option>
              <option>Surabaya</option>
            </select>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">
              <FaChevronDown />
            </span>
          </div>
        </div>
      </div>

      <div className="w-full md:w-32">
        <label className="block text-xs font-bold mb-1">Day Count <span className="text-red-500">*</span></label>
        <div className="border rounded px-3 py-2 bg-white text-sm">
          <div className="flex justify-between items-center h-[22px]">
            <input
              type="number"
              min="0"
              value={duration || ""}
              placeholder="0"
              onChange={(e) => handleDurationChange(parseInt(e.target.value) || 0)}
              className="w-full outline-none text-gray-700 font-medium no-spinner"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DateTimeLocationPicker
