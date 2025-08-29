"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Eye, FileText } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

// Support ticket detail interface
interface TicketDetail {
  ticketId: string;
  orderId: string;
  dateCreated: string;
  lastUpdated: string;
  issueType: string;
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  customerName: string;
  subject: string;
  description: string;
  attachments: Array<{
    name: string;
    url: string;
  }>;
}

// Sample ticket details data
const getTicketDetails = (ticketId: string): TicketDetail => {
  // Add # back to ticketId for display if it doesn't have it
  const displayTicketId = ticketId.startsWith("#") ? ticketId : `#${ticketId}`;

  const baseTicket = {
    ticketId: displayTicketId,
    orderId: "#ORD9025",
    dateCreated: "07 - Aug - 2025",
    lastUpdated: "08 - Aug - 2025",
    issueType: "Refund Request",
    status: "Open" as const,
    customerName: "Rohan Sharma",
    subject: "Damaged Item",
    description:
      "Received product with cracks in the frame. Requires replacement.",
    attachments: [
      {
        name: "product_damage.jpg",
        url: "#",
      },
    ],
  };

  // You can customize based on ticketId if needed
  return baseTicket;
};

export default function SupportTicketDetails() {
  const router = useRouter();
  const params = useParams();
  const ticketId = Array.isArray(params.ticketId)
    ? params.ticketId[0]
    : params.ticketId;

  console.log("Details page - Received ticketId:", ticketId);

  const [ticketData, setTicketData] = useState<TicketDetail>(
    getTicketDetails(ticketId)
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusUpdate = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setTicketData((prev) => ({ ...prev, status: newStatus as any }));
      alert(`Ticket status updated to ${newStatus}`);
    } catch (error) {
      console.error("Status update error:", error);
      alert("Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCloseTicket = async () => {
    setIsUpdating(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setTicketData((prev) => ({ ...prev, status: "Closed" }));
      alert("Ticket has been closed");
    } catch (error) {
      console.error("Close ticket error:", error);
      alert("Failed to close ticket");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleMarkAsSolved = async () => {
    setIsUpdating(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setTicketData((prev) => ({ ...prev, status: "Resolved" }));
      alert("Ticket marked as solved");
    } catch (error) {
      console.error("Mark as solved error:", error);
      alert("Failed to mark as solved");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSendReply = async () => {
    alert("Reply sent successfully!");
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      Open: "bg-orange-100 text-orange-800",
      "In Progress": "bg-blue-100 text-blue-800",
      Resolved: "bg-green-100 text-green-800",
      Closed: "bg-gray-100 text-gray-800",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          statusStyles[status as keyof typeof statusStyles] ||
          "bg-gray-100 text-gray-800"
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="p-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">
              Complaint Details
            </h1>
          </div>
          <p className="text-gray-600">Lets fix all the issues.</p>
        </div>

        {/* Customer Info and Actions */}
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {ticketData.customerName} ( {ticketData.issueType} )
            </h2>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => handleStatusUpdate("In Progress")}
              disabled={isUpdating}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Update Status
            </Button>
          </div>
        </div>

        {/* Ticket Info Card */}
        <Card className="bg-white mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Ticket Info
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-6">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Ticket ID
                </label>
                <p className="text-gray-900 font-medium">
                  {ticketData.ticketId}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Order ID
                </label>
                <p className="text-gray-900 font-medium">
                  {ticketData.orderId}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Date Created
                </label>
                <p className="text-gray-900">{ticketData.dateCreated}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Last Updated
                </label>
                <p className="text-gray-900">{ticketData.lastUpdated}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Issue Type
                </label>
                <p className="text-gray-900">{ticketData.issueType}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Status
                </label>
                <div className="flex items-center gap-2">
                  {getStatusBadge(ticketData.status)}
                  <Select onValueChange={handleStatusUpdate}>
                    <SelectTrigger className="w-4 h-4 border-none p-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Open">Open</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleMarkAsSolved}
                disabled={isUpdating}
                variant="outline"
                className="border-gray-200"
              >
                Mark as Solve
              </Button>
              <Button
                onClick={handleCloseTicket}
                disabled={isUpdating}
                variant="outline"
                className="border-gray-200"
              >
                Close Ticket
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Issue Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Subject and Description */}
          <div className="lg:col-span-2">
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">
                      Subject
                    </label>
                    <p className="text-gray-900">{ticketData.subject}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">
                      Description
                    </label>
                    <p className="text-gray-900">{ticketData.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Attachments and Actions */}
          <div className="space-y-6">
            {/* Attachments */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <h4 className="text-sm font-medium text-gray-600 mb-3">
                  Attachments
                </h4>
                {ticketData.attachments.map((attachment, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-blue-600"
                  >
                    <FileText className="h-4 w-4" />
                    <a href={attachment.url} className="hover:underline">
                      {attachment.name}
                    </a>
                    <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Send Reply */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <Button
                  onClick={handleSendReply}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200"
                >
                  Send Reply
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
