"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const steps = [
  { id: 1, title: "PERSONAL INFORMATION", completed: false },
  { id: 2, title: "BUSINESS DETAILS", completed: false },
  { id: 3, title: "BANK & PAYMENT SETUP", completed: false },
];

export default function SignUp() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    fullName: "",
    dateOfBirth: "",
    citizenship: "",
    countryOfBirth: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
    // Step 2: Business Details
    businessName: "",
    businessType: "",
    businessAddress: "",
    businessPhone: "",
    businessEmail: "",
    taxId: "",
    // Step 3: Bank & Payment Setup
    bankName: "",
    accountNumber: "",
    routingNumber: "",
    accountHolderName: "",
    paymentMethod: "",
    billingAddress: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleProfileImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      toast.success("Profile picture uploaded successfully!");
    }
  };

  const handleBannerImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBannerImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      toast.success("Banner image uploaded successfully!");
    }
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      toast.success(
        `Step ${currentStep} completed! Moving to step ${currentStep + 1}`
      );
    } else {
      // Final step - complete registration
      toast.success(
        "Registration completed successfully! Redirecting to sign in..."
      );
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {/* <div className="flex justify-between items-center mb-6 sm:mb-8">
          <div className="text-lg sm:text-xl font-bold text-gray-900">LOGO</div>
        </div> */}

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
                <div className="flex justify-center mb-4">
                  <Image
                    src="/Logo.png"
                    alt="Logo"
                    width={120}
                    height={40}
                    className="h-10 w-auto"
                  />
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  Become a Seller
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-gray-700">
                  {currentStep === 1 && "Personal Information"}
                  {currentStep === 2 && "Business Details"}
                  {currentStep === 3 && "Bank & Payment Setup"}
                </p>
              </div>

              {/* Profile Picture and Banner */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="text-center flex-shrink-0">
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-200 flex items-center justify-center mb-2 overflow-hidden mx-auto cursor-pointer hover:bg-gray-300 transition-colors duration-200"
                    onClick={() =>
                      document.getElementById("profile-upload")?.click()
                    }
                  >
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                    )}
                  </div>
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageUpload}
                    className="hidden"
                  />
                  <p className="text-xs sm:text-sm text-gray-600">
                    Add Profile Picture
                  </p>
                </div>
                <div className="flex-1">
                  <div
                    className="h-20 sm:h-24 rounded-lg bg-gradient-to-r from-blue-400 via-purple-500 to-purple-600 flex items-center justify-center relative overflow-hidden cursor-pointer hover:opacity-90 transition-opacity duration-200"
                    onClick={() =>
                      document.getElementById("banner-upload")?.click()
                    }
                  >
                    {bannerImage ? (
                      <img
                        src={bannerImage}
                        alt="Banner"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <>
                        <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-white z-10" />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-purple-600"></div>
                      </>
                    )}
                  </div>
                  <input
                    id="banner-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleBannerImageUpload}
                    className="hidden"
                  />
                  <p className="text-xs sm:text-sm text-gray-600 mt-2">
                    Add Banner Image
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4 sm:space-y-6">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <>
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
                  </>
                )}

                {/* Step 2: Business Details */}
                {currentStep === 2 && (
                  <>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Business Details
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Business Name
                          </label>
                          <Input
                            type="text"
                            placeholder="Enter business name"
                            value={formData.businessName}
                            onChange={(e) =>
                              handleInputChange("businessName", e.target.value)
                            }
                            className="h-10 sm:h-12"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Business Type
                          </label>
                          <Select
                            value={formData.businessType}
                            onValueChange={(value) =>
                              handleInputChange("businessType", value)
                            }
                          >
                            <SelectTrigger className="h-10 sm:h-12">
                              <SelectValue placeholder="Select business type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="retail">Retail</SelectItem>
                              <SelectItem value="wholesale">
                                Wholesale
                              </SelectItem>
                              <SelectItem value="manufacturing">
                                Manufacturing
                              </SelectItem>
                              <SelectItem value="services">Services</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Business Address
                          </label>
                          <Input
                            type="text"
                            placeholder="Enter business address"
                            value={formData.businessAddress}
                            onChange={(e) =>
                              handleInputChange(
                                "businessAddress",
                                e.target.value
                              )
                            }
                            className="h-10 sm:h-12"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Business Phone
                          </label>
                          <Input
                            type="tel"
                            placeholder="Enter business phone"
                            value={formData.businessPhone}
                            onChange={(e) =>
                              handleInputChange("businessPhone", e.target.value)
                            }
                            className="h-10 sm:h-12"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Business Email
                          </label>
                          <Input
                            type="email"
                            placeholder="Enter business email"
                            value={formData.businessEmail}
                            onChange={(e) =>
                              handleInputChange("businessEmail", e.target.value)
                            }
                            className="h-10 sm:h-12"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tax ID
                          </label>
                          <Input
                            type="text"
                            placeholder="Enter tax ID"
                            value={formData.taxId}
                            onChange={(e) =>
                              handleInputChange("taxId", e.target.value)
                            }
                            className="h-10 sm:h-12"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Step 3: Bank & Payment Setup */}
                {currentStep === 3 && (
                  <>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Bank & Payment Setup
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bank Name
                          </label>
                          <Input
                            type="text"
                            placeholder="Enter bank name"
                            value={formData.bankName}
                            onChange={(e) =>
                              handleInputChange("bankName", e.target.value)
                            }
                            className="h-10 sm:h-12"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Account Number
                          </label>
                          <Input
                            type="text"
                            placeholder="Enter account number"
                            value={formData.accountNumber}
                            onChange={(e) =>
                              handleInputChange("accountNumber", e.target.value)
                            }
                            className="h-10 sm:h-12"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Routing Number
                          </label>
                          <Input
                            type="text"
                            placeholder="Enter routing number"
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
                          <Input
                            type="text"
                            placeholder="Enter account holder name"
                            value={formData.accountHolderName}
                            onChange={(e) =>
                              handleInputChange(
                                "accountHolderName",
                                e.target.value
                              )
                            }
                            className="h-10 sm:h-12"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Payment Method
                          </label>
                          <Select
                            value={formData.paymentMethod}
                            onValueChange={(value) =>
                              handleInputChange("paymentMethod", value)
                            }
                          >
                            <SelectTrigger className="h-10 sm:h-12">
                              <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="bank-transfer">
                                Bank Transfer
                              </SelectItem>
                              <SelectItem value="paypal">PayPal</SelectItem>
                              <SelectItem value="stripe">Stripe</SelectItem>
                              <SelectItem value="check">Check</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Billing Address
                          </label>
                          <Input
                            type="text"
                            placeholder="Enter billing address"
                            value={formData.billingAddress}
                            onChange={(e) =>
                              handleInputChange(
                                "billingAddress",
                                e.target.value
                              )
                            }
                            className="h-10 sm:h-12"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <Button
                  onClick={handleNextStep}
                  className="w-full h-10 sm:h-12 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg mt-6 sm:mt-8"
                >
                  {currentStep === 3
                    ? "Complete Registration"
                    : `Continue to Step ${currentStep + 1}`}
                </Button>

                {/* Back to Sign In Link */}
                <div className="text-center mt-4">
                  <p className="text-gray-600 text-sm">
                    Already have an account?{" "}
                    <Link
                      href="/"
                      className="text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Back to Sign In
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
