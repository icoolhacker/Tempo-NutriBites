import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, CreditCard, Truck, Shield } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  quantity: number;
}

interface CheckoutPageProps {
  isLoggedIn?: boolean;
  updateCartCount?: (count: number) => void;
}

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  address: z.string().min(5, { message: "Address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  pincode: z.string().min(6, { message: "Please enter a valid PIN code" }),
  paymentMethod: z.enum(["card", "upi", "cod"]),
  saveInfo: z.boolean().optional(),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CheckoutPage = ({
  isLoggedIn = false,
  updateCartCount,
}: CheckoutPageProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState<"shipping" | "payment" | "review">(
    "shipping",
  );
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart items from localStorage
  useEffect(() => {
    const loadCartItems = () => {
      const storedCartItems = localStorage.getItem("cartItems");
      if (storedCartItems) {
        try {
          const parsedItems = JSON.parse(storedCartItems);
          setCartItems(parsedItems);
        } catch (error) {
          console.error("Error parsing cart items:", error);
          setCartItems([]);
        }
      } else {
        // Demo data for testing
        setCartItems([
          {
            id: "1",
            name: "Premium Cashews",
            price: 24.99,
            discountPrice: 19.99,
            image:
              "https://images.unsplash.com/photo-1563292769-4e05b684851a?w=400&q=80",
            quantity: 2,
          },
          {
            id: "2",
            name: "Organic Almonds",
            price: 22.99,
            image:
              "https://images.unsplash.com/photo-1574570173583-e0c3e8083f82?w=400&q=80",
            quantity: 1,
          },
        ]);
      }
      setIsLoading(false);
    };

    loadCartItems();
  }, []);

  // Redirect to cart if cart is empty
  useEffect(() => {
    if (!isLoading && cartItems.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Your cart is empty. Please add items before checkout.",
        variant: "destructive",
      });
      navigate("/cart");
    }
  }, [cartItems, isLoading, navigate, toast]);

  // Redirect to login if not logged in
  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      toast({
        title: "Login Required",
        description: "Please login to continue with checkout.",
        variant: "destructive",
      });
      navigate("/login?redirect=checkout");
    }
  }, [isLoggedIn, isLoading, navigate, toast]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      paymentMethod: "card",
      saveInfo: false,
      notes: "",
    },
  });

  // Calculate order summary
  const subtotal = cartItems.reduce(
    (total, item) => total + (item.discountPrice || item.price) * item.quantity,
    0,
  );
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.18; // 18% tax
  const total = subtotal + shipping + tax;

  const onSubmit = (data: FormValues) => {
    if (step === "shipping") {
      setStep("payment");
    } else if (step === "payment") {
      setStep("review");
    } else {
      // Process the order
      console.log("Order submitted:", data);

      // Clear cart
      localStorage.removeItem("cartItems");
      if (updateCartCount) updateCartCount(0);

      // Save order to localStorage for history
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      const newOrder = {
        id: `ORD${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toISOString(),
        items: cartItems,
        shipping: data,
        payment: data.paymentMethod,
        status: "processing",
        total: total,
      };
      orders.push(newOrder);
      localStorage.setItem("orders", JSON.stringify(orders));

      toast({
        title: "Order Placed Successfully!",
        description:
          "Thank you for your order. You will receive a confirmation email shortly.",
        variant: "default",
      });

      // Redirect to order confirmation page
      navigate("/order-confirmation");
    }
  };

  const goBack = () => {
    if (step === "payment") {
      setStep("shipping");
    } else if (step === "review") {
      setStep("payment");
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <p>Loading checkout information...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-amber-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link to="/cart" className="hover:text-amber-600">
          Cart
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">Checkout</span>
      </div>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            {/* Checkout Steps */}
            <div className="flex mb-8">
              <div className="flex-1 text-center">
                <div
                  className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${step === "shipping" ? "bg-amber-600 text-white" : "bg-amber-600 text-white"}`}
                >
                  1
                </div>
                <div
                  className={`mt-2 text-sm ${step === "shipping" ? "font-medium" : ""}`}
                >
                  Shipping
                </div>
              </div>
              <div className="w-full max-w-[100px] flex items-center">
                <div
                  className={`h-1 w-full ${step === "shipping" ? "bg-gray-300" : "bg-amber-600"}`}
                ></div>
              </div>
              <div className="flex-1 text-center">
                <div
                  className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${step === "payment" ? "bg-amber-600 text-white" : step === "review" ? "bg-amber-600 text-white" : "bg-gray-300 text-gray-600"}`}
                >
                  2
                </div>
                <div
                  className={`mt-2 text-sm ${step === "payment" ? "font-medium" : ""}`}
                >
                  Payment
                </div>
              </div>
              <div className="w-full max-w-[100px] flex items-center">
                <div
                  className={`h-1 w-full ${step === "review" ? "bg-amber-600" : "bg-gray-300"}`}
                ></div>
              </div>
              <div className="flex-1 text-center">
                <div
                  className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${step === "review" ? "bg-amber-600 text-white" : "bg-gray-300 text-gray-600"}`}
                >
                  3
                </div>
                <div
                  className={`mt-2 text-sm ${step === "review" ? "font-medium" : ""}`}
                >
                  Review
                </div>
              </div>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {step === "shipping" && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold">
                      Shipping Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="you@example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+91 9876543210" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="123 Main St, Apartment 4B"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="Mumbai" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input placeholder="Maharashtra" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="pincode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>PIN Code</FormLabel>
                            <FormControl>
                              <Input placeholder="400001" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Order Notes (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Special instructions for delivery"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="saveInfo"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 md:col-span-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                Save this information for next time
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}

                {step === "payment" && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold">Payment Method</h2>

                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-3"
                            >
                              <div className="flex items-center space-x-2 border rounded-lg p-3">
                                <RadioGroupItem
                                  value="card"
                                  id="payment-card"
                                />
                                <Label
                                  htmlFor="payment-card"
                                  className="flex-1"
                                >
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
                              <div className="flex items-center space-x-2 border rounded-lg p-3">
                                <RadioGroupItem value="cod" id="payment-cod" />
                                <Label htmlFor="payment-cod" className="flex-1">
                                  Cash on Delivery
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
                                  <rect
                                    width="14"
                                    height="8"
                                    x="5"
                                    y="8"
                                    rx="1"
                                  />
                                  <path d="M12 8v8" />
                                  <path d="M19 8a7 7 0 1 0-14 0" />
                                </svg>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {form.watch("paymentMethod") === "card" && (
                      <div className="space-y-4 mt-6 border-t pt-6">
                        <h3 className="font-medium">Card Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <Label htmlFor="card-number">Card Number</Label>
                            <Input
                              id="card-number"
                              placeholder="1234 5678 9012 3456"
                              className="mt-1"
                            />
                          </div>
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
                            <Input
                              id="cvv"
                              placeholder="123"
                              className="mt-1"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="name-on-card">Name on Card</Label>
                            <Input
                              id="name-on-card"
                              placeholder="John Doe"
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {form.watch("paymentMethod") === "upi" && (
                      <div className="space-y-4 mt-6 border-t pt-6">
                        <h3 className="font-medium">UPI Details</h3>
                        <div>
                          <Label htmlFor="upi-id">UPI ID</Label>
                          <Input
                            id="upi-id"
                            placeholder="yourname@upi"
                            className="mt-1"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {step === "review" && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold">Review Your Order</h2>

                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">Shipping Address</h3>
                        <p>
                          {form.getValues("firstName")}{" "}
                          {form.getValues("lastName")}
                        </p>
                        <p>{form.getValues("address")}</p>
                        <p>
                          {form.getValues("city")}, {form.getValues("state")}{" "}
                          {form.getValues("pincode")}
                        </p>
                        <p>Phone: {form.getValues("phone")}</p>
                        <p>Email: {form.getValues("email")}</p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">Payment Method</h3>
                        <p>
                          {form.getValues("paymentMethod") === "card"
                            ? "Credit/Debit Card"
                            : form.getValues("paymentMethod") === "upi"
                              ? "UPI"
                              : "Cash on Delivery"}
                        </p>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Order Items</h3>
                        <div className="space-y-3">
                          {cartItems.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center space-x-4"
                            >
                              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-sm font-medium">
                                  {item.name}
                                </h4>
                                <p className="text-sm text-gray-500">
                                  {item.quantity} x $
                                  {(item.discountPrice || item.price).toFixed(
                                    2,
                                  )}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium">
                                  $
                                  {(
                                    (item.discountPrice || item.price) *
                                    item.quantity
                                  ).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  {step !== "shipping" ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={goBack}
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </Button>
                  ) : (
                    <Link to="/cart">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Cart
                      </Button>
                    </Link>
                  )}

                  <Button
                    type="submit"
                    className="bg-amber-600 hover:bg-amber-700"
                  >
                    {step === "shipping"
                      ? "Continue to Payment"
                      : step === "payment"
                        ? "Review Order"
                        : "Place Order"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-96">
          <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (18%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm">
                <Truck className="h-5 w-5 text-gray-500" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Shield className="h-5 w-5 text-gray-500" />
                <span>Secure payment processing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
