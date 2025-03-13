import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart, Heart, Eye } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useToast } from "../ui/use-toast";

interface ProductCardProps {
  id?: string;
  name?: string;
  price?: number;
  discountPrice?: number;
  image?: string;
  rating?: number;
  isNew?: boolean;
  isFeatured?: boolean;
  onAddToCart?: (id: string) => void;
  onAddToWishlist?: (id: string) => void;
  inWishlist?: boolean;
}

const ProductCard = ({
  id = "1",
  name = "Premium Cashews",
  price = 24.99,
  discountPrice,
  image = "https://images.unsplash.com/photo-1563292769-4e05b684851a?w=400&q=80",
  rating = 4.5,
  isNew = false,
  isFeatured = false,
  onAddToCart = () => {},
  onAddToWishlist = () => {},
  inWishlist = false,
}: ProductCardProps) => {
  const [isInWishlist, setIsInWishlist] = useState(inWishlist);
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = () => {
    onAddToCart(id);
    toast({
      title: "Added to Cart",
      description: `${name} has been added to your cart.`,
    });
  };

  const handleToggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
    onAddToWishlist(id);
    toast({
      title: isInWishlist ? "Removed from Wishlist" : "Added to Wishlist",
      description: `${name} has been ${isInWishlist ? "removed from" : "added to"} your wishlist.`,
    });
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`star-${i}`}
          className="h-4 w-4 fill-primary text-primary"
        />,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half-star"
          className="h-4 w-4 text-primary"
          fill="url(#half-star-gradient)"
        />,
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-star-${i}`} className="h-4 w-4 text-gray-500" />,
      );
    }

    return stars;
  };

  return (
    <Card
      className="w-full max-w-[300px] overflow-hidden card-hover bg-secondary/50 border border-primary/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {isNew && (
          <Badge className="absolute left-2 top-2 z-10 bg-green-500 text-white">
            New
          </Badge>
        )}
        {isFeatured && !isNew && (
          <Badge className="absolute left-2 top-2 z-10 bg-primary text-white">
            Featured
          </Badge>
        )}
        {discountPrice && (
          <Badge className="absolute right-2 top-2 z-10 bg-red-500 text-white">
            Sale
          </Badge>
        )}
        <div className="relative h-[200px] w-full overflow-hidden bg-black/20">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 rounded-full ${isInWishlist ? "bg-red-500 text-white" : "bg-black/50 text-white hover:bg-primary/80 hover:text-white"}`}
              onClick={handleToggleWishlist}
            >
              <Heart
                className={`h-5 w-5 ${isInWishlist ? "fill-white" : ""}`}
              />
            </Button>

            {isHovered && (
              <Link to={`/products/${id}`}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-black/50 text-white hover:bg-primary/80 hover:text-white"
                >
                  <Eye className="h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <CardHeader className="p-4 pb-0">
        <Link
          to={`/products/${id}`}
          className="hover:text-primary transition-colors"
        >
          <h3 className="text-lg font-semibold">{name}</h3>
        </Link>
      </CardHeader>

      <CardContent className="p-4 pt-2">
        <div className="flex items-center space-x-1">
          {renderStars()}
          <span className="ml-1 text-sm text-gray-400">
            {rating.toFixed(1)}
          </span>
        </div>

        <div className="mt-2 flex items-center">
          {discountPrice ? (
            <>
              <span className="text-lg font-bold text-primary">
                ${discountPrice.toFixed(2)}
              </span>
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold">${price.toFixed(2)}</span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="w-full gradient-bg hover:opacity-90"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add {name} to your cart</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>

      {/* SVG for half-star gradient */}
      <svg width="0" height="0" className="hidden">
        <defs>
          <linearGradient
            id="half-star-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="50%" stopColor="#c026d3" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </Card>
  );
};

export default ProductCard;
