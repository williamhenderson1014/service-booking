export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: 'client' | 'provider' | 'admin';
  createdAt: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
}

export interface Service {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  duration: number; // in minutes
  image: string;
  rating: number;
  reviewCount: number;
  isPopular: boolean;
}

export interface ServiceProvider {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  services: string[];
  rating: number;
  reviewCount: number;
  completedJobs: number;
  location: {
    lat: number;
    lng: number;
    address: string;
    suburb: string;
    state: string;
  };
  availability: AvailabilitySlot[];
  isVerified: boolean;
  isOnline: boolean;
}

export interface AvailabilitySlot {
  day: number; // 0-6, Sunday-Saturday
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface Booking {
  id: string;
  clientId: string;
  clientName: string;
  providerId: string;
  providerName: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  duration: number;
  address: string;
  suburb: string;
  state: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  price: number;
  notes?: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  method: 'card' | 'bank_transfer';
  status: 'pending' | 'completed' | 'refunded' | 'failed';
  stripePaymentId?: string;
  cardLast4?: string;
  cardBrand?: string;
  createdAt: string;
  completedAt?: string;
}

export interface TrackingData {
  bookingId: string;
  providerId: string;
  providerName: string;
  providerAvatar: string;
  providerPhone: string;
  currentLocation: {
    lat: number;
    lng: number;
  };
  destinationLocation: {
    lat: number;
    lng: number;
  };
  eta: number; // minutes
  distance: number; // km
  status: 'en_route' | 'arrived' | 'in_service';
  lastUpdated: string;
}

export interface Review {
  id: string;
  bookingId: string;
  clientId: string;
  clientName: string;
  providerId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface DashboardStats {
  totalBookings: number;
  upcomingBookings: number;
  completedBookings: number;
  totalSpent?: number;
  totalEarnings?: number;
  averageRating?: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'booking' | 'payment' | 'reminder' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}
