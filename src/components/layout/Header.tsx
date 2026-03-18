'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MenuIcon, XIcon, UserIcon, ChevronDownIcon } from '@/components/icons';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold text-dark-900">ServiceBook</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/services" className="text-dark-600 hover:text-primary-600 font-medium">
              Services
            </Link>
            <Link href="/services" className="text-dark-600 hover:text-primary-600 font-medium">
              How It Works
            </Link>
            <Link href="/provider" className="text-dark-600 hover:text-primary-600 font-medium">
              Become a Provider
            </Link>
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/client" className="text-dark-600 hover:text-primary-600 font-medium">
              Sign In
            </Link>
            <Link
              href="/services"
              className="bg-gradient-primary text-white px-5 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <XIcon className="w-6 h-6 text-dark-600" />
            ) : (
              <MenuIcon className="w-6 h-6 text-dark-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/services"
              className="block py-2 text-dark-600 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/services"
              className="block py-2 text-dark-600 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/provider"
              className="block py-2 text-dark-600 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Become a Provider
            </Link>
            <hr className="my-3" />
            <Link
              href="/client"
              className="block py-2 text-dark-600 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href="/services"
              className="block w-full text-center bg-gradient-primary text-white py-3 rounded-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
