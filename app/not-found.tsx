"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Home,
  ArrowLeft,
  Trophy,
  Search,
  RefreshCw,
  AlertTriangle,
  Compass,
  MapPin,
  HelpCircle,
  Mail,
  ExternalLink,
} from "lucide-react";

export default function NotFoundPage() {
  const quickLinks = [
    {
      href: "/",
      label: "Home",
      icon: <Home className="h-4 w-4" />,
      description: "Back to homepage",
    },
    {
      href: "/knockout",
      label: "Create Tournament",
      icon: <Trophy className="h-4 w-4" />,
      description: "Start a new tournament",
    },
    {
      href: "/about",
      label: "About",
      icon: <HelpCircle className="h-4 w-4" />,
      description: "Learn more about us",
    },
    {
      href: "/contact",
      label: "Contact",
      icon: <Mail className="h-4 w-4" />,
      description: "Get in touch",
    },
  ];

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Animation */}
        <div className="relative mb-8">
          <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
            404
          </div>

          {/* Floating Icons */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
              <AlertTriangle className="h-4 w-4 text-yellow-800" />
            </div>
            <div
              className="absolute -top-8 right-8 w-6 h-6 bg-red-400 rounded-full flex items-center justify-center animate-bounce"
              style={{ animationDelay: "0.2s" }}
            >
              <Search className="h-3 w-3 text-red-800" />
            </div>
            <div
              className="absolute -bottom-4 left-12 w-7 h-7 bg-green-400 rounded-full flex items-center justify-center animate-bounce"
              style={{ animationDelay: "0.4s" }}
            >
              <Compass className="h-3.5 w-3.5 text-green-800" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mb-8">
          <Badge className="mb-4 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-200 dark:border-red-800">
            <MapPin className="h-3 w-3 mr-1" />
            Page Not Found
          </Badge>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Oops! Tournament Not Found
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            The page you&apos;re looking for seems to have been eliminated from
            the tournament!
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-500 mb-8">
            Don&apos;t worry, even the best players sometimes take a wrong turn.
            Let&apos;s get you back in the game.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            className="bg-gradient-to from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            asChild
          >
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={handleGoBack}
            className="border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={handleRefresh}
            className="border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Refresh
          </Button>
        </div>

        {/* Quick Links */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Quick Links
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickLinks.map((link, index) => (
              <Card
                key={index}
                className="bg-white/80 p-0 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group"
              >
                <CardContent className="p-0">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="w-full justify-start p-5 h-auto group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                    asChild
                  >
                    <Link href={link.href}>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                          {link.icon}
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-primary dark:text-primary-foreground">
                            {link.label}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {link.description}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white mr-4">
                <HelpCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary dark:text-primary-foreground">
                  Need Help?
                </h3>
                <p className="text-sm text-muted-foreground">
                  We&apos;re here to assist you
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center text-primary dark:text-primary-foreground">
              <Button variant="outline" size="sm" asChild>
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Support
                </Link>
              </Button>

              <Button variant="outline" size="sm" asChild>
                <Link href="/help">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Help Center
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer Message */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Error Code: 404 | Page Not Found |{" "}
            <span className="ml-1 text-blue-600 dark:text-blue-400">
              BracketGen Tournament Generator
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
