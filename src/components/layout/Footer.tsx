import React from "react";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

interface FooterProps {
  companyName?: string;
  logo?: string;
  navigationLinks?: Array<{ label: string; href: string }>;
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  socialLinks?: Array<{ platform: string; url: string }>;
}

const Footer = ({
  companyName = "Dry Fruits Co.",
  logo = "/vite.svg",
  navigationLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Subscriptions", href: "/subscriptions" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
  contactInfo = {
    email: "info@dryfruits.co",
    phone: "+91 9876543210",
    address: "123 Orchard Lane, Fruit Valley, India",
  },
  socialLinks = [
    { platform: "Facebook", url: "https://facebook.com" },
    { platform: "Instagram", url: "https://instagram.com" },
    { platform: "Twitter", url: "https://twitter.com" },
    { platform: "Youtube", url: "https://youtube.com" },
  ],
}: FooterProps) => {
  const renderSocialIcon = (platform: string) => {
    switch (platform) {
      case "Facebook":
        return <Facebook className="h-5 w-5" />;
      case "Instagram":
        return <Instagram className="h-5 w-5" />;
      case "Twitter":
        return <Twitter className="h-5 w-5" />;
      case "Youtube":
        return <Youtube className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-slate-900 text-white py-12 px-4 md:px-8 w-full">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src={logo} alt={companyName} className="h-8 w-8" />
              <span className="text-xl font-bold">{companyName}</span>
            </div>
            <p className="text-slate-300 text-sm">
              Premium quality dry fruits sourced directly from the best farms
              around the world. We ensure freshness and quality in every bite.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 p-2 rounded-full hover:bg-slate-700 transition-colors"
                  aria-label={social.platform}
                >
                  {renderSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {navigationLinks.slice(0, 5).map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Legal & Support</h3>
            <ul className="space-y-2">
              {navigationLinks.slice(5).map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-slate-300 text-sm">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-slate-800 border-slate-700 text-white"
              />
              <Button
                variant="default"
                className="bg-amber-600 hover:bg-amber-700"
              >
                Subscribe
              </Button>
            </div>
            <div className="space-y-2 mt-4">
              <h3 className="text-lg font-semibold">Contact Us</h3>
              <div className="space-y-2 text-slate-300 text-sm">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>{contactInfo.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>{contactInfo.phone}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 mt-1" />
                  <span>{contactInfo.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} {companyName}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
