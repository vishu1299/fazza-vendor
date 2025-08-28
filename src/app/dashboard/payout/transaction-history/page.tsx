"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, ArrowUpDown, CreditCard } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

interface Transaction {
  id: number;
  sNo: string;
  transactionId: string;
  amount: number;
  status: "Pending" | "Completed" | "Failed";
  paymentMethod: string;
  date: string;
}

// Initial transaction data - More data for proper pagination
const initialTransactionData: Transaction[] = [
  {
    id: 1,
    sNo: "#T112450",
    transactionId: "ORD0878",
    amount: 12000.0,
    status: "Pending",
    paymentMethod: "Credit Card",
    date: "25 Aug 2025",
  },
  {
    id: 2,
    sNo: "#T112451",
    transactionId: "ORD0879",
    amount: 15000.0,
    status: "Completed",
    paymentMethod: "Credit Card",
    date: "24 Aug 2025",
  },
  {
    id: 3,
    sNo: "#T112452",
    transactionId: "ORD0880",
    amount: 8500.0,
    status: "Pending",
    paymentMethod: "C.O.D",
    date: "23 Aug 2025",
  },
  {
    id: 4,
    sNo: "#T112453",
    transactionId: "ORD0881",
    amount: 22000.0,
    status: "Failed",
    paymentMethod: "Credit Card",
    date: "22 Aug 2025",
  },
  {
    id: 5,
    sNo: "#T112454",
    transactionId: "ORD0882",
    amount: 9800.0,
    status: "Completed",
    paymentMethod: "Credit Card",
    date: "21 Aug 2025",
  },
  {
    id: 6,
    sNo: "#T112455",
    transactionId: "ORD0883",
    amount: 13500.0,
    status: "Pending",
    paymentMethod: "C.O.D",
    date: "20 Aug 2025",
  },
  {
    id: 7,
    sNo: "#T112456",
    transactionId: "ORD0884",
    amount: 18000.0,
    status: "Completed",
    paymentMethod: "Credit Card",
    date: "19 Aug 2025",
  },
  {
    id: 8,
    sNo: "#T112457",
    transactionId: "ORD0885",
    amount: 7200.0,
    status: "Pending",
    paymentMethod: "Credit Card",
    date: "18 Aug 2025",
  },
  {
    id: 9,
    sNo: "#T112458",
    transactionId: "ORD0886",
    amount: 25000.0,
    status: "Completed",
    paymentMethod: "Credit Card",
    date: "17 Aug 2025",
  },
  {
    id: 10,
    sNo: "#T112459",
    transactionId: "ORD0887",
    amount: 11200.0,
    status: "Failed",
    paymentMethod: "C.O.D",
    date: "16 Aug 2025",
  },
  {
    id: 11,
    sNo: "#T112460",
    transactionId: "ORD0888",
    amount: 16800.0,
    status: "Pending",
    paymentMethod: "Credit Card",
    date: "15 Aug 2025",
  },
  {
    id: 12,
    sNo: "#T112461",
    transactionId: "ORD0889",
    amount: 14300.0,
    status: "Completed",
    paymentMethod: "Credit Card",
    date: "14 Aug 2025",
  },
];

export default function TransactionHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResult, setShowResult] = useState("4");
  const [currentPage, setCurrentPage] = useState(1); // Default to page 1
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Transaction | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const totalPages = 4;

  // Filter transactions based on search term
  const filteredTransactions = initialTransactionData.filter(
    (transaction) =>
      transaction.sNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.transactionId
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort transactions
  const sortedTransactions = React.useMemo(() => {
    if (!sortConfig.key) return filteredTransactions;

    return [...filteredTransactions].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredTransactions, sortConfig]);

  // Paginate transactions
  const itemsPerPage = parseInt(showResult);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = sortedTransactions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSort = (key: keyof Transaction) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            Pending
          </span>
        );
      case "Completed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Completed
          </span>
        );
      case "Failed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Failed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    if (method === "Credit Card") {
      return <CreditCard className="w-4 h-4 text-gray-500" />;
    }
    return <div className="w-4 h-4 bg-gray-400 rounded"></div>;
  };

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Transaction History
          </h1>
          <p className="text-gray-600">Lets check your store Today</p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Show result</span>
              <Select value={showResult} onValueChange={setShowResult}>
                <SelectTrigger className="w-16">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="8">8</SelectItem>
                  <SelectItem value="12">12</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by SKU, Product Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                  <TableHead className="text-left py-4 px-6">
                    <button
                      onClick={() => handleSort("sNo")}
                      className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
                    >
                      <span>S.No</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </TableHead>
                  <TableHead className="text-left py-4 px-6">
                    <button
                      onClick={() => handleSort("transactionId")}
                      className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
                    >
                      <span>Transaction ID</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </TableHead>
                  <TableHead className="text-left py-4 px-6">
                    <button
                      onClick={() => handleSort("amount")}
                      className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
                    >
                      <span>Amount</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </TableHead>
                  <TableHead className="text-left py-4 px-6">
                    <button
                      onClick={() => handleSort("status")}
                      className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
                    >
                      <span>Status</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </TableHead>
                  <TableHead className="text-left py-4 px-6">
                    <button
                      onClick={() => handleSort("paymentMethod")}
                      className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
                    >
                      <span>Payment Method</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </TableHead>
                  <TableHead className="text-left py-4 px-6">
                    <button
                      onClick={() => handleSort("date")}
                      className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
                    >
                      <span>Date</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTransactions.map((transaction) => (
                  <TableRow
                    key={transaction.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <TableCell className="py-4 px-6 text-gray-900">
                      {transaction.sNo}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-900">
                      {transaction.transactionId}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-900 font-medium">
                      ₹{transaction.amount.toLocaleString()}.00
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      {getStatusBadge(transaction.status)}
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        {getPaymentMethodIcon(transaction.paymentMethod)}
                        <span className="text-gray-900">
                          {transaction.paymentMethod}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-900">
                      {transaction.date}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
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
