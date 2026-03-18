import {
  ServiceCategory,
  Service,
  ServiceProvider,
  Booking,
  Payment,
  TrackingData,
  Review,
} from '@/types';

export const serviceCategories: ServiceCategory[] = [
  { id: 'cat1', name: 'Cleaning', slug: 'cleaning', icon: 'cleaning', description: 'Home and office cleaning services' },
  { id: 'cat2', name: 'Plumbing', slug: 'plumbing', icon: 'plumbing', description: 'Plumbing repairs and installations' },
  { id: 'cat3', name: 'Electrical', slug: 'electrical', icon: 'electrical', description: 'Electrical repairs and installations' },
  { id: 'cat4', name: 'Gardening', slug: 'gardening', icon: 'gardening', description: 'Lawn care and landscaping' },
  { id: 'cat5', name: 'Painting', slug: 'painting', icon: 'painting', description: 'Interior and exterior painting' },
  { id: 'cat6', name: 'Moving', slug: 'moving', icon: 'moving', description: 'Moving and removalist services' },
];

export const services: Service[] = [
  {
    id: 'srv1',
    categoryId: 'cat1',
    name: 'Standard Home Cleaning',
    shortDescription: 'Complete home cleaning service',
    description: 'Our professional cleaners will thoroughly clean your entire home including all rooms, bathrooms, and kitchen. Service includes vacuuming, mopping, dusting, and sanitizing.',
    price: 120,
    duration: 120,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
    rating: 4.8,
    reviewCount: 234,
    isPopular: true,
  },
  {
    id: 'srv2',
    categoryId: 'cat1',
    name: 'Deep Cleaning',
    shortDescription: 'Intensive deep clean for your home',
    description: 'Comprehensive deep cleaning including inside appliances, detailed bathroom scrubbing, window cleaning, and carpet shampooing.',
    price: 250,
    duration: 240,
    image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=800',
    rating: 4.9,
    reviewCount: 156,
    isPopular: true,
  },
  {
    id: 'srv3',
    categoryId: 'cat2',
    name: 'Blocked Drain Repair',
    shortDescription: 'Fast drain unblocking service',
    description: 'Professional drain unblocking using high-pressure water jetting and CCTV inspection to identify and clear blockages.',
    price: 180,
    duration: 60,
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800',
    rating: 4.7,
    reviewCount: 189,
    isPopular: true,
  },
  {
    id: 'srv4',
    categoryId: 'cat2',
    name: 'Hot Water System Repair',
    shortDescription: 'Hot water heater repairs',
    description: 'Expert repair and maintenance of all types of hot water systems including electric, gas, and solar.',
    price: 220,
    duration: 90,
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800',
    rating: 4.6,
    reviewCount: 98,
    isPopular: false,
  },
  {
    id: 'srv5',
    categoryId: 'cat3',
    name: 'Electrical Safety Inspection',
    shortDescription: 'Complete electrical safety check',
    description: 'Comprehensive inspection of your electrical system including switchboard, wiring, and safety switches.',
    price: 150,
    duration: 60,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800',
    rating: 4.9,
    reviewCount: 145,
    isPopular: true,
  },
  {
    id: 'srv6',
    categoryId: 'cat3',
    name: 'Ceiling Fan Installation',
    shortDescription: 'Professional fan installation',
    description: 'Expert installation of ceiling fans including wiring and mounting. All brands and sizes.',
    price: 180,
    duration: 90,
    image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800',
    rating: 4.8,
    reviewCount: 87,
    isPopular: false,
  },
  {
    id: 'srv7',
    categoryId: 'cat4',
    name: 'Lawn Mowing & Edging',
    shortDescription: 'Regular lawn maintenance',
    description: 'Professional lawn mowing, edging, and blowing. Keep your lawn looking pristine all year round.',
    price: 80,
    duration: 60,
    image: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=800',
    rating: 4.7,
    reviewCount: 312,
    isPopular: true,
  },
  {
    id: 'srv8',
    categoryId: 'cat4',
    name: 'Garden Design & Landscaping',
    shortDescription: 'Transform your outdoor space',
    description: 'Complete garden design and landscaping service including plant selection, installation, and irrigation setup.',
    price: 500,
    duration: 480,
    image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800',
    rating: 4.9,
    reviewCount: 67,
    isPopular: false,
  },
  {
    id: 'srv9',
    categoryId: 'cat5',
    name: 'Interior Room Painting',
    shortDescription: 'Single room painting service',
    description: 'Professional interior painting for a single room including preparation, priming, and two coats of premium paint.',
    price: 350,
    duration: 240,
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800',
    rating: 4.8,
    reviewCount: 124,
    isPopular: true,
  },
  {
    id: 'srv10',
    categoryId: 'cat6',
    name: 'Small Move (1-2 Rooms)',
    shortDescription: 'Moving service for small loads',
    description: 'Professional moving service for 1-2 rooms including loading, transport, and unloading. Includes 2 movers and truck.',
    price: 400,
    duration: 180,
    image: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=800',
    rating: 4.7,
    reviewCount: 203,
    isPopular: true,
  },
];

