"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  Filter,
  ArrowUpDown,
  Copy,
  Calendar,
  CreditCard,
  Eye,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

interface Order {
  id: string;
  date: string;
  customer: string;
  status: string;
  amount: string;
  payment: string;
}

const processingOrdersData: Order[] = [
  {
    id: "#12451",
    date: "05 Aug 2025",
    customer: "Rohan Sharma",
    status: "Processing",
    amount: "$1,250.00",
    payment: "Paid",
  },
  {
    id: "#12452",
    date: "04 Aug 2025",
    customer: "Aman Verma",
    status: "Processing",
    amount: "$2,499.00",
    payment: "Paid",
  },
  {
    id: "#12453",
    date: "05 Aug 2025",
    customer: "Neha Gupta",
    status: "Processing",
    amount: "$999.00",
    payment: "COD",
  },
  {
    id: "#12454",
    date: "04 Aug 2025",
    customer: "Aman Verma",
    status: "Processing",
    amount: "$2,499.00",
    payment: "Paid",
  },
  {
    id: "#12455",
    date: "04 Aug 2025",
    customer: "Priya Mehra",
    status: "Processing",
    amount: "$1,750.00",
    payment: "Refunded",
  },
  {
    id: "#12456",
    date: "04 Aug 2025",
    customer: "Aman Verma",
    status: "Processing",
    amount: "$2,499.00",
    payment: "Paid",
  },
  {
    id: "#12457",
    date: "04 Aug 2025",
    customer: "Aman Verma",
    status: "Processing",
    amount: "$2,499.00",
    payment: "Paid",
  },
  {
    id: "#12458",
    date: "04 Aug 2025",
    customer: "Priya Mehra",
    status: "Processing",
    amount: "$1,750.00",
    payment: "Refunded",
  },
];

export default function ProcessingOrders() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Processing");
  const [priceFilter, setPriceFilter] = useState("Above ₹200");
  const [paymentFilter, setPaymentFilter] = useState("Paid");
  const [productFilter, setProductFilter] = useState("Apparel");
  const [dateFromFilter, setDateFromFilter] = useState("From");
  const [dateToFilter, setDateToFilter] = useState("To");

  const getStatusBadge = (status: string) => {
    return "bg-orange-100 text-orange-800 border-orange-200";
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };

  const handleEditOrder = (order: Order) => {
    setEditingOrder({ ...order });
    setIsEditModalOpen(true);
  };

  const handleSaveOrder = () => {
    console.log("Saving order:", editingOrder);
    setIsEditModalOpen(false);
    setEditingOrder(null);
  };

  const handleCopyOrderId = (orderId: string) => {
    navigator.clipboard.writeText(orderId);
  };

  const filteredOrders = processingOrdersData.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
            <span>Orders</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">Processing</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Processing</h1>
          <p className="text-gray-600">
            Manage and track all your customer orders in one place.
          </p>
        </div>

        {/* Search and Actions */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by ID, Product, or Others"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  Clear all
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-purple-600 text-white hover:bg-purple-700"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Filter Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-6">
              <div>
                <Label className="text-sm font-medium text-gray-600 mb-2 block">
                  Show
                </Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="All Orders">All Orders</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600 mb-2 block">
                  Price
                </Label>
                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Above ₹200">Above ₹200</SelectItem>
                    <SelectItem value="Below ₹200">Below ₹200</SelectItem>
                    <SelectItem value="₹200-₹500">₹200-₹500</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600 mb-2 block">
                  Payment
                </Label>
                <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="COD">COD</SelectItem>
                    <SelectItem value="Refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600 mb-2 block">
                  Date Range
                </Label>
                <div className="flex gap-2">
                  <Select
                    value={dateFromFilter}
                    onValueChange={setDateFromFilter}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="From">From</SelectItem>
                      <SelectItem value="Today">Today</SelectItem>
                      <SelectItem value="Week">Week</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={dateToFilter} onValueChange={setDateToFilter}>
                    <SelectTrigger className="w-16">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="To">To</SelectItem>
                      <SelectItem value="Today">Today</SelectItem>
                      <SelectItem value="Week">Week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600 mb-2 block">
                  Type of Products
                </Label>
                <Select value={productFilter} onValueChange={setProductFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Apparel">Apparel</SelectItem>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Books">Books</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200">
                    <TableHead className="w-12">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                      />
                    </TableHead>
                    <TableHead className="text-gray-600 font-medium">
                      <div className="flex items-center space-x-1">
                        <span>Order ID</span>
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-gray-600 font-medium">
                      <div className="flex items-center space-x-1">
                        <span>Date</span>
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-gray-600 font-medium">
                      <div className="flex items-center space-x-1">
                        <span>Customer Name</span>
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-gray-600 font-medium">
                      <div className="flex items-center space-x-1">
                        <span>Status</span>
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-gray-600 font-medium">
                      <div className="flex items-center space-x-1">
                        <span>Amount</span>
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-gray-600 font-medium">
                      <div className="flex items-center space-x-1">
                        <span>Payment</span>
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-gray-600 font-medium">
                      <div className="flex items-center space-x-1">
                        <span>Quick Actions</span>
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order, index) => (
                    <TableRow
                      key={index}
                      className="hover:bg-gray-50 transition-colors border-gray-100"
                    >
                      <TableCell>
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">
                            {order.id}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                            onClick={() => handleCopyOrderId(order.id)}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{order.date}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {order.customer
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <span className="font-medium text-gray-900">
                            {order.customer}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(order.status)}>
                          <Clock className="w-3 h-3 mr-1" />
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-gray-900">
                          {order.amount}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <CreditCard className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {order.payment}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-gray-400 hover:text-blue-600"
                            onClick={() => handleViewOrder(order)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center space-x-2 mt-6">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-gray-400"
              >
                1
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 bg-purple-600 text-white hover:bg-purple-700"
              >
                2
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-gray-400"
              >
                3
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-gray-400"
              >
                4
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Modals */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Order ID</Label>
                    <p className="font-mono bg-gray-100 p-2 rounded">
                      {selectedOrder.id}
                    </p>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Badge className={getStatusBadge(selectedOrder.status)}>
                      {selectedOrder.status}
                    </Badge>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsViewModalOpen(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Order</DialogTitle>
            </DialogHeader>
            {editingOrder && (
              <div className="space-y-4">
                <Input
                  value={editingOrder.customer}
                  onChange={(e) =>
                    setEditingOrder({
                      ...editingOrder,
                      customer: e.target.value,
                    })
                  }
                />
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveOrder}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
