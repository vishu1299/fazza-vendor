"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  TrendingUp,
  DollarSign,
  Percent,
  ShoppingBag,
  Calendar,
  PieChart,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

interface CommissionData {
  id: number;
  category: string;
  totalSales: number;
  commissionRate: number;
  commissionEarned: number;
  orders: number;
  period: string;
}

const commissionData: CommissionData[] = [
  {
    id: 1,
    category: "Electronics",
    totalSales: 45000,
    commissionRate: 8.5,
    commissionEarned: 3825,
    orders: 12,
    period: "Aug 2025",
  },
  {
    id: 2,
    category: "Fashion",
    totalSales: 32000,
    commissionRate: 12.0,
    commissionEarned: 3840,
    orders: 18,
    period: "Aug 2025",
  },
  {
    id: 3,
    category: "Home & Garden",
    totalSales: 28000,
    commissionRate: 10.0,
    commissionEarned: 2800,
    orders: 15,
    period: "Aug 2025",
  },
  {
    id: 4,
    category: "Sports",
    totalSales: 22000,
    commissionRate: 9.5,
    commissionEarned: 2090,
    orders: 8,
    period: "Aug 2025",
  },
  {
    id: 5,
    category: "Books",
    totalSales: 15000,
    commissionRate: 15.0,
    commissionEarned: 2250,
    orders: 25,
    period: "Aug 2025",
  },
];

export default function CommissionBreakdown() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  const totalSales = commissionData.reduce(
    (sum, item) => sum + item.totalSales,
    0
  );
  const totalCommission = commissionData.reduce(
    (sum, item) => sum + item.commissionEarned,
    0
  );
  const totalOrders = commissionData.reduce(
    (sum, item) => sum + item.orders,
    0
  );
  const avgCommissionRate =
    commissionData.reduce((sum, item) => sum + item.commissionRate, 0) /
    commissionData.length;

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Commission Breakdown
          </h1>
          <p className="text-gray-600">Lets check your store Today</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Sales</p>
                  <p className="text-xl font-bold text-gray-900">
                    ₹{totalSales.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Commission</p>
                  <p className="text-xl font-bold text-green-600">
                    ₹{totalCommission.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-xl font-bold text-gray-900">
                    {totalOrders}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Percent className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg Commission Rate</p>
                  <p className="text-xl font-bold text-orange-600">
                    {avgCommissionRate.toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Commission Breakdown Table */}
        <Card className="bg-white mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="w-5 h-5 text-gray-600" />
              <span>Commission Breakdown by Category</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-200">
                  <TableHead className="text-left py-4">Category</TableHead>
                  <TableHead className="text-left py-4">Total Sales</TableHead>
                  <TableHead className="text-left py-4">
                    Commission Rate
                  </TableHead>
                  <TableHead className="text-left py-4">
                    Commission Earned
                  </TableHead>
                  <TableHead className="text-left py-4">Orders</TableHead>
                  <TableHead className="text-left py-4">Performance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commissionData.map((item) => (
                  <TableRow
                    key={item.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <TableCell className="py-4">
                      <div className="font-medium text-gray-900">
                        {item.category}
                      </div>
                      <div className="text-sm text-gray-500">{item.period}</div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="font-medium text-gray-900">
                        ₹{item.totalSales.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">
                          {item.commissionRate}%
                        </span>
                        <div className="w-16 h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-blue-500 rounded-full"
                            style={{
                              width: `${(item.commissionRate / 15) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="font-bold text-green-600">
                        ₹{item.commissionEarned.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="font-medium text-gray-900">
                        {item.orders}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="w-full">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-600">
                            Performance
                          </span>
                          <span className="text-xs text-gray-600">
                            {Math.round((item.totalSales / totalSales) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{
                              width: `${(item.totalSales / totalSales) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Commission Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Top Performing Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-green-600">Fashion</p>
                  <p className="text-sm text-gray-600">
                    Highest commission earned
                  </p>
                  <p className="text-lg font-semibold text-gray-900 mt-2">
                    ₹3,840
                  </p>
                </div>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Highest Commission Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-blue-600">Books</p>
                  <p className="text-sm text-gray-600">
                    Best commission percentage
                  </p>
                  <p className="text-lg font-semibold text-gray-900 mt-2">
                    15.0%
                  </p>
                </div>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Percent className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pagination */}
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={goToPreviousPage}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => goToPage(page)}
                      isActive={currentPage === page}
                      className={`cursor-pointer ${
                        currentPage === page
                          ? "bg-purple-600 text-white hover:bg-purple-700 border-purple-600"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={goToNextPage}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </DashboardLayout>
  );
}
