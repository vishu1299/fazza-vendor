"use client";

import { useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BarChart3,
  ShoppingBag,
  Package,
  Warehouse,
  DollarSign,
  LifeBuoy,
  Settings,
  LogOut,
  Search,
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  hasSubmenu?: boolean;
  submenu?: { label: string; href: string; iconPath?: string }[];
}

const sidebarItems: SidebarItem[] = [
  { icon: BarChart3, label: "Overview", href: "/dashboard" },
  {
    icon: ShoppingBag,
    label: "Orders",
    href: "/dashboard/orders",
    hasSubmenu: true,
    submenu: [
      {
        label: "All Orders",
        href: "/dashboard/orders",
        iconPath: "/order-icons/all-orders.svg",
      },
      {
        label: "New Orders",
        href: "/dashboard/orders/new",
        iconPath: "/order-icons/new-orders.svg",
      },
      {
        label: "Processing",
        href: "/dashboard/orders/processing",
        iconPath: "/order-icons/processing.svg",
      },
      {
        label: "Shipped",
        href: "/dashboard/orders/shipped",
        iconPath: "/order-icons/export.svg",
      },
      {
        label: "Delivered",
        href: "/dashboard/orders/delivered",
        iconPath: "/order-icons/delivered.svg",
      },
      {
        label: "Cancelled",
        href: "/dashboard/orders/cancelled",
        iconPath: "/order-icons/canceled.svg",
      },
      {
        label: "Returned",
        href: "/dashboard/orders/returned",
        iconPath: "/order-icons/returned.svg",
      },
    ],
  },
  { icon: Package, label: "Products", href: "/dashboard/products" },
  {
    icon: Warehouse,
    label: "Inventory Management",
    href: "/dashboard/inventory",
    hasSubmenu: true,
    submenu: [
      {
        label: "Inventory Management",
        href: "/dashboard/inventory",
      },
      {
        label: "Live Ready Tagging",
        href: "/dashboard/inventory/live-ready-tagging",
      },
    ],
  },
  {
    icon: DollarSign,
    label: "Payout & Financial Center",
    href: "/dashboard/payout",
    hasSubmenu: true,
    submenu: [
      {
        label: "Payout History",
        href: "/dashboard/payout/history",
        iconPath: "/payout/PayoutHistory.svg",
      },
      {
        label: "Transaction History",
        href: "/dashboard/payout/transaction-history",
        iconPath: "/payout/TransactionHistory.svg",
      },
      {
        label: "Commission Breakdown",
        href: "/dashboard/payout/commission-breakdown",
        iconPath: "/payout/Commission Breakdown.svg",
      },
      {
        label: "Net Earnings Calculation",
        href: "/dashboard/payout/net-earning",
        iconPath: "/payout/Calculation.svg",
      },
      {
        label: "Sales by Category / Product",
        href: "/dashboard/payout/sales-categories",
        iconPath: "/payout/SalesCategory.svg",
      },
    ],
  },
  { icon: LifeBuoy, label: "Support", href: "/dashboard/support" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSubmenu = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      // Show logout toast
      toast.success("Logged out successfully!");

      // Simulate logout delay
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <motion.div
      className="flex min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Sidebar */}
      <motion.div
        className="bg-white shadow-lg flex flex-col"
        animate={{
          width: sidebarOpen ? 280 : 64,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        {/* Logo */}
        <div className="px-4 py-5 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center space-x-3">
                <Image
                  src="/Logo.png"
                  alt="Logo"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className=" hover:bg-gray-200 bg-gray-200 rounded-full w-10 h-10  border-[#5e3b91] border-4"
            >
              {sidebarOpen ? (
                <ChevronLeft className="w-4 h-4 rounded-full text-gray-600" />
              ) : (
                <ChevronRight className="w-4 h-4 rounded-full text-gray-600" />
              )}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-5">
          {sidebarItems.map((item) => (
            <div key={item.label}>
              {/* Main Navigation Item */}
              {item.hasSubmenu ? (
                <div
                  className={`group flex items-center justify-between w-full px-3 py-3 rounded-lg transition-all duration-200 cursor-pointer ${
                    isActive(item.href)
                      ? "bg-primary/10 text-primary"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => toggleSubmenu(item.label)}
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <item.icon className="w-6 h-6 flex-shrink-0" />
                    {sidebarOpen && (
                      <span className="text-base font-semibold truncate">
                        {item.label}
                      </span>
                    )}
                  </div>

                  {sidebarOpen && (
                    <ChevronDown
                      className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
                        expandedItems.includes(item.label) ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`group flex items-center w-full px-3 py-3 rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? "bg-primary/10 text-primary"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <item.icon className="w-6 h-6 flex-shrink-0" />
                    {sidebarOpen && (
                      <span className="text-base font-semibold truncate">
                        {item.label}
                      </span>
                    )}
                  </div>
                </Link>
              )}

              {/* Submenu */}
              {item.hasSubmenu &&
                sidebarOpen &&
                expandedItems.includes(item.label) && (
                  <div className="ml-8 mt-1 space-y-2">
                    {item.submenu?.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className={`flex items-center space-x-3 px-3 py-3 text-base rounded-lg transition-colors ${
                          pathname === subItem.href
                            ? "bg-primary/5 text-primary font-semibold"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {subItem.iconPath && (
                          <Image
                            src={subItem.iconPath}
                            alt={`${subItem.label} icon`}
                            width={20}
                            height={20}
                            className="w-6 h-6 object-contain"
                          />
                        )}
                        <span className="truncate text-sm font-medium">
                          {subItem.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="group flex items-center w-full px-3 py-3 rounded-lg transition-all duration-200 text-red-600 hover:bg-red-50"
          >
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <LogOut className="w-6 h-6 flex-shrink-0" />
              {sidebarOpen && (
                <span className="text-base font-semibold truncate">Logout</span>
              )}
            </div>
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="flex-1 flex flex-col overflow-hidden"
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                alt="Admin"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-medium text-gray-900">Hey, Admin Name</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search"
                  className="pl-10 w-64 bg-gray-50 border-gray-200"
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="relative p-2 bg-gray-200"
              >
                <Bell className="w-5 h-5 text-gray-600 " />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <motion.main
          className="flex-1 w-auto h-full overflow-y-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          {children}
        </motion.main>
      </motion.div>
    </motion.div>
  );
}
