"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function Support() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Support</h1>
          <p className="text-gray-600">Get help and support</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Support Center</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-600">Support page content will be implemented here.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
