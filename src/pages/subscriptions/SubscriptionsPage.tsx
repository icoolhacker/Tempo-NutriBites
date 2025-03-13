import React, { useState } from "react";
import { Check, X, Calendar, Truck, Package, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  frequency: string;
  description: string;
  features: string[];
  popular?: boolean;
}

interface ProductOption {
  id: string;
  name: string;
  image: string;
  description: string;
}

const SubscriptionsPage = () => {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(
    null,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [deliveryDate, setDeliveryDate] = useState<string>("Monday");
  const [paymentMethod, setPaymentMethod] = useState<string>("card");

  const plans: SubscriptionPlan[] = [
    {
      id: "weekly",
      name: "Weekly Box",
      price: 29.99,
      frequency: "Weekly",
      description: "Perfect for regular dry fruit lovers",
      features: [
        "Fresh selection every week",
        "Free delivery",
        "Customizable mix",
        "Cancel anytime",
      ],
      popular: true,
    },
    {
      id: "biweekly",
      name: "Bi-Weekly Box",
      price: 39.99,
      frequency: "Every 2 weeks",
      description: "Ideal for moderate consumption",
      features: [
        "Premium selection",
        "Free delivery",
        "Customizable mix",
        "Pause anytime",
      ],
    },
    {
      id: "monthly",
      name: "Monthly Box",
      price: 49.99,
      frequency: "Monthly",
      description: "Our best value subscription",
      features: [
        "Deluxe selection",
        "Free priority delivery",
        "Fully customizable",
        "10% off additional purchases",
        "Exclusive seasonal items",
      ],
    },
  ];

  const productOptions: ProductOption[] = [
    {
      id: "cashews",
      name: "Premium Cashews",
      image:
        "https://images.unsplash.com/photo-1563292769-4e05b684851a?w=400&q=80",
      description: "Crunchy, protein-rich cashews sourced from Kerala",
    },
    {
      id: "almonds",
      name: "Organic Almonds",
      image:
        "https://images.unsplash.com/photo-1574570173583-e0c3e8083f82?w=400&q=80",
      description: "Nutrient-dense almonds from California",
    },
    {
      id: "cranberries",
      name: "Dried Cranberries",
      image:
        "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?w=400&q=80",
      description: "Tangy, antioxidant-rich dried cranberries",
    },
    {
      id: "pistachios",
      name: "Pistachios",
      image:
        "https://images.unsplash.com/photo-1616684000067-36952fde56ec?w=400&q=80",
      description: "Heart-healthy pistachios from Iran",
    },
    {
      id: "mixed_berries",
      name: "Mixed Berries",
      image:
        "https://images.unsplash.com/photo-1596591868231-05e808fd131d?w=400&q=80",
      description: "Assortment of nutrient-rich dried berries",
    },
    {
      id: "walnuts",
      name: "Walnuts",
      image:
        "https://images.unsplash.com/photo-1563412885-139e4045ec52?w=400&q=80",
      description: "Brain-boosting walnuts from Kashmir",
    },
  ];

  const handleSubscribe = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setIsDialogOpen(true);
  };

  const handleProductSelection = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const handleSubmitSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDialogOpen(false);

    toast({
      title: "Subscription Successful!",
      description: `You have successfully subscribed to the ${selectedPlan?.name} plan.`,
      variant: "default",
    });
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-3">
          Subscription Plans
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose a subscription plan that works for you and enjoy regular
          deliveries of premium dry fruits. All plans include free shipping and
          can be modified or canceled at any time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`flex flex-col h-full ${plan.popular ? "border-amber-500 ring-2 ring-amber-500" : ""}`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 -mt-2 -mr-2">
                <span className="bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Popular
                </span>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-gray-500 ml-2">
                  /{plan.frequency.toLowerCase()}
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-amber-600 hover:bg-amber-700"
                onClick={() => handleSubscribe(plan)}
              >
                Subscribe Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 bg-amber-50 rounded-lg p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-amber-800">1</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Choose Your Plan</h3>
            <p className="text-gray-600">
              Select a subscription plan that fits your consumption needs and
              budget.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-amber-800">2</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Customize Your Box</h3>
            <p className="text-gray-600">
              Select your favorite dry fruits or opt for our curated seasonal
              mix.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-amber-800">3</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Enjoy Regular Deliveries
            </h3>
            <p className="text-gray-600">
              Receive your premium dry fruits at your doorstep according to your
              chosen schedule.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Can I change my subscription plan?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Yes, you can upgrade, downgrade, or change your subscription
                plan at any time. Changes will be applied to your next billing
                cycle.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                How do I customize my box contents?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                After selecting your subscription plan, you'll be able to choose
                from our selection of premium dry fruits. You can update your
                preferences at any time from your account dashboard.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Can I skip a delivery?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Yes, you can skip a delivery or pause your subscription
                temporarily. Just log in to your account and manage your
                subscription at least 48 hours before your scheduled delivery
                date.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How is billing handled?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                You'll be billed automatically according to your subscription
                frequency. We accept all major credit cards and UPI payments.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Subscription Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Subscribe to {selectedPlan?.name}</DialogTitle>
            <DialogDescription>
              Customize your subscription and enjoy regular deliveries of
              premium dry fruits.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitSubscription}>
            <Tabs defaultValue="products" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="delivery">Delivery</TabsTrigger>
                <TabsTrigger value="payment">Payment</TabsTrigger>
              </TabsList>

              <TabsContent value="products" className="space-y-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {productOptions.map((product) => (
                    <div
                      key={product.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${selectedProducts.includes(product.id) ? "border-amber-500 bg-amber-50" : "hover:border-gray-300"}`}
                      onClick={() => handleProductSelection(product.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 rounded-md overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{product.name}</h4>
                          <p className="text-sm text-gray-500">
                            {product.description}
                          </p>
                        </div>
                        <div className="ml-auto">
                          <div
                            className={`h-5 w-5 rounded-full border ${selectedProducts.includes(product.id) ? "bg-amber-500 border-amber-500" : "border-gray-300"}`}
                          >
                            {selectedProducts.includes(product.id) && (
                              <Check className="h-4 w-4 text-white mx-auto mt-0.5" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={() =>
                      document.getElementById("delivery-tab")?.click()
                    }
                  >
                    Next
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="delivery" className="space-y-4 py-4">
                <div>
                  <h3 className="text-lg font-medium mb-3">
                    Delivery Preferences
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="delivery-day">
                        Preferred Delivery Day
                      </Label>
                      <RadioGroup
                        id="delivery-day"
                        value={deliveryDate}
                        onValueChange={setDeliveryDate}
                        className="mt-2"
                      >
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                            "Saturday",
                          ].map((day) => (
                            <div
                              key={day}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem
                                value={day}
                                id={`day-${day.toLowerCase()}`}
                              />
                              <Label htmlFor={`day-${day.toLowerCase()}`}>
                                {day}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label htmlFor="delivery-address">Delivery Address</Label>
                      <Input
                        id="delivery-address"
                        placeholder="Enter your full address"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="delivery-instructions">
                        Delivery Instructions (Optional)
                      </Label>
                      <Input
                        id="delivery-instructions"
                        placeholder="Any special instructions for delivery"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() =>
                      document.getElementById("products-tab")?.click()
                    }
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={() =>
                      document.getElementById("payment-tab")?.click()
                    }
                  >
                    Next
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="payment" className="space-y-4 py-4">
                <div>
                  <h3 className="text-lg font-medium mb-3">Payment Method</h3>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="mt-2"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 border rounded-lg p-3">
                        <RadioGroupItem value="card" id="payment-card" />
                        <Label htmlFor="payment-card" className="flex-1">
                          Credit/Debit Card
                        </Label>
                        <CreditCard className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3">
                        <RadioGroupItem value="upi" id="payment-upi" />
                        <Label htmlFor="payment-upi" className="flex-1">
                          UPI
                        </Label>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-gray-500"
                        >
                          <path d="M7 15h0a5 5 0 0 1 5-5m5 5h0a5 5 0 0 0-5-5" />
                          <circle cx="12" cy="12" r="10" />
                        </svg>
                      </div>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "card" && (
                    <div className="mt-4 space-y-3">
                      <div>
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input
                          id="card-number"
                          placeholder="1234 5678 9012 3456"
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry-date">Expiry Date</Label>
                          <Input
                            id="expiry-date"
                            placeholder="MM/YY"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" className="mt-1" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="name-on-card">Name on Card</Label>
                        <Input
                          id="name-on-card"
                          placeholder="John Doe"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "upi" && (
                    <div className="mt-4">
                      <Label htmlFor="upi-id">UPI ID</Label>
                      <Input
                        id="upi-id"
                        placeholder="yourname@upi"
                        className="mt-1"
                      />
                    </div>
                  )}

                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Order Summary</h4>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span>{selectedPlan?.name}</span>
                        <span>${selectedPlan?.price.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500 mb-2">
                        <span>
                          Billed {selectedPlan?.frequency.toLowerCase()}
                        </span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>${selectedPlan?.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() =>
                      document.getElementById("delivery-tab")?.click()
                    }
                  >
                    Back
                  </Button>
                  <Button type="submit">Complete Subscription</Button>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubscriptionsPage;
