"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, ArrowUpDown, Edit } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

interface InventoryItem {
  id: number;
  productCode: string;
  sku: string;
  productName: string;
  quantity: number;
  lastUpdated: string;
  status: "active" | "inactive";
}

// Initial inventory data - in a real app this would come from an API
const initialInventoryData: InventoryItem[] = [
  {
    id: 1,
    productCode: "PC6989",
    sku: "563",
    productName: "Lorem ipsum",
    quantity: 50,
    lastUpdated: "24 Aug 2025",
    status: "active",
  },
  {
    id: 2,
    productCode: "PC6989",
    sku: "563",
    productName: "Lorem ipsum",
    quantity: 50,
    lastUpdated: "24 Aug 2025",
    status: "active",
  },
  {
    id: 3,
    productCode: "PC6989",
    sku: "563",
    productName: "Lorem ipsum",
    quantity: 50,
    lastUpdated: "24 Aug 2025",
    status: "inactive",
  },
  {
    id: 4,
    productCode: "PC6989",
    sku: "563",
    productName: "Lorem ipsum",
    quantity: 50,
    lastUpdated: "24 Aug 2025",
    status: "inactive",
  },
  {
    id: 5,
    productCode: "PC6989",
    sku: "563",
    productName: "Lorem ipsum",
    quantity: 50,
    lastUpdated: "24 Aug 2025",
    status: "active",
  },
  // Add more items for pagination testing
  {
    id: 6,
    productCode: "PC6990",
    sku: "564",
    productName: "Product 6",
    quantity: 25,
    lastUpdated: "23 Aug 2025",
    status: "active",
  },
  {
    id: 7,
    productCode: "PC6991",
    sku: "565",
    productName: "Product 7",
    quantity: 75,
    lastUpdated: "22 Aug 2025",
    status: "inactive",
  },
  {
    id: 8,
    productCode: "PC6992",
    sku: "566",
    productName: "Product 8",
    quantity: 100,
    lastUpdated: "21 Aug 2025",
    status: "active",
  },
  {
    id: 9,
    productCode: "PC6993",
    sku: "567",
    productName: "Product 9",
    quantity: 30,
    lastUpdated: "20 Aug 2025",
    status: "active",
  },
  {
    id: 10,
    productCode: "PC6994",
    sku: "568",
    productName: "Product 10",
    quantity: 60,
    lastUpdated: "19 Aug 2025",
    status: "inactive",
  },
];

