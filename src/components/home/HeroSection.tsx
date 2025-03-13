import React from "react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  shopNowText?: string;
  subscribeText?: string;
  onShopNowClick?: () => void;
  onSubscribeClick?: () => void;
}

const HeroSection = ({
  title = "Premium Dry Fruits Delivered to Your Door",
  subtitle = "Handpicked, naturally dried, and packed with nutrients. Experience the finest quality dry fruits sourced from around the world.",
  backgroundImage = "https://images.unsplash.com/photo-1563591554-46cb3957e1d5?w=1400&q=80",
  shopNowText = "Shop Now",
  subscribeText = "Subscribe",
  onShopNowClick = () => console.log("Shop Now clicked"),
  onSubscribeClick = () => console.log("Subscribe clicked"),
}: HeroSectionProps) => {
  return (
    <div className="relative w-full h-[600px] bg-gray-100">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content Container */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {title}
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-100">{subtitle}</p>
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              onClick={onShopNowClick}
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold"
            >
              {shopNowText}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onSubscribeClick}
              className="border-white text-white hover:bg-white/20 hover:text-white"
            >
              {subscribeText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
