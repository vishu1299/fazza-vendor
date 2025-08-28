"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, ChevronDown } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

interface LiveSession {
  id: number;
  seasonName: string;
  vendor: string;
  category: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: string;
  products: number;
  status: "Ready" | "Not Ready";
}

// Initial live session data
const initialLiveSessionData: LiveSession[] = [
  {
    id: 1,
    seasonName: "Summer Collection Preview ID:1",
    vendor: "Fashion Forward Inc.",
    category: "Apparel",
    scheduledDate: "15/08/25",
    scheduledTime: "14:00",
    duration: "60 mins",
    products: 16,
    status: "Ready",
  },
  {
    id: 2,
    seasonName: "Summer Collection Preview ID:1",
    vendor: "Fashion Forward Inc.",
    category: "Apparel",
    scheduledDate: "15/08/25",
    scheduledTime: "14:00",
    duration: "60 mins",
    products: 16,
    status: "Not Ready",
  },
  {
    id: 3,
    seasonName: "Summer Collection Preview ID:1",
    vendor: "Fashion Forward Inc.",
    category: "Apparel",
    scheduledDate: "15/08/25",
    scheduledTime: "14:00",
    duration: "60 mins",
    products: 16,
    status: "Ready",
  },
  {
    id: 4,
    seasonName: "Summer Collection Preview ID:1",
    vendor: "Fashion Forward Inc.",
    category: "Apparel",
    scheduledDate: "15/08/25",
    scheduledTime: "14:00",
    duration: "60 mins",
    products: 16,
    status: "Ready",
  },
  {
    id: 5,
    seasonName: "Summer Collection Preview ID:1",
    vendor: "Fashion Forward Inc.",
    category: "Apparel",
    scheduledDate: "15/08/25",
    scheduledTime: "14:00",
    duration: "60 mins",
    products: 16,
    status: "Ready",
  },
  // Add more items for pagination testing
  {
    id: 6,
    seasonName: "Winter Collection Preview ID:2",
    vendor: "Style Masters Ltd.",
    category: "Accessories",
    scheduledDate: "20/08/25",
    scheduledTime: "16:00",
    duration: "45 mins",
    products: 12,
    status: "Not Ready",
  },
  {
    id: 7,
    seasonName: "Spring Collection Preview ID:3",
    vendor: "Trend Setters Co.",
    category: "Footwear",
    scheduledDate: "25/08/25",
    scheduledTime: "10:00",
    duration: "90 mins",
    products: 24,
    status: "Ready",
  },
];

export default function LiveReadyTagging() {
  // State for live session data
  const [liveSessionData, setLiveSessionData] = useState<LiveSession[]>(
    initialLiveSessionData
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Fixed to 5 items per page as shown in design

  // Filter data based on search and filters
  const filteredItems = liveSessionData.filter((session: LiveSession) => {
    const matchesSearch =
      session.seasonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.vendor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "All Categories" ||
      session.category === categoryFilter;
    const matchesStatus =
      statusFilter === "All" || session.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = filteredItems.slice(startIndex, endIndex);

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

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, statusFilter]);

  // Toggle session status
  const toggleSessionStatus = (id: number) => {
    setLiveSessionData((prevData) =>
      prevData.map((session) =>
        session.id === id
          ? {
              ...session,
              status: session.status === "Ready" ? "Not Ready" : "Ready",
            }
          : session
      )
    );
  };

  // Get unique categories for filter dropdown
  const categories = [
    "All Categories",
    ...Array.from(new Set(liveSessionData.map((session) => session.category))),
  ];
  const statuses = ["All", "Ready", "Not Ready"];

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Live Ready Tagging
          </h1>
          <p className="text-gray-600">
            Manage and tag sessions that are ready for live streaming
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by seasons or vendors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80 h-10"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Category Filter */}
            <div className="flex flex-col space-y-1">
              <Label className="text-sm text-gray-600">Category</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40 h-10">
                  <SelectValue />
                  <ChevronDown className="w-4 h-4" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div className="flex flex-col space-y-1">
              <Label className="text-sm text-gray-600">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32 h-10">
                  <SelectValue />
                  <ChevronDown className="w-4 h-4" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Table */}
        <Card className="bg-white">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-200">
                  <TableHead className="text-gray-600 font-medium py-4 px-6">
                    <span>Season Name</span>
                  </TableHead>
                  <TableHead className="text-gray-600 font-medium py-4 px-6">
                    <span>Vendor</span>
                  </TableHead>
                  <TableHead className="text-gray-600 font-medium py-4 px-6">
                    <span>Category</span>
                  </TableHead>
                  <TableHead className="text-gray-600 font-medium py-4 px-6">
                    <span>Scheduled Date</span>
                  </TableHead>
                  <TableHead className="text-gray-600 font-medium py-4 px-6">
                    <span>Duration</span>
                  </TableHead>
                  <TableHead className="text-gray-600 font-medium py-4 px-6">
                    <span>Products</span>
                  </TableHead>
                  <TableHead className="text-gray-600 font-medium py-4 px-6">
                    <span>Status</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPageItems.map((session: LiveSession) => (
                  <TableRow
                    key={session.id}
                    className="hover:bg-gray-50 transition-colors border-b border-gray-100"
                  >
                    <TableCell className="py-4 px-6">
                      <span className="text-gray-900 font-medium">
                        {session.seasonName}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <span className="text-gray-900">{session.vendor}</span>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <span className="text-gray-900">{session.category}</span>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <div className="text-gray-900">
                        <div>{session.scheduledDate}</div>
                        <div className="text-sm text-gray-500">
                          {session.scheduledTime}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <span className="text-gray-900">{session.duration}</span>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <span className="text-gray-900">{session.products}</span>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <button
                        onClick={() => toggleSessionStatus(session.id)}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                          session.status === "Ready"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-red-100 text-red-800 hover:bg-red-200"
                        }`}
                      >
                        {session.status}
                        <ChevronDown className="w-3 h-3 ml-1 inline" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center py-4">
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
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
