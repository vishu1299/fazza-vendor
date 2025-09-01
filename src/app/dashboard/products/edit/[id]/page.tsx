"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
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
import { Upload, X, Plus } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Image from "next/image";

export default function EditProduct() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id;

  const [formData, setFormData] = useState({
    productName: "Clothes",
    description: "High quality clothing item",
    basePrice: "200",
    discountPercent: "10",
    category: "clothes",
    subCategory: "shirts",
    brand: "nike",
    productTags: "fashion, clothing",
    productStatus: "Active",
    lowStockWarning: "5",
    sellingPrice: "300",
    maxQuantity: "100",
    refundable: "Yes",
    purchasable: "Yes",
    showStockOut: "Yes",
    exclusive: "No",
    variationType: "size",
    size: "M, L, XL",
  });

  const [productImage, setProductImage] = useState<string | null>(
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop"
  );
  const [productThumbnails, setProductThumbnails] = useState<string[]>([
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&h=80&fit=crop",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&h=80&fit=crop",
  ]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setProductImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleThumbnailUpload = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProductThumbnails((prev) => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeThumbnail = (index: number) => {
    setProductThumbnails((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated product data:", formData);
    router.push("/dashboard/products");
  };

  const handleDiscard = () => {
    router.push("/dashboard/products");
  };

  return (
    <DashboardLayout>
      <div className="p-8 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Edit Product
          </h1>
          <p className="text-gray-600">Let&apos;s check your store Today</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* General Information Card */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-8">
                General Information
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column */}
                <div className="space-y-8">
                  <div>
                    <Label
                      htmlFor="productName"
                      className="text-sm font-medium text-gray-700 mb-3 block"
                    >
                      Product Name
                    </Label>
                    <Input
                      id="productName"
                      placeholder="Type your product name"
                      value={formData.productName}
                      onChange={(e) =>
                        handleInputChange("productName", e.target.value)
                      }
                      className="h-12"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="description"
                      className="text-sm font-medium text-gray-700 mb-3 block"
                    >
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Write about your product"
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      rows={6}
                      className="resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label
                        htmlFor="basePrice"
                        className="text-sm font-medium text-gray-700 mb-3 block"
                      >
                        Base Price
                      </Label>
                      <Input
                        id="basePrice"
                        placeholder="$"
                        value={formData.basePrice}
                        onChange={(e) =>
                          handleInputChange("basePrice", e.target.value)
                        }
                        className="h-12"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="discountPercent"
                        className="text-sm font-medium text-gray-700 mb-3 block"
                      >
                        Discount Percent
                      </Label>
                      <Select
                        value={formData.discountPercent}
                        onValueChange={(value) =>
                          handleInputChange("discountPercent", value)
                        }
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="%" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0%</SelectItem>
                          <SelectItem value="5">5%</SelectItem>
                          <SelectItem value="10">10%</SelectItem>
                          <SelectItem value="15">15%</SelectItem>
                          <SelectItem value="20">20%</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <Label
                        htmlFor="category"
                        className="text-sm font-medium text-gray-700 mb-3 block"
                      >
                        Category
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          handleInputChange("category", value)
                        }
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="clothes">Clothes</SelectItem>
                          <SelectItem value="electronics">
                            Electronics
                          </SelectItem>
                          <SelectItem value="home">Home</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label
                        htmlFor="subCategory"
                        className="text-sm font-medium text-gray-700 mb-3 block"
                      >
                        Sub Category
                      </Label>
                      <Select
                        value={formData.subCategory}
                        onValueChange={(value) =>
                          handleInputChange("subCategory", value)
                        }
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="shirts">Shirts</SelectItem>
                          <SelectItem value="pants">Pants</SelectItem>
                          <SelectItem value="shoes">Shoes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label
                        htmlFor="brand"
                        className="text-sm font-medium text-gray-700 mb-3 block"
                      >
                        Brand
                      </Label>
                      <Select
                        value={formData.brand}
                        onValueChange={(value) =>
                          handleInputChange("brand", value)
                        }
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nike">Nike</SelectItem>
                          <SelectItem value="adidas">Adidas</SelectItem>
                          <SelectItem value="puma">Puma</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label
                        htmlFor="productTags"
                        className="text-sm font-medium text-gray-700 mb-3 block"
                      >
                        Product Tags
                      </Label>
                      <div className="relative">
                        <Input
                          id="productTags"
                          placeholder="Select"
                          value={formData.productTags}
                          onChange={(e) =>
                            handleInputChange("productTags", e.target.value)
                          }
                          className="h-12 pr-10"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-purple-600 rounded-sm flex items-center justify-center">
                          <span className="text-white text-xs">T</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label
                        htmlFor="productStatus"
                        className="text-sm font-medium text-gray-700 mb-3 block"
                      >
                        Product Status
                      </Label>
                      <Select
                        value={formData.productStatus}
                        onValueChange={(value) =>
                          handleInputChange("productStatus", value)
                        }
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label
                        htmlFor="lowStockWarning"
                        className="text-sm font-medium text-gray-700 mb-3 block"
                      >
                        Low Stock Quantity Warning
                      </Label>
                      <Input
                        id="lowStockWarning"
                        placeholder="Enter"
                        value={formData.lowStockWarning}
                        onChange={(e) =>
                          handleInputChange("lowStockWarning", e.target.value)
                        }
                        className="h-12"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="sellingPrice"
                        className="text-sm font-medium text-gray-700 mb-3 block"
                      >
                        Selling Price
                      </Label>
                      <Input
                        id="sellingPrice"
                        placeholder="Enter"
                        value={formData.sellingPrice}
                        onChange={(e) =>
                          handleInputChange("sellingPrice", e.target.value)
                        }
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label
                        htmlFor="maxQuantity"
                        className="text-sm font-medium text-gray-700 mb-3 block"
                      >
                        Maximum Purchase Quantity?
                      </Label>
                      <Input
                        id="maxQuantity"
                        placeholder="Enter"
                        value={formData.maxQuantity}
                        onChange={(e) =>
                          handleInputChange("maxQuantity", e.target.value)
                        }
                        className="h-12"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="refundable"
                        className="text-sm font-medium text-gray-700 mb-3 block"
                      >
                        Is the Product Refundable?
                      </Label>
                      <Select
                        value={formData.refundable}
                        onValueChange={(value) =>
                          handleInputChange("refundable", value)
                        }
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Yes">Yes</SelectItem>
                          <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label
                        htmlFor="purchasable"
                        className="text-sm font-medium text-gray-700 mb-3 block"
                      >
                        Is the Product Purchasable?
                      </Label>
                      <Select
                        value={formData.purchasable}
                        onValueChange={(value) =>
                          handleInputChange("purchasable", value)
                        }
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Yes">Yes</SelectItem>
                          <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label
                        htmlFor="showStockOut"
                        className="text-sm font-medium text-gray-700 mb-3 block"
                      >
                        Show Stock Out
                      </Label>
                      <Select
                        value={formData.showStockOut}
                        onValueChange={(value) =>
                          handleInputChange("showStockOut", value)
                        }
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Yes">Yes</SelectItem>
                          <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="exclusive"
                      className="text-sm font-medium text-gray-700 mb-3 block"
                    >
                      Exclusive
                    </Label>
                    <Select
                      value={formData.exclusive}
                      onValueChange={(value) =>
                        handleInputChange("exclusive", value)
                      }
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="No">No</SelectItem>
                        <SelectItem value="Yes">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Right Column - Product Image */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">
                    Product Image
                  </Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 h-96">
                    {productImage ? (
                      <div className="relative h-full">
                        <Image
                          src={productImage}
                          alt="Product"
                          width={300}
                          height={300}
                          className="mx-auto rounded-lg object-cover h-full"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 h-8 w-8 p-0 bg-red-500 text-white rounded-full hover:bg-red-600"
                          onClick={() => setProductImage(null)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Upload className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-600 mb-2">
                          Drop your image here, or browse
                        </p>
                        <p className="text-sm text-gray-500">
                          Jpeg, png are allowed
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e.target.files)}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Images */}
                  <div className="mt-6">
                    <div className="flex space-x-4">
                      {productThumbnails.map((thumb, index) => (
                        <div key={index} className="relative">
                          <Image
                            src={thumb}
                            alt={`Thumbnail ${index + 1}`}
                            width={80}
                            height={80}
                            className="rounded-lg object-cover border-2 border-gray-200"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 p-0 bg-red-500 text-white rounded-full hover:bg-red-600"
                            onClick={() => removeThumbnail(index)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                      <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 relative">
                        <Plus className="w-6 h-6 text-gray-400" />
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) =>
                            handleThumbnailUpload(e.target.files)
                          }
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Variations Card */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-8">
                Variations
              </h2>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <Label
                    htmlFor="variationType"
                    className="text-sm font-medium text-gray-700 mb-3 block"
                  >
                    Variation Type
                  </Label>
                  <Select
                    value={formData.variationType}
                    onValueChange={(value) =>
                      handleInputChange("variationType", value)
                    }
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="size">Size</SelectItem>
                      <SelectItem value="color">Color</SelectItem>
                      <SelectItem value="material">Material</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label
                    htmlFor="size"
                    className="text-sm font-medium text-gray-700 mb-3 block"
                  >
                    Size
                  </Label>
                  <Input
                    id="size"
                    placeholder="Type your size"
                    value={formData.size}
                    onChange={(e) => handleInputChange("size", e.target.value)}
                    className="h-12"
                  />
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="text-purple-600 border-purple-600 hover:bg-purple-50"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Variant
              </Button>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handleDiscard}
              className="px-8 py-3 text-red-600 border-red-600 hover:bg-red-50"
            >
              Discard
            </Button>
            <Button
              type="submit"
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700"
            >
              Update Product
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
