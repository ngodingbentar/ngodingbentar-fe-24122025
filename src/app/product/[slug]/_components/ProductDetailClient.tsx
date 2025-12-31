"use client"

import { useState } from "react"
import ProductImageGallery from "./ProductImageGallery"
import ProductInfo from "./ProductInfo"
import PriceChart from "@/app/_components/PriceChart"
import BookingPackageList from "@/app/_components/BookingPackageList"

interface ProductDetailPageProps {
  product: any
}

const ProductDetailClient = ({ product }: ProductDetailPageProps) => {
  const [showPriceChart, setShowPriceChart] = useState(false)

  const packageItems = product.default_package?.components || []

  return (
    <div className="container mx-auto px-4 py-8 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <ProductImageGallery images={product.images} productName={product.name} />
          <BookingPackageList packageItems={packageItems} />
        </div>

        <div className="lg:col-span-5">
          <ProductInfo
            product={product}
            onOpenPriceChart={() => setShowPriceChart(true)}
          />
        </div>
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

export default ProductDetailClient
