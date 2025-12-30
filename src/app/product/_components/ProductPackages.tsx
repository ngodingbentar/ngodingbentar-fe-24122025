import Image from "next/image"

interface ProductPackagesProps {
  packageItems: any[]
}

const ProductPackages = ({ packageItems }: ProductPackagesProps) => {
  return (
    <div className="mt-8">
      <h3 className="text-[#D4AF37] font-bold text-lg mb-4 border-b pb-2 inline-block">Package</h3>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {packageItems.length > 0 ? packageItems.map((item: any) => (
          <div key={item.id} className="flex flex-col items-center min-w-[100px] text-center">
            <div className="w-16 h-16 relative mb-2">
              <Image
                src={`/product-images/${item.product?.image?.image || 'placeholder.jpg'}`}
                alt={item.product?.name}
                fill
                className="object-contain"
              />
              <div className="absolute -top-1 -right-1 bg-gray-200 text-[10px] px-1 rounded-full">
                {item.quantity > 0 ? `${item.quantity} *` : ''}
              </div>
            </div>
            <div className="text-xs text-gray-600 line-clamp-3 max-w-[100px] leading-tight">
              {item.quantity > 1 ? `${item.quantity} * ` : ''}
              {item.product?.name}
            </div>
          </div>
        )) : (
          <p className="text-sm text-gray-400">No package items.</p>
        )}
      </div>
    </div>
  )
}

export default ProductPackages
