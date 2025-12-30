import Image from "next/image"

interface ProductImageGalleryProps {
  images: any[]
  productName: string
}

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  return (
    <>
      <div className="border rounded-t-lg bg-white p-4 relative aspect-[4/3] w-full flex items-center justify-center">
        <Image
          src={`/product-images/${images[0]?.image}`}
          alt={productName}
          width={600}
          height={450}
          className="object-contain max-h-[400px]"
          priority
        />
      </div>
      <div className="flex bg-white border-x border-b p-2 gap-2 overflow-x-auto">
        {images.map((img: any) => (
          <div key={img.id} className="w-16 h-16 relative border cursor-pointer hover:border-gray-400">
            <Image src={`/product-images/${img.image}`} alt="" fill className="object-cover" />
          </div>
        ))}
      </div>
    </>
  )
}

export default ProductImageGallery
