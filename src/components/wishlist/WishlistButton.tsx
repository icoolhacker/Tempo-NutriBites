import React, { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  productId: string;
  productName: string;
  initialState?: boolean;
  variant?: "icon" | "text" | "full";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const WishlistButton = ({
  productId,
  productName,
  initialState = false,
  variant = "icon",
  size = "md",
  className = "",
}: WishlistButtonProps) => {
  const [isInWishlist, setIsInWishlist] = useState(initialState);
  const { toast } = useToast();

  const toggleWishlist = () => {
    // In a real app, this would call an API to add/remove from wishlist
    setIsInWishlist(!isInWishlist);

    toast({
      title: isInWishlist ? "Removed from wishlist" : "Added to wishlist",
      description: isInWishlist
        ? `${productName} has been removed from your wishlist`
        : `${productName} has been added to your wishlist`,
      variant: "default",
    });
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return variant === "icon" ? "h-8 w-8" : "h-8 text-xs";
      case "lg":
        return variant === "icon" ? "h-12 w-12" : "h-12 text-base";
      case "md":
      default:
        return variant === "icon" ? "h-10 w-10" : "h-10 text-sm";
    }
  };

  const getVariantClasses = () => {
    const baseClasses = "transition-colors";
    const sizeClasses = getSizeClasses();

    if (variant === "icon") {
      return cn(
        baseClasses,
        sizeClasses,
        "rounded-full flex items-center justify-center",
        isInWishlist
          ? "bg-red-50 text-red-500 hover:bg-red-100"
          : "bg-white text-gray-500 hover:text-red-500 border",
      );
    }

    if (variant === "text") {
      return cn(
        baseClasses,
        sizeClasses,
        "flex items-center space-x-2 px-3",
        isInWishlist
          ? "text-red-500 hover:text-red-600"
          : "text-gray-700 hover:text-red-500",
      );
    }

    // full variant
    return cn(
      baseClasses,
      sizeClasses,
      "flex items-center justify-center space-x-2 px-4 rounded-md w-full",
      isInWishlist
        ? "bg-red-50 text-red-500 border border-red-200 hover:bg-red-100"
        : "bg-white text-gray-700 border hover:text-red-500 hover:border-red-200",
    );
  };

  return (
    <Button
      type="button"
      variant="ghost"
      className={cn(getVariantClasses(), className)}
      onClick={toggleWishlist}
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart
        className={cn(
          "transition-colors",
          isInWishlist ? "fill-red-500" : "fill-none",
        )}
      />
      {variant !== "icon" && (
        <span>{isInWishlist ? "Remove from wishlist" : "Add to wishlist"}</span>
      )}
    </Button>
  );
};

export default WishlistButton;
