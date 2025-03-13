import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useToast } from "@/components/ui/use-toast";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  dateAdded: Date;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (item: Omit<WishlistItem, "dateAdded">) => void;
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;
  isInWishlist: (id: string) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider = ({ children }: WishlistProviderProps) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const { toast } = useToast();

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist);
        // Convert string dates back to Date objects
        const wishlistWithDates = parsedWishlist.map((item: any) => ({
          ...item,
          dateAdded: new Date(item.dateAdded),
        }));
        setWishlistItems(wishlistWithDates);
      } catch (error) {
        console.error("Failed to parse wishlist from localStorage", error);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (item: Omit<WishlistItem, "dateAdded">) => {
    if (!isInWishlist(item.id)) {
      const newItem = {
        ...item,
        dateAdded: new Date(),
      };
      setWishlistItems([...wishlistItems, newItem]);
      toast({
        title: "Added to wishlist",
        description: `${item.name} has been added to your wishlist`,
        variant: "default",
      });
    }
  };

  const removeFromWishlist = (id: string) => {
    const item = wishlistItems.find((item) => item.id === id);
    if (item) {
      setWishlistItems(wishlistItems.filter((item) => item.id !== id));
      toast({
        title: "Removed from wishlist",
        description: `${item.name} has been removed from your wishlist`,
        variant: "default",
      });
    }
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist",
      variant: "default",
    });
  };

  const isInWishlist = (id: string) => {
    return wishlistItems.some((item) => item.id === id);
  };

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    wishlistCount: wishlistItems.length,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
