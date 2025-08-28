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
import { Calendar, Camera } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import signupImg from "@/../public/signup.png";

const steps = [
  { id: 1, title: "PERSONAL INFORMATION", completed: false },
  { id: 2, title: "BUSINESS DETAILS", completed: false },
  { id: 3, title: "BANK & PAYMENT SETUP", completed: false },
];

export default function SignUp() {
  const [currentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    citizenship: "",
    countryOfBirth: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
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
                        : "bg-gray-300 text-gray-600"
                    }`}
                    animate={{
                      backgroundColor:
                        currentStep >= step.id ? "#5E3B91" : "#D1D5DB",
                      color: currentStep >= step.id ? "#FFFFFF" : "#6B7280",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {currentStep > step.id ? "✓" : step.id}
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
                        currentStep > step.id ? "#5E3B91" : "#D1D5DB",
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
            <div className="w-64 h-80 sm:w-72 sm:h-88 lg:w-80 lg:h-96 xl:w-96 xl:h-[28rem] rounded-2xl overflow-hidden shadow-lg ">
              <Image
                src={signupImg}
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
                  Personal Information
                </p>
              </div>

              {/* Profile Picture and Banner */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="text-center flex-shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-200 flex items-center justify-center mb-2 overflow-hidden mx-auto">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                      alt="Profile"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Add Profile Picture
                  </p>
                </div>
                <div className="flex-1">
                  <div className="h-20 sm:h-24 rounded-lg bg-gradient-to-r from-blue-400 via-purple-500 to-purple-600 flex items-center justify-center relative overflow-hidden">
                    <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-white z-10" />
                    <Image
                      src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=200&fit=crop"
                      alt="Banner"
                      width={400}
                      height={96}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2">
                    Add Banner Image
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <Input
                      placeholder="For Eg. David Josh"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      className="h-10 sm:h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth
                    </label>
                    <div className="relative">
                      <Input
                        type="date"
                        placeholder="DD-MM-YY"
                        value={formData.dateOfBirth}
                        onChange={(e) =>
                          handleInputChange("dateOfBirth", e.target.value)
                        }
                        className="h-10 sm:h-12 pr-10"
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Citizenship
                    </label>
                    <Input
                      placeholder="For Eg. Indian"
                      value={formData.citizenship}
                      onChange={(e) =>
                        handleInputChange("citizenship", e.target.value)
                      }
                      className="h-10 sm:h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country of Birth
                    </label>
                    <Input
                      placeholder="For Eg. India"
                      value={formData.countryOfBirth}
                      onChange={(e) =>
                        handleInputChange("countryOfBirth", e.target.value)
                      }
                      className="h-10 sm:h-12"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="For Eg. Davidjosh25@gmail.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="h-10 sm:h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number
                    </label>
                    <div className="flex">
                      <Select>
                        <SelectTrigger className="w-16 sm:w-20 h-10 sm:h-12 rounded-r-none">
                          <SelectValue placeholder="🇮🇳" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="in">🇮🇳</SelectItem>
                          <SelectItem value="us">🇺🇸</SelectItem>
                          <SelectItem value="uk">🇬🇧</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="8929246546"
                        value={formData.mobileNumber}
                        onChange={(e) =>
                          handleInputChange("mobileNumber", e.target.value)
                        }
                        className="h-10 sm:h-12 rounded-l-none border-l-0 flex-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <Input
                      type="password"
                      placeholder="••••••••••"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      className="h-10 sm:h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <Input
                      type="password"
                      placeholder="••••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      className="h-10 sm:h-12"
                    />
                  </div>
                </div>

                <Link href="/signup/business" className="block">
                  <Button className="w-full h-10 sm:h-12 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg mt-6 sm:mt-8">
                    Submit Registration
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
