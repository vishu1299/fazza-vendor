"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Search, TrendingUp } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Sample data for commission history
const commissionData = [
  {
    id: 1,
    period: "January 2024",
    grossEarnings: 15650.0,
    expenses: 1250.0,
    taxes: 700.0,
    netEarnings: 13540.0,
    status: "Paid",
  },
  {
    id: 2,
    period: "Friday 2024",
    grossEarnings: 15650.0,
    expenses: 1250.0,
    taxes: 700.0,
    netEarnings: 13540.0,
    status: "Paid",
  },
  {
    id: 3,
    period: "March 2024",
    grossEarnings: 15650.0,
    expenses: 1250.0,
    taxes: 700.0,
    netEarnings: 13540.0,
    status: "Paid",
  },
  {
    id: 4,
    period: "April 2024",
    grossEarnings: 15650.0,
    expenses: 1250.0,
    taxes: 700.0,
    netEarnings: 13540.0,
    status: "Paid",
  },
  {
    id: 5,
    period: "May 2024",
    grossEarnings: 15650.0,
    expenses: 1250.0,
    taxes: 700.0,
    netEarnings: 13540.0,
    status: "Pending",
  },
  {
    id: 6,
    period: "January 2024",
    grossEarnings: 15650.0,
    expenses: 1250.0,
    taxes: 700.0,
    netEarnings: 13540.0,
    status: "Paid",
  },
  {
    id: 7,
    period: "January 2024",
    grossEarnings: 15650.0,
    expenses: 1250.0,
    taxes: 700.0,
    netEarnings: 13540.0,
    status: "Paid",
  },
  {
    id: 8,
    period: "February 2024",
    grossEarnings: 15650.0,
    expenses: 1250.0,
    taxes: 700.0,
    netEarnings: 13540.0,
    status: "Paid",
  },
  {
    id: 9,
    period: "March 2024",
    grossEarnings: 15650.0,
    expenses: 1250.0,
    taxes: 700.0,
    netEarnings: 13540.0,
    status: "Pending",
  },
  {
    id: 10,
    period: "April 2024",
    grossEarnings: 15650.0,
    expenses: 1250.0,
    taxes: 700.0,
    netEarnings: 13540.0,
    status: "Paid",
  },
];

export default function SalesCategory() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedProduct, setSelectedProduct] = useState("All Products");
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data based on search term
  const filteredData = useMemo(() => {
    return commissionData.filter((item) =>
      item.period.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Reset to page 1 when search or items per page changes
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number.parseInt(value));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-gray-900">
              Sales Analysis by Category/Product
            </h1>
            <p className="text-sm text-gray-600">Lets check your store Today</p>
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-600">Category</label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Categories">All Categories</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Clothing">Clothing</SelectItem>
                  <SelectItem value="Books">Books</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-600">Products</label>
              <Select
                value={selectedProduct}
                onValueChange={setSelectedProduct}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Products">All Products</SelectItem>
                  <SelectItem value="Product A">Product A</SelectItem>
                  <SelectItem value="Product B">Product B</SelectItem>
                  <SelectItem value="Product C">Product C</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Sales Summary */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg font-medium text-gray-900">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Sales Summary ( All Categories )
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Total Sales</p>
                  <p className="text-2xl font-semibold text-blue-600">
                    ₹546.00
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Total Quantity</p>
                  <p className="text-2xl font-semibold text-purple-600">
                    10 Units
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">AVG. Unit Price</p>
                  <p className="text-2xl font-semibold text-orange-500">
                    ₹1600.00
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Commission History */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Commission History
            </h2>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Show result</span>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={handleItemsPerPageChange}
                >
                  <SelectTrigger className="w-16">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="8">8</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by SKU, Product Name"
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>

            {/* Table */}
            <Card className="bg-white">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-gray-200">
                      <TableHead className="text-left py-4 px-6 text-gray-600 font-medium">
                        ID
                      </TableHead>
                      <TableHead className="text-left py-4 px-6 text-gray-600 font-medium">
                        Period
                      </TableHead>
                      <TableHead className="text-left py-4 px-6 text-gray-600 font-medium">
                        Gross Earnings
                      </TableHead>
                      <TableHead className="text-left py-4 px-6 text-gray-600 font-medium">
                        Expenses
                      </TableHead>
                      <TableHead className="text-left py-4 px-6 text-gray-600 font-medium">
                        Taxes
                      </TableHead>
                      <TableHead className="text-left py-4 px-6 text-gray-600 font-medium">
                        Net Earnings
                      </TableHead>
                      <TableHead className="text-left py-4 px-6 text-gray-600 font-medium">
                        Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentData.map((item) => (
                      <TableRow
                        key={item.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <TableCell className="py-4 px-6 text-gray-900 font-medium">
                          {item.id}
                        </TableCell>
                        <TableCell className="py-4 px-6 text-gray-900">
                          {item.period}
                        </TableCell>
                        <TableCell className="py-4 px-6 text-gray-900 font-medium">
                          ₹{item.grossEarnings.toLocaleString()}.00
                        </TableCell>
                        <TableCell className="py-4 px-6 text-gray-900">
                          ₹{item.expenses.toLocaleString()}.00
                        </TableCell>
                        <TableCell className="py-4 px-6 text-gray-900">
                          ₹{item.taxes.toLocaleString()}.00
                        </TableCell>
                        <TableCell className="py-4 px-6 font-bold text-green-600">
                          ₹{item.netEarnings.toLocaleString()}.00
                        </TableCell>
                        <TableCell className="py-4 px-6">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              item.status === "Paid"
                                ? "bg-green-100 text-green-800"
                                : "bg-orange-100 text-orange-800"
                            }`}
                          >
                            {item.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          handlePageChange(Math.max(1, currentPage - 1))
                        }
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
                            onClick={() => handlePageChange(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          handlePageChange(
                            Math.min(totalPages, currentPage + 1)
                          )
                        }
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
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
