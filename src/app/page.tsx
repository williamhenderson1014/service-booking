import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  StarIcon,
  CheckCircleIcon,
  MapPinIcon,
  ClockIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  NavigationIcon,
  ChevronRightIcon,
  CleaningIcon,
  PlumbingIcon,
  ElectricalIcon,
  GardeningIcon,
  PaintingIcon,
  MovingIcon,
} from '@/components/icons';
import { serviceCategories, services, serviceProviders, formatCurrency } from '@/data/mockData';

export default function HomePage() {
  const popularServices = services.filter(s => s.isPopular).slice(0, 4);
  const featuredProviders = serviceProviders.slice(0, 3);

  const categoryIcons: Record<string, React.FC<{ className?: string }>> = {
    cleaning: CleaningIcon,
    plumbing: PlumbingIcon,
    electrical: ElectricalIcon,
    gardening: GardeningIcon,
    painting: PaintingIcon,
    moving: MovingIcon,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-hero text-white py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white rounded-full translate-x-1/4 translate-y-1/4" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
                  Book Trusted Local Services in Minutes
                </h1>
                <p className="text-xl text-blue-100 mb-8 max-w-lg">
                  From cleaning to plumbing, find verified professionals near you. Track them in real-time and pay securely online.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link
                    href="/services"
                    className="bg-white text-primary-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors text-center"
                  >
                    Browse Services
                  </Link>
                  <Link
                    href="/provider"
                    className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors text-center"
                  >
                    Become a Provider
                  </Link>
                </div>

                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-5 h-5 text-secondary-400" />
                    <span>Verified Providers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-5 h-5 text-secondary-400" />
                    <span>Secure Payments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-5 h-5 text-secondary-400" />
                    <span>Real-time Tracking</span>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block relative">
                <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800"
                    alt="Professional service provider"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Floating card */}
                <div className="absolute -bottom-6 -left-6 bg-white text-dark-900 p-4 rounded-xl shadow-xl max-w-[200px]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(i => (
                        <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm font-medium">4.9</span>
                  </div>
                  <p className="text-sm text-dark-600">10,000+ happy customers across Australia</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-dark-900 mb-4">Our Services</h2>
              <p className="text-dark-500 max-w-2xl mx-auto">
                Browse our wide range of professional services available across Australia
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {serviceCategories.map((category) => {
                const Icon = categoryIcons[category.icon] || CleaningIcon;
                return (
                  <Link
                    key={category.id}
                    href={`/services?category=${category.slug}`}
                    className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow group"
                  >
                    <div className="w-14 h-14 mx-auto mb-4 bg-primary-50 rounded-xl flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                      <Icon className="w-7 h-7 text-primary-600" />
                    </div>
                    <h3 className="font-semibold text-dark-900">{category.name}</h3>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Popular Services */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-dark-900 mb-2">Popular Services</h2>
                <p className="text-dark-500">Most booked services by our customers</p>
              </div>
              <Link
                href="/services"
                className="hidden sm:flex items-center gap-1 text-primary-600 font-medium hover:underline"
              >
                View All <ChevronRightIcon className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularServices.map((service) => (
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
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-dark-900 mb-1">{service.name}</h3>
                    <p className="text-sm text-dark-500 mb-3">{service.shortDescription}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <StarIcon className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-medium">{service.rating}</span>
                        <span className="text-sm text-dark-400">({service.reviewCount})</span>
                      </div>
                      <span className="font-bold text-primary-600">{formatCurrency(service.price)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/services"
                className="inline-flex items-center gap-1 text-primary-600 font-medium"
              >
                View All Services <ChevronRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-dark-900 mb-4">How It Works</h2>
              <p className="text-dark-500 max-w-2xl mx-auto">
                Book a service in just a few simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: MapPinIcon, title: 'Choose Service', desc: 'Browse services and select what you need' },
                { icon: ClockIcon, title: 'Pick a Time', desc: 'Choose a date and time that works for you' },
                { icon: CreditCardIcon, title: 'Pay Securely', desc: 'Pay online with Stripe secure payment' },
                { icon: NavigationIcon, title: 'Track Provider', desc: 'Track your provider in real-time on arrival' },
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-2xl flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="font-semibold text-dark-900 mb-2">{step.title}</h3>
                  <p className="text-dark-500 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-dark-900 mb-6">Why Choose ServiceBook?</h2>

                <div className="space-y-6">
                  {[
                    {
                      icon: ShieldCheckIcon,
                      title: 'Verified Professionals',
                      desc: 'All service providers are background checked and verified for your safety.',
                    },
                    {
                      icon: NavigationIcon,
                      title: 'Real-time Tracking',
                      desc: 'Track your service provider on a live map with accurate ETA.',
                    },
                    {
                      icon: CreditCardIcon,
                      title: 'Secure Payments',
                      desc: 'Pay safely with Stripe. Full refund if you\'re not satisfied.',
                    },
                    {
                      icon: StarIcon,
                      title: 'Top-rated Service',
                      desc: '4.9 average rating from over 10,000 happy customers.',
                    },
                  ].map((feature, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-dark-900 mb-1">{feature.title}</h3>
                        <p className="text-dark-500 text-sm">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="relative h-[500px] rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800"
                    alt="Happy customer"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Book Your First Service?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of Australians who trust ServiceBook for their home services.
            </p>
            <Link
              href="/services"
              className="inline-block bg-white text-primary-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors"
            >
              Get Started Now
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
