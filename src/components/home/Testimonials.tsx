import React from "react";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface TestimonialProps {
  quote: string;
  author: string;
  rating: number;
  image: string;
  location: string;
}

const Testimonial = ({
  quote = "The quality of these dry fruits is exceptional! I've been ordering for months and have never been disappointed.",
  author = "Sarah Johnson",
  rating = 5,
  image = "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
  location = "New York",
}: TestimonialProps) => {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md h-full">
      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
          />
        ))}
      </div>
      <p className="text-gray-700 italic mb-6 text-center">"{quote}"</p>
      <div className="flex items-center mt-auto">
        <img src={image} alt={author} className="w-12 h-12 rounded-full mr-4" />
        <div>
          <h4 className="font-semibold">{author}</h4>
          <p className="text-gray-500 text-sm">{location}</p>
        </div>
      </div>
    </div>
  );
};

interface TestimonialsProps {
  testimonials?: TestimonialProps[];
  title?: string;
  subtitle?: string;
}

const Testimonials = ({
  testimonials = [
    {
      quote:
        "The quality of these dry fruits is exceptional! I've been ordering for months and have never been disappointed.",
      author: "Sarah Johnson",
      rating: 5,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      location: "New York",
    },
    {
      quote:
        "The subscription service is so convenient. Fresh dry fruits delivered right to my door exactly when I need them.",
      author: "Michael Chen",
      rating: 5,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      location: "San Francisco",
    },
    {
      quote:
        "I love the variety of products available. The mixed nut box is my favorite for healthy snacking throughout the week.",
      author: "Priya Patel",
      rating: 4,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
      location: "Chicago",
    },
    {
      quote:
        "The packaging is eco-friendly and the fruits always arrive fresh. Highly recommend their premium dates!",
      author: "David Wilson",
      rating: 5,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      location: "Austin",
    },
    {
      quote:
        "Customer service is outstanding. Had an issue with my order and they resolved it immediately with a bonus gift!",
      author: "Emma Rodriguez",
      rating: 5,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
      location: "Miami",
    },
  ],
  title = "What Our Customers Say",
  subtitle = "Don't just take our word for it - hear from our satisfied customers",
}: TestimonialsProps) => {
  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="relative px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3 pl-4 pr-4"
                >
                  <Testimonial {...testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-6" />
            <CarouselNext className="-right-6" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
