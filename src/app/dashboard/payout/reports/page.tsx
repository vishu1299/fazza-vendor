"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function PayoutReports() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Financial Reports</h1>
          <p className="text-gray-600">View detailed financial reports and analytics</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Reports Overview</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-600">Financial reports content will be implemented here.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
