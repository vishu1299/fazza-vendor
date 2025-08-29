"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { User, Bell, Shield } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

type SettingsTab = "personal" | "notifications" | "security";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  postalCode: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  youtube: string;
}

interface NotificationSettings {
  uploadProducts: boolean;
  uploadProductsDuplicate: boolean;
  sellProduct: boolean;
  orderUpdates: boolean;
  newOrderReceived: boolean;
  lowStockAlert: boolean;
  productApproved: boolean;
  productDeleted: boolean;
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("personal");
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: "Ralph",
    lastName: "Edwards",
    email: "Ralphedward23@gmail.com",
    phone: "+1 946518494",
    country: "United States",
    city: "Washington",
    address: "3443 Washington Ave, Manchester",
    postalCode: "468664",
    facebook: "https://www.facebook.com",
    twitter: "https://www.twitter.com",
    linkedin: "https://linkedin.com",
    youtube: "https://www.youtube.com",
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    uploadProducts: true,
    uploadProductsDuplicate: true,
    sellProduct: false,
    orderUpdates: true,
    newOrderReceived: false,
    lowStockAlert: true,
    productApproved: false,
    productDeleted: false,
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handlePersonalInfoChange = (
    field: keyof PersonalInfo,
    value: string
  ) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (
    field: keyof NotificationSettings,
    value: boolean
  ) => {
    setNotifications((prev) => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    alert("Profile saved successfully!");
  };

  const handleUpdatePassword = () => {
    if (passwords.new !== passwords.confirm) {
      alert("New passwords don't match!");
      return;
    }
    if (!passwords.current || !passwords.new) {
      alert("Please fill in all password fields!");
      return;
    }
    alert("Password updated successfully!");
    setPasswords({ current: "", new: "", confirm: "" });
  };

  const sidebarItems = [
    {
      id: "personal" as SettingsTab,
      label: "Personal Informations",
      icon: User,
    },
    {
      id: "notifications" as SettingsTab,
      label: "Notification Settings",
      icon: Bell,
    },
    {
      id: "security" as SettingsTab,
      label: "Security",
      icon: Shield,
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Settings</h1>
          <p className="text-gray-600">Lets check your store Today</p>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "personal" && (
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <User className="h-6 w-6 text-gray-700" />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        Personal Information
                      </h2>
                      <p className="text-gray-600 text-sm">
                        Manage your personal details and keep your account up to
                        date
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <Input
                          value={personalInfo.firstName}
                          onChange={(e) =>
                            handlePersonalInfoChange(
                              "firstName",
                              e.target.value
                            )
                          }
                          placeholder="Ralph"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <Input
                          value={personalInfo.lastName}
                          onChange={(e) =>
                            handlePersonalInfoChange("lastName", e.target.value)
                          }
                          placeholder="Edwards"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <Input
                          type="email"
                          value={personalInfo.email}
                          onChange={(e) =>
                            handlePersonalInfoChange("email", e.target.value)
                          }
                          placeholder="Ralphedward23@gmail.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <Input
                          value={personalInfo.phone}
                          onChange={(e) =>
                            handlePersonalInfoChange("phone", e.target.value)
                          }
                          placeholder="+1 946518494"
                        />
                      </div>
                    </div>

                    {/* Personal Address */}
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Personal Address
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Country or Region
                          </label>
                          <Select
                            value={personalInfo.country}
                            onValueChange={(value) =>
                              handlePersonalInfoChange("country", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="United States" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="United States">
                                United States
                              </SelectItem>
                              <SelectItem value="Canada">Canada</SelectItem>
                              <SelectItem value="United Kingdom">
                                United Kingdom
                              </SelectItem>
                              <SelectItem value="Australia">
                                Australia
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            City
                          </label>
                          <Input
                            value={personalInfo.city}
                            onChange={(e) =>
                              handlePersonalInfoChange("city", e.target.value)
                            }
                            placeholder="Washington"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Address
                          </label>
                          <Input
                            value={personalInfo.address}
                            onChange={(e) =>
                              handlePersonalInfoChange(
                                "address",
                                e.target.value
                              )
                            }
                            placeholder="3443 Washington Ave, Manchester"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Postal Code
                          </label>
                          <Input
                            value={personalInfo.postalCode}
                            onChange={(e) =>
                              handlePersonalInfoChange(
                                "postalCode",
                                e.target.value
                              )
                            }
                            placeholder="468664"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Social Information */}
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Social Information
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Facebook
                          </label>
                          <Select
                            value={personalInfo.facebook}
                            onValueChange={(value) =>
                              handlePersonalInfoChange("facebook", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="https://www.facebook.com" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="https://www.facebook.com">
                                https://www.facebook.com
                              </SelectItem>
                              <SelectItem value="https://facebook.com">
                                https://facebook.com
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Twitter
                          </label>
                          <Input
                            value={personalInfo.twitter}
                            onChange={(e) =>
                              handlePersonalInfoChange(
                                "twitter",
                                e.target.value
                              )
                            }
                            placeholder="https://www.twitter.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            LinkedIn
                          </label>
                          <Input
                            value={personalInfo.linkedin}
                            onChange={(e) =>
                              handlePersonalInfoChange(
                                "linkedin",
                                e.target.value
                              )
                            }
                            placeholder="https://linkedin.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Youtube
                          </label>
                          <Input
                            value={personalInfo.youtube}
                            onChange={(e) =>
                              handlePersonalInfoChange(
                                "youtube",
                                e.target.value
                              )
                            }
                            placeholder="https://www.youtube.com"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="pt-6 border-t border-gray-200 flex justify-end">
                      <Button
                        onClick={handleSaveProfile}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-8"
                      >
                        Save Profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "notifications" && (
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Bell className="h-6 w-6 text-gray-700" />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        Notification Settings
                      </h2>
                      <p className="text-gray-600 text-sm">
                        Customize how and when you receive notifications
                      </p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {/* Order Notification */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Order Notification
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between py-3">
                          <div>
                            <p className="font-medium text-gray-900">
                              When you upload products
                            </p>
                            <p className="text-sm text-gray-600">
                              Every new products upload successfully then you
                              can get notification
                            </p>
                          </div>
                          <Switch
                            checked={notifications.uploadProducts}
                            onCheckedChange={(checked) =>
                              handleNotificationChange(
                                "uploadProducts",
                                checked
                              )
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between py-3">
                          <div>
                            <p className="font-medium text-gray-900">
                              When you upload products
                            </p>
                            <p className="text-sm text-gray-600">
                              Every new products upload successfully then you
                              can get notification
                            </p>
                          </div>
                          <Switch
                            checked={notifications.uploadProductsDuplicate}
                            onCheckedChange={(checked) =>
                              handleNotificationChange(
                                "uploadProductsDuplicate",
                                checked
                              )
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between py-3">
                          <div>
                            <p className="font-medium text-gray-900">
                              Sell your product
                            </p>
                            <p className="text-sm text-gray-600">
                              Every new product sell you get a notification
                            </p>
                          </div>
                          <Switch
                            checked={notifications.sellProduct}
                            onCheckedChange={(checked) =>
                              handleNotificationChange("sellProduct", checked)
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between py-3">
                          <div>
                            <p className="font-medium text-gray-900">
                              Order Updates
                            </p>
                            <p className="text-sm text-gray-600">
                              Get real-time updates on your order status – from
                              confirmation to delivery
                            </p>
                          </div>
                          <Switch
                            checked={notifications.orderUpdates}
                            onCheckedChange={(checked) =>
                              handleNotificationChange("orderUpdates", checked)
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between py-3">
                          <div>
                            <p className="font-medium text-gray-900">
                              New Order Received
                            </p>
                            <p className="text-sm text-gray-600">
                              You have a new order for 2 items. Please confirm
                              and process the shipment
                            </p>
                          </div>
                          <Switch
                            checked={notifications.newOrderReceived}
                            onCheckedChange={(checked) =>
                              handleNotificationChange(
                                "newOrderReceived",
                                checked
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>

                    {/* Product & Inventory Updates */}
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Product & Inventory Updates
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between py-3">
                          <div>
                            <p className="font-medium text-gray-900">
                              Low Stock Alert: &quot;Wireless Earbuds Pro&quot;
                            </p>
                            <p className="text-sm text-gray-600">
                              Only 3 items left in stock. Restock to avoid
                              losing sales.
                            </p>
                          </div>
                          <Switch
                            checked={notifications.lowStockAlert}
                            onCheckedChange={(checked) =>
                              handleNotificationChange("lowStockAlert", checked)
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between py-3">
                          <div>
                            <p className="font-medium text-gray-900">
                              Product Approved: &quot;New Smartwatch Series
                              9&quot;
                            </p>
                            <p className="text-sm text-gray-600">
                              Your product is now live on the platform.
                            </p>
                          </div>
                          <Switch
                            checked={notifications.productApproved}
                            onCheckedChange={(checked) =>
                              handleNotificationChange(
                                "productApproved",
                                checked
                              )
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between py-3">
                          <div>
                            <p className="font-medium text-gray-900">
                              Product Deleted: &quot;Fitness Tracker Band&quot;
                            </p>
                            <p className="text-sm text-gray-600">
                              Deleted due to policy violation. Check Seller
                              Policy for more info.
                            </p>
                          </div>
                          <Switch
                            checked={notifications.productDeleted}
                            onCheckedChange={(checked) =>
                              handleNotificationChange(
                                "productDeleted",
                                checked
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="pt-6 border-t border-gray-200 flex justify-end">
                      <Button
                        onClick={handleSaveProfile}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-8"
                      >
                        Save Profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "security" && (
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="h-6 w-6 text-gray-700" />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        Security
                      </h2>
                      <p className="text-gray-600 text-sm">
                        Managing Access and Permissions
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Current Password
                        </label>
                        <button className="text-sm text-purple-600 hover:text-purple-700">
                          Forget Password?
                        </button>
                      </div>
                      <Input
                        type="password"
                        value={passwords.current}
                        onChange={(e) =>
                          handlePasswordChange("current", e.target.value)
                        }
                        placeholder="Enter Current Password"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Password
                        </label>
                        <Input
                          type="password"
                          value={passwords.new}
                          onChange={(e) =>
                            handlePasswordChange("new", e.target.value)
                          }
                          placeholder="Enter New Password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm Password
                        </label>
                        <Input
                          type="password"
                          value={passwords.confirm}
                          onChange={(e) =>
                            handlePasswordChange("confirm", e.target.value)
                          }
                          placeholder="Enter Confirm Password"
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button
                        onClick={handleUpdatePassword}
                        variant="outline"
                        className="border-purple-600 text-purple-600 hover:bg-purple-50"
                      >
                        Update Password
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
