"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Plus, Search, Filter, Edit, Trash2, ArrowUpDown } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Image from "next/image";

// Sample product data
const sampleProducts = [
  {
    id: 1,
    sNo: 1,
    productName: "Clothes",
    sku: "2323",
    category: "Apparel",
    buyingPrice: 200.0,
    sellingPrice: 300.0,
    refundable: "Yes",
    active: true,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    sNo: 2,
    productName: "Clothes",
    sku: "2323",
    category: "Apparel",
    buyingPrice: 200.0,
    sellingPrice: 300.0,
    refundable: "Yes",
    active: true,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    sNo: 3,
    productName: "Clothes",
    sku: "2323",
    category: "Apparel",
    buyingPrice: 200.0,
    sellingPrice: 300.0,
    refundable: "Yes",
    active: false,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop",
  },
  {
    id: 4,
    sNo: 4,
    productName: "Clothes",
    sku: "2323",
    category: "Apparel",
    buyingPrice: 200.0,
    sellingPrice: 300.0,
    refundable: "Yes",
    active: false,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop",
  },
  {
    id: 5,
    sNo: 5,
    productName: "Clothes",
    sku: "2323",
    category: "Apparel",
    buyingPrice: 200.0,
    sellingPrice: 300.0,
    refundable: "Yes",
    active: true,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop",
  },
];

export default function Products() {
  const router = useRouter();
  const [products, setProducts] = useState(sampleProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [collectionFilter, setCollectionFilter] = useState("All Collection");
  const [priceFilter, setPriceFilter] = useState("$100");
  const [statusFilter, setStatusFilter] = useState("Active");
  const [typeFilter, setTypeFilter] = useState("Apparel");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter products based on search and filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "Active" ? product.active : !product.active;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleAddProduct = () => {
    router.push("/dashboard/products/add");
  };

  const handleEditProduct = (productId: number) => {
    router.push(`/dashboard/products/edit/${productId}`);
  };

  const handleDeleteClick = (productId: number) => {
    setProductToDelete(productId);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (productToDelete) {
      setProducts(products.filter((p) => p.id !== productToDelete));
      setDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  const handleToggleActive = (productId: number) => {
    setProducts(
      products.map((p) =>
        p.id === productId ? { ...p, active: !p.active } : p
      )
    );
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-600">
              Manage and track all your customer orders in one place.
            </p>
          </div>
          <Button
            onClick={handleAddProduct}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by Name, Product, or Others"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            className="text-purple-600 border-purple-600"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Collection
            </label>
            <Select
              value={collectionFilter}
              onValueChange={setCollectionFilter}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Collection">All Collection</SelectItem>
                <SelectItem value="Summer">Summer</SelectItem>
                <SelectItem value="Winter">Winter</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="$100">$100</SelectItem>
                <SelectItem value="$200">$200</SelectItem>
                <SelectItem value="$300">$300</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type of Products
            </label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Apparel">Apparel</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Home">Home</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-20 py-4 px-6 font-semibold text-gray-700">
                    <div className="flex items-center space-x-1">
                      <span>S.No</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead className="py-4 px-6 font-semibold text-gray-700 min-w-[200px]">
                    <div className="flex items-center space-x-1">
                      <span>Product Name</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead className="py-4 px-6 font-semibold text-gray-700">
                    <div className="flex items-center space-x-1">
                      <span>SKU</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead className="py-4 px-6 font-semibold text-gray-700">
                    <div className="flex items-center space-x-1">
                      <span>Category</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead className="py-4 px-6 font-semibold text-gray-700">
                    <div className="flex items-center space-x-1">
                      <span>Buying Price</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead className="py-4 px-6 font-semibold text-gray-700">
                    <div className="flex items-center space-x-1">
                      <span>Selling Price</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead className="py-4 px-6 font-semibold text-gray-700">
                    <div className="flex items-center space-x-1">
                      <span>Refundable</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead className="py-4 px-6 font-semibold text-gray-700">
                    Active
                  </TableHead>
                  <TableHead className="py-4 px-6 font-semibold text-gray-700">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedProducts.map((product) => (
                  <TableRow
                    key={product.id}
                    className="hover:bg-gray-50 border-b"
                  >
                    <TableCell className="py-4 px-6 text-gray-900">
                      {product.sNo}
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center space-x-4">
                        <Image
                          src={product.image}
                          alt={product.productName}
                          width={48}
                          height={48}
                          className="rounded-lg object-cover"
                        />
                        <span className="font-medium text-gray-900">
                          {product.productName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-700">
                      {product.sku}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-700">
                      {product.category}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-900 font-medium">
                      ${product.buyingPrice.toFixed(2)}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-900 font-medium">
                      ${product.sellingPrice.toFixed(2)}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-700">
                      {product.refundable}
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <Switch
                        checked={product.active}
                        onCheckedChange={() => handleToggleActive(product.id)}
                      />
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditProduct(product.id)}
                          className="h-9 w-9 p-0 text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(product.id)}
                          className="h-9 w-9 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between bg-white px-6 py-4 rounded-lg border">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredProducts.length)} of{" "}
            {filteredProducts.length} results
          </div>
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer hover:bg-gray-100"
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className={`cursor-pointer ${
                          currentPage === page
                            ? "bg-purple-600 text-white hover:bg-purple-700"
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
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer hover:bg-gray-100"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
          <div className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Product</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this product? This action cannot
                be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteConfirm}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
