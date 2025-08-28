"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-lg border-0">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Sign In</h1>
          </div>

          <div className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            <div className="text-right">
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot your password?
              </a>
            </div>

            <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg">
              Sign In Mandaean Account
            </Button>

            <div className="text-center mt-6">
              <span className="text-sm text-gray-600">
                Don&apos;t have an account yet?{" "}
                <Link href="/signup" className="text-green-500 hover:underline">
                  Sign Up
                </Link>
              </span>
            </div>

            <Link href="/signup">
              <Button
                variant="outline"
                className="w-full h-12 border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium rounded-lg mt-4"
              >
                Register
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
