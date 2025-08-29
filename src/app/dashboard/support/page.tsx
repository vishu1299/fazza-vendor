"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Search, Filter, Eye, Edit, ArrowUpDown } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

// Support ticket interface
interface SupportTicket {
  id: string;
  ticketId: string;
  issueType: string;
  customerName: string;
  orderId: string;
  dateCreated: string;
  status: "Open" | "In Progress" | "Resolved" | "Closed";
}

// Sample support tickets data
const supportTicketsData: SupportTicket[] = [
  {
    id: "1",
    ticketId: "#T112450",
    issueType: "Refund Request",
    customerName: "Rohan Sharma",
    orderId: "#434234F",
    dateCreated: "05 Aug 2025",
    status: "Open",
  },
  {
    id: "2",
    ticketId: "#T112451",
    issueType: "Payment Failed",
    customerName: "Rohan Sharma",
    orderId: "#434234F",
    dateCreated: "05 Aug 2025",
    status: "In Progress",
  },
  {
    id: "3",
    ticketId: "#T112452",
    issueType: "Wrong Item",
    customerName: "Rohan Sharma",
    orderId: "#434234F",
    dateCreated: "05 Aug 2025",
    status: "Resolved",
  },
  {
    id: "4",
    ticketId: "#T112453",
    issueType: "Delivery Delay",
    customerName: "Rohan Sharma",
    orderId: "#434234F",
    dateCreated: "05 Aug 2025",
    status: "Closed",
  },
  {
    id: "5",
    ticketId: "#T112454",
    issueType: "Delivery Delay",
    customerName: "Rohan Sharma",
    orderId: "#434234F",
    dateCreated: "05 Aug 2025",
    status: "Closed",
  },
  {
    id: "6",
    ticketId: "#T112455",
    issueType: "Product Quality",
    customerName: "Priya Singh",
    orderId: "#434235F",
    dateCreated: "04 Aug 2025",
    status: "Open",
  },
  {
    id: "7",
    ticketId: "#T112456",
    issueType: "Billing Issue",
    customerName: "Amit Kumar",
    orderId: "#434236F",
    dateCreated: "04 Aug 2025",
    status: "In Progress",
  },
  {
    id: "8",
    ticketId: "#T112457",
    issueType: "Account Access",
    customerName: "Sneha Patel",
    orderId: "#434237F",
    dateCreated: "03 Aug 2025",
    status: "Resolved",
  },
];

export default function Support() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] =
    useState<keyof SupportTicket>("dateCreated");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(
    null
  );
  const router = useRouter();

  const itemsPerPage = 5;

  // Filter and search functionality
  const filteredTickets = supportTicketsData.filter(
    (ticket) =>
      ticket.ticketId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.issueType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort functionality
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (sortDirection === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedTickets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTickets = sortedTickets.slice(startIndex, endIndex);

  const handleSort = (field: keyof SupportTicket) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleTicketClick = (ticket: SupportTicket) => {
    // Navigate to ticket details page - remove # from ticketId for URL
    const cleanTicketId = ticket.ticketId.replace("#", "");
    console.log("Navigating to:", `/dashboard/support/${cleanTicketId}`);
    alert(
      `Clicking on ticket: ${ticket.ticketId}. Navigating to: /dashboard/support/${cleanTicketId}`
    );
    router.push(`/dashboard/support/${cleanTicketId}`);
  };

  const handleViewTicket = (ticket: SupportTicket) => {
    // Navigate to ticket details page - remove # from ticketId for URL
    const cleanTicketId = ticket.ticketId.replace("#", "");
    router.push(`/dashboard/support/${cleanTicketId}`);
  };

  const handleEditTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setEditModalOpen(true);
  };

  const handleStatusUpdate = async (newStatus: string) => {
    if (selectedTicket) {
      // In a real app, you'd update the state or make an API call
      alert(`Ticket ${selectedTicket.ticketId} status updated to ${newStatus}`);
      setEditModalOpen(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      Open: "bg-orange-100 text-orange-800",
      "In Progress": "bg-blue-100 text-blue-800",
      Resolved: "bg-green-100 text-green-800",
      Closed: "bg-gray-100 text-gray-800",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          statusStyles[status as keyof typeof statusStyles] ||
          "bg-gray-100 text-gray-800"
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Support</h1>
          <p className="text-gray-600">Lets fix all the issues.</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by Ticket ID, User/Business"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white border-gray-200"
            />
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-white border-gray-200"
          >
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>

        {/* Support Tickets Table */}
        <Card className="bg-white">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-200">
                  <TableHead className="text-left py-4 px-6 text-gray-600 font-medium">
                    <button
                      onClick={() => handleSort("ticketId")}
                      className="flex items-center gap-1 hover:text-gray-900"
                    >
                      Ticket ID <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </TableHead>
                  <TableHead className="text-left py-4 px-6 text-gray-600 font-medium">
                    <button
                      onClick={() => handleSort("issueType")}
                      className="flex items-center gap-1 hover:text-gray-900"
                    >
                      Issue Type <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </TableHead>
                  <TableHead className="text-left py-4 px-6 text-gray-600 font-medium">
                    <button
                      onClick={() => handleSort("customerName")}
                      className="flex items-center gap-1 hover:text-gray-900"
                    >
                      Customer Name <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </TableHead>
                  <TableHead className="text-left py-4 px-6 text-gray-600 font-medium">
                    <button
                      onClick={() => handleSort("orderId")}
                      className="flex items-center gap-1 hover:text-gray-900"
                    >
                      Order ID <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </TableHead>
                  <TableHead className="text-left py-4 px-6 text-gray-600 font-medium">
                    <button
                      onClick={() => handleSort("dateCreated")}
                      className="flex items-center gap-1 hover:text-gray-900"
                    >
                      Date Created <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </TableHead>
                  <TableHead className="text-left py-4 px-6 text-gray-600 font-medium">
                    <button
                      onClick={() => handleSort("status")}
                      className="flex items-center gap-1 hover:text-gray-900"
                    >
                      Status <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </TableHead>
                  <TableHead className="text-left py-4 px-6 text-gray-600 font-medium">
                    Quick Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentTickets.map((ticket) => (
                  <TableRow
                    key={ticket.id}
                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleTicketClick(ticket)}
                  >
                    <TableCell className="py-4 px-6 text-gray-900 font-medium">
                      {ticket.ticketId}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-900">
                      {ticket.issueType}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-900">
                      {ticket.customerName}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-900">
                      {ticket.orderId}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-900">
                      {ticket.dateCreated}
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      {getStatusBadge(ticket.status)}
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewTicket(ticket);
                          }}
                          className="p-1 h-8 w-8"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditTicket(ticket);
                          }}
                          className="p-1 h-8 w-8"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
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
                        onClick={() => setCurrentPage(page)}
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
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
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

        {/* Edit Ticket Modal */}
        <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Ticket Status</DialogTitle>
            </DialogHeader>

            {selectedTicket && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Ticket: {selectedTicket.ticketId}
                  </label>
                  <p className="text-sm text-gray-600">
                    {selectedTicket.issueType}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Update Status
                  </label>
                  <Select onValueChange={handleStatusUpdate}>
                    <SelectTrigger>
                      <SelectValue placeholder={selectedTicket.status} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Open">Open</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Add Note (Optional)
                  </label>
                  <Textarea
                    placeholder="Add a note about this status change..."
                    className="min-h-[80px]"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => setEditModalOpen(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      alert("Status updated successfully!");
                      setEditModalOpen(false);
                    }}
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                  >
                    Update
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
