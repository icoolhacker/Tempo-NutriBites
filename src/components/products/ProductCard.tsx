import React from "react";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

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
}: ProductCardProps) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`star-${i}`}
          className="h-4 w-4 fill-yellow-400 text-yellow-400"
        />,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half-star"
          className="h-4 w-4 text-yellow-400"
          fill="url(#half-star-gradient)"
        />,
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-star-${i}`} className="h-4 w-4 text-gray-300" />,
      );
    }

    return stars;
  };

  return (
    <Card className="w-full max-w-[300px] overflow-hidden transition-all duration-300 hover:shadow-lg bg-white">
      <div className="relative">
        {isNew && (
          <Badge className="absolute left-2 top-2 z-10 bg-green-500 text-white">
            New
          </Badge>
        )}
        {isFeatured && (
          <Badge className="absolute left-2 top-2 z-10 bg-amber-500 text-white">
            Featured
          </Badge>
        )}
        {discountPrice && (
          <Badge className="absolute right-2 top-2 z-10 bg-red-500 text-white">
            Sale
          </Badge>
        )}
        <div className="relative h-[200px] w-full overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 text-gray-700 hover:bg-white hover:text-red-500"
            onClick={() => onAddToWishlist(id)}
          >
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <CardHeader className="p-4 pb-0">
        <h3 className="text-lg font-semibold">{name}</h3>
      </CardHeader>

      <CardContent className="p-4 pt-2">
        <div className="flex items-center space-x-1">
          {renderStars()}
          <span className="ml-1 text-sm text-gray-600">
            {rating.toFixed(1)}
          </span>
        </div>

        <div className="mt-2 flex items-center">
          {discountPrice ? (
            <>
              <span className="text-lg font-bold text-green-600">
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
              <Button className="w-full" onClick={() => onAddToCart(id)}>
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
            <stop offset="50%" stopColor="#facc15" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </Card>
  );
};

export default ProductCard;
