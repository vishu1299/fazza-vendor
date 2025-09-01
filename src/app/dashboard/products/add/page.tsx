"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Upload, X } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Image from "next/image";

export default function AddProduct() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    productName: "",
    unit: "",
    tax: "",
    weight: "",
    category: "",
    subCategory: "",
    brand: "",
    tags: "",
    description: "",
    refundable: "Yes",
    purchasable: "Yes",
    maxQuantity: "",
    lowStockWarning: "",
    sellingPrice: "",
    status: "Active",
    showStockOut: "Active",
    exclusive: "No",
  });

  const [productThumbnail, setProductThumbnail] = useState<string | null>(null);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [productVideos, setProductVideos] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (
    type: "thumbnail" | "images" | "videos",
    files: FileList | null
  ) => {
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (type === "thumbnail") {
          setProductThumbnail(result);
        } else if (type === "images") {
          setProductImages((prev) => [...prev, result]);
        } else if (type === "videos") {
          setProductVideos((prev) => [...prev, result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number, type: "images" | "videos") => {
    if (type === "images") {
      setProductImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      setProductVideos((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Product data:", formData);
    console.log("Thumbnail:", productThumbnail);
    console.log("Images:", productImages);
    console.log("Videos:", productVideos);
    // Here you would typically send the data to your API
    router.push("/dashboard/products");
  };

  const handleDiscard = () => {
    router.push("/dashboard/products");
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
              <span>Products</span>
              <span>/</span>
              <span className="text-gray-900 font-medium">Add Product</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Add Product</h1>
            <p className="text-gray-600">
              Manage and track all your customer orders in one place.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <Label htmlFor="productName">Product Name</Label>
                    <Input
                      id="productName"
                      placeholder="Enter Name"
                      value={formData.productName}
                      onChange={(e) =>
                        handleInputChange("productName", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="unit">Unit</Label>
                    <Select
                      value={formData.unit}
                      onValueChange={(value) =>
                        handleInputChange("unit", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="piece">Piece</SelectItem>
                        <SelectItem value="kg">Kilogram</SelectItem>
                        <SelectItem value="liter">Liter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="tax">Tax (%)</Label>
                    <Input
                      id="tax"
                      placeholder="Enter"
                      value={formData.tax}
                      onChange={(e) => handleInputChange("tax", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <Label htmlFor="weight">Weight</Label>
                    <Input
                      id="weight"
                      placeholder="Enter"
                      value={formData.weight}
                      onChange={(e) =>
                        handleInputChange("weight", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        handleInputChange("category", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Clothes" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clothes">Clothes</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="home">Home</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="subCategory">Sub-Category</Label>
                    <Select
                      value={formData.subCategory}
                      onValueChange={(value) =>
                        handleInputChange("subCategory", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Jeans" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jeans">Jeans</SelectItem>
                        <SelectItem value="shirts">Shirts</SelectItem>
                        <SelectItem value="shoes">Shoes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label htmlFor="brand">Brand</Label>
                    <Select
                      value={formData.brand}
                      onValueChange={(value) =>
                        handleInputChange("brand", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Brand" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nike">Nike</SelectItem>
                        <SelectItem value="adidas">Adidas</SelectItem>
                        <SelectItem value="puma">Puma</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      placeholder="Enter"
                      value={formData.tags}
                      onChange={(e) =>
                        handleInputChange("tags", e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* Media Upload Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <Label>Product Thumbnail</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center relative">
                      {productThumbnail ? (
                        <div className="relative">
                          <Image
                            src={productThumbnail}
                            alt="Thumbnail"
                            width={100}
                            height={100}
                            className="mx-auto rounded-lg object-cover"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 p-0 bg-red-500 text-white rounded-full hover:bg-red-600"
                            onClick={() => setProductThumbnail(null)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600">Choose File</p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleFileUpload("thumbnail", e.target.files)
                            }
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label>Product Images</Label>
                    <div className="space-y-3">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center relative">
                        <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">Choose File</p>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) =>
                            handleFileUpload("images", e.target.files)
                          }
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                      {productImages.length > 0 && (
                        <div className="grid grid-cols-4 gap-2">
                          {productImages.map((image, index) => (
                            <div key={index} className="relative">
                              <Image
                                src={image}
                                alt={`Product ${index + 1}`}
                                width={60}
                                height={60}
                                className="rounded-lg object-cover"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute -top-1 -right-1 h-4 w-4 p-0 bg-red-500 text-white rounded-full hover:bg-red-600"
                                onClick={() => removeImage(index, "images")}
                              >
                                <X className="w-2 h-2" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label>Product Videos</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center relative">
                      <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Choose File</p>
                      <input
                        type="file"
                        accept="video/*"
                        multiple
                        onChange={(e) =>
                          handleFileUpload("videos", e.target.files)
                        }
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-4">
                  <Label htmlFor="description">Add Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell us about your product"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    rows={4}
                  />
                </div>

                {/* Product Settings */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <Label htmlFor="refundable">
                      Is the Product Refundable?
                    </Label>
                    <Select
                      value={formData.refundable}
                      onValueChange={(value) =>
                        handleInputChange("refundable", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="purchasable">
                      Is the Product Purchasable?
                    </Label>
                    <Select
                      value={formData.purchasable}
                      onValueChange={(value) =>
                        handleInputChange("purchasable", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="maxQuantity">
                      Maximum Purchase Quantity?
                    </Label>
                    <Input
                      id="maxQuantity"
                      placeholder="Enter"
                      value={formData.maxQuantity}
                      onChange={(e) =>
                        handleInputChange("maxQuantity", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label htmlFor="lowStockWarning">
                      Low Stock Quantity Warning
                    </Label>
                    <Input
                      id="lowStockWarning"
                      placeholder="Enter"
                      value={formData.lowStockWarning}
                      onChange={(e) =>
                        handleInputChange("lowStockWarning", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="sellingPrice">Selling Price</Label>
                    <Input
                      id="sellingPrice"
                      placeholder="Enter"
                      value={formData.sellingPrice}
                      onChange={(e) =>
                        handleInputChange("sellingPrice", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) =>
                        handleInputChange("status", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="showStockOut">Show Stock Out</Label>
                    <Select
                      value={formData.showStockOut}
                      onValueChange={(value) =>
                        handleInputChange("showStockOut", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="exclusive">Exclusive</Label>
                    <Select
                      value={formData.exclusive}
                      onValueChange={(value) =>
                        handleInputChange("exclusive", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="No">No</SelectItem>
                        <SelectItem value="Yes">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleDiscard}
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    Discard
                  </Button>
                  <Button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Update Product
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </DashboardLayout>
  );
}
