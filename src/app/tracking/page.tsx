'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  NavigationIcon,
  PhoneIcon,
  MessageIcon,
  ClockIcon,
  MapPinIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  RefreshIcon,
} from '@/components/icons';
import { activeTracking, bookings, formatTime } from '@/data/mockData';

export default function TrackingPage() {
  const [eta, setEta] = useState(activeTracking.eta);
  const [status, setStatus] = useState(activeTracking.status);

  const booking = bookings.find(b => b.id === activeTracking.bookingId);

  // Simulate ETA countdown
  useEffect(() => {
    if (status === 'en_route' && eta > 0) {
      const timer = setInterval(() => {
        setEta(prev => {
          if (prev <= 1) {
            setStatus('arrived');
            return 0;
          }
          return prev - 1;
        });
      }, 60000); // Update every minute in real app
      return () => clearInterval(timer);
    }
  }, [status, eta]);

  const getStatusStep = () => {
    switch (status) {
      case 'en_route': return 1;
      case 'arrived': return 2;
      case 'in_service': return 3;
      default: return 1;
    }
  };

  const steps = [
    { id: 1, name: 'On the Way', desc: 'Provider is heading to your location' },
    { id: 2, name: 'Arrived', desc: 'Provider has arrived' },
    { id: 3, name: 'In Service', desc: 'Service is being performed' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/client" className="text-primary-600 font-medium flex items-center gap-1">
            <ChevronRightIcon className="w-5 h-5 rotate-180" />
            Back to Dashboard
          </Link>
          <button className="flex items-center gap-2 text-dark-600">
            <RefreshIcon className="w-5 h-5" />
            Refresh
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Map Placeholder */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="relative h-[300px] md:h-[400px] bg-gradient-to-br from-primary-100 to-primary-50">
            {/* Simulated Map */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-4 animate-pulse">
                  <NavigationIcon className="w-10 h-10 text-white" />
                </div>
                <p className="text-dark-600 font-medium">Live Map View</p>
                <p className="text-dark-400 text-sm">Real-time tracking enabled</p>
              </div>
            </div>

            {/* ETA Badge */}
            <div className="absolute top-4 left-4 bg-white rounded-xl p-4 shadow-lg">
              <p className="text-dark-500 text-sm">Estimated Arrival</p>
              <p className="text-3xl font-bold text-dark-900">
                {status === 'arrived' ? 'Arrived!' : `${eta} min`}
              </p>
              <p className="text-dark-400 text-sm">{activeTracking.distance} km away</p>
            </div>

            {/* Provider Card */}
            <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl p-4 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden">
                    <Image
                      src={activeTracking.providerAvatar}
                      alt={activeTracking.providerName}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-dark-900">{activeTracking.providerName}</p>
                    <p className="text-sm text-dark-500">{booking?.serviceName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${activeTracking.providerPhone}`}
                    className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-100"
                  >
                    <PhoneIcon className="w-5 h-5" />
                  </a>
                  <button className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-100">
                    <MessageIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-dark-900 mb-6">Service Progress</h2>
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-[18px] top-8 bottom-8 w-0.5 bg-gray-200" />
            <div
              className="absolute left-[18px] top-8 w-0.5 bg-primary-600 transition-all duration-500"
              style={{ height: `${((getStatusStep() - 1) / 2) * 100}%` }}
            />

            <div className="space-y-8">
              {steps.map((step) => {
                const isCompleted = step.id < getStatusStep();
                const isCurrent = step.id === getStatusStep();
                return (
                  <div key={step.id} className="flex items-start gap-4">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isCompleted
                        ? 'bg-primary-600'
                        : isCurrent
                        ? 'bg-primary-600 animate-pulse'
                        : 'bg-gray-200'
                    }`}>
                      {isCompleted ? (
                        <CheckCircleIcon className="w-5 h-5 text-white" />
                      ) : (
                        <span className={`text-sm font-bold ${isCurrent ? 'text-white' : 'text-dark-400'}`}>
                          {step.id}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className={`font-semibold ${isCurrent ? 'text-primary-600' : 'text-dark-900'}`}>
                        {step.name}
                      </p>
                      <p className="text-sm text-dark-500">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Booking Details */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-dark-900 mb-4">Booking Details</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                <ClockIcon className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-dark-500">Scheduled Time</p>
                <p className="font-medium text-dark-900">
                  {booking && `${formatTime(booking.time)} - ${booking.duration} min`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                <MapPinIcon className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-dark-500">Service Location</p>
                <p className="font-medium text-dark-900">
                  {booking && `${booking.address}, ${booking.suburb} ${booking.state}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
