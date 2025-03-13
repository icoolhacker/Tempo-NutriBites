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
  title = "Next Level Dry Fruits Intelligence",
  subtitle = "Handpicked, naturally dried, and packed with nutrients. Experience the finest quality dry fruits sourced from around the world.",
  backgroundImage = "https://images.unsplash.com/photo-1563591554-46cb3957e1d5?w=1400&q=80",
  shopNowText = "Shop Now",
  subscribeText = "Subscribe",
  onShopNowClick = () => console.log("Shop Now clicked"),
  onSubscribeClick = () => console.log("Subscribe clicked"),
}: HeroSectionProps) => {
  return (
    <div className="relative w-full h-[600px] bg-black">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-primary/20 blur-xl"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 rounded-full bg-pink-500/20 blur-xl"></div>

      {/* Content Container */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-2xl text-white">
          <div className="mb-4 inline-block px-3 py-1 bg-primary/20 rounded-full text-primary text-sm font-medium">
            AI & NutriBites
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text">{title}</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-300">{subtitle}</p>
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              onClick={onShopNowClick}
              className="gradient-bg hover:opacity-90 text-white font-semibold"
            >
              {shopNowText}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onSubscribeClick}
              className="border-primary/50 text-white hover:bg-primary/20 hover:text-white"
            >
              {subscribeText}
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Image */}
      <div className="hidden lg:block absolute right-10 bottom-0 w-96 h-96">
        <img
          src="https://images.unsplash.com/photo-1596591868231-05e808fd131d?w=600&q=80"
          alt="Dry Fruits"
          className="object-cover rounded-t-lg shadow-2xl shadow-primary/20 border border-primary/20"
        />
      </div>
    </div>
  );
};

export default HeroSection;
