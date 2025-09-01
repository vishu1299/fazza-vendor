"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  FileText,
  Printer,
  X,
  ShoppingCart,
  Clock,
  Truck,
  Package,
  CheckCircle,
  User,
  Mail,
  Tag,
  Calendar,
  MapPin,
  Phone,
  Copy,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Image from "next/image";
import Link from "next/link";

export default function Trackorder() {
  const [orderStatus, setOrderStatus] = useState("Processing");
  const [currentStep, setCurrentStep] = useState(2); // Processing is current step

  // Order management states
  const [orderData] = useState({
    id: "#698797g",
    customerName: "Rohan Verma",
    customerEmail: "rohanverma23@gmail.com",
    customerPhone: "+91-9876543210",
    deliveryAddress:
      "Rohan Sharma, 123 Street Name, New Delhi, India, PIN: 110001",
    orderDate: "05 - Aug - 2025",
    estimatedDelivery: "08 Aug 2025",
    courierPartner: "FedEx Logistics",
    trackingId: "TRK123456789",
    trackingStatus: "In Transit",
    product: {
      name: "Allen Solly Men's Cotton Regular Fit Polo T-Shirt",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=64&h=64&fit=crop",
      quantity: 2,
      price: 799.0,
      total: 1598.0,
    },
    payment: {
      method: "C.O.D",
      status: "Pending",
    },
  });

  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [message, setMessage] = useState("");

  const shipmentSteps = [
    {
      id: 1,
      title: "Order Placed",
      date: "Tuesday, 5, July",
      icon: ShoppingCart,
      completed: true,
      active: false,
    },
    {
      id: 2,
      title: "Processing",
      date: "Tuesday, 5, July",
      icon: Clock,
      completed: true,
      active: true,
    },
    {
      id: 3,
      title: "Shipped",
      date: "Wednesday, 6, July",
      icon: Truck,
      completed: false,
      active: false,
    },
    {
      id: 4,
      title: "Dispatched",
      date: "Thursday, 7, July",
      icon: Package,
      completed: false,
      active: false,
    },
    {
      id: 5,
      title: "Delivered",
      date: "Saturday, 9, July",
      icon: CheckCircle,
      completed: false,
      active: false,
    },
  ];

  // Function to update step status
  const updateStepStatus = (stepId: number) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCurrentStep(stepId);
      setOrderStatus(shipmentSteps[stepId - 1]?.title || "Processing");
      setMessage(`Order status updated to ${shipmentSteps[stepId - 1]?.title}`);
      setShowSuccessMessage(true);
      setIsLoading(false);

      // Auto-hide success message
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }, 1000);
  };

  // Function to get step status
  const getStepStatus = (step: (typeof shipmentSteps)[0]) => {
    if (step.id < currentStep) return "completed";
    if (step.id === currentStep) return "active";
    return "pending";
  };

  // Order management functions
  const updateOrderStatus = async (newStatus: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Find the corresponding step for the new status
      const statusToStepMap: { [key: string]: number } = {
        "Order Placed": 1,
        Processing: 2,
        Shipped: 3,
        Dispatched: 4,
        Delivered: 5,
      };

      const newStep = statusToStepMap[newStatus] || 2;

      setOrderStatus(newStatus);
      setCurrentStep(newStep);
      setMessage(`Order status updated to ${newStatus}`);
      setShowSuccessMessage(true);

      // Auto-hide success message
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch {
      setMessage("Failed to update order status");
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const printInvoice = () => {
    setIsLoading(true);
    setTimeout(() => {
      setMessage("Invoice downloaded successfully!");
      setShowSuccessMessage(true);
      setIsLoading(false);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }, 1500);
  };

  const printShippingLabel = () => {
    setIsLoading(true);
    setTimeout(() => {
      setMessage("Shipping label downloaded successfully!");
      setShowSuccessMessage(true);
      setIsLoading(false);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }, 1500);
  };

  const refundOrder = () => {
    if (window.confirm("Are you sure you want to refund/cancel this order?")) {
      setIsLoading(true);
      setTimeout(() => {
        setOrderStatus("Cancelled");
        setMessage("Order has been cancelled and refund initiated");
        setShowSuccessMessage(true);
        setIsLoading(false);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      }, 2000);
    }
  };

  const copyTrackingId = () => {
    navigator.clipboard.writeText(orderData.trackingId);
    setMessage("Tracking ID copied to clipboard!");
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Success/Error Messages */}
        {showSuccessMessage && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center justify-between">
            <span>{message}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSuccessMessage(false)}
              className="text-green-600 hover:text-green-800"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}

        {showErrorMessage && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center justify-between">
            <span>{message}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowErrorMessage(false)}
              className="text-red-600 hover:text-red-800"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="p-2">
              <Link href="/dashboard/orders">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Track Order</h1>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              className="flex items-center space-x-2 px-4 py-2"
              onClick={printInvoice}
              disabled={isLoading}
            >
              <Printer className="w-4 h-4" />
              <span>{isLoading ? "Processing..." : "Print Invoice"}</span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center space-x-2 px-4 py-2"
              onClick={printShippingLabel}
              disabled={isLoading}
            >
              <FileText className="w-4 h-4" />
              <span>
                {isLoading ? "Processing..." : "Print Shipping Label"}
              </span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center space-x-2 px-4 py-2 text-red-600 border-red-200 hover:bg-red-50"
              onClick={refundOrder}
              disabled={isLoading}
            >
              <X className="w-4 h-4" />
              <span>{isLoading ? "Processing..." : "Refund / Cancel"}</span>
            </Button>
          </div>
        </div>

        {/* Product Details Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Product Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-6 p-4 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=64&h=64&fit=crop"
                  alt="Black Polo T-Shirt"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-light text-gray-900 text-base">
                  Allen Solly Men&apos;s Cotton Regular Fit Polo T-Shirt
                </h3>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">Quantity</p>
                <p className="font-bold text-gray-900 text-lg">2</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">Price</p>
                <p className="font-bold text-gray-900 text-lg">₹799.00</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">Payment</p>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                  </div>
                  <span className="text-sm font-light text-gray-900">
                    C.O.D
                  </span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <Select value={orderStatus} onValueChange={updateOrderStatus}>
                  <SelectTrigger className="w-32 bg-purple-100 border-0 text-purple-800 font-light rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Order Placed">Order Placed</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Dispatched">Dispatched</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer and Courier Details Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Customer Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Customer Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-black font-medium">
                    Customer Name
                  </p>
                  <p className="font-light text-gray-900">Rohan Verma</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm text-black font-medium">Email ID</p>
                  <p className="font-light text-gray-900">
                    rohanverma23@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Tag className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-black font-medium">Order ID</p>
                  <p className="font-light text-gray-900">#698797g</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-black font-medium">Placed On</p>
                  <p className="font-light text-gray-900">05 - Aug - 2025</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-black font-medium">
                    Delivery Address
                  </p>
                  <p className="font-light text-gray-900">
                    Rohan Sharma, 123 Street Name, New Delhi, India, PIN: 110001
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-black font-medium">Phone No.</p>
                  <p className="font-light text-gray-900">+91-9876543210</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Courier Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Courier Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-gray-400" />
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-black font-medium">
                    Courier Partner:
                  </span>
                  <span className="font-light text-gray-900">
                    FedEx Logistics
                  </span>
                  <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">FX</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Tag className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm text-black font-medium">Tracking ID</p>
                  <p className="font-light text-gray-900">TRK123456789</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyTrackingId}
                  className="text-blue-600 hover:text-blue-800 p-1"
                  title="Copy Tracking ID"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-black font-medium">
                    Estimated Delivery
                  </p>
                  <p className="font-light text-gray-900">08 Aug 2025</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-black font-medium">
                    Tracking Status
                  </p>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 border-green-200"
                  >
                    In Transit
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Shipment Updates Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">
                Shipment Updates
              </CardTitle>
              <div className="flex items-center space-x-3">
                <Select
                  value={currentStep.toString()}
                  onValueChange={(value) => setCurrentStep(parseInt(value))}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Set Current Step" />
                  </SelectTrigger>
                  <SelectContent>
                    {shipmentSteps.map((step) => (
                      <SelectItem key={step.id} value={step.id.toString()}>
                        {step.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentStep(Math.min(currentStep + 1, 5))}
                  disabled={currentStep >= 5}
                >
                  Next Step
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentStep(Math.max(currentStep - 1, 1))}
                  disabled={currentStep <= 1}
                >
                  Previous Step
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-8 py-6">
            <div className="relative">
              {/* Progress Bar Background - Place this first so it's behind everything */}
              <div className="absolute top-7 left-0 right-0 h-0.5 bg-gray-200" />

              {/* Main Timeline Container */}
              <div className="flex items-start justify-between relative">
                {shipmentSteps.map((step, index) => (
                  <div
                    key={step.id}
                    className="flex flex-col items-center relative flex-1"
                  >
                    {/* Step Icon */}
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-all duration-300 cursor-pointer hover:scale-105 relative z-20 ${
                        getStepStatus(step) === "completed" ||
                        getStepStatus(step) === "active"
                          ? "bg-[#5E3B91] text-white shadow-lg"
                          : "bg-gray-200 text-gray-400"
                      }`}
                      onClick={() => updateStepStatus(step.id)}
                      title={`Click to update ${step.title} status`}
                    >
                      <step.icon
                        className={`w-7 h-7 ${
                          getStepStatus(step) === "completed" ||
                          getStepStatus(step) === "active"
                            ? "text-white"
                            : "text-gray-500"
                        }`}
                      />
                    </div>

                    {/* Step Label */}
                    <div className="text-center max-w-24 relative z-20">
                      <p
                        className={`text-sm font-semibold mb-1 transition-colors duration-300 ${
                          getStepStatus(step) === "completed" ||
                          getStepStatus(step) === "active"
                            ? "text-[#5E3B91]"
                            : "text-gray-500"
                        }`}
                      >
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-400 leading-tight">
                        {step.date}
                      </p>
                    </div>

                    {/* Connecting Lines - Positioned behind the circles */}
                    {index < shipmentSteps.length - 1 && (
                      <div className="absolute top-7 left-1/2 w-full h-0.5 transform -translate-y-1/2 z-10">
                        <div
                          className={`h-full transition-all duration-300 ${
                            getStepStatus(step) === "completed"
                              ? "bg-[#5E3B91]"
                              : "bg-gray-200"
                          }`}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                <span className="text-gray-700">Processing...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
