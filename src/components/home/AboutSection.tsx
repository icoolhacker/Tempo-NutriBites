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
  title = "Insights about our company",
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
  const stats = [
    { value: 27, label: "Years Experience" },
    { value: 18, label: "Countries" },
    { value: 56, label: "Products" },
    { value: 13, label: "Awards" },
  ];

  return (
    <section className="w-full py-16 bg-black/90">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2 gradient-text">
            {title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Our Story</h3>
            <p className="text-gray-300 mb-6">{story}</p>
            <h3 className="text-xl font-semibold mb-4 text-white">
              Our Mission
            </h3>
            <p className="text-gray-300">{mission}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-lg">
              <img
                src={images.farm}
                alt="Our Farm"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-lg">
              <img
                src={images.processing}
                alt="Processing Facility"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <Separator className="my-12 bg-gray-800" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">
              Sourcing & Sustainability
            </h3>
            <p className="text-gray-300 mb-6">{sourcingInfo}</p>
            <h3 className="text-xl font-semibold mb-4 text-white">
              Quality Commitment
            </h3>
            <p className="text-gray-300">{qualityCommitment}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="bg-secondary/50 border border-primary/10 card-hover"
              >
                <CardContent className="p-6 text-center">
                  <p className="text-3xl font-bold gradient-text">
                    {stat.value}+
                  </p>
                  <p className="text-gray-400">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
