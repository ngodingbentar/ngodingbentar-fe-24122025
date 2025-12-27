"use client"

import { formatNumber } from "@/app/utils"
import Image from "next/image"
import Link from "next/link"

const ProductItem = ({ product }: { product: any }) => {
  return (
    <Link href={`/products/${product.slug}`} className="flex flex-col items-center p-2 cursor-pointer hover:shadow-lg rounded-md transition-all">
      <Image
        src={`/product-images/${product?.images[0]?.image}`}
        alt={product.name}
        width={200}
        height={200}
      />
      <div className="line-clamp-2 text-center font-bold mt-2">{product.name}</div>
      <div className="text-center mt-2">
        <div className="text-gray-500 text-sm">Rp {formatNumber(product?.price)} / day</div>
        <div className="text-orange-400 text-xs">Rp {formatNumber((product?.price || 0) * 2)} / 3 days</div>
      </div>
    </Link>
  )
}

export default ProductItem