"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DollarSign,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react";

interface CommissionData {
  id: number;
  period: string;
  grossEarnings: number;
  expenses: number;
  taxes: number;
  netEarnings: number;
  status: "Paid" | "Pending";
}

const mockData: CommissionData[] = [
  {
    id: 1,
    period: "January 2024",
    grossEarnings: 15650,
    expenses: 1250,
    taxes: 700,
    netEarnings: 13540,
    status: "Paid",
  },
  {
    id: 1,
    period: "Friday 2024",
    grossEarnings: 15650,
    expenses: 1250,
    taxes: 700,
    netEarnings: 13540,
    status: "Paid",
  },
  {
    id: 1,
    period: "March 2024",
    grossEarnings: 15650,
    expenses: 1250,
    taxes: 700,
    netEarnings: 13540,
    status: "Paid",
  },
  {
    id: 1,
    period: "April 2024",
    grossEarnings: 15650,
    expenses: 1250,
    taxes: 700,
    netEarnings: 13540,
    status: "Paid",
  },
  {
    id: 1,
    period: "May 2024",
    grossEarnings: 15650,
    expenses: 1250,
    taxes: 700,
    netEarnings: 13540,
    status: "Pending",
  },
  {
    id: 1,
    period: "January 2024",
    grossEarnings: 15650,
    expenses: 1250,
    taxes: 700,
    netEarnings: 13540,
    status: "Paid",
  },
  {
    id: 1,
    period: "January 2024",
    grossEarnings: 15650,
    expenses: 1250,
    taxes: 700,
    netEarnings: 13540,
    status: "Paid",
  },
];

export default function NetEarnings() {
  const [selectedYear, setSelectedYear] = useState("2023");
  const [showResults, setShowResults] = useState("4");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Reset to page 1 as default

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const filteredData = mockData.filter((item) =>
    item.period.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const itemsPerPage = Number.parseInt(showResults);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = filteredData.slice(startIndex, endIndex);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleShowResultsChange = (value: string) => {
    setShowResults(value);
    setCurrentPage(1);
  };
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className=" mx-auto space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-gray-900">
              Net Earnings Calculation
            </h1>
            <p className="text-gray-600">Lets check your store Today</p>
          </div>

          {/* Year Selector */}
          <div className="space-y-2">
            <label className="text-sm text-gray-600">Select Year</label>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Earning Summary */}
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <DollarSign className="h-5 w-5 text-green-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Earning Summary
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Gross Earnings</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(32450)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Expenses</p>
                  <p className="text-2xl font-bold text-red-600">
                    {formatCurrency(12560)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Taxes</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {formatCurrency(9650)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Net Earnings</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(42652)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Commission History */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Commission History
            </h2>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Show result</span>
                <Select
                  value={showResults}
                  onValueChange={handleShowResultsChange}
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

              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by SKU, Product Name"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Table */}
            <Card className="bg-white">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b">
                      <TableHead className="text-left py-4 px-6 text-gray-600 font-medium">
                        <div className="flex items-center gap-1">
                          ID <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="text-left py-4 px-6 text-gray-600 font-medium">
                        <div className="flex items-center gap-1">
                          Period <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="text-left py-4 px-6 text-gray-600 font-medium">
                        <div className="flex items-center gap-1">
                          Gross Earnings <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="text-left py-4 px-6 text-gray-600 font-medium">
                        <div className="flex items-center gap-1">
                          Expenses <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="text-left py-4 px-6 text-gray-600 font-medium">
                        <div className="flex items-center gap-1">
                          Taxes <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="text-left py-4 px-6 text-gray-600 font-medium">
                        <div className="flex items-center gap-1">
                          Net Earnings <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="text-left py-4 px-6 text-gray-600 font-medium">
                        <div className="flex items-center gap-1">
                          Status <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayedData.map((item, index) => (
                      <TableRow
                        key={index}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <TableCell className="py-4 px-6 text-gray-900 font-medium">
                          {item.id}
                        </TableCell>
                        <TableCell className="py-4 px-6 text-gray-900">
                          {item.period}
                        </TableCell>
                        <TableCell className="py-4 px-6 text-gray-900 font-medium">
                          {formatCurrency(item.grossEarnings)}
                        </TableCell>
                        <TableCell className="py-4 px-6 text-gray-900">
                          {formatCurrency(item.expenses)}
                        </TableCell>
                        <TableCell className="py-4 px-6 text-gray-900">
                          {formatCurrency(item.taxes)}
                        </TableCell>
                        <TableCell className="py-4 px-6 font-bold text-green-600">
                          {formatCurrency(item.netEarnings)}
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

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={
                        currentPage === page
                          ? "bg-purple-600 text-white hover:bg-purple-700"
                          : "text-gray-600 hover:text-gray-900"
                      }
                    >
                      {page}
                    </Button>
                  )
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
