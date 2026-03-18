'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  HomeIcon,
  CalendarIcon,
  CreditCardIcon,
  UserIcon,
  BellIcon,
  SettingsIcon,
  LogOutIcon,
  ClockIcon,
  MapPinIcon,
  StarIcon,
  ChevronRightIcon,
  NavigationIcon,
} from '@/components/icons';
import {
  bookings,
  payments,
  formatCurrency,
  formatDate,
  formatTime,
  getStatusLabel,
  getStatusColor,
} from '@/data/mockData';

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const clientBookings = bookings.filter(b => b.clientId === 'client1');
  const upcomingBookings = clientBookings.filter(b => b.status === 'confirmed' || b.status === 'pending');
  const inProgressBooking = clientBookings.find(b => b.status === 'in_progress');
  const pastBookings = clientBookings.filter(b => b.status === 'completed');
  const clientPayments = payments.filter(p => clientBookings.some(b => b.id === p.bookingId));

  const totalSpent = clientPayments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const menuItems = [
    { id: 'overview', name: 'Overview', icon: HomeIcon },
    { id: 'bookings', name: 'My Bookings', icon: CalendarIcon },
    { id: 'payments', name: 'Payment History', icon: CreditCardIcon },
    { id: 'profile', name: 'Profile', icon: UserIcon },
    { id: 'settings', name: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex lg:w-64 flex-col bg-white border-r border-gray-200">
        <div className="p-6 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold text-dark-900">ServiceBook</span>
          </Link>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === item.id
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-dark-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-dark-600 hover:bg-gray-50 rounded-xl"
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
              {activeTab === 'payments' && 'Payment History'}
              {activeTab === 'profile' && 'Profile'}
              {activeTab === 'settings' && 'Settings'}
            </h1>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-dark-600 hover:bg-gray-100 rounded-lg">
                <BellIcon className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-700 font-semibold">EJ</span>
                </div>
                <div className="hidden md:block">
                  <p className="font-medium text-dark-900">Emma Johnson</p>
                  <p className="text-sm text-dark-500">Client</p>
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
                  <p className="text-dark-500 text-sm">Total Bookings</p>
                  <p className="text-3xl font-bold text-dark-900 mt-1">{clientBookings.length}</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <p className="text-dark-500 text-sm">Upcoming</p>
                  <p className="text-3xl font-bold text-primary-600 mt-1">{upcomingBookings.length}</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <p className="text-dark-500 text-sm">Completed</p>
                  <p className="text-3xl font-bold text-secondary-600 mt-1">{pastBookings.length}</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <p className="text-dark-500 text-sm">Total Spent</p>
                  <p className="text-3xl font-bold text-dark-900 mt-1">{formatCurrency(totalSpent)}</p>
                </div>
              </div>

              {/* Active Tracking */}
              {inProgressBooking && (
                <div className="bg-gradient-primary rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-blue-100 text-sm">Service In Progress</p>
                      <h3 className="text-xl font-bold">{inProgressBooking.serviceName}</h3>
                    </div>
                    <Link
                      href="/tracking"
                      className="bg-white text-primary-700 px-4 py-2 rounded-lg font-medium flex items-center gap-2"
                    >
                      <NavigationIcon className="w-5 h-5" />
                      Track Provider
                    </Link>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <UserIcon className="w-4 h-4" />
                      {inProgressBooking.providerName}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="w-4 h-4" />
                      {inProgressBooking.suburb}, {inProgressBooking.state}
                    </div>
                  </div>
                </div>
              )}

              {/* Upcoming Bookings */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-dark-900">Upcoming Bookings</h2>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className="text-primary-600 text-sm font-medium flex items-center gap-1"
                  >
                    View All <ChevronRightIcon className="w-4 h-4" />
                  </button>
                </div>
                <div className="divide-y divide-gray-50">
                  {upcomingBookings.length > 0 ? (
                    upcomingBookings.map((booking) => (
                      <div key={booking.id} className="p-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                              <CalendarIcon className="w-6 h-6 text-primary-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-dark-900">{booking.serviceName}</p>
                              <div className="flex items-center gap-3 text-sm text-dark-500 mt-1">
                                <span>{formatDate(booking.date)}</span>
                                <span>•</span>
                                <span>{formatTime(booking.time)}</span>
                              </div>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {getStatusLabel(booking.status)}
                          </span>
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

          {activeTab === 'bookings' && (
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-dark-900">All Bookings</h2>
              </div>
              <div className="divide-y divide-gray-50">
                {clientBookings.map((booking) => (
                  <div key={booking.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                          <CalendarIcon className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-dark-900">{booking.serviceName}</p>
                          <p className="text-sm text-dark-500">{booking.providerName}</p>
                          <div className="flex items-center gap-3 text-sm text-dark-400 mt-1">
                            <span>{formatDate(booking.date)}</span>
                            <span>•</span>
                            <span>{formatTime(booking.time)}</span>
                            <span>•</span>
                            <span>{booking.suburb}</span>
                          </div>
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

          {activeTab === 'payments' && (
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-dark-900">Payment History</h2>
              </div>
              <div className="divide-y divide-gray-50">
                {clientPayments.map((payment) => {
                  const booking = clientBookings.find(b => b.id === payment.bookingId);
                  return (
                    <div key={payment.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                            <CreditCardIcon className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-dark-900">{booking?.serviceName || 'Service'}</p>
                            <p className="text-sm text-dark-500">
                              {payment.cardBrand} •••• {payment.cardLast4}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-dark-900">{formatCurrency(payment.amount)}</p>
                          <span className={`text-xs font-medium ${
                            payment.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                          }`}>
                            {payment.status === 'completed' ? 'Paid' : 'Pending'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
                      defaultValue="Emma Johnson"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="emma.johnson@email.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      defaultValue="+61 412 345 678"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">Address</label>
                    <input
                      type="text"
                      defaultValue="42 Harbour View Rd, Mosman NSW 2088"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500"
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
                <h2 className="text-lg font-semibold text-dark-900 mb-6">Notifications</h2>
                <div className="space-y-4">
                  {[
                    { label: 'Email notifications', desc: 'Receive booking confirmations and updates' },
                    { label: 'SMS notifications', desc: 'Get text messages for appointment reminders' },
                    { label: 'Provider arrival alerts', desc: 'Notify when provider is on the way' },
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
