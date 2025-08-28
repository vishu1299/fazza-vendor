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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DollarSign,
  ShoppingBag,
  Users,
  Clock,
  TrendingUp,
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  Edit,
  Download,
  RefreshCw,
  Search,
  Calendar,
  BarChart3,
  Settings,
  Trash2,
  Copy,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
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

interface StatsCard {
  title: string;
  value: string;
  change: string;
  changeType: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const statsCards: StatsCard[] = [
  {
    title: "Todays Sales",
    value: "$25k",
    change: "+11.01%",
    changeType: "positive",
    icon: DollarSign,
    color: "bg-green-500",
  },
  {
    title: "Todays Orders",
    value: "20",
    change: "+12.01%",
    changeType: "positive",
    icon: ShoppingBag,
    color: "bg-blue-500",
  },
  {
    title: "Pending Orders",
    value: "7",
    change: "",
    changeType: "neutral",
    icon: Clock,
    color: "bg-orange-500",
  },
  {
    title: "Total Customers",
    value: "52k",
    change: "+12.01%",
    changeType: "positive",
    icon: Users,
    color: "bg-purple-500",
  },
];

const recentOrders = [
  {
    id: "#12450",
    date: "05 Aug 2025",
    customer: "Rohan Sharma",
    status: "Pending",
    amount: "₹1,250.00",
    payment: "Paid",
  },
  {
    id: "#12450",
    date: "05 Aug 2025",
    customer: "Neha Gupta",
    status: "Shipped",
    amount: "₹999.00",
    payment: "COD",
  },
  {
    id: "#12450",
    date: "04 Aug 2025",
    customer: "Aman Verma",
    status: "Delivered",
    amount: "₹2,499.00",
    payment: "Paid",
  },
  {
    id: "#12450",
    date: "04 Aug 2025",
    customer: "Priya Mehra",
    status: "Cancelled",
    amount: "₹1,750.00",
    payment: "Refunded",
  },
];

export default function Dashboard() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState("today");

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      Pending: "bg-orange-100 text-orange-800 border-orange-200",
      Shipped: "bg-purple-100 text-purple-800 border-purple-200",
      Delivered: "bg-green-100 text-green-800 border-green-200",
      Cancelled: "bg-red-100 text-red-800 border-red-200",
    };
    return (
      statusStyles[status as keyof typeof statusStyles] ||
      "bg-gray-100 text-gray-800"
    );
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
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

  const handleDeleteOrder = (orderId: string) => {
    console.log("Deleting order:", orderId);
  };

  const handleCopyOrderId = (orderId: string) => {
    navigator.clipboard.writeText(orderId);
  };

  const filteredOrders = recentOrders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      order.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Dashboard Overview
            </h1>
            <p className="text-gray-600">
              Welcome back! Here what happening with your business today.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center space-x-2"
            >
              <RefreshCw
                className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
              <span>Refresh</span>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((card, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 py-0"
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`w-16 h-16 ${card.color} rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}
                  >
                    <card.icon className="w-8 h-8 text-white" />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-8 h-8 p-0 text-gray-400 hover:text-gray-600 rounded-full border border-gray-200"
                      >
                        <TrendingUp className="w-4 h-4 rotate-45" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="flex items-center space-x-2">
                        <BarChart3 className="w-4 h-4" />
                        <span>View Details</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center space-x-2">
                        <Download className="w-4 h-4" />
                        <span>Export Data</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center space-x-2">
                        <Settings className="w-4 h-4" />
                        <span>Configure</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    {card.title}
                  </p>
                  <div className="flex items-end justify-between">
                    <p className="text-3xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {card.value}
                    </p>
                    {card.change && (
                      <div className="flex items-center">
                        <p
                          className={`text-sm font-medium flex items-center ${
                            card.changeType === "positive"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {card.change}
                        </p>
                        <TrendingUp
                          className={`w-4 h-4 ml-1 ${
                            card.changeType === "positive"
                              ? "text-green-600"
                              : "text-red-600 rotate-180"
                          }`}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Orders Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  Manage and track your recent orders
                </CardDescription>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200">
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
                      className="border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="font-medium text-gray-900">
                        <div className="flex items-center space-x-2">
                          <span>{order.id}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopyOrderId(order.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{order.date}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-900">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">
                              {order.customer.charAt(0)}
                            </span>
                          </div>
                          <span>{order.customer}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${getStatusBadge(order.status)} border`}
                        >
                          {order.status === "Delivered" && (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          )}
                          {order.status === "Cancelled" && (
                            <XCircle className="w-3 h-3 mr-1" />
                          )}
                          {order.status === "Pending" && (
                            <AlertCircle className="w-3 h-3 mr-1" />
                          )}
                          {order.status === "Shipped" && (
                            <Info className="w-3 h-3 mr-1" />
                          )}
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">
                        <div className="flex items-center space-x-1">
                          <CreditCard className="w-4 h-4 text-gray-400" />
                          <span>{order.amount}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        <Badge variant="outline" className="text-xs">
                          {order.payment}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewOrder(order)}
                            className="text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditOrder(order)}
                            className="text-gray-400 hover:text-green-600 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-400 hover:text-gray-600"
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleCopyOrderId(order.id)}
                              >
                                <Copy className="w-4 h-4 mr-2" />
                                Copy Order ID
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <ExternalLink className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="w-4 h-4 mr-2" />
                                Send Email
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleDeleteOrder(order.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Order
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* View Order Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
              <DialogDescription>
                View complete information about this order
              </DialogDescription>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-600">
                      Order ID
                    </Label>
                    <p className="text-sm font-mono bg-gray-100 p-2 rounded">
                      {selectedOrder.id}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-600">
                      Date
                    </Label>
                    <p className="text-sm">{selectedOrder.date}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-600">
                      Customer
                    </Label>
                    <p className="text-sm">{selectedOrder.customer}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-600">
                      Status
                    </Label>
                    <Badge className={getStatusBadge(selectedOrder.status)}>
                      {selectedOrder.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-600">
                      Amount
                    </Label>
                    <p className="text-sm font-semibold">
                      {selectedOrder.amount}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-600">
                      Payment
                    </Label>
                    <p className="text-sm">{selectedOrder.payment}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-600">
                    Customer Details
                  </Label>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">customer@example.com</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">
                        123 Main St, City, State 12345
                      </span>
                    </div>
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
              <Button
                onClick={() => {
                  setIsViewModalOpen(false);
                  if (selectedOrder) {
                    handleEditOrder(selectedOrder);
                  }
                }}
              >
                Edit Order
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Order Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Order</DialogTitle>
              <DialogDescription>
                Update order information and status
              </DialogDescription>
            </DialogHeader>
            {editingOrder && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customer">Customer Name</Label>
                    <Input
                      id="customer"
                      value={editingOrder.customer}
                      onChange={(e) =>
                        setEditingOrder({
                          ...editingOrder,
                          customer: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={editingOrder.status}
                      onValueChange={(value) =>
                        setEditingOrder({ ...editingOrder, status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Shipped">Shipped</SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      value={editingOrder.amount}
                      onChange={(e) =>
                        setEditingOrder({
                          ...editingOrder,
                          amount: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payment">Payment Status</Label>
                    <Select
                      value={editingOrder.payment}
                      onValueChange={(value) =>
                        setEditingOrder({ ...editingOrder, payment: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Paid">Paid</SelectItem>
                        <SelectItem value="COD">COD</SelectItem>
                        <SelectItem value="Refunded">Refunded</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Order Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any notes about this order..."
                    rows={3}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveOrder}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
