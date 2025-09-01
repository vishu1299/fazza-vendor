"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Image from "next/image";

type NotificationType = "all" | "orders" | "payment" | "stock";

interface Notification {
  id: string;
  type: "order" | "payment" | "stock";
  title: string;
  message: string;
  time: string;
  icon: string;
  iconBg: string;
}

const allNotifications: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "New Order Received",
    message: '"Order #12345 placed for 2x Nike Running Shoes."',
    time: "5 min ago",
    icon: "👟",
    iconBg: "bg-blue-100"
  },
  {
    id: "2",
    type: "order",
    title: "Order Cancelled",
    message: '"Order #12345 placed for Redmi note 14 5g"',
    time: "1 hour ago",
    icon: "📱",
    iconBg: "bg-gray-100"
  },
  {
    id: "3",
    type: "payment",
    title: "Payout Processed",
    message: '"₹12,500 has been credited to your bank account."',
    time: "5 min ago",
    icon: "💰",
    iconBg: "bg-yellow-100"
  },
  {
    id: "4",
    type: "payment",
    title: "Refund Issued",
    message: "₹1,299 refunded for Order #12211.",
    time: "5 min ago",
    icon: "💳",
    iconBg: "bg-orange-100"
  },
  {
    id: "5",
    type: "stock",
    title: "Low Stock Alert",
    message: 'Only 4 pcs left for "Red Tshirt".',
    time: "5 min ago",
    icon: "👕",
    iconBg: "bg-red-100"
  },
  {
    id: "6",
    type: "stock",
    title: "Low Stock Alert",
    message: '"Blue Kurti" is now out of stock.',
    time: "5 min ago",
    icon: "👗",
    iconBg: "bg-blue-100"
  }
];

export default function NotificationsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<NotificationType>("all");

  const getFilteredNotifications = () => {
    if (activeTab === "all") return allNotifications;
    return allNotifications.filter(notification => notification.type === activeTab);
  };

  const getTabButtonClass = (tab: NotificationType) => {
    return activeTab === tab
      ? "px-4 py-2 rounded-full bg-purple-600 text-white text-sm font-medium"
      : "px-4 py-2 rounded-full bg-white text-gray-600 text-sm font-medium border border-gray-300 hover:bg-gray-50";
  };

  return (
    <DashboardLayout>
      <div className="p-8 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
          <p className="text-gray-600">All Your Seller Notifications in One Place</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-8">
          <Button
            onClick={() => setActiveTab("all")}
            className={getTabButtonClass("all")}
            variant="ghost"
          >
            All Notifications
          </Button>
          <Button
            onClick={() => setActiveTab("orders")}
            className={getTabButtonClass("orders")}
            variant="ghost"
          >
            Orders
          </Button>
          <Button
            onClick={() => setActiveTab("payment")}
            className={getTabButtonClass("payment")}
            variant="ghost"
          >
            Payment
          </Button>
          <Button
            onClick={() => setActiveTab("stock")}
            className={getTabButtonClass("stock")}
            variant="ghost"
          >
            Stock
          </Button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {getFilteredNotifications().map((notification) => (
            <div
              key={notification.id}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg ${notification.iconBg} flex items-center justify-center text-xl flex-shrink-0`}>
                  {notification.icon}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {notification.title}
                        {notification.type === "order" && notification.title.includes("Cancelled") && (
                          <span className="ml-2 text-red-500">✕</span>
                        )}
                        {notification.type === "order" && notification.title.includes("New Order") && (
                          <span className="ml-2 text-yellow-500">!</span>
                        )}
                        {notification.type === "payment" && notification.title.includes("Payout") && (
                          <span className="ml-2 text-green-500">$</span>
                        )}
                        {notification.type === "payment" && notification.title.includes("Refund") && (
                          <span className="ml-2 text-orange-500">⚠</span>
                        )}
                        {notification.type === "stock" && (
                          <span className="ml-2 text-orange-500">⚠</span>
                        )}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs mt-2">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {getFilteredNotifications().length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔔</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-500">You're all caught up! No new notifications to show.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
