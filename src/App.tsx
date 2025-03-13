import { Suspense, useState, useEffect } from "react";
import {
  useRoutes,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Home from "./components/home";
import MainLayout from "./components/layout/MainLayout";
import LoginPage from "./pages/auth/LoginPage";
import ProductsPage from "./pages/products/ProductsPage";
import CartPage from "./pages/cart/CartPage";
import SubscriptionsPage from "./pages/subscriptions/SubscriptionsPage";
import AccountPage from "./pages/account/AccountPage";
import ProductDetailPage from "./pages/products/ProductDetailPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import OrderConfirmationPage from "./pages/checkout/OrderConfirmationPage";
import WishlistPage from "./components/wishlist/WishlistPage";
import { WishlistProvider } from "./components/wishlist/WishlistContext";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import routes from "tempo-routes";
import { Toaster } from "./components/ui/toaster";
import { useToast } from "./components/ui/use-toast";

function App() {
  // Auth state management
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [userName, setUserName] = useState("Guest");
  const [userAvatar, setUserAvatar] = useState("");
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  // Check for login status on app load
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    const storedUserName = localStorage.getItem("userName");

    if (storedLoginStatus === "true" && storedUserName) {
      setIsLoggedIn(true);
      setUserName(storedUserName);
      setUserAvatar(
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${storedUserName}`,
      );
    }
  }, []);

  // Handle login
  const handleLogin = (name: string) => {
    setIsLoggedIn(true);
    setUserName(name);
    setUserAvatar(`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userName", name);

    toast({
      title: "Login Successful",
      description: `Welcome back, ${name}!`,
    });

    navigate("/");
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("Guest");
    setUserAvatar("");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");

    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });

    navigate("/");
  };

  // Load cart data
  useEffect(() => {
    const loadCartData = () => {
      const cartItems = localStorage.getItem("cartItems");
      if (cartItems) {
        try {
          const items = JSON.parse(cartItems);
          const count = items.reduce(
            (total: number, item: any) => total + item.quantity,
            0,
          );
          setCartItemCount(count);
        } catch (error) {
          console.error("Error parsing cart data", error);
          setCartItemCount(0);
        }
      } else {
        // Demo data for new users
        if (isLoggedIn) {
          setCartItemCount(Math.floor(Math.random() * 5) + 1);
        } else {
          setCartItemCount(0);
        }
      }
    };

    loadCartData();
    // Listen for storage events to update cart count when changed from another tab
    window.addEventListener("storage", loadCartData);
    return () => window.removeEventListener("storage", loadCartData);
  }, [isLoggedIn]);

  // Update cart count when items are added/removed
  const updateCartCount = (count: number) => {
    setCartItemCount(count);
  };

  return (
    <ThemeProvider>
      <WishlistProvider>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen">
              Loading...
            </div>
          }
        >
          <>
            <MainLayout
              isLoggedIn={isLoggedIn}
              cartItemCount={cartItemCount}
              userName={userName}
              userAvatar={userAvatar}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/login"
                  element={
                    <LoginPage onLogin={handleLogin} isLoggedIn={isLoggedIn} />
                  }
                />
                <Route path="/products" element={<ProductsPage />} />
                <Route
                  path="/products/:productId"
                  element={
                    <ProductDetailPage updateCartCount={updateCartCount} />
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <CartPage
                      updateCartCount={updateCartCount}
                      isLoggedIn={isLoggedIn}
                    />
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <CheckoutPage
                      isLoggedIn={isLoggedIn}
                      updateCartCount={updateCartCount}
                    />
                  }
                />
                <Route
                  path="/order-confirmation"
                  element={<OrderConfirmationPage />}
                />
                <Route
                  path="/subscriptions"
                  element={<SubscriptionsPage isLoggedIn={isLoggedIn} />}
                />
                <Route
                  path="/account/*"
                  element={
                    <AccountPage
                      isLoggedIn={isLoggedIn}
                      userName={userName}
                      userAvatar={userAvatar}
                      onLogout={handleLogout}
                    />
                  }
                />
                <Route path="/wishlist" element={<WishlistPage />} />
                {import.meta.env.VITE_TEMPO === "true" && (
                  <Route path="/tempobook/*" />
                )}
              </Routes>
              {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
            </MainLayout>
            <Toaster />
          </>
        </Suspense>
      </WishlistProvider>
    </ThemeProvider>
  );
}

export default App;
