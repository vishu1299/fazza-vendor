"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DollarSign,
  Clock,
  BarChart3,
  Percent,
  ArrowUpDown,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function PayoutHistory() {
  const [currentPage, setCurrentPage] = useState(1); // Default page 1
  const totalPages = 4;

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
            Payout & Finance Center
          </h1>
          <p className="text-gray-600">Lets check your store Today</p>
        </div>

        {/* Available Balance Card */}
        <Card className="bg-white mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Available Balance
                  </h3>
                  <p className="text-sm text-gray-600">Current Balance</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">
                    ₹36,532.00
                  </p>
                </div>
              </div>
              <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2">
                <DollarSign className="w-4 h-4 mr-2" />
                Request Payout
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Pending Balance */}
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Pending Balance
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">Awaiting Clearance</p>
              <p className="text-2xl font-bold text-orange-600">₹5,650.00</p>
            </CardContent>
          </Card>

          {/* Total Transactions */}
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Total Transactions
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                All time transactions
              </p>
              <p className="text-2xl font-bold text-gray-900">64</p>
            </CardContent>
          </Card>

          {/* Completion Rate */}
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Percent className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Completion Rate
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Orders completed (by count)
              </p>
              <p className="text-2xl font-bold text-blue-600">0.0%</p>
            </CardContent>
          </Card>
        </div>

        {/* Transaction Breakdown */}
        <Card className="bg-white mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <ArrowUpDown className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Transaction Breadown
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Completed Orders */}
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Completed Orders
                </h4>
                <p className="text-xs text-gray-600 mb-3">Ready for payout</p>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-green-600">5</span>
                  <span className="text-sm text-green-600 font-medium">
                    ( ₹20,648.00 )
                  </span>
                </div>
              </div>

              {/* Pending Orders */}
              <div className="bg-orange-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Pending Orders
                </h4>
                <p className="text-xs text-gray-600 mb-3">
                  Processing / Shipped
                </p>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-orange-600">24</span>
                  <span className="text-sm text-orange-600 font-medium">
                    ( ₹2,460.00 )
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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
