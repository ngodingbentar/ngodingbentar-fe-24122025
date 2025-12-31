"use client"

import { useState } from "react"
import Image from "next/image"

interface ProductImageGalleryProps {
  images: any[]
  productName: string
}

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [activeImage, setActiveImage] = useState(images[0]?.image)

  return (
    <>
      <div className="border rounded-md bg-white p-4 relative aspect-[4/3] w-full flex items-center justify-center">
        <Image
          src={`/product-images/${activeImage || images[0]?.image}`}
          alt={productName}
          width={600}
          height={450}
          className="object-contain max-h-[400px]"
          priority
        />
      </div>
      <div className="flex bg-white p-2 gap-2 overflow-x-auto">
        {images.map((img: any) => (
          <div
            key={img.id}
            className={`w-24 h-16 relative border cursor-pointer shrink-0 ${activeImage === img.image ? "border-blue-500 border-2" : "border-gray-200 hover:border-gray-400"
              }`}
            onClick={() => setActiveImage(img.image)}
          >
            <Image
              src={`/product-images/${img.image}`}
              alt={productName}
              fill
              className="object-contain p-2"
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default ProductImageGallery
