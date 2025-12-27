import { getProductBySlug } from "@/app/services";
import { notFound } from "next/navigation";
import ProductClientPage from "../_components/ProductClientPage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const ProductDetailPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductClientPage product={product} />;
};

export default ProductDetailPage;
