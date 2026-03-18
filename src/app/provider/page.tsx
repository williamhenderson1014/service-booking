'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  HomeIcon,
  CalendarIcon,
  CreditCardIcon,
  UserIcon,
  SettingsIcon,
  LogOutIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  StarIcon,
  TrendUpIcon,
  BellIcon,
} from '@/components/icons';
import {
  bookings,
  payments,
  serviceProviders,
  formatCurrency,
  formatDate,
  formatTime,
  getStatusLabel,
  getStatusColor,
} from '@/data/mockData';

export default function ProviderDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const provider = serviceProviders[0];

  const providerBookings = bookings.filter(b => b.providerId === provider.id);
  const pendingBookings = providerBookings.filter(b => b.status === 'pending');
  const todayBookings = providerBookings.filter(b => b.date === '2026-03-18' || b.date === '2026-03-19' || b.date === '2026-03-20');
  const completedBookings = providerBookings.filter(b => b.status === 'completed');

  const totalEarnings = providerBookings
    .filter(b => b.status === 'completed')
    .reduce((sum, b) => sum + b.price, 0);

  const weeklyEarnings = providerBookings
    .filter(b => b.status === 'completed' || b.status === 'confirmed')
    .reduce((sum, b) => sum + b.price, 0);

  const menuItems = [
    { id: 'overview', name: 'Overview', icon: HomeIcon },
    { id: 'bookings', name: 'Bookings', icon: CalendarIcon },
    { id: 'earnings', name: 'Earnings', icon: CreditCardIcon },
    { id: 'availability', name: 'Availability', icon: ClockIcon },
    { id: 'profile', name: 'Profile', icon: UserIcon },
    { id: 'settings', name: 'Settings', icon: SettingsIcon },
  ];

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex lg:w-64 flex-col bg-dark-900 text-white">
        <div className="p-6 border-b border-dark-700">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold">ServiceBook</span>
          </Link>
          <p className="text-dark-400 text-sm mt-2">Provider Portal</p>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === item.id
                      ? 'bg-primary-600 text-white'
                      : 'text-dark-300 hover:bg-dark-800'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-dark-700">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-dark-300 hover:bg-dark-800 rounded-xl"
          >
            <LogOutIcon className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-dark-900">
              {activeTab === 'overview' && 'Dashboard'}
              {activeTab === 'bookings' && 'My Bookings'}
              {activeTab === 'earnings' && 'Earnings'}
              {activeTab === 'availability' && 'Availability'}
              {activeTab === 'profile' && 'Profile'}
              {activeTab === 'settings' && 'Settings'}
            </h1>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-dark-600 hover:bg-gray-100 rounded-lg">
                <BellIcon className="w-6 h-6" />
                {pendingBookings.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                    {pendingBookings.length}
                  </span>
                )}
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-dark-900 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">JW</span>
                </div>
                <div className="hidden md:block">
                  <p className="font-medium text-dark-900">{provider.name}</p>
                  <div className="flex items-center gap-1 text-sm text-dark-500">
                    <StarIcon className="w-4 h-4 text-yellow-400" />
                    {provider.rating} ({provider.reviewCount} reviews)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-dark-500 text-sm">Total Earnings</p>
                    <TrendUpIcon className="w-5 h-5 text-secondary-500" />
                  </div>
                  <p className="text-3xl font-bold text-dark-900">{formatCurrency(totalEarnings)}</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <p className="text-dark-500 text-sm">This Week</p>
                  <p className="text-3xl font-bold text-secondary-600 mt-1">{formatCurrency(weeklyEarnings)}</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <p className="text-dark-500 text-sm">Completed Jobs</p>
                  <p className="text-3xl font-bold text-dark-900 mt-1">{provider.completedJobs}</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <p className="text-dark-500 text-sm">Pending Requests</p>
                  <p className="text-3xl font-bold text-yellow-600 mt-1">{pendingBookings.length}</p>
                </div>
              </div>

              {/* Pending Requests */}
              {pendingBookings.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-dark-900">Pending Requests</h2>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {pendingBookings.map((booking) => (
                      <div key={booking.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-dark-900">{booking.serviceName}</p>
                            <p className="text-sm text-dark-500">{booking.clientName}</p>
                            <div className="flex items-center gap-3 text-sm text-dark-400 mt-1">
                              <span>{formatDate(booking.date)}</span>
                              <span>•</span>
                              <span>{formatTime(booking.time)}</span>
                              <span>•</span>
                              <span>{booking.suburb}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-600 hover:bg-red-100">
                              <XCircleIcon className="w-5 h-5" />
                            </button>
                            <button className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600 hover:bg-green-100">
                              <CheckCircleIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Today's Schedule */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-dark-900">Upcoming Schedule</h2>
                </div>
                <div className="divide-y divide-gray-50">
                  {todayBookings.length > 0 ? (
                    todayBookings.map((booking) => (
                      <div key={booking.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                              <CalendarIcon className="w-6 h-6 text-primary-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-dark-900">{booking.serviceName}</p>
                              <p className="text-sm text-dark-500">{booking.clientName}</p>
                              <p className="text-sm text-dark-400">{booking.address}, {booking.suburb}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-dark-900">{formatDate(booking.date)}</p>
                            <p className="text-primary-600 font-medium">{formatTime(booking.time)}</p>
                            <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                              {getStatusLabel(booking.status)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-dark-500">
                      No upcoming bookings
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'availability' && (
            <div className="max-w-2xl">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-dark-900 mb-6">Set Your Availability</h2>
                <div className="space-y-4">
                  {provider.availability.map((slot, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={slot.isAvailable} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600" />
                      </label>
                      <span className="w-24 font-medium text-dark-900">{days[slot.day]}</span>
                      <input
                        type="time"
                        defaultValue={slot.startTime}
                        className="px-3 py-2 border border-gray-200 rounded-lg"
                      />
                      <span className="text-dark-400">to</span>
                      <input
                        type="time"
                        defaultValue={slot.endTime}
                        className="px-3 py-2 border border-gray-200 rounded-lg"
                      />
                    </div>
                  ))}
                  <button className="w-full bg-gradient-primary text-white py-3 rounded-xl font-semibold mt-4">
                    Save Availability
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'earnings' && (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <p className="text-dark-500 text-sm">Today</p>
                  <p className="text-3xl font-bold text-dark-900 mt-1">{formatCurrency(180)}</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <p className="text-dark-500 text-sm">This Week</p>
                  <p className="text-3xl font-bold text-dark-900 mt-1">{formatCurrency(weeklyEarnings)}</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <p className="text-dark-500 text-sm">This Month</p>
                  <p className="text-3xl font-bold text-dark-900 mt-1">{formatCurrency(totalEarnings + 850)}</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-dark-900">Recent Payments</h2>
                </div>
                <div className="divide-y divide-gray-50">
                  {providerBookings.filter(b => b.status === 'completed').map((booking) => (
                    <div key={booking.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-dark-900">{booking.serviceName}</p>
                          <p className="text-sm text-dark-500">{booking.clientName}</p>
                          <p className="text-sm text-dark-400">{formatDate(booking.date)}</p>
                        </div>
                        <p className="text-lg font-bold text-secondary-600">+{formatCurrency(booking.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-dark-900">All Bookings</h2>
              </div>
              <div className="divide-y divide-gray-50">
                {providerBookings.map((booking) => (
                  <div key={booking.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-dark-900">{booking.serviceName}</p>
                        <p className="text-sm text-dark-500">{booking.clientName}</p>
                        <div className="flex items-center gap-3 text-sm text-dark-400 mt-1">
                          <span>{formatDate(booking.date)}</span>
                          <span>•</span>
                          <span>{formatTime(booking.time)}</span>
                          <span>•</span>
                          <span>{booking.suburb}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {getStatusLabel(booking.status)}
                        </span>
                        <p className="text-lg font-bold text-dark-900 mt-2">{formatCurrency(booking.price)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="max-w-2xl">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-dark-900 mb-6">Profile Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue={provider.name}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue={provider.email}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      defaultValue={provider.phone}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">Service Area</label>
                    <input
                      type="text"
                      defaultValue={`${provider.location.suburb}, ${provider.location.state}`}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                    />
                  </div>
                  <button className="w-full bg-gradient-primary text-white py-3 rounded-xl font-semibold mt-4">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-2xl space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-dark-900 mb-6">Notification Settings</h2>
                <div className="space-y-4">
                  {[
                    { label: 'New booking requests', desc: 'Get notified when clients request your services' },
                    { label: 'Booking reminders', desc: 'Reminder before scheduled appointments' },
                    { label: 'Payment notifications', desc: 'Get notified when payments are processed' },
                  ].map((setting, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-dark-900">{setting.label}</p>
                        <p className="text-sm text-dark-500">{setting.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600" />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
