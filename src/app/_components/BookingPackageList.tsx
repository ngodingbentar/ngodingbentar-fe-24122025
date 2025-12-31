import Image from "next/image"
import { FaInfoCircle } from "react-icons/fa"

interface BookingPackageListProps {
  packageItems: any[]
}

const BookingPackageList = ({ packageItems }: BookingPackageListProps) => {
  return (
    <div className="flex-1">
      <h3 className="text-[#c99947] font-bold text-sm mb-4">Package</h3>
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
              <span className="absolute top-0 right-0 bg-white text-blue-500 rounded-full w-4 h-4 flex items-center justify-center border border-blue-200">
                <FaInfoCircle className="text-[10px]" />
              </span>
            </div>
            <div className="text-[10px] leading-tight text-gray-600 line-clamp-3">
              {item.quantity > 1 && `${item.quantity} * `} {item.product?.name}
            </div>
          </div>
        )) : <div className="text-xs text-gray-400">No package items</div>}
      </div>
    </div>
  )
}

export default BookingPackageList
