"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function PendingOrders() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Pending Orders</h1>
          <p className="text-gray-600">View and manage pending orders</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Pending Orders List</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-600">Pending orders content will be implemented here.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
