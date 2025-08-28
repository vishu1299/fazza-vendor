"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure your account and preferences</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Account Settings</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-600">Settings page content will be implemented here.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
