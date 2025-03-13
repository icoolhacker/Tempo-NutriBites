import React from "react";
import { Check } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  frequency: string;
  description: string;
  features: string[];
  popular?: boolean;
}

interface SubscriptionPlansProps {
  plans?: SubscriptionPlan[];
  title?: string;
  description?: string;
}

const SubscriptionPlans = ({
  plans = [
    {
      id: "basic",
      name: "Basic",
      price: 2.46,
      frequency: "month",
      description: "For individuals and small teams",
      features: [
        "5 projects",
        "Up to 10 users",
        "20GB storage",
        "Basic support",
        "Basic analytics",
      ],
    },
    {
      id: "standard",
      name: "Standard",
      price: 6.5,
      frequency: "month",
      description: "For growing businesses",
      features: [
        "15 projects",
        "Up to 50 users",
        "100GB storage",
        "Priority support",
        "Advanced analytics",
        "Custom branding",
      ],
      popular: true,
    },
    {
      id: "premium",
      name: "Premium",
      price: 12.99,
      frequency: "month",
      description: "For large enterprises",
      features: [
        "Unlimited projects",
        "Unlimited users",
        "500GB storage",
        "24/7 support",
        "Premium analytics",
        "Custom branding",
        "API access",
      ],
    },
  ],
  title = "The Best Pricing Plan",
  description = "Choose a subscription plan that works for you and enjoy regular deliveries of premium dry fruits.",
}: SubscriptionPlansProps) => {
  return (
    <section className="w-full py-16 bg-black/95">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2 gradient-text">
            {title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`flex flex-col h-full card-hover ${plan.popular ? "border-primary bg-primary/10" : "bg-secondary/50 border-primary/10"}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 -mt-2 -mr-2">
                  <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Popular
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle
                  className={`text-xl ${plan.popular ? "text-primary" : ""}`}
                >
                  {plan.name}
                </CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span
                    className={`text-3xl font-bold ${plan.popular ? "text-primary" : ""}`}
                  >
                    ${plan.price}
                  </span>
                  <span className="text-gray-500 ml-2">/{plan.frequency}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check
                        className={`h-5 w-5 ${plan.popular ? "text-primary" : "text-green-500"} mr-2 shrink-0`}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${plan.popular ? "gradient-bg hover:opacity-90" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  Subscribe Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlans;