export const serviceProviders: ServiceProvider[] = [
  {
    id: 'prov1',
    userId: 'user1',
    name: 'James Wilson',
    email: 'james@example.com',
    phone: '+61 412 345 678',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    services: ['srv1', 'srv2'],
    rating: 4.9,
    reviewCount: 156,
    completedJobs: 423,
    location: {
      lat: -33.8688,
      lng: 151.2093,
      address: '123 George St',
      suburb: 'Sydney',
      state: 'NSW',
    },
    availability: [
      { day: 1, startTime: '08:00', endTime: '17:00', isAvailable: true },
      { day: 2, startTime: '08:00', endTime: '17:00', isAvailable: true },
      { day: 3, startTime: '08:00', endTime: '17:00', isAvailable: true },
      { day: 4, startTime: '08:00', endTime: '17:00', isAvailable: true },
      { day: 5, startTime: '08:00', endTime: '17:00', isAvailable: true },
      { day: 6, startTime: '09:00', endTime: '14:00', isAvailable: true },
    ],
    isVerified: true,
    isOnline: true,
  },
  {
    id: 'prov2',
    userId: 'user2',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    phone: '+61 423 456 789',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    services: ['srv3', 'srv4'],
    rating: 4.8,
    reviewCount: 98,
    completedJobs: 287,
    location: {
      lat: -33.8651,
      lng: 151.2099,
      address: '456 Pitt St',
      suburb: 'Sydney',
      state: 'NSW',
    },
    availability: [
      { day: 1, startTime: '07:00', endTime: '16:00', isAvailable: true },
      { day: 2, startTime: '07:00', endTime: '16:00', isAvailable: true },
      { day: 3, startTime: '07:00', endTime: '16:00', isAvailable: true },
      { day: 4, startTime: '07:00', endTime: '16:00', isAvailable: true },
      { day: 5, startTime: '07:00', endTime: '16:00', isAvailable: true },
    ],
    isVerified: true,
    isOnline: true,
  },
  {
    id: 'prov3',
    userId: 'user3',
    name: 'Michael Thompson',
    email: 'michael@example.com',
    phone: '+61 434 567 890',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    services: ['srv5', 'srv6'],
    rating: 4.9,
    reviewCount: 145,
    completedJobs: 512,
    location: {
      lat: -33.8700,
      lng: 151.2100,
      address: '789 Elizabeth St',
      suburb: 'Sydney',
      state: 'NSW',
    },
    availability: [
      { day: 1, startTime: '06:00', endTime: '18:00', isAvailable: true },
      { day: 2, startTime: '06:00', endTime: '18:00', isAvailable: true },
      { day: 3, startTime: '06:00', endTime: '18:00', isAvailable: true },
      { day: 4, startTime: '06:00', endTime: '18:00', isAvailable: true },
      { day: 5, startTime: '06:00', endTime: '18:00', isAvailable: true },
      { day: 6, startTime: '08:00', endTime: '12:00', isAvailable: true },
    ],
    isVerified: true,
    isOnline: false,
  },
];

