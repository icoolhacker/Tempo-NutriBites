import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthForm from "../../components/auth/AuthForm";
import { useToast } from "@/components/ui/use-toast";

interface LoginPageProps {
  onLogin?: (name: string) => void;
  isLoggedIn?: boolean;
}

const LoginPage = ({ onLogin, isLoggedIn = false }: LoginPageProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const defaultTab =
    searchParams.get("tab") === "register" ? "register" : "login";

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/account");
      toast({
        title: "Already Logged In",
        description: "You are already logged in to your account.",
      });
    }
  }, [isLoggedIn, navigate, toast]);

  const handleLogin = (data: any) => {
    // This would be replaced with actual authentication logic
    console.log("Login data:", data);

    // Call the onLogin callback with the user's name
    if (onLogin) {
      onLogin(data.email.split("@")[0]);
    } else {
      // Fallback if onLogin is not provided
      toast({
        title: "Login Successful",
        description: "Welcome back to NutriBites!",
        variant: "default",
      });

      // Redirect to home page after login
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };

  const handleRegister = (data: any) => {
    // This would be replaced with actual registration logic
    console.log("Register data:", data);

    // Call the onLogin callback with the user's name after registration
    if (onLogin) {
      toast({
        title: "Registration Successful",
        description: "Your account has been created. Welcome to NutriBites!",
        variant: "default",
      });

      setTimeout(() => {
        onLogin(data.name);
      }, 1000);
    } else {
      // Fallback if onLogin is not provided
      toast({
        title: "Registration Successful",
        description: "Your account has been created. Welcome to NutriBites!",
        variant: "default",
      });

      // Redirect to home page after registration
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };

  const handleSocialLogin = (provider: string) => {
    // This would be replaced with actual social login logic
    console.log(`Social login with ${provider}`);

    // Simulate successful social login
    toast({
      title: "Social Login",
      description: `Logging in with ${provider}...`,
      variant: "default",
    });

    // Call the onLogin callback with a generated name based on the provider
    if (onLogin) {
      setTimeout(() => {
        onLogin(`${provider}User${Math.floor(Math.random() * 1000)}`);
      }, 1500);
    } else {
      // Redirect to home page after social login if onLogin not provided
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
        <div className="hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1563292769-4e05b684851a?w=600&q=80"
            alt="Dry fruits assortment"
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
          <div className="mt-4 bg-black/5 dark:bg-white/5 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">
              Benefits of joining NutriBites
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="bg-green-500 rounded-full w-2 h-2 mr-2"></span>
                <span>Exclusive discounts on premium products</span>
              </li>
              <li className="flex items-center">
                <span className="bg-green-500 rounded-full w-2 h-2 mr-2"></span>
                <span>Early access to new arrivals</span>
              </li>
              <li className="flex items-center">
                <span className="bg-green-500 rounded-full w-2 h-2 mr-2"></span>
                <span>Free shipping on orders over $50</span>
              </li>
              <li className="flex items-center">
                <span className="bg-green-500 rounded-full w-2 h-2 mr-2"></span>
                <span>Personalized recommendations</span>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <AuthForm
            onLogin={handleLogin}
            onRegister={handleRegister}
            onSocialLogin={handleSocialLogin}
            defaultTab={defaultTab as "login" | "register"}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
