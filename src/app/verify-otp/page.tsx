"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function VerifyOTPContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const method = searchParams.get("method") || "email";
  const contact = searchParams.get("contact") || "";

  // Timer for resend OTP
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpString = otp.join("");
    if (otpString.length !== 6) {
      toast.error("Please enter complete 6-digit OTP");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // For demo, accept any 6-digit OTP
      if (otpString === "123456" || otpString.length === 6) {
        toast.success("OTP verified successfully!");
        // Navigate to change password page
        router.push(
          `/change-password?method=${method}&contact=${encodeURIComponent(
            contact
          )}`
        );
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to verify OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(`OTP resent successfully to your ${method}!`);
      setTimeLeft(60);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (error) {
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  const formatContact = (contact: string, method: string) => {
    if (method === "email") {
      const [username, domain] = contact.split("@");
      if (username && domain) {
        const maskedUsername =
          username.charAt(0) +
          "*".repeat(username.length - 2) +
          username.charAt(username.length - 1);
        return `${maskedUsername}@${domain}`;
      }
    } else {
      if (contact.length >= 4) {
        return "*".repeat(contact.length - 4) + contact.slice(-4);
      }
    }
    return contact;
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
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <Image
                  src="/Logo.png"
                  alt="Logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
              <div className="flex items-center justify-center mb-4">
                <Link href="/forgot-password" className="mr-4">
                  <Button variant="ghost" size="sm" className="p-2">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Verify OTP</h1>
              </div>

              <div className="flex items-center justify-center gap-2 mb-2">
                {method === "email" ? (
                  <Mail className="h-5 w-5 text-purple-600" />
                ) : (
                  <Phone className="h-5 w-5 text-purple-600" />
                )}
                <p className="text-gray-600">
                  OTP sent to {formatContact(contact, method)}
                </p>
              </div>

              <p className="text-sm text-gray-500">
                Enter the 6-digit code to continue
              </p>
            </div>

            <form onSubmit={handleVerifyOTP} className="space-y-6">
              {/* OTP Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                  Enter OTP Code
                </label>

                <div className="flex justify-center gap-3">
                  {otp.map((digit, index) => (
                    <motion.input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-all duration-200"
                      initial={{ y: 20, opacity: 0, scale: 0.8 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                      whileFocus={{ scale: 1.05, borderColor: "#8b5cf6" }}
                      whileTap={{ scale: 0.95 }}
                    />
                  ))}
                </div>
              </div>

              {/* Timer and Resend */}
              <div className="text-center">
                {!canResend ? (
                  <p className="text-sm text-gray-600">
                    Resend OTP in{" "}
                    <span className="font-semibold text-purple-600">
                      {timeLeft}s
                    </span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              {/* Verify Button */}
              <Button
                type="submit"
                disabled={isLoading || otp.join("").length !== 6}
                className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg disabled:opacity-50"
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </Button>
            </form>

            {/* Back to Forgot Password */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Didn&apos;t receive the code?{" "}
                <Link
                  href="/forgot-password"
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Try different method
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

export default function VerifyOTP() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOTPContent />
    </Suspense>
  );
}