export default function Inventory() {
  // State for inventory data - this will be updated when items change
  const [inventoryData, setInventoryData] =
    useState<InventoryItem[]>(initialInventoryData);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState("20");
  const [currentPage, setCurrentPage] = useState(1);
  const [isRestockModalOpen, setIsRestockModalOpen] = useState(false);
  const [isBulkUpdateModalOpen, setIsBulkUpdateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Modal form states
  const [selectedProductId, setSelectedProductId] = useState("");
  const [restockQuantity, setRestockQuantity] = useState("");
  const [bulkUpdateType, setBulkUpdateType] = useState("");
  const [bulkUpdateValue, setBulkUpdateValue] = useState("");
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [editQuantity, setEditQuantity] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const filteredItems = inventoryData.filter((item: InventoryItem) => {
    const matchesSearch =
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / parseInt(itemsPerPage));
  const startIndex = (currentPage - 1) * parseInt(itemsPerPage);
  const endIndex = startIndex + parseInt(itemsPerPage);
  const currentPageItems = filteredItems.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Reset to page 1 when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage]);

  // Toggle item status functionality
  const toggleItemStatus = (id: number) => {
    setInventoryData((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "active" ? "inactive" : "active",
              lastUpdated: new Date().toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }),
            }
          : item
      )
    );
  };

  // Edit item functionality
  const handleEdit = (item: InventoryItem) => {
    setEditingItem(item);
    setEditQuantity(item.quantity.toString());
    setEditStatus(item.status);
    setIsEditModalOpen(true);
  };

  // Process edit
  const processEdit = () => {
    if (editingItem && editQuantity && editStatus) {
      const quantity = parseInt(editQuantity);
      if (!isNaN(quantity) && quantity >= 0) {
        setInventoryData((prevData) =>
          prevData.map((item) =>
            item.id === editingItem.id
              ? {
                  ...item,
                  quantity: quantity,
                  status: editStatus as "active" | "inactive",
                  lastUpdated: new Date().toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }),
                }
              : item
          )
        );
        // Reset form
        setEditingItem(null);
        setEditQuantity("");
        setEditStatus("");
        setIsEditModalOpen(false);
        alert(`Successfully updated ${editingItem.productName}!`);
      }
    }
  };

  // Modal handlers
  const handleRestock = () => {
    setIsRestockModalOpen(true);
  };

  const handleBulkUpdate = () => {
    setIsBulkUpdateModalOpen(true);
  };

  // Process restock
  const processRestock = () => {
    if (selectedProductId && restockQuantity) {
      const quantity = parseInt(restockQuantity);
      if (!isNaN(quantity) && quantity > 0) {
        setInventoryData((prevData) =>
          prevData.map((item) =>
            item.id === parseInt(selectedProductId)
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                  lastUpdated: new Date().toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }),
                }
              : item
          )
        );
        // Reset form
        setSelectedProductId("");
        setRestockQuantity("");
        setIsRestockModalOpen(false);
        alert(`Successfully added ${quantity} items to inventory!`);
      }
    }
  };

  // Process bulk update
  const processBulkUpdate = () => {
    if (bulkUpdateType && bulkUpdateValue) {
      setInventoryData((prevData) =>
        prevData.map((item) => {
          const updatedItem = { ...item };

          if (bulkUpdateType === "quantity") {
            const newQuantity = parseInt(bulkUpdateValue);
            if (!isNaN(newQuantity)) {
              updatedItem.quantity = newQuantity;
            }
          } else if (bulkUpdateType === "status") {
            updatedItem.status = bulkUpdateValue as "active" | "inactive";
          } else if (bulkUpdateType === "both") {
            const newQuantity = parseInt(bulkUpdateValue);
            if (!isNaN(newQuantity)) {
              updatedItem.quantity = newQuantity;
              updatedItem.status = "active";
            }
          }

          updatedItem.lastUpdated = new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });

          return updatedItem;
        })
      );

      // Reset form
      setBulkUpdateType("");
      setBulkUpdateValue("");
      setIsBulkUpdateModalOpen(false);
      alert("Bulk update completed successfully!");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Inventory Management
          </h1>
          <p className="text-gray-600">Lets check your store Today</p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            {/* Items per page selector */}
            <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
              <SelectTrigger className="w-16 h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by SKU, Product Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80 h-10"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={handleRestock}
              className="h-10 px-4 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Restock
            </Button>
            <Button
              onClick={handleBulkUpdate}
              className="h-10 px-4 bg-purple-600 hover:bg-purple-700 text-white"
            >
              Add Bulk Update
            </Button>
          </div>
        </div>

        {/* Table */}
        <Card className="bg-white">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-200">
                  <TableHead className="text-gray-600 font-medium py-4 px-6">
                    <div className="flex items-center space-x-1">
                      <span>S.No.</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-gray-600 font-medium py-4 px-6">
                    <div className="flex items-center space-x-1">
                      <span>Product Code</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-gray-600 font-medium py-4 px-6">
                    <div className="flex items-center space-x-1">
                      <span>SKU</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-gray-600 font-medium py-4 px-6">
                    <div className="flex items-center space-x-1">
                      <span>Product Name</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-gray-600 font-medium py-4 px-6">
                    <div className="flex items-center space-x-1">
                      <span>Quantity</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-gray-600 font-medium py-4 px-6">
                    <div className="flex items-center space-x-1">
                      <span>Last Updated</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-gray-600 font-medium py-4 px-6">
                    <span>Status</span>
                  </TableHead>
                  <TableHead className="text-gray-600 font-medium py-4 px-6">
                    <span>Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(currentPageItems.length > 0
                  ? currentPageItems
                  : filteredItems.slice(0, parseInt(itemsPerPage))
                ).map((item: InventoryItem, index: number) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors border-b border-gray-100"
                  >
                    <TableCell className="py-4 px-6">
                      <span className="text-gray-900">{index + 1}</span>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <span className="text-gray-900 font-medium">
                        {item.productCode}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <span className="text-gray-900">{item.sku}</span>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <span className="text-gray-900">{item.productName}</span>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <span className="text-gray-900">{item.quantity}</span>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <span className="text-gray-600">{item.lastUpdated}</span>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <button
                        onClick={() => toggleItemStatus(item.id)}
                        className="focus:outline-none"
                      >
                        {item.status === "active" ? (
                          <div className="w-12 h-6 bg-purple-600 rounded-full relative transition-colors">
                            <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 transition-transform"></div>
                          </div>
                        ) : (
                          <div className="w-12 h-6 bg-gray-300 rounded-full relative transition-colors">
                            <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 transition-transform"></div>
                          </div>
                        )}
                      </button>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(item)}
                        className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center py-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={goToPreviousPage}
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => goToPage(page)}
                            isActive={currentPage === page}
                            className={`cursor-pointer ${
                              currentPage === page
                                ? "bg-purple-600 text-white hover:bg-purple-700 border-purple-600"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}

                    <PaginationItem>
                      <PaginationNext
                        onClick={goToNextPage}
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Restock Modal */}
        <Dialog open={isRestockModalOpen} onOpenChange={setIsRestockModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Restock Items</DialogTitle>
              <DialogDescription>
                Select items to restock and update quantities.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product">Product</Label>
                <Select
                  value={selectedProductId}
                  onValueChange={setSelectedProductId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {inventoryData.map((item: InventoryItem) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.productName} ({item.productCode})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity to Add</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Enter quantity"
                  min="1"
                  value={restockQuantity}
                  onChange={(e) => setRestockQuantity(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsRestockModalOpen(false);
                  setSelectedProductId("");
                  setRestockQuantity("");
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={processRestock}
                className="bg-purple-600 hover:bg-purple-700"
                disabled={!selectedProductId || !restockQuantity}
              >
                Restock
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Bulk Update Modal */}
        <Dialog
          open={isBulkUpdateModalOpen}
          onOpenChange={setIsBulkUpdateModalOpen}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Bulk Update</DialogTitle>
              <DialogDescription>
                Update multiple items at once.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="updateType">Update Type</Label>
                <Select
                  value={bulkUpdateType}
                  onValueChange={setBulkUpdateType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select update type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quantity">Update Quantity</SelectItem>
                    <SelectItem value="status">Update Status</SelectItem>
                    <SelectItem value="both">Update Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="value">New Value</Label>
                {bulkUpdateType === "status" ? (
                  <Select
                    value={bulkUpdateValue}
                    onValueChange={setBulkUpdateValue}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id="value"
                    type="number"
                    placeholder={
                      bulkUpdateType === "both"
                        ? "Enter quantity (status will be set to active)"
                        : "Enter new value"
                    }
                    value={bulkUpdateValue}
                    onChange={(e) => setBulkUpdateValue(e.target.value)}
                    min="0"
                  />
                )}
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsBulkUpdateModalOpen(false);
                  setBulkUpdateType("");
                  setBulkUpdateValue("");
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={processBulkUpdate}
                className="bg-purple-600 hover:bg-purple-700"
                disabled={!bulkUpdateType || !bulkUpdateValue}
              >
                Update All Items
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Item Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Item</DialogTitle>
              <DialogDescription>
                Update the quantity and status for {editingItem?.productName}.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="editQuantity">Quantity</Label>
                <Input
                  id="editQuantity"
                  type="number"
                  placeholder="Enter quantity"
                  min="0"
                  value={editQuantity}
                  onChange={(e) => setEditQuantity(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editStatus">Status</Label>
                <Select value={editStatus} onValueChange={setEditStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingItem(null);
                  setEditQuantity("");
                  setEditStatus("");
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={processEdit}
                className="bg-purple-600 hover:bg-purple-700"
                disabled={!editQuantity || !editStatus}
              >
                Update Item
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
