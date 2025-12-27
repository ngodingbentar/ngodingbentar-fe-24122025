"use client"

import ProductItem from "./ProductItem"

const Lists = ({ data }: { data: any }) => {
  return (
    <div className="p-4">
      <h1>Lists Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {data && data.length > 0 ? data.map((product: any) => (
          <ProductItem key={product.id} product={product} />
        )) : <p>Tidak ada data</p>}
      </div>
    </div>
  )
}

export default Lists