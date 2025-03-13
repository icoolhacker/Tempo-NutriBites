import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface MainLayoutProps {
  children: React.ReactNode;
  isLoggedIn?: boolean;
  cartItemCount?: number;
  userName?: string;
  userAvatar?: string;
}

const MainLayout = ({
  children,
  isLoggedIn = false,
  cartItemCount = 0,
  userName = "Guest",
  userAvatar = "",
}: MainLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header
        isLoggedIn={isLoggedIn}
        cartItemCount={cartItemCount}
        userName={userName}
        userAvatar={userAvatar}
      />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
