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
  ],
  title = "Subscription Plans",
  description = "Choose a subscription plan that works for you and enjoy regular deliveries of premium dry fruits.",
}: SubscriptionPlansProps) => {
  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`flex flex-col h-full ${plan.popular ? "border-primary ring-2 ring-primary" : ""}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 -mt-2 -mr-2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
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
                  className="w-full"
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
