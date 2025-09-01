"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface PasswordRequirement {
  text: string;
  met: boolean;
}

function ChangePasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const method = searchParams.get("method") || "email";
  const contact = searchParams.get("contact") || "";

  // Password requirements
  const requirements: PasswordRequirement[] = [
    { text: "At least 8 characters", met: newPassword.length >= 8 },
    { text: "Contains uppercase letter", met: /[A-Z]/.test(newPassword) },
    { text: "Contains lowercase letter", met: /[a-z]/.test(newPassword) },
    { text: "Contains number", met: /\d/.test(newPassword) },
    {
      text: "Contains special character",
      met: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    },
  ];

  const allRequirementsMet = requirements.every((req) => req.met);
  const passwordsMatch =
    newPassword === confirmPassword && confirmPassword.length > 0;

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!allRequirementsMet) {
      toast.error("Please meet all password requirements");
      return;
    }

    if (!passwordsMatch) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Password changed successfully!");

      // Navigate back to sign in page after a short delay
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      toast.error("Failed to change password. Please try again.");
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
        <Card className="bg-white shadow-xl border-0 h-[90vh] overflow-y-scroll">
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
                <Link
                  href={`/verify-otp?method=${method}&contact=${encodeURIComponent(
                    contact
                  )}`}
                  className="mr-4"
                >
                  <Button variant="ghost" size="sm" className="p-2">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">
                  Change Password
                </h1>
              </div>
              <p className="text-gray-600">
                Create a new secure password for your account
              </p>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-6">
              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="h-12 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Password Requirements */}
              <AnimatePresence>
                {newPassword && (
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-sm font-medium text-gray-700">
                      Password Requirements:
                    </p>
                    {requirements.map((requirement, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-2"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <motion.div
                          animate={{
                            scale: requirement.met ? [1, 1.2, 1] : 1,
                            rotate: requirement.met ? [0, 10, -10, 0] : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {requirement.met ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                        </motion.div>
                        <span
                          className={`text-sm transition-colors duration-200 ${
                            requirement.met ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {requirement.text}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="h-12 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {/* Password Match Indicator */}
                {confirmPassword && (
                  <div className="flex items-center gap-2 mt-2">
                    {passwordsMatch ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-600">
                          Passwords match
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-red-600">
                          Passwords do not match
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Change Password Button */}
              <Button
                type="submit"
                disabled={isLoading || !allRequirementsMet || !passwordsMatch}
                className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg disabled:opacity-50"
              >
                {isLoading ? "Changing Password..." : "Change Password"}
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

export default function ChangePassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChangePasswordContent />
    </Suspense>
  );
}
