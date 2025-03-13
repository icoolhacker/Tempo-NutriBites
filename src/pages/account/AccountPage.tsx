import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Package,
  User,
  CreditCard,
  Heart,
  MapPin,
  Bell,
  LogOut,
  ShoppingBag,
  Calendar,
  Clock,
  CheckCircle,
  Truck,
  AlertCircle,
} from "lucide-react";

interface Order {
  id: string;
  date: string;
  total: number;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  items: Array<{
    id: string;
    name: string;
    image: string;
    quantity: number;
  }>;
}

interface Address {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault: boolean;
}

interface Subscription {
  id: string;
  plan: string;
  frequency: string;
  nextDelivery: string;
  status: "active" | "paused" | "cancelled";
  price: number;
}

const AccountPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("orders");

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    avatar: "",
  };

  // Mock orders data
  const orders: Order[] = [
    {
      id: "ORD123456",
      date: "June 15, 2023",
      total: 87.96,
      status: "delivered",
      items: [
        {
          id: "1",
          name: "Premium Cashews",
          image:
            "https://images.unsplash.com/photo-1563292769-4e05b684851a?w=400&q=80",
          quantity: 2,
        },
        {
          id: "2",
          name: "Organic Almonds",
          image:
            "https://images.unsplash.com/photo-1574570173583-e0c3e8083f82?w=400&q=80",
          quantity: 1,
        },
      ],
    },
    {
      id: "ORD789012",
      date: "July 2, 2023",
      total: 63.97,
      status: "shipped",
      items: [
        {
          id: "3",
          name: "Dried Cranberries",
          image:
            "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?w=400&q=80",
          quantity: 3,
        },
        {
          id: "4",
          name: "Pistachios",
          image:
            "https://images.unsplash.com/photo-1616684000067-36952fde56ec?w=400&q=80",
          quantity: 1,
        },
      ],
    },
    {
      id: "ORD345678",
      date: "July 20, 2023",
      total: 45.98,
      status: "processing",
      items: [
        {
          id: "5",
          name: "Mixed Berries",
          image:
            "https://images.unsplash.com/photo-1596591868231-05e808fd131d?w=400&q=80",
          quantity: 1,
        },
        {
          id: "6",
          name: "Walnuts",
          image:
            "https://images.unsplash.com/photo-1563412885-139e4045ec52?w=400&q=80",
          quantity: 1,
        },
      ],
    },
  ];

  // Mock addresses data
  const addresses: Address[] = [
    {
      id: "addr1",
      name: "John Doe",
      address: "123 Main St, Apartment 4B",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      phone: "+91 9876543210",
      isDefault: true,
    },
    {
      id: "addr2",
      name: "John Doe",
      address: "456 Work Avenue, Building C",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      phone: "+91 9876543210",
      isDefault: false,
    },
  ];

  // Mock subscriptions data
  const subscriptions: Subscription[] = [
    {
      id: "sub1",
      plan: "Weekly Box",
      frequency: "Weekly",
      nextDelivery: "August 5, 2023",
      status: "active",
      price: 29.99,
    },
    {
      id: "sub2",
      plan: "Monthly Box",
      frequency: "Monthly",
      nextDelivery: "September 1, 2023",
      status: "paused",
      price: 49.99,
    },
  ];

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "processing":
        return (
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" />
            Processing
          </div>
        );
      case "shipped":
        return (
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            <Truck className="w-3 h-3 mr-1" />
            Shipped
          </div>
        );
      case "delivered":
        return (
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Delivered
          </div>
        );
      case "cancelled":
        return (
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Cancelled
          </div>
        );
    }
  };

  const getSubscriptionStatusBadge = (status: Subscription["status"]) => {
    switch (status) {
      case "active":
        return (
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </div>
        );
      case "paused":
        return (
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            <Clock className="w-3 h-3 mr-1" />
            Paused
          </div>
        );
      case "cancelled":
        return (
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Cancelled
          </div>
        );
    }
  };

  const handleLogout = () => {
    // In a real app, this would call an authentication service to log out
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex items-center space-x-4 mb-6">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            <Separator className="my-4" />

            <nav className="space-y-1">
              <Button
                variant={activeTab === "orders" ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === "orders" ? "bg-amber-600 hover:bg-amber-700" : ""}`}
                onClick={() => setActiveTab("orders")}
              >
                <Package className="mr-2 h-4 w-4" />
                Orders
              </Button>
              <Button
                variant={activeTab === "subscriptions" ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === "subscriptions" ? "bg-amber-600 hover:bg-amber-700" : ""}`}
                onClick={() => setActiveTab("subscriptions")}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Subscriptions
              </Button>
              <Button
                variant={activeTab === "addresses" ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === "addresses" ? "bg-amber-600 hover:bg-amber-700" : ""}`}
                onClick={() => setActiveTab("addresses")}
              >
                <MapPin className="mr-2 h-4 w-4" />
                Addresses
              </Button>
              <Button
                variant={activeTab === "wishlist" ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === "wishlist" ? "bg-amber-600 hover:bg-amber-700" : ""}`}
                onClick={() => setActiveTab("wishlist")}
              >
                <Heart className="mr-2 h-4 w-4" />
                Wishlist
              </Button>
              <Button
                variant={activeTab === "profile" ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === "profile" ? "bg-amber-600 hover:bg-amber-700" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">My Orders</h2>
                {orders.length > 0 ? (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <Card key={order.id}>
                        <CardHeader className="pb-2">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                              <CardTitle className="text-base">
                                Order #{order.id}
                              </CardTitle>
                              <CardDescription>
                                Placed on {order.date}
                              </CardDescription>
                            </div>
                            <div className="mt-2 md:mt-0">
                              {getStatusBadge(order.status)}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {order.items.map((item) => (
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
                                <div>
                                  <h4 className="text-sm font-medium">
                                    {item.name}
                                  </h4>
                                  <p className="text-sm text-gray-500">
                                    Qty: {item.quantity}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <div>
                            <span className="font-medium">Total:</span> $
                            {order.total.toFixed(2)}
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Track Order
                            </Button>
                            <Button
                              size="sm"
                              className="bg-amber-600 hover:bg-amber-700"
                            >
                              View Details
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ShoppingBag className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                    <p className="text-gray-500 mb-4">
                      You haven't placed any orders yet.
                    </p>
                    <Link to="/products">
                      <Button className="bg-amber-600 hover:bg-amber-700">
                        Start Shopping
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Subscriptions Tab */}
            {activeTab === "subscriptions" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">My Subscriptions</h2>
                {subscriptions.length > 0 ? (
                  <div className="space-y-6">
                    {subscriptions.map((subscription) => (
                      <Card key={subscription.id}>
                        <CardHeader className="pb-2">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                              <CardTitle className="text-base">
                                {subscription.plan}
                              </CardTitle>
                              <CardDescription>
                                {subscription.frequency} delivery
                              </CardDescription>
                            </div>
                            <div className="mt-2 md:mt-0">
                              {getSubscriptionStatusBadge(subscription.status)}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">
                                Next Delivery:
                              </span>{" "}
                              {subscription.nextDelivery}
                            </div>
                            <div>
                              <span className="font-medium">Price:</span> $
                              {subscription.price.toFixed(2)}/
                              {subscription.frequency.toLowerCase()}
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-end space-x-2">
                          {subscription.status === "active" && (
                            <Button variant="outline" size="sm">
                              Pause Subscription
                            </Button>
                          )}
                          {subscription.status === "paused" && (
                            <Button variant="outline" size="sm">
                              Resume Subscription
                            </Button>
                          )}
                          <Button
                            size="sm"
                            className="bg-amber-600 hover:bg-amber-700"
                          >
                            Manage Subscription
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      No subscriptions yet
                    </h3>
                    <p className="text-gray-500 mb-4">
                      You haven't subscribed to any plans yet.
                    </p>
                    <Link to="/subscriptions">
                      <Button className="bg-amber-600 hover:bg-amber-700">
                        View Subscription Plans
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">My Addresses</h2>
                  <Button className="bg-amber-600 hover:bg-amber-700">
                    Add New Address
                  </Button>
                </div>
                {addresses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {addresses.map((address) => (
                      <Card key={address.id}>
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-medium">{address.name}</div>
                            {address.isDefault && (
                              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Default
                              </div>
                            )}
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>{address.address}</p>
                            <p>
                              {address.city}, {address.state} {address.pincode}
                            </p>
                            <p>Phone: {address.phone}</p>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          {!address.isDefault && (
                            <Button variant="outline" size="sm">
                              Set as Default
                            </Button>
                          )}
                          {!address.isDefault && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              Delete
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MapPin className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      No addresses saved
                    </h3>
                    <p className="text-gray-500 mb-4">
                      You haven't saved any addresses yet.
                    </p>
                    <Button className="bg-amber-600 hover:bg-amber-700">
                      Add New Address
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === "wishlist" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">My Wishlist</h2>
                <div className="text-center py-12">
                  <Heart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Your wishlist is empty
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Save items you like to your wishlist.
                  </p>
                  <Link to="/products">
                    <Button className="bg-amber-600 hover:bg-amber-700">
                      Browse Products
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">My Profile</h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Button variant="outline">Change Photo</Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        defaultValue={user.name}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        defaultValue={user.email}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        defaultValue={user.phone}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <h3 className="text-lg font-medium mb-4">Change Password</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                          id="new-password"
                          type="password"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="confirm-password">
                          Confirm New Password
                        </Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <h3 className="text-lg font-medium mb-4">
                    Notification Preferences
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Order Updates</h4>
                        <p className="text-sm text-gray-500">
                          Receive updates about your orders
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Bell className="h-4 w-4 mr-2" />
                        Enabled
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Promotions</h4>
                        <p className="text-sm text-gray-500">
                          Receive promotions and offers
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Bell className="h-4 w-4 mr-2" />
                        Enabled
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 mt-8">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-amber-600 hover:bg-amber-700">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
