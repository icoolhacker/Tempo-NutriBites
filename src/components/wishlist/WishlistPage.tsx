import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ProductCard from "@/components/products/ProductCard";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  rating: number;
  isNew?: boolean;
  isFeatured?: boolean;
  dateAdded: Date;
}

const WishlistPage = () => {
  const { toast } = useToast();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: "2",
      name: "Organic Almonds",
      price: 22.99,
      image:
        "https://images.unsplash.com/photo-1574570173583-e0c3e8083f82?w=400&q=80",
      rating: 4.6,
      isNew: true,
      dateAdded: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: "4",
      name: "Pistachios",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1616684000067-36952fde56ec?w=400&q=80",
      rating: 4.9,
      dateAdded: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
    {
      id: "6",
      name: "Walnuts",
      price: 26.99,
      discountPrice: 23.99,
      image:
        "https://images.unsplash.com/photo-1563412885-139e4045ec52?w=400&q=80",
      rating: 4.6,
      dateAdded: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
  ]);

  const handleRemoveFromWishlist = (id: string) => {
    const itemToRemove = wishlistItems.find((item) => item.id === id);
    if (itemToRemove) {
      setWishlistItems(wishlistItems.filter((item) => item.id !== id));
      toast({
        title: "Removed from wishlist",
        description: `${itemToRemove.name} has been removed from your wishlist`,
        variant: "default",
      });
    }
  };

  const handleAddToCart = (id: string) => {
    const item = wishlistItems.find((item) => item.id === id);
    if (item) {
      toast({
        title: "Added to cart",
        description: `${item.name} has been added to your cart`,
        variant: "default",
      });
    }
  };

  const handleAddAllToCart = () => {
    if (wishlistItems.length > 0) {
      toast({
        title: "Added all to cart",
        description: `${wishlistItems.length} items have been added to your cart`,
        variant: "default",
      });
    }
  };

  const handleClearWishlist = () => {
    if (wishlistItems.length > 0) {
      setWishlistItems([]);
      toast({
        title: "Wishlist cleared",
        description: "All items have been removed from your wishlist",
        variant: "default",
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
          <p className="text-gray-600">{wishlistItems.length} items saved</p>
        </div>
        {wishlistItems.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleAddAllToCart}
            >
              <ShoppingCart className="h-4 w-4" />
              Add All to Cart
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleClearWishlist}
            >
              <Trash2 className="h-4 w-4" />
              Clear Wishlist
            </Button>
          </div>
        )}
      </div>

      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="flex justify-center">
              <ProductCard
                id={item.id}
                name={item.name}
                price={item.price}
                discountPrice={item.discountPrice}
                image={item.image}
                rating={item.rating}
                isNew={item.isNew}
                isFeatured={item.isFeatured}
                onAddToCart={() => handleAddToCart(item.id)}
                onAddToWishlist={() => handleRemoveFromWishlist(item.id)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm border">
          <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">
            Save items you like to your wishlist for future reference.
          </p>
          <Link to="/products">
            <Button className="bg-amber-600 hover:bg-amber-700">
              Browse Products
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
