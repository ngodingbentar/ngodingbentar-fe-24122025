import { getProductBySlug } from "@/app/services";
import { notFound } from "next/navigation";
import BookingForm from "../products/_components/BookingForm";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{ slug?: string }>;
}

const BookPage = async ({ searchParams }: PageProps) => {
  const { slug } = await searchParams;

  if (!slug) {
    return (
      <div className="container mx-auto p-8 text-center bg-gray-50 min-h-screen flex items-center justify-center flex-col">
        <p className="text-gray-600 mb-4">No product specified.</p>
        <Link href="/" className="text-blue-600 hover:underline">Return to Home</Link>
      </div>
    );
  }

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Simple Header */}
        <div className="flex items-center gap-4 mb-4">
          <Link href={`/products/${slug}`}>
            <div className="relative w-24 h-8 cursor-pointer">
              <span className="text-xl font-bold font-serif italic text-gray-800">PONDOK LENSA</span>
            </div>
          </Link>
          <div className="h-6 w-px bg-gray-300 mx-2"></div>
          <span className="text-gray-500 text-sm">Photo & Video Equipment Rental</span>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b">
            <h1 className="font-bold text-2xl italic font-serif text-gray-900">d. Book Now</h1>
          </div>

          <BookingForm product={product} />
        </div>

        <div className="text-center text-gray-400 text-xs">
          &copy; 2025 Pondok Lensa. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default BookPage;
