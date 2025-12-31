import { getProductBySlug } from "@/app/services";
import { notFound } from "next/navigation";
import ProductDetailClient from "./_components/ProductDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const ProductDetailPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
};

export default ProductDetailPage;
