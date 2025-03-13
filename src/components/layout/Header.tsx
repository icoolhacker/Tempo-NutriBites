import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "../theme/ThemeToggle";
import { useToast } from "@/components/ui/use-toast";

interface HeaderProps {
  isLoggedIn?: boolean;
  cartItemCount?: number;
  userName?: string;
  userAvatar?: string;
}

const Header = ({
  isLoggedIn = false,
  cartItemCount = 0,
  userName = "Guest",
  userAvatar = "",
}: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery)}`);
      toast({
        title: "Search Results",
        description: `Showing results for "${searchQuery}"`,
      });
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/login?tab=register");
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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 md:h-20 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="NutriBites Logo" className="h-8 w-8" />
          <span className="text-xl font-bold gradient-text hidden md:inline-block">
            NutriBites
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Products
          </Link>
          <Link
            to="/subscriptions"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Subscriptions
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            About Us
          </Link>
        </nav>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex relative w-full max-w-sm items-center mx-4">
          <form onSubmit={handleSearch} className="w-full relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 w-full bg-muted/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Cart */}
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge
                  variant="default"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Wishlist */}
          <Link to="/wishlist" className="relative">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
          </Link>

          {/* User Menu - Desktop */}
          <div className="hidden md:block">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                      <AvatarImage src={userAvatar} alt={userName} />
                      <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link to="/account" className="w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/account?tab=orders" className="w-full">
                      Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/account?tab=subscriptions" className="w-full">
                      My Subscriptions
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={handleLogin}>
                  Login
                </Button>
                <Button
                  size="sm"
                  className="gradient-bg hover:opacity-90"
                  onClick={handleSignUp}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between py-4 border-b">
                  <Link to="/" className="flex items-center space-x-2">
                    <img
                      src="/logo.png"
                      alt="NutriBites Logo"
                      className="h-8 w-8"
                    />
                    <span className="text-xl font-bold gradient-text">
                      NutriBites
                    </span>
                  </Link>
                </div>

                {/* Mobile Search */}
                <div className="py-4 border-b">
                  <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="pl-8 w-full bg-muted/50"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </form>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex flex-col py-4 border-b">
                  <Link
                    to="/"
                    className="py-2 text-base font-medium transition-colors hover:text-primary"
                  >
                    Home
                  </Link>
                  <Link
                    to="/products"
                    className="py-2 text-base font-medium transition-colors hover:text-primary"
                  >
                    Products
                  </Link>
                  <Link
                    to="/subscriptions"
                    className="py-2 text-base font-medium transition-colors hover:text-primary"
                  >
                    Subscriptions
                  </Link>
                  <Link
                    to="/about"
                    className="py-2 text-base font-medium transition-colors hover:text-primary"
                  >
                    About Us
                  </Link>
                </nav>

                {/* Mobile User Actions */}
                <div className="mt-auto py-4 border-t">
                  {isLoggedIn ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={userAvatar} alt={userName} />
                          <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{userName}</p>
                          <p className="text-sm text-muted-foreground">
                            Account
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Link
                          to="/account"
                          className="block py-2 text-base font-medium transition-colors hover:text-primary"
                        >
                          Profile
                        </Link>
                        <Link
                          to="/account?tab=orders"
                          className="block py-2 text-base font-medium transition-colors hover:text-primary"
                        >
                          Orders
                        </Link>
                        <Link
                          to="/account?tab=subscriptions"
                          className="block py-2 text-base font-medium transition-colors hover:text-primary"
                        >
                          My Subscriptions
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left py-2 text-base font-medium transition-colors hover:text-primary"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleLogin}
                      >
                        Login
                      </Button>
                      <Button
                        className="w-full gradient-bg hover:opacity-90"
                        onClick={handleSignUp}
                      >
                        Sign Up
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
