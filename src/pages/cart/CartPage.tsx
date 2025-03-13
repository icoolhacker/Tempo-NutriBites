import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface CartItem {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  quantity: number;
}

const CartPage = () => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([
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
    {
      id: "3",
      name: "Dried Cranberries",
      price: 18.99,
      discountPrice: 15.99,
      image:
        "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?w=400&q=80",
      quantity: 3,
    },
  ]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = cartItems.reduce(
    (total, item) => total + (item.discountPrice || item.price) * item.quantity,
    0,
  );
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.18; // 18% tax
  const total = subtotal + shipping + tax - discount;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };

  const handleApplyPromoCode = () => {
    if (promoCode.toLowerCase() === "nutri20") {
      setDiscount(subtotal * 0.2); // 20% discount
      toast({
        title: "Promo code applied",
        description: "You got 20% off your order!",
        variant: "default",
      });
    } else {
      setDiscount(0);
      toast({
        title: "Invalid promo code",
        description: "Please enter a valid promo code.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="hidden md:grid grid-cols-12 gap-4 mb-4 text-sm font-medium text-gray-500">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              <Separator className="mb-6 hidden md:block" />

              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="md:grid md:grid-cols-12 md:gap-4 md:items-center"
                  >
                    {/* Mobile View */}
                    <div className="md:hidden flex flex-col space-y-4 pb-4 border-b">
                      <div className="flex space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <div className="flex items-center mt-1">
                            {item.discountPrice ? (
                              <>
                                <span className="font-medium text-green-600">
                                  ${item.discountPrice.toFixed(2)}
                                </span>
                                <span className="ml-2 text-sm text-gray-500 line-through">
                                  ${item.price.toFixed(2)}
                                </span>
                              </>
                            ) : (
                              <span className="font-medium">
                                ${item.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="flex items-center space-x-4">
                          <span className="font-medium">
                            $
                            {(
                              (item.discountPrice || item.price) * item.quantity
                            ).toFixed(2)}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Desktop View */}
                    <div className="hidden md:col-span-6 md:flex md:items-center md:space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                      </div>
                    </div>

                    <div className="hidden md:block md:col-span-2 md:text-center">
                      {item.discountPrice ? (
                        <>
                          <span className="font-medium text-green-600">
                            ${item.discountPrice.toFixed(2)}
                          </span>
                          <span className="block text-sm text-gray-500 line-through">
                            ${item.price.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="font-medium">
                          ${item.price.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <div className="hidden md:flex md:col-span-2 md:justify-center md:items-center md:space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="hidden md:flex md:col-span-2 md:justify-between md:items-center">
                      <span className="font-medium">
                        $
                        {(
                          (item.discountPrice || item.price) * item.quantity
                        ).toFixed(2)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <Separator className="my-4 md:hidden" />
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4 justify-between">
                <Link to="/products">
                  <Button variant="outline" className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4" />
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
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
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button
                    variant="outline"
                    onClick={handleApplyPromoCode}
                    className="whitespace-nowrap"
                  >
                    Apply
                  </Button>
                </div>
                <Button className="w-full bg-amber-600 hover:bg-amber-700 flex items-center justify-center gap-2">
                  Checkout
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-4 text-xs text-gray-500">
                <p>Secure checkout powered by RuPay</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm border">
          <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link to="/products">
            <Button className="bg-amber-600 hover:bg-amber-700">
              Start Shopping
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
