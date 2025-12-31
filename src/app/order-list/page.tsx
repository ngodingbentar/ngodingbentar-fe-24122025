import { OrderList } from "./_components/OrderList";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function OrderListPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-[#B8860B] transition-colors font-medium">
          <FaArrowLeft /> Back to Home
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Orders</h1>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden min-h-[400px]">
        <OrderList />
      </div>

      <div className="mt-8 text-center text-gray-400 text-xs">
        &copy; 2025 Ngodingbentar. All rights reserved.
      </div>
    </div>
  );
}
