import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold">ServiceBook</span>
            </Link>
            <p className="text-dark-400 text-sm">
              Book trusted local service providers across Australia. Fast, easy, and reliable.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-dark-400 text-sm">
              <li><Link href="/services" className="hover:text-white">Cleaning</Link></li>
              <li><Link href="/services" className="hover:text-white">Plumbing</Link></li>
              <li><Link href="/services" className="hover:text-white">Electrical</Link></li>
              <li><Link href="/services" className="hover:text-white">Gardening</Link></li>
              <li><Link href="/services" className="hover:text-white">Painting</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-dark-400 text-sm">
              <li><Link href="/" className="hover:text-white">About Us</Link></li>
              <li><Link href="/" className="hover:text-white">Careers</Link></li>
              <li><Link href="/provider" className="hover:text-white">Become a Provider</Link></li>
              <li><Link href="/" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-dark-400 text-sm">
              <li><Link href="/" className="hover:text-white">Help Centre</Link></li>
              <li><Link href="/" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="/" className="hover:text-white">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-dark-400 text-sm">
            &copy; 2026 ServiceBook. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-dark-400 text-sm">Secure payments with</span>
            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded">
              <span className="text-primary-600 font-bold text-sm">stripe</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
