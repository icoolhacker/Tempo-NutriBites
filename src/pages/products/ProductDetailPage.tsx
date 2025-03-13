import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  ShoppingCart,
  Heart,
  ArrowLeft,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ProductCard from "@/components/products/ProductCard";

interface NutritionalInfo {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  fiber: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  images?: string[];
  rating: number;
  reviewCount: number;
  description: string;
  longDescription?: string;
  nutritionalInfo?: NutritionalInfo;
  origin?: string;
  weight?: string;
  category: string;
  stock: number;
  isNew?: boolean;
  isFeatured?: boolean;
  tags?: string[];
}

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Mock product data - in a real app, this would be fetched from an API
  const product: Product = {
    id: productId || "1",
    name: "Premium Cashews",
    price: 24.99,
    discountPrice: 19.99,
    image:
      "https://images.unsplash.com/photo-1563292769-4e05b684851a?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1563292769-4e05b684851a?w=800&q=80",
      "https://images.unsplash.com/photo-1567892737950-30c7b7fa46a0?w=800&q=80",
      "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=800&q=80",
      "https://images.unsplash.com/photo-1608797178998-ed6c44c1e817?w=800&q=80",
    ],
    rating: 4.8,
    reviewCount: 124,
    description:
      "Premium quality cashews sourced directly from Kerala, India. Roasted to perfection with a hint of Himalayan pink salt.",
    longDescription:
      "Our Premium Cashews are carefully selected from the finest farms in Kerala, India. Each nut is handpicked at peak ripeness and slow-roasted to bring out its natural buttery flavor. We add just a touch of Himalayan pink salt to enhance the taste without overpowering the natural goodness of the cashews. Rich in healthy fats, protein, and essential minerals, these cashews make for a perfect healthy snack or a great addition to your favorite recipes.",
    nutritionalInfo: {
      calories: 157,
      protein: 5.2,
      fat: 12.4,
      carbs: 8.6,
      fiber: 0.9,
    },
    origin: "Kerala, India",
    weight: "250g",
    category: "nuts",
    stock: 50,
    isFeatured: true,
    tags: ["nuts", "protein", "healthy", "snacks"],
  };

  // Mock related products
  const relatedProducts = [
    {
      id: "2",
      name: "Organic Almonds",
      price: 22.99,
      image:
        "https://images.unsplash.com/photo-1574570173583-e0c3e8083f82?w=400&q=80",
      rating: 4.6,
      isNew: true,
      isFeatured: true,
      category: "nuts",
    },
    {
      id: "4",
      name: "Pistachios",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1616684000067-36952fde56ec?w=400&q=80",
      rating: 4.9,
      isFeatured: true,
      category: "nuts",
    },
    {
      id: "6",
      name: "Walnuts",
      price: 26.99,
      discountPrice: 23.99,
      image:
        "https://images.unsplash.com/photo-1563412885-139e4045ec52?w=400&q=80",
      rating: 4.6,
      isFeatured: true,
      category: "nuts",
    },
    {
      id: "11",
      name: "Hazelnuts",
      price: 27.99,
      image:
        "https://images.unsplash.com/photo-1596591868231-05e808fd131d?w=400&q=80",
      rating: 4.5,
      category: "nuts",
    },
  ];

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} added to your cart`,
      variant: "default",
    });
  };

  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: `${product.name} added to your wishlist`,
      variant: "default",
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`star-${i}`}
          className="h-5 w-5 fill-yellow-400 text-yellow-400"
        />,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half-star"
          className="h-5 w-5 text-yellow-400"
          fill="url(#half-star-gradient)"
        />,
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-star-${i}`} className="h-5 w-5 text-gray-300" />,
      );
    }

    return stars;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-amber-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="hover:text-amber-600">
          Products
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg overflow-hidden border h-[400px] md:h-[500px]">
            <img
              src={product.images?.[activeImageIndex] || product.image}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>

          {product.images && product.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`border rounded-md overflow-hidden cursor-pointer w-20 h-20 flex-shrink-0 ${index === activeImageIndex ? "ring-2 ring-amber-500" : ""}`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            {product.isNew && (
              <Badge className="bg-green-500 text-white mb-2">New</Badge>
            )}
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center space-x-2">
              <div className="flex">{renderStars(product.rating)}</div>
              <span className="text-gray-600">{product.rating.toFixed(1)}</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">
                {product.reviewCount} reviews
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {product.discountPrice ? (
              <>
                <span className="text-3xl font-bold text-green-600">
                  ${product.discountPrice.toFixed(2)}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
                <Badge className="bg-red-500 text-white">
                  {Math.round(
                    ((product.price - product.discountPrice) / product.price) *
                      100,
                  )}
                  % OFF
                </Badge>
              </>
            ) : (
              <span className="text-3xl font-bold">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <Separator />

          <div>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <span className="font-medium">Category:</span>
              <span className="capitalize">{product.category}</span>
            </div>
            {product.origin && (
              <div className="flex items-center space-x-2">
                <span className="font-medium">Origin:</span>
                <span>{product.origin}</span>
              </div>
            )}
            {product.weight && (
              <div className="flex items-center space-x-2">
                <span className="font-medium">Weight:</span>
                <span>{product.weight}</span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <span className="font-medium">Availability:</span>
              <span
                className={
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }
              >
                {product.stock > 0
                  ? `In Stock (${product.stock})`
                  : "Out of Stock"}
              </span>
            </div>
          </div>

          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="capitalize">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-none"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-none"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.stock}
                >
                  +
                </Button>
              </div>
              <span className="text-sm text-gray-500">
                {product.stock} available
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="flex-1 bg-amber-600 hover:bg-amber-700"
                size="lg"
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg" onClick={handleAddToWishlist}>
                <Heart className="mr-2 h-5 w-5" />
                Add to Wishlist
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="flex items-center space-x-2 text-sm">
              <Truck className="h-5 w-5 text-gray-500" />
              <span>Free shipping over $50</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Shield className="h-5 w-5 text-gray-500" />
              <span>100% secure payment</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <RotateCcw className="h-5 w-5 text-gray-500" />
              <span>30-day return policy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mb-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
            <TabsTrigger
              value="description"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-amber-600 data-[state=active]:shadow-none py-3"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="nutrition"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-amber-600 data-[state=active]:shadow-none py-3"
            >
              Nutritional Info
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-amber-600 data-[state=active]:shadow-none py-3"
            >
              Reviews ({product.reviewCount})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="pt-6">
            <div className="prose max-w-none">
              <p className="text-gray-700">{product.longDescription}</p>
              <h3 className="text-lg font-semibold mt-4">
                Storage Instructions
              </h3>
              <p className="text-gray-700">
                Store in a cool, dry place away from direct sunlight. After
                opening, store in an airtight container to maintain freshness.
              </p>
              <h3 className="text-lg font-semibold mt-4">Quality Assurance</h3>
              <p className="text-gray-700">
                All our products undergo rigorous quality testing to ensure they
                meet our high standards. We never use artificial preservatives
                or additives.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="nutrition" className="pt-6">
            {product.nutritionalInfo ? (
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Nutritional Information (per 30g serving)
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-amber-600">
                      {product.nutritionalInfo.calories}
                    </div>
                    <div className="text-sm text-gray-500">Calories</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-amber-600">
                      {product.nutritionalInfo.protein}g
                    </div>
                    <div className="text-sm text-gray-500">Protein</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-amber-600">
                      {product.nutritionalInfo.fat}g
                    </div>
                    <div className="text-sm text-gray-500">Fat</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-amber-600">
                      {product.nutritionalInfo.carbs}g
                    </div>
                    <div className="text-sm text-gray-500">Carbs</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-amber-600">
                      {product.nutritionalInfo.fiber}g
                    </div>
                    <div className="text-sm text-gray-500">Fiber</div>
                  </div>
                </div>
                <p className="mt-6 text-sm text-gray-500">
                  * Percent Daily Values are based on a 2,000 calorie diet. Your
                  daily values may be higher or lower depending on your calorie
                  needs.
                </p>
              </div>
            ) : (
              <p>Nutritional information not available for this product.</p>
            )}
          </TabsContent>
          <TabsContent value="reviews" className="pt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Customer Reviews</h3>
                  <div className="flex items-center mt-1">
                    <div className="flex mr-2">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-gray-600">
                      Based on {product.reviewCount} reviews
                    </span>
                  </div>
                </div>
                <Button>Write a Review</Button>
              </div>

              <Separator />

              {/* Sample reviews - in a real app, these would be fetched from an API */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="font-medium">Sarah J.</div>
                      <span className="mx-2 text-gray-300">•</span>
                      <div className="text-sm text-gray-500">2 months ago</div>
                    </div>
                    <div className="flex">{renderStars(5)}</div>
                  </div>
                  <p className="text-gray-700">
                    These cashews are absolutely delicious! They're fresh,
                    crunchy, and have just the right amount of salt. Will
                    definitely order again.
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="font-medium">Rahul P.</div>
                      <span className="mx-2 text-gray-300">•</span>
                      <div className="text-sm text-gray-500">1 month ago</div>
                    </div>
                    <div className="flex">{renderStars(4)}</div>
                  </div>
                  <p className="text-gray-700">
                    Great quality cashews. The packaging was excellent and kept
                    them fresh. I would have given 5 stars but I found them a
                    bit too salty for my taste.
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="font-medium">Priya M.</div>
                      <span className="mx-2 text-gray-300">•</span>
                      <div className="text-sm text-gray-500">3 weeks ago</div>
                    </div>
                    <div className="flex">{renderStars(5)}</div>
                  </div>
                  <p className="text-gray-700">
                    I've tried many brands of cashews, but these are by far the
                    best. The quality is exceptional, and they taste so fresh.
                    Perfect for snacking or adding to recipes.
                  </p>
                </div>
              </div>

              <div className="text-center pt-4">
                <Button variant="outline">Load More Reviews</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <div key={product.id} className="flex justify-center">
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                discountPrice={product.discountPrice}
                image={product.image}
                rating={product.rating}
                isNew={product.isNew}
                isFeatured={product.isFeatured}
                onAddToCart={() => {}}
                onAddToWishlist={() => {}}
              />
            </div>
          ))}
        </div>
      </div>

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
    </div>
  );
};

export default ProductDetailPage;
