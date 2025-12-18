/**
 * NAVSO Health - Landing Page (Next.js 15 App Router)
 * Practo Parity: Hero section with search and quick actions
 */

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-600">NAVSO Health</h1>
        <div className="flex items-center gap-6">
          <Link href="/doctors" className="text-gray-600 hover:text-blue-600 hidden md:block">
            Find Doctors
          </Link>
          <Link href="/tests" className="text-gray-600 hover:text-blue-600 hidden md:block">
            Lab Tests
          </Link>
          <Link
            href="/login"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-all"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-4 mt-16">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
          Your Health, <span className="text-blue-600">Our Priority</span>
        </h2>
        <p className="text-gray-500 text-lg max-w-2xl mb-12">
          Book appointments, order medicines, and schedule lab tests seamlessly with the Navso Superapp.
        </p>

        {/* Search Bar */}
        <div className="relative w-full max-w-2xl mb-16">
          <svg className="absolute left-4 top-4 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search for doctors, specializations, or symptoms..."
            className="w-full pl-12 pr-32 py-4 rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-8 rounded-full font-bold hover:bg-blue-700">
            Search
          </button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full px-4 mb-20">
          <FeatureCard
            icon="🩺"
            title="Book Appointment"
            description="Connect with top specialists in your area."
            href="/doctors"
          />
          <FeatureCard
            icon="💊"
            title="Order Medicines"
            description="Get medicines delivered to your doorstep."
            href="/pharmacy"
          />
          <FeatureCard
            icon="🧪"
            title="Lab Tests"
            description="Book home sample collection instantly."
            href="/tests"
          />
        </div>
      </div>
    </main>
  );
}

function FeatureCard({ icon, title, description, href }: {
  icon: string;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-left hover:shadow-md transition-all"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </Link>
  );
}
