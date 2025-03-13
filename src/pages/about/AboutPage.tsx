import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Award, Leaf, MapPin } from "lucide-react";

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Rajesh Sharma",
      position: "Founder & CEO",
      bio: "With over 15 years of experience in the dry fruits industry, Rajesh founded NutriBites with a vision to bring premium quality products directly to consumers.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh",
    },
    {
      name: "Priya Patel",
      position: "Head of Sourcing",
      bio: "Priya travels across the globe to find the best quality dry fruits from sustainable farms. Her expertise ensures we source only the finest products.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
    },
    {
      name: "Amit Verma",
      position: "Quality Control Manager",
      bio: "Amit oversees our rigorous quality testing process, ensuring that every product meets our high standards before reaching our customers.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=amit",
    },
    {
      name: "Neha Singh",
      position: "Customer Experience Director",
      bio: "Neha leads our customer service team, ensuring that every interaction with NutriBites exceeds expectations and builds lasting relationships.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=neha",
    },
  ];

  const milestones = [
    {
      year: "2010",
      title: "Company Founded",
      description:
        "NutriBites was established as a small family business in Mumbai.",
    },
    {
      year: "2013",
      title: "First Retail Store",
      description:
        "Opened our first physical retail store in Mumbai's premium shopping district.",
    },
    {
      year: "2015",
      title: "E-commerce Launch",
      description: "Launched our online store to reach customers across India.",
    },
    {
      year: "2018",
      title: "Subscription Service",
      description:
        "Introduced our popular subscription service for regular deliveries.",
    },
    {
      year: "2020",
      title: "International Expansion",
      description:
        "Started shipping to select international markets in Asia and Europe.",
    },
    {
      year: "2023",
      title: "Sustainability Initiative",
      description:
        "Launched our eco-friendly packaging and carbon-neutral shipping program.",
    },
  ];

  const values = [
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: "Quality",
      description:
        "We never compromise on quality, sourcing only the finest dry fruits from around the world.",
    },
    {
      icon: <Leaf className="h-8 w-8 text-green-600" />,
      title: "Sustainability",
      description:
        "We work with farmers who practice sustainable agriculture and use eco-friendly packaging.",
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Community",
      description:
        "We believe in building strong relationships with our farmers, employees, and customers.",
    },
    {
      icon: <Award className="h-8 w-8 text-amber-600" />,
      title: "Transparency",
      description:
        "We are open about our sourcing, pricing, and business practices to build trust with our customers.",
    },
  ];

  const locations = [
    {
      city: "Mumbai",
      address: "123 Orchard Lane, Bandra West, Mumbai 400050",
      phone: "+91 22 1234 5678",
      hours: "Mon-Sat: 10am-8pm, Sun: 11am-6pm",
    },
    {
      city: "Delhi",
      address: "456 Green Market, Connaught Place, New Delhi 110001",
      phone: "+91 11 2345 6789",
      hours: "Mon-Sat: 10am-8pm, Sun: 11am-6pm",
    },
    {
      city: "Bangalore",
      address: "789 Fruit Avenue, Indiranagar, Bangalore 560038",
      phone: "+91 80 3456 7890",
      hours: "Mon-Sat: 10am-8pm, Sun: 11am-6pm",
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">About NutriBites</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're on a mission to bring the finest quality dry fruits and nuts to
          your doorstep, sourced directly from the best farms around the world.
        </p>
      </div>

      {/* Our Story Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded in 2010, NutriBites began as a small family business with a
            passion for quality dry fruits. What started as a modest shop in
            Mumbai has grown into a trusted name across India, but our core
            values remain unchanged.
          </p>
          <p className="text-gray-600 mb-4">
            Our founder, Rajesh Sharma, grew up in a family that valued
            nutrition and natural foods. After years in the corporate world, he
            decided to return to his roots and create a business that would
            provide premium quality dry fruits to health-conscious consumers.
          </p>
          <p className="text-gray-600">
            Today, we work directly with farmers across India and around the
            world to source the finest nuts, berries, and dried fruits. We
            maintain strict quality standards and are committed to sustainable
            practices throughout our supply chain.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80"
            alt="Our farm partners"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Our Values Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="card-hover">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Milestones Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Journey</h2>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`relative flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} md:flex-row`}
              >
                <div className="md:w-1/2 p-4">
                  <div
                    className={`md:${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"} text-left`}
                  >
                    <span className="text-primary font-bold text-lg">
                      {milestone.year}
                    </span>
                    <h3 className="text-xl font-bold mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary border-4 border-white z-10"></div>

                <div className="md:w-1/2 p-4 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index} className="card-hover">
              <CardContent className="p-6 text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-3">
                  {member.position}
                </p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Locations Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Visit Our Stores
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {locations.map((location, index) => (
            <Card key={index} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-1">{location.city}</h3>
                    <p className="text-gray-600 text-sm">{location.address}</p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="text-sm text-gray-600">
                  <p className="mb-2">
                    <span className="font-medium">Phone:</span> {location.phone}
                  </p>
                  <p>
                    <span className="font-medium">Hours:</span> {location.hours}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/10 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Join the NutriBites Family</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Experience the difference of premium quality dry fruits delivered
          straight to your door. Start your journey to healthier snacking today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/products">
            <Button className="bg-amber-600 hover:bg-amber-700">
              Shop Our Products
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline">Contact Us</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
