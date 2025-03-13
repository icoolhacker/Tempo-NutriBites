import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useWishlist } from "./WishlistContext";

interface WishlistIndicatorProps {
  variant?: "icon" | "button";
  showCount?: boolean;
  className?: string;
}

const WishlistIndicator = ({
  variant = "icon",
  showCount = true,
  className = "",
}: WishlistIndicatorProps) => {
  const { wishlistCount } = useWishlist();

  if (variant === "button") {
    return (
      <Link to="/wishlist">
        <Button
          variant="outline"
          className={`flex items-center gap-2 ${className}`}
        >
          <Heart className="h-4 w-4" />
          <span>Wishlist</span>
          {showCount && wishlistCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {wishlistCount}
            </Badge>
          )}
        </Button>
      </Link>
    );
  }

  return (
    <Link to="/wishlist" className={`relative ${className}`}>
      <Button variant="ghost" size="icon">
        <Heart className="h-5 w-5" />
        {showCount && wishlistCount > 0 && (
          <Badge
            variant="secondary"
            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {wishlistCount}
          </Badge>
        )}
      </Button>
    </Link>
  );
};

export default WishlistIndicator;
