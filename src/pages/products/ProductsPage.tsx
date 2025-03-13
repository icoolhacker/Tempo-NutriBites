import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ProductCard from "../../components/products/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  rating: number;
  isNew?: boolean;
  isFeatured?: boolean;
  category: string;
}

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Premium Cashews",
      price: 24.99,
      discountPrice: 19.99,
      image:
        "https://images.unsplash.com/photo-1563292769-4e05b684851a?w=400&q=80",
      rating: 4.8,
      isFeatured: true,
      category: "nuts",
    },
    {
      id: "2",
      name: "Organic Almonds",
      price: 22.99,
      image:
        "https://images.unsplash.com/photo-1574570173583-e0c3e8083f82?w=400&q=80",
      rating: 4.6,
      isNew: true,
      isFeatured: true,
      category: "nuts",
    },
    {
      id: "3",
      name: "Dried Cranberries",
      price: 18.99,
      discountPrice: 15.99,
      image:
        "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?w=400&q=80",
      rating: 4.5,
      isFeatured: true,
      category: "berries",
    },
    {
      id: "4",
      name: "Pistachios",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1616684000067-36952fde56ec?w=400&q=80",
      rating: 4.9,
      isFeatured: true,
      category: "nuts",
    },
    {
      id: "5",
      name: "Mixed Berries",
      price: 21.99,
      image:
        "https://images.unsplash.com/photo-1596591868231-05e808fd131d?w=400&q=80",
      rating: 4.7,
      isFeatured: true,
      category: "berries",
    },
    {
      id: "6",
      name: "Walnuts",
      price: 26.99,
      discountPrice: 23.99,
      image:
        "https://images.unsplash.com/photo-1563412885-139e4045ec52?w=400&q=80",
      rating: 4.6,
      isFeatured: true,
      category: "nuts",
    },
    {
      id: "7",
      name: "Dried Apricots",
      price: 17.99,
      image:
        "https://images.unsplash.com/photo-1596591868231-05e808fd131d?w=400&q=80",
      rating: 4.4,
      category: "fruits",
    },
    {
      id: "8",
      name: "Dried Figs",
      price: 19.99,
      image:
        "https://images.unsplash.com/photo-1596591868231-05e808fd131d?w=400&q=80",
      rating: 4.3,
      category: "fruits",
    },
    {
      id: "9",
      name: "Raisins",
      price: 12.99,
      discountPrice: 10.99,
      image:
        "https://images.unsplash.com/photo-1596591868231-05e808fd131d?w=400&q=80",
      rating: 4.2,
      category: "fruits",
    },
    {
      id: "10",
      name: "Dates",
      price: 15.99,
      image:
        "https://images.unsplash.com/photo-1596591868231-05e808fd131d?w=400&q=80",
      rating: 4.7,
      category: "fruits",
    },
    {
      id: "11",
      name: "Hazelnuts",
      price: 27.99,
      image:
        "https://images.unsplash.com/photo-1596591868231-05e808fd131d?w=400&q=80",
      rating: 4.5,
      category: "nuts",
    },
    {
      id: "12",
      name: "Dried Blueberries",
      price: 23.99,
      image:
        "https://images.unsplash.com/photo-1596591868231-05e808fd131d?w=400&q=80",
      rating: 4.6,
      category: "berries",
    },
  ]);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 30]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("featured");

  // Initialize from URL params
  useEffect(() => {
    const query = searchParams.get("q") || "";
    const categories = searchParams.get("categories")?.split(",") || [];
    const sort = searchParams.get("sort") || "featured";
    const minPrice = Number(searchParams.get("minPrice") || 0);
    const maxPrice = Number(searchParams.get("maxPrice") || 30);

    setSearchQuery(query);
    setSelectedCategories(categories);
    setSortOption(sort);
    setPriceRange([minPrice, maxPrice]);
  }, [searchParams]);

  // Apply filters
  useEffect(() => {
    let result = [...products];

    // Apply search filter
    if (searchQuery) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter((product) =>
        selectedCategories.includes(product.category),
      );
    }

    // Apply price filter
    result = result.filter(
      (product) =>
        (product.discountPrice || product.price) >= priceRange[0] &&
        (product.discountPrice || product.price) <= priceRange[1],
    );

    // Apply sorting
    switch (sortOption) {
      case "price-low":
        result.sort(
          (a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price),
        );
        break;
      case "price-high":
        result.sort(
          (a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price),
        );
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    setFilteredProducts(result);
  }, [products, searchQuery, selectedCategories, priceRange, sortOption]);

  // Update URL params when filters change
  const updateSearchParams = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedCategories.length > 0)
      params.set("categories", selectedCategories.join(","));
    if (sortOption !== "featured") params.set("sort", sortOption);
    if (priceRange[0] > 0) params.set("minPrice", priceRange[0].toString());
    if (priceRange[1] < 30) params.set("maxPrice", priceRange[1].toString());
    setSearchParams(params);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearchParams();
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  const applyFilters = () => {
    updateSearchParams();
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setPriceRange([0, 30]);
    setSortOption("featured");
    setSearchParams({});
  };

  const handleAddToCart = (id: string) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      // Get existing cart items from localStorage
      const existingCartItems = localStorage.getItem("cartItems");
      let cartItems = [];

      if (existingCartItems) {
        cartItems = JSON.parse(existingCartItems);

        // Check if product already exists in cart
        const existingItemIndex = cartItems.findIndex(
          (item: any) => item.id === id,
        );

        if (existingItemIndex >= 0) {
          // Increment quantity if product already in cart
          cartItems[existingItemIndex].quantity += 1;
        } else {
          // Add new product to cart
          cartItems.push({
            id: product.id,
            name: product.name,
            price: product.price,
            discountPrice: product.discountPrice,
            image: product.image,
            quantity: 1,
          });
        }
      } else {
        // Create new cart with this product
        cartItems = [
          {
            id: product.id,
            name: product.name,
            price: product.price,
            discountPrice: product.discountPrice,
            image: product.image,
            quantity: 1,
          },
        ];
      }

      // Save updated cart to localStorage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      // Dispatch storage event to update cart count in other components
      window.dispatchEvent(new Event("storage"));

      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`,
      });
    }
  };

  const handleAddToWishlist = (id: string) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      // Get existing wishlist items from localStorage
      const existingWishlistItems = localStorage.getItem("wishlistItems");
      let wishlistItems = [];

      if (existingWishlistItems) {
        wishlistItems = JSON.parse(existingWishlistItems);

        // Check if product already exists in wishlist
        const existingItemIndex = wishlistItems.findIndex(
          (item: any) => item.id === id,
        );

        if (existingItemIndex >= 0) {
          // Remove from wishlist if already there
          wishlistItems.splice(existingItemIndex, 1);
          toast({
            title: "Removed from Wishlist",
            description: `${product.name} has been removed from your wishlist.`,
          });
        } else {
          // Add new product to wishlist
          wishlistItems.push({
            id: product.id,
            name: product.name,
            price: product.price,
            discountPrice: product.discountPrice,
            image: product.image,
            dateAdded: new Date().toISOString(),
          });
          toast({
            title: "Added to Wishlist",
            description: `${product.name} has been added to your wishlist.`,
          });
        }
      } else {
        // Create new wishlist with this product
        wishlistItems = [
          {
            id: product.id,
            name: product.name,
            price: product.price,
            discountPrice: product.discountPrice,
            image: product.image,
            dateAdded: new Date().toISOString(),
          },
        ];
        toast({
          title: "Added to Wishlist",
          description: `${product.name} has been added to your wishlist.`,
        });
      }

      // Save updated wishlist to localStorage
      localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
    }
  };

  const categories = [
    { id: "nuts", label: "Nuts" },
    { id: "fruits", label: "Dried Fruits" },
    { id: "berries", label: "Berries" },
  ];

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Desktop Filters */}
        <div className="hidden md:block w-64 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() =>
                          handleCategoryChange(category.id)
                        }
                      />
                      <Label
                        htmlFor={`category-${category.id}`}
                        className="ml-2 text-sm font-normal"
                      >
                        {category.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Price Range</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={priceRange}
                    max={30}
                    step={1}
                    value={priceRange}
                    onValueChange={handlePriceChange}
                    className="my-4"
                  />
                  <div className="flex justify-between text-sm">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  onClick={applyFilters}
                  className="w-full bg-amber-600 hover:bg-amber-700"
                >
                  Apply Filters
                </Button>
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="w-full mt-2"
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filters */}
        <div className="md:hidden flex justify-between mb-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                  Refine your product search with these filters.
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-4 py-4">
                <div>
                  <h3 className="font-medium mb-2">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center">
                        <Checkbox
                          id={`mobile-category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() =>
                            handleCategoryChange(category.id)
                          }
                        />
                        <Label
                          htmlFor={`mobile-category-${category.id}`}
                          className="ml-2 text-sm font-normal"
                        >
                          {category.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={priceRange}
                      max={30}
                      step={1}
                      value={priceRange}
                      onValueChange={handlePriceChange}
                      className="my-4"
                    />
                    <div className="flex justify-between text-sm">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    onClick={() => {
                      applyFilters();
                      document
                        .querySelector("[data-radix-collection-item]")
                        ?.click(); // Close sheet
                    }}
                    className="w-full bg-amber-600 hover:bg-amber-700"
                  >
                    Apply Filters
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      resetFilters();
                      document
                        .querySelector("[data-radix-collection-item]")
                        ?.click(); // Close sheet
                    }}
                    className="w-full mt-2"
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex-1 mx-2">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Sort
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Sort Products</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <div className="space-y-2">
                  {sortOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`p-2 rounded cursor-pointer ${sortOption === option.value ? "bg-amber-100 text-amber-800" : "hover:bg-gray-100"}`}
                      onClick={() => {
                        handleSortChange(option.value);
                        document
                          .querySelector("[data-radix-collection-item]")
                          ?.click(); // Close sheet
                        applyFilters();
                      }}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Desktop Search and Sort */}
          <div className="hidden md:flex justify-between mb-6">
            <form onSubmit={handleSearch} className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                className="absolute right-0 top-0 h-full rounded-l-none"
              >
                Search
              </Button>
            </form>

            <div className="flex items-center">
              <span className="mr-2 text-sm text-gray-500">Sort by:</span>
              <select
                value={sortOption}
                onChange={(e) => {
                  handleSortChange(e.target.value);
                  applyFilters();
                }}
                className="border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm text-gray-500 mb-4">
            Showing {filteredProducts.length} of {products.length} products
          </p>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="flex justify-center">
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    discountPrice={product.discountPrice}
                    image={product.image}
                    rating={product.rating}
                    isNew={product.isNew}
                    isFeatured={product.isFeatured}
                    onAddToCart={handleAddToCart}
                    onAddToWishlist={handleAddToWishlist}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No products found</h3>
              <p className="text-gray-500 mt-2">
                Try adjusting your search or filter criteria
              </p>
              <Button variant="outline" onClick={resetFilters} className="mt-4">
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
