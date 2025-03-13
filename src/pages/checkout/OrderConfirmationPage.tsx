import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  Package,
  Truck,
  Calendar,
  ArrowRight,
} from "lucide-react";

interface OrderDetails {
  orderId: string;
  date: string;
  total: number;
  paymentMethod: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  estimatedDelivery: string;
}

const OrderConfirmationPage = () => {
  const location = useLocation();

  // In a real app, this would come from the location state or an API call
  // For now, we'll use mock data
  const orderDetails: OrderDetails = {
    orderId: "ORD" + Math.floor(100000 + Math.random() * 900000),
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    total: 91.95,
    paymentMethod: "Credit Card",
    items: [
      {
        id: "1",
        name: "Premium Cashews",
        price: 19.99,
        quantity: 2,
        image:
          "https://images.unsplash.com/photo-1563292769-4e05b684851a?w=400&q=80",
      },
      {
        id: "2",
        name: "Organic Almonds",
        price: 22.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1574570173583-e0c3e8083f82?w=400&q=80",
      },
      {
        id: "3",
        name: "Dried Cranberries",
        price: 15.99,
        quantity: 3,
        image:
          "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?w=400&q=80",
      },
    ],
    shippingAddress: {
      name: "John Doe",
      address: "123 Main St, Apartment 4B",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
    },
    estimatedDelivery: new Date(
      Date.now() + 3 * 24 * 60 * 60 * 1000,
    ).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been received and is
            being processed.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">
                Order #{orderDetails.orderId}
              </h2>
              <p className="text-sm text-gray-500">
                Placed on {orderDetails.date}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link to="/account/orders">
                <Button variant="outline" size="sm">
                  View All Orders
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-start space-x-3">
              <Package className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-sm">Order Status</h3>
                <p className="text-sm text-gray-600">Processing</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Truck className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-sm">Delivery Method</h3>
                <p className="text-sm text-gray-600">Standard Shipping</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-sm">Estimated Delivery</h3>
                <p className="text-sm text-gray-600">
                  {orderDetails.estimatedDelivery}
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <h3 className="font-semibold mb-4">Order Summary</h3>
          <div className="space-y-4">
            {orderDetails.items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    {item.quantity} x ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Shipping Address</h3>
              <div className="text-sm text-gray-600">
                <p>{orderDetails.shippingAddress.name}</p>
                <p>{orderDetails.shippingAddress.address}</p>
                <p>
                  {orderDetails.shippingAddress.city},{" "}
                  {orderDetails.shippingAddress.state}{" "}
                  {orderDetails.shippingAddress.pincode}
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Payment Information</h3>
              <div className="text-sm text-gray-600">
                <p>Payment Method: {orderDetails.paymentMethod}</p>
                <p>Total Amount: ${orderDetails.total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
          <h3 className="font-semibold mb-2">What's Next?</h3>
          <p className="text-sm text-gray-700 mb-4">
            You will receive an email confirmation shortly at your registered
            email address. We'll notify you when your order ships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/products">
              <Button className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700">
                Continue Shopping
              </Button>
            </Link>
            <Link to="/account/track-order">
              <Button variant="outline" className="w-full sm:w-auto">
                Track Your Order
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
