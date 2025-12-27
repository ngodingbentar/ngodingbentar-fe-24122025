"use client"

import { formatNumber } from "@/app/utils"
import Image from "next/image"

const ProductItem = ({ product }: { product: any }) => {
  return (
    <div className="flex flex-col items-center p-2 cursor-pointer hover:shadow-lg">
      <Image
        src={`/product-images/${product?.images[0]?.image}`}
        alt={product.name}
        width={200}
        height={200}
      />
      <div className="line-clamp-2 text-center font-bold mt-2">{product.name}</div>
      <div>
        <div className="text-gray-500">Rp {formatNumber(product?.price)} / day</div>
        <div>Rp {formatNumber((product?.price || 0) * 2)} / 3 day</div>
      </div>
    </div>
  )
}

export default ProductItem