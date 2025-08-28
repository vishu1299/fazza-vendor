"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreditCard, Building, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const steps = [
  { id: 1, title: "PERSONAL INFORMATION", completed: true },
  { id: 2, title: "BUSINESS DETAILS", completed: true },
  { id: 3, title: "BANK & PAYMENT SETUP", completed: false },
];

export default function BankPaymentSetup() {
  const [currentStep] = useState(3);
  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
    routingNumber: "",
    accountHolderName: "",
    accountType: "",
    swiftCode: "",
    paymentMethod: "",
    taxId: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <div className="text-lg sm:text-xl font-bold text-gray-900">LOGO</div>
        </div>

        {/* Title and Stepper */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
            Sign Up
          </h1>

          {/* Stepper */}
          <div className="flex justify-center items-center space-x-4 sm:space-x-8 mb-8 sm:mb-12 ">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-shrink-0">
                <div className="flex flex-col items-center">
                  <motion.div
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
                      currentStep >= step.id
                        ? "bg-primary text-white"
                        : step.completed
                        ? "bg-primary text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                    animate={{
                      backgroundColor:
                        currentStep >= step.id || step.completed
                          ? "#5E3B91"
                          : "#D1D5DB",
                      color:
                        currentStep >= step.id || step.completed
                          ? "#FFFFFF"
                          : "#6B7280",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.completed ? "✓" : step.id}
                  </motion.div>
                  <span className="text-xs mt-2 text-gray-600 max-w-16 sm:max-w-20 text-center leading-tight">
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <motion.div
                    className="w-8 sm:w-16 h-0.5 mx-2 sm:mx-4 mt-[-16px] sm:mt-[-20px]"
                    animate={{
                      backgroundColor:
                        currentStep > step.id || step.completed
                          ? "#5E3B91"
                          : "#D1D5DB",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-center items-start">
          {/* Left Side - Image */}
          <motion.div
            className="w-full lg:w-80 xl:w-96 flex justify-center lg:block order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-64 h-80 sm:w-72 sm:h-88 lg:w-80 lg:h-96 xl:w-96 xl:h-[28rem] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=700&fit=crop&crop=face"
                alt="Professional person"
                width={400}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            className="w-full max-w-2xl lg:max-w-3xl order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10 xl:p-12">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  Become a Seller
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-gray-700">
                  Bank & Payment Setup
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bank Name
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <Input
                        placeholder="For Eg. State Bank of India"
                        value={formData.bankName}
                        onChange={(e) =>
                          handleInputChange("bankName", e.target.value)
                        }
                        className="h-10 sm:h-12 pl-10 sm:pl-12"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Number
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <Input
                        placeholder="For Eg. 1234567890123456"
                        value={formData.accountNumber}
                        onChange={(e) =>
                          handleInputChange("accountNumber", e.target.value)
                        }
                        className="h-10 sm:h-12 pl-10 sm:pl-12"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Routing Number
                    </label>
                    <Input
                      placeholder="For Eg. 123456789"
                      value={formData.routingNumber}
                      onChange={(e) =>
                        handleInputChange("routingNumber", e.target.value)
                      }
                      className="h-10 sm:h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Holder Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <Input
                        placeholder="For Eg. David Josh"
                        value={formData.accountHolderName}
                        onChange={(e) =>
                          handleInputChange("accountHolderName", e.target.value)
                        }
                        className="h-10 sm:h-12 pl-10 sm:pl-12"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Type
                    </label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("accountType", value)
                      }
                    >
                      <SelectTrigger className="h-10 sm:h-12">
                        <SelectValue placeholder="Select Account Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="savings">Savings</SelectItem>
                        <SelectItem value="checking">Checking</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SWIFT Code
                    </label>
                    <Input
                      placeholder="For Eg. SBININBB123"
                      value={formData.swiftCode}
                      onChange={(e) =>
                        handleInputChange("swiftCode", e.target.value)
                      }
                      className="h-10 sm:h-12"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Method
                    </label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("paymentMethod", value)
                      }
                    >
                      <SelectTrigger className="h-10 sm:h-12">
                        <SelectValue placeholder="Select Payment Method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bank-transfer">
                          Bank Transfer
                        </SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="stripe">Stripe</SelectItem>
                        <SelectItem value="razorpay">Razorpay</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tax ID
                    </label>
                    <Input
                      placeholder="For Eg. TAX123456789"
                      value={formData.taxId}
                      onChange={(e) =>
                        handleInputChange("taxId", e.target.value)
                      }
                      className="h-10 sm:h-12"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
                  <Link href="/signup/business" className="w-full sm:flex-1">
                    <Button
                      variant="outline"
                      className="w-full h-10 sm:h-12 border border-gray-200 text-gray-700 hover:bg-gray-50"
                    >
                      Previous
                    </Button>
                  </Link>
                  <Button className="w-full sm:flex-1 h-10 sm:h-12 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg">
                    Complete Setup
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
