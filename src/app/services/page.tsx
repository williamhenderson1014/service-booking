'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  SearchIcon,
  FilterIcon,
  StarIcon,
  ClockIcon,
  ChevronDownIcon,
  MapPinIcon,
} from '@/components/icons';
import { services, serviceCategories, formatCurrency, formatDuration } from '@/data/mockData';

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const filteredServices = services.filter(service => {
    if (selectedCategory && service.categoryId !== selectedCategory) return false;
    if (searchQuery && !service.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortBy) {
      case 'price_low':
        return a.price - b.price;
      case 'price_high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return b.reviewCount - a.reviewCount;
    }
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-primary text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-4">Browse Services</h1>
            <p className="text-blue-100 mb-6">Find the perfect service for your needs</p>

            {/* Search */}
            <div className="flex gap-4 max-w-2xl">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl text-dark-900 focus:ring-2 focus:ring-primary-300"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-dark-900 mb-4 flex items-center gap-2">
                  <FilterIcon className="w-5 h-5" />
                  Categories
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      !selectedCategory ? 'bg-primary-50 text-primary-700 font-medium' : 'text-dark-600 hover:bg-gray-50'
                    }`}
                  >
                    All Services
                  </button>
                  {serviceCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-primary-50 text-primary-700 font-medium'
                          : 'text-dark-600 hover:bg-gray-50'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Services Grid */}
            <div className="flex-1">
              {/* Sort & Results */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-dark-500">
                  {sortedServices.length} services found
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-dark-500">Sort by:</span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="popular">Most Popular</option>
                      <option value="rating">Highest Rated</option>
                      <option value="price_low">Price: Low to High</option>
                      <option value="price_high">Price: High to Low</option>
                    </select>
                    <ChevronDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedServices.map((service) => {
                  const category = serviceCategories.find(c => c.id === service.categoryId);
                  return (
                    <Link
                      key={service.id}
                      href={`/booking?service=${service.id}`}
                      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
                    >
                      <div className="relative h-48">
                        <Image
                          src={service.image}
                          alt={service.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {service.isPopular && (
                          <span className="absolute top-3 left-3 bg-secondary-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <span className="text-xs text-primary-600 font-medium">{category?.name}</span>
                        <h3 className="font-semibold text-dark-900 mt-1 mb-2">{service.name}</h3>
                        <p className="text-sm text-dark-500 mb-3 line-clamp-2">{service.shortDescription}</p>

                        <div className="flex items-center gap-4 text-sm text-dark-500 mb-3">
                          <div className="flex items-center gap-1">
                            <ClockIcon className="w-4 h-4" />
                            {formatDuration(service.duration)}
                          </div>
                          <div className="flex items-center gap-1">
                            <StarIcon className="w-4 h-4 text-yellow-400" />
                            {service.rating} ({service.reviewCount})
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <span className="text-lg font-bold text-primary-600">{formatCurrency(service.price)}</span>
                          <span className="bg-gradient-primary text-white px-4 py-2 rounded-lg text-sm font-medium">
                            Book Now
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {sortedServices.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-dark-500">No services found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
