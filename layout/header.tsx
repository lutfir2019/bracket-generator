"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ThemeButton from "@/components/global/theme-button";
import Link from "next/link";
import { Trophy, Zap, Menu, X, Target } from "lucide-react";
import { MENU } from "@/constants/menu";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed z-50 w-full bg-white/90 backdrop-blur-md dark:bg-gray-900/90 shadow-lg border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              {/* Main logo container */}
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Trophy className="h-5 w-5" />
              </div>

              {/* Lightning bolt accent */}
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-sm">
                <Zap className="h-2.5 w-2.5 text-white" />
              </div>
            </div>

            {/* Logo text */}
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300">
                BracketGen
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                Tournament Generator
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {MENU.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                size="sm"
                asChild
                className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                <Link href={item.href} className="flex items-center space-x-2">
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </Button>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            {/* CTA Button */}
            <Button
              size="sm"
              className="hidden sm:inline-flex bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
              asChild
            >
              <Link href="/knockout">
                <Target className="h-4 w-4 mr-1" />
                Create
              </Link>
            </Button>

            {/* Theme Toggle */}
            <ThemeButton />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {MENU.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  size="sm"
                  asChild
                  className="w-full justify-start text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center space-x-3 px-3 py-2"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </Button>
              ))}

              {/* Mobile CTA */}
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-md"
                  asChild
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link href="/knockout">
                    <Target className="h-4 w-4 mr-2" />
                    Create Tournament
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
