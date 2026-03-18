'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  CreditCardIcon,
  StarIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  ShieldCheckIcon,
} from '@/components/icons';
import { services, serviceProviders, formatCurrency, formatDuration } from '@/data/mockData';

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');

  // Get first service for demo
  const service = services[0];
  const availableProviders = serviceProviders.filter(p => p.services.includes(service.id));

  const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

  const handleSubmit = () => {
    setStep(4); // Show confirmation
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-md mx-auto">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= s ? 'bg-primary-600 text-white' : 'bg-gray-200 text-dark-400'
                  }`}>
                    {step > s ? <CheckCircleIcon className="w-5 h-5" /> : s}
                  </div>
                  {s < 3 && (
                    <div className={`w-20 h-1 mx-2 ${step > s ? 'bg-primary-600' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between max-w-md mx-auto mt-2 text-sm text-dark-500">
              <span>Select Date</span>
              <span>Choose Provider</span>
              <span>Payment</span>
            </div>
          </div>

          {step < 4 ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {step === 1 && (
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-dark-900 mb-6">Select Date & Time</h2>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-dark-700 mb-2">
                        <CalendarIcon className="w-4 h-4 inline mr-2" />
                        Select Date
                      </label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min="2026-03-18"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-2">
                        <ClockIcon className="w-4 h-4 inline mr-2" />
                        Select Time
                      </label>
                      <div className="grid grid-cols-4 gap-3">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`py-3 rounded-xl font-medium transition-colors ${
                              selectedTime === time
                                ? 'bg-primary-600 text-white'
                                : 'bg-gray-100 text-dark-700 hover:bg-gray-200'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setStep(2)}
                      disabled={!selectedDate || !selectedTime}
                      className="w-full mt-6 bg-gradient-primary text-white py-4 rounded-xl font-semibold disabled:opacity-50"
                    >
                      Continue
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-dark-900 mb-6">Choose Your Provider</h2>

                    <div className="space-y-4">
                      {availableProviders.map((provider) => (
                        <button
                          key={provider.id}
                          onClick={() => setSelectedProvider(provider.id)}
                          className={`w-full p-4 rounded-xl border-2 text-left transition-colors ${
                            selectedProvider === provider.id
                              ? 'border-primary-600 bg-primary-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 rounded-xl overflow-hidden">
                              <Image
                                src={provider.avatar}
                                alt={provider.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <p className="font-semibold text-dark-900">{provider.name}</p>
                                {provider.isVerified && (
                                  <ShieldCheckIcon className="w-5 h-5 text-primary-600" />
                                )}
                              </div>
                              <div className="flex items-center gap-1 mt-1">
                                <StarIcon className="w-4 h-4 text-yellow-400" />
                                <span className="text-sm font-medium">{provider.rating}</span>
                                <span className="text-sm text-dark-400">({provider.reviewCount} reviews)</span>
                              </div>
                              <p className="text-sm text-dark-500 mt-1">{provider.completedJobs} jobs completed</p>
                            </div>
                            {selectedProvider === provider.id && (
                              <CheckCircleIcon className="w-6 h-6 text-primary-600" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={() => setStep(1)}
                        className="flex-1 py-4 rounded-xl font-semibold border border-gray-200 text-dark-700"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setStep(3)}
                        disabled={!selectedProvider}
                        className="flex-1 bg-gradient-primary text-white py-4 rounded-xl font-semibold disabled:opacity-50"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-dark-900 mb-6">Payment Details</h2>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-dark-700 mb-2">Card Number</label>
                        <input
                          type="text"
                          placeholder="4242 4242 4242 4242"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-dark-700 mb-2">Expiry Date</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-dark-700 mb-2">CVC</label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-dark-700 mb-2">Service Address</label>
                        <input
                          type="text"
                          placeholder="Enter your address"
                          defaultValue="42 Harbour View Rd, Mosman NSW 2088"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                        />
                      </div>

                      <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-xl">
                        <ShieldCheckIcon className="w-5 h-5 text-primary-600" />
                        <span className="text-sm text-dark-600">Secure payment powered by Stripe</span>
                      </div>
                    </div>

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={() => setStep(2)}
                        className="flex-1 py-4 rounded-xl font-semibold border border-gray-200 text-dark-700"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="flex-1 bg-gradient-primary text-white py-4 rounded-xl font-semibold"
                      >
                        Pay {formatCurrency(service.price)}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                  <h3 className="font-semibold text-dark-900 mb-4">Order Summary</h3>

                  <div className="relative h-40 rounded-xl overflow-hidden mb-4">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <h4 className="font-semibold text-dark-900">{service.name}</h4>
                  <p className="text-sm text-dark-500 mt-1">{service.shortDescription}</p>

                  <div className="border-t border-gray-100 mt-4 pt-4 space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <ClockIcon className="w-4 h-4 text-dark-400" />
                      <span className="text-dark-600">{formatDuration(service.duration)}</span>
                    </div>
                    {selectedDate && (
                      <div className="flex items-center gap-2 text-sm">
                        <CalendarIcon className="w-4 h-4 text-dark-400" />
                        <span className="text-dark-600">{selectedDate} at {selectedTime}</span>
                      </div>
                    )}
                    {selectedProvider && (
                      <div className="flex items-center gap-2 text-sm">
                        <StarIcon className="w-4 h-4 text-dark-400" />
                        <span className="text-dark-600">
                          {availableProviders.find(p => p.id === selectedProvider)?.name}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-100 mt-4 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-dark-600">Total</span>
                      <span className="text-2xl font-bold text-dark-900">{formatCurrency(service.price)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Confirmation */
            <div className="max-w-lg mx-auto text-center bg-white rounded-2xl shadow-sm p-8">
              <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircleIcon className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-dark-900 mb-2">Booking Confirmed!</h2>
              <p className="text-dark-500 mb-6">
                Your booking has been confirmed. You will receive a confirmation email shortly.
              </p>

              <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-dark-500">Service</span>
                    <span className="font-medium text-dark-900">{service.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark-500">Date</span>
                    <span className="font-medium text-dark-900">{selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark-500">Time</span>
                    <span className="font-medium text-dark-900">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark-500">Amount Paid</span>
                    <span className="font-medium text-dark-900">{formatCurrency(service.price)}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Link
                  href="/client"
                  className="flex-1 py-3 rounded-xl font-semibold border border-gray-200 text-dark-700"
                >
                  View Bookings
                </Link>
                <Link
                  href="/tracking"
                  className="flex-1 bg-gradient-primary text-white py-3 rounded-xl font-semibold"
                >
                  Track Provider
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