export const bookings: Booking[] = [
  {
    id: 'book1',
    clientId: 'client1',
    clientName: 'Emma Johnson',
    providerId: 'prov1',
    providerName: 'James Wilson',
    serviceId: 'srv1',
    serviceName: 'Standard Home Cleaning',
    date: '2026-03-20',
    time: '09:00',
    duration: 120,
    address: '42 Harbour View Rd',
    suburb: 'Mosman',
    state: 'NSW',
    status: 'confirmed',
    price: 120,
    notes: 'Please focus on the kitchen and bathrooms',
    createdAt: '2026-03-15T10:30:00',
  },
  {
    id: 'book2',
    clientId: 'client1',
    clientName: 'Emma Johnson',
    providerId: 'prov2',
    providerName: 'Sarah Chen',
    serviceId: 'srv3',
    serviceName: 'Blocked Drain Repair',
    date: '2026-03-18',
    time: '14:00',
    duration: 60,
    address: '42 Harbour View Rd',
    suburb: 'Mosman',
    state: 'NSW',
    status: 'in_progress',
    price: 180,
    createdAt: '2026-03-17T09:15:00',
  },
  {
    id: 'book3',
    clientId: 'client1',
    clientName: 'Emma Johnson',
    providerId: 'prov3',
    providerName: 'Michael Thompson',
    serviceId: 'srv5',
    serviceName: 'Electrical Safety Inspection',
    date: '2026-03-10',
    time: '10:00',
    duration: 60,
    address: '42 Harbour View Rd',
    suburb: 'Mosman',
    state: 'NSW',
    status: 'completed',
    price: 150,
    createdAt: '2026-03-05T14:20:00',
  },
  {
    id: 'book4',
    clientId: 'client2',
    clientName: 'David Brown',
    providerId: 'prov1',
    providerName: 'James Wilson',
    serviceId: 'srv2',
    serviceName: 'Deep Cleaning',
    date: '2026-03-19',
    time: '08:00',
    duration: 240,
    address: '88 Pacific Hwy',
    suburb: 'North Sydney',
    state: 'NSW',
    status: 'pending',
    price: 250,
    createdAt: '2026-03-17T16:45:00',
  },
];

export const payments: Payment[] = [
  {
    id: 'pay1',
    bookingId: 'book3',
    amount: 150,
    currency: 'AUD',
    method: 'card',
    status: 'completed',
    stripePaymentId: 'pi_3abc123xyz',
    cardLast4: '4242',
    cardBrand: 'Visa',
    createdAt: '2026-03-10T11:05:00',
    completedAt: '2026-03-10T11:05:30',
  },
  {
    id: 'pay2',
    bookingId: 'book1',
    amount: 120,
    currency: 'AUD',
    method: 'card',
    status: 'pending',
    stripePaymentId: 'pi_4def456abc',
    cardLast4: '1234',
    cardBrand: 'Mastercard',
    createdAt: '2026-03-15T10:35:00',
  },
  {
    id: 'pay3',
    bookingId: 'book2',
    amount: 180,
    currency: 'AUD',
    method: 'card',
    status: 'completed',
    stripePaymentId: 'pi_5ghi789def',
    cardLast4: '5678',
    cardBrand: 'Visa',
    createdAt: '2026-03-17T09:20:00',
    completedAt: '2026-03-17T09:20:45',
  },
];

export const activeTracking: TrackingData = {
  bookingId: 'book2',
  providerId: 'prov2',
  providerName: 'Sarah Chen',
  providerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
  providerPhone: '+61 423 456 789',
  currentLocation: {
    lat: -33.8620,
    lng: 151.2050,
  },
  destinationLocation: {
    lat: -33.8290,
    lng: 151.2440,
  },
  eta: 12,
  distance: 5.2,
  status: 'en_route',
  lastUpdated: '2026-03-18T13:48:00',
};

export const reviews: Review[] = [
  {
    id: 'rev1',
    bookingId: 'book3',
    clientId: 'client1',
    clientName: 'Emma Johnson',
    providerId: 'prov3',
    rating: 5,
    comment: 'Michael was very professional and thorough. Found some issues I wasn\'t aware of and fixed them on the spot. Highly recommend!',
    createdAt: '2026-03-10T15:30:00',
  },
  {
    id: 'rev2',
    bookingId: 'book-old1',
    clientId: 'client2',
    clientName: 'David Brown',
    providerId: 'prov1',
    rating: 5,
    comment: 'James and his team did an amazing job on our deep clean. The house has never looked better!',
    createdAt: '2026-03-08T12:15:00',
  },
  {
    id: 'rev3',
    bookingId: 'book-old2',
    clientId: 'client3',
    clientName: 'Lisa Wang',
    providerId: 'prov2',
    rating: 4,
    comment: 'Great service, fixed our blocked drain quickly. Would use again.',
    createdAt: '2026-03-05T16:45:00',
  },
];

// Utility functions
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-AU', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function formatTime(timeString: string): string {
  const [hours, minutes] = timeString.split(':');
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes));
  return new Intl.DateTimeFormat('en-AU', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

export function formatDateTime(dateTimeString: string): string {
  const date = new Date(dateTimeString);
  return new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins} min`;
  if (mins === 0) return `${hours} hr`;
  return `${hours} hr ${mins} min`;
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    in_progress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled',
  };
  return labels[status] || status;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-blue-100 text-blue-700',
    in_progress: 'bg-purple-100 text-purple-700',
    completed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
}
