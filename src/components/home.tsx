import React from "react";
import HeroSection from "./home/HeroSection";
import FeaturedProducts from "./home/FeaturedProducts";
import SubscriptionPlans from "./home/SubscriptionPlans";
import AboutSection from "./home/AboutSection";
import Testimonials from "./home/Testimonials";

interface HomeProps {
  // Optional props for customization
  heroProps?: React.ComponentProps<typeof HeroSection>;
  featuredProductsProps?: React.ComponentProps<typeof FeaturedProducts>;
  subscriptionPlansProps?: React.ComponentProps<typeof SubscriptionPlans>;
  aboutSectionProps?: React.ComponentProps<typeof AboutSection>;
  testimonialsProps?: React.ComponentProps<typeof Testimonials>;
}

const Home = ({
  heroProps,
  featuredProductsProps,
  subscriptionPlansProps,
  aboutSectionProps,
  testimonialsProps,
}: HomeProps) => {
  // Handler for navigation to products page
  const handleShopNowClick = () => {
    console.log("Navigating to products page");
    // Implement actual navigation here
  };

  // Handler for navigation to subscription page
  const handleSubscribeClick = () => {
    console.log("Navigating to subscription page");
    // Implement actual navigation here
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection
        onShopNowClick={handleShopNowClick}
        onSubscribeClick={handleSubscribeClick}
        {...heroProps}
      />

      {/* Featured Products Section */}
      <FeaturedProducts {...featuredProductsProps} />

      {/* Subscription Plans Section */}
      <SubscriptionPlans {...subscriptionPlansProps} />

      {/* About Section */}
      <AboutSection {...aboutSectionProps} />

      {/* Testimonials Section */}
      <Testimonials {...testimonialsProps} />
    </div>
  );
};

export default Home;
