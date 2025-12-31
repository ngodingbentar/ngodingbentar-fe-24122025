"use client";

import { useOrderStore } from "@/store/useOrderStore";
import { formatNumber } from "@/app/utils";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";

export const OrderList = () => {
  // Client-side hydration safety
  const [mounted, setMounted] = useState(false);
  const { orders } = useOrderStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="p-8 text-center text-gray-500">Loading orders...</div>;

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Belum ada pesanan</h3>
        <Link
          href="/"
          className="px-6 mt-2 py-2 bg-[#B8860B] text-white rounded-lg hover:bg-[#9DA50E] transition-colors font-medium"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {orders.map((order) => (
        <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-48 h-32 relative shrink-0 rounded-lg overflow-hidden bg-gray-200">
              <Image
                src={`/product-images/${order.product.image}`}
                alt={order.product.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-1">{order.product.name}</h3>
                  <div className="text-sm text-gray-500">Order ID: {order.id.slice(0, 8)}...</div>
                </div>
                <div className="mt-2 md:mt-0 text-right">
                  <div className="text-sm text-gray-500">Total Pembayaran</div>
                  <div className="text-xl font-bold text-[#B8860B]">Rp {formatNumber(order.paymentDetails.total)}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 bg-gray-50/50 p-4 rounded-lg border border-gray-100">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-gray-400" />
                  <div>
                    <div className="text-xs text-gray-400">Tanggal Mulai</div>
                    <div className="font-medium">
                      {new Date(order.bookingDetails.pickupDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <FaClock className="text-gray-400" />
                  <div>
                    <div className="text-xs text-gray-400">Durasi</div>
                    <div className="font-medium">{order.bookingDetails.duration} Hari</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-gray-400" />
                  <div>
                    <div className="text-xs text-gray-400">Lokasi Pengambilan</div>
                    <div className="font-medium">{order.bookingDetails.pickupLoc}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-gray-400" />
                  <div>
                    <div className="text-xs text-gray-400">Lokasi Pengembalian</div>
                    <div className="font-medium">{order.bookingDetails.returnLoc}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
