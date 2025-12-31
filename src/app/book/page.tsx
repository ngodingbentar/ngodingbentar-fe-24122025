import { getProductBySlug } from "@/app/services";
import { notFound } from "next/navigation";
import BookingForm from "./_components/BookingForm";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

interface PageProps {
  searchParams: Promise<{ slug?: string }>;
}

const BookPage = async ({ searchParams }: PageProps) => {
  const { slug } = await searchParams;

  if (!slug) {
    return (
      <div className="container mx-auto p-8 text-center bg-gray-50 min-h-screen flex items-center justify-center flex-col">
        <p className="text-gray-600 mb-4">Tidak ada produk yang dipilih</p>
        <Link href="/" className="text-blue-600 hover:underline">Kembali ke Beranda</Link>
      </div>
    );
  }

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <Link href={`/product/${product.slug}`} className="inline-flex items-center gap-2 text-gray-600 hover:text-[#B8860B] mb-6 transition-colors font-medium">
        <FaArrowLeft /> Back to Product
      </Link>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
        <BookingForm product={product} />
      </div>

      <div className="text-center text-gray-400 text-xs">
        &copy; 2025 Ngodingbentar. All rights reserved.
      </div>
    </div>
  );
};

export default BookPage;
