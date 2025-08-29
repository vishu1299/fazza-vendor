"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type RecoveryMethod = "email" | "phone";

export default function ForgotPassword() {
  const router = useRouter();
  const [recoveryMethod, setRecoveryMethod] = useState<RecoveryMethod>("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (recoveryMethod === "email" && !email) {
      toast.error("Please enter your email address");
      return;
    }

    if (recoveryMethod === "phone" && !phone) {
      toast.error("Please enter your phone number");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const contact = recoveryMethod === "email" ? email : phone;
      toast.success(`OTP sent successfully to your ${recoveryMethod}!`);

      // Navigate to OTP page with the contact info
      router.push(
        `/verify-otp?method=${recoveryMethod}&contact=${encodeURIComponent(
          contact
        )}`
      );
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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

      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white shadow-xl border-0">
          <CardContent className="p-8">
            {/* Header */}
            <motion.div
              className="text-center mb-8"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center justify-center mb-4">
                <Link href="/" className="mr-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="ghost" size="sm" className="p-2">
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">
                  Forgot Password
                </h1>
              </div>
              <p className="text-gray-600">
                Choose how you&apos;d like to recover your password
              </p>
            </motion.div>

            <form onSubmit={handleSendOTP} className="space-y-6">
              {/* Recovery Method Selection */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Recovery Method
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRecoveryMethod("email")}
                    className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-colors ${
                      recoveryMethod === "email"
                        ? "border-purple-500 bg-purple-50 text-purple-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Mail className="h-4 w-4" />
                    <span className="font-medium">Email</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRecoveryMethod("phone")}
                    className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-colors ${
                      recoveryMethod === "phone"
                        ? "border-purple-500 bg-purple-50 text-purple-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Phone className="h-4 w-4" />
                    <span className="font-medium">Phone</span>
                  </button>
                </div>
              </div>

              {/* Input Field */}
              {recoveryMethod === "email" ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="h-12"
                    required
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="h-12"
                    required
                  />
                </div>
              )}

              {/* Send OTP Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg"
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </Button>
            </form>

            {/* Back to Sign In */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Remember your password?{" "}
                <Link
                  href="/"
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Back to Sign In
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
