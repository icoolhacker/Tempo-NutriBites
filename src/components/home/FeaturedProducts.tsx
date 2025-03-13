import React, { useState, useEffect } from "react";
import ProductCard from "../products/ProductCard";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  rating: number;
  isNew?: boolean;
  isFeatured: boolean;
}

interface FeaturedProductsProps {
  title?: string;
  subtitle?: string;
  products?: Product[];
}

const FeaturedProducts = ({
  title = "Featured Products",
  subtitle = "Handpicked premium quality dry fruits for you",
  products = [
    {
      id: "1",
      name: "Premium Cashews",
      price: 24.99,
      discountPrice: 19.99,
      image:
        "https://images.unsplash.com/photo-1563292769-4e05b684851a?w=400&q=80",
      rating: 4.8,
      isFeatured: true,
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
    },
    {
      id: "4",
      name: "Pistachios",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1616684000067-36952fde56ec?w=400&q=80",
      rating: 4.9,
      isFeatured: true,
    },
    {
      id: "5",
      name: "Mixed Berries",
      price: 21.99,
      image:
        "https://images.unsplash.com/photo-1596591868231-05e808fd131d?w=400&q=80",
      rating: 4.7,
      isFeatured: true,
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
    },
  ],
}: FeaturedProductsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  // Handle responsive display
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 768) {
        setItemsPerPage(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update visible products when currentIndex or itemsPerPage changes
  useEffect(() => {
    const endIndex = Math.min(currentIndex + itemsPerPage, products.length);
    setVisibleProducts(products.slice(currentIndex, endIndex));
  }, [currentIndex, itemsPerPage, products]);

  const handlePrevious = () => {
    setCurrentIndex(Math.max(0, currentIndex - itemsPerPage));
  };

  const handleNext = () => {
    setCurrentIndex(
      Math.min(products.length - itemsPerPage, currentIndex + itemsPerPage),
    );
  };

  const handleAddToCart = (id: string) => {
    console.log(`Added product ${id} to cart`);
    // Implement actual cart functionality here
  };

  const handleAddToWishlist = (id: string) => {
    console.log(`Added product ${id} to wishlist`);
    // Implement actual wishlist functionality here
  };

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600">{subtitle}</p>
        </div>

        <div className="relative">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Our Selection</h3>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="h-10 w-10 rounded-full"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                disabled={currentIndex >= products.length - itemsPerPage}
                className="h-10 w-10 rounded-full"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibleProducts.map((product) => (
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

          <div className="mt-10 text-center">
            <Button className="px-8">View All Products</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
