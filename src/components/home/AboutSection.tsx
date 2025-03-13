import React from "react";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";

interface AboutSectionProps {
  title?: string;
  subtitle?: string;
  story?: string;
  mission?: string;
  sourcingInfo?: string;
  qualityCommitment?: string;
  images?: {
    farm?: string;
    processing?: string;
  };
}

const AboutSection = ({
  title = "Our Story",
  subtitle = "Premium Dry Fruits Since 2010",
  story = "Founded with a passion for quality, we started as a small family business sourcing the finest dry fruits from around the world. Over the years, we have grown into a trusted name in premium dry fruits while maintaining our commitment to quality and sustainability.",
  mission = "Our mission is to bring the healthiest, most flavorful dry fruits to your table while supporting sustainable farming practices and fair trade relationships with our growers.",
  sourcingInfo = "We carefully select our suppliers based on their farming practices, quality standards, and commitment to sustainability. Each product is sourced directly from regions known for producing the best varieties of that particular dry fruit.",
  qualityCommitment = "Every batch of our products undergoes rigorous quality testing to ensure freshness, flavor, and nutritional value. We never use artificial preservatives or additives in any of our products.",
  images = {
    farm: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80",
    processing:
      "https://images.unsplash.com/photo-1530062845289-9109b2c9c868?w=800&q=80",
  },
}: AboutSectionProps) => {
  return (
    <section className="w-full py-16 bg-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-2">
            {title}
          </h2>
          <p className="text-lg text-amber-600">{subtitle}</p>
          <Separator className="mt-4 mx-auto w-24 bg-amber-300" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <Card className="bg-white border-amber-200">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold text-amber-800 mb-3">
                  Our Journey
                </h3>
                <p className="text-gray-700">{story}</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-amber-200">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold text-amber-800 mb-3">
                  Our Mission
                </h3>
                <p className="text-gray-700">{mission}</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="relative h-64 overflow-hidden rounded-lg shadow-md">
              <img
                src={images.farm}
                alt="Our farms"
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white font-medium">Our Partner Farms</p>
              </div>
            </div>

            <div className="relative h-64 overflow-hidden rounded-lg shadow-md">
              <img
                src={images.processing}
                alt="Processing facility"
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white font-medium">Processing & Packaging</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white border-amber-200">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold text-amber-800 mb-3">
                Sourcing Practices
              </h3>
              <p className="text-gray-700">{sourcingInfo}</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-amber-200">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold text-amber-800 mb-3">
                Quality Commitment
              </h3>
              <p className="text-gray-700">{qualityCommitment}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
