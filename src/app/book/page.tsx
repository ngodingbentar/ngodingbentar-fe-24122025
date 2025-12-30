import { getProductBySlug } from "@/app/services";
import { notFound } from "next/navigation";
import BookingForm from "../product/_components/BookingForm";
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
        <Link href="/" className="text-blue-600 hover:underline">Back to Home</Link>
      </div>
    );
  }

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    // <div className="bg-gray-50 min-h-screen py-8">
    <div className="">
      <div className="">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <BookingForm product={product} />
        </div>

        <div className="text-center text-gray-400 text-xs">
          &copy; 2025 Ngodingbentar. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default BookPage;
