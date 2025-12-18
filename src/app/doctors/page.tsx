/**
 * NAVSO Health - Doctors Search Page (Server Component)
 * Practo Parity: Full search with filters
 */

import { searchDoctors } from '@/services/doctor.service';
import { DoctorCard } from '@/components/doctor-card';
import { Search, MapPin, Filter } from 'lucide-react';
import Link from 'next/link';

// Force dynamic rendering so search params work
export const dynamic = 'force-dynamic';

interface PageProps {
    searchParams: Promise<{ q?: string; loc?: string }>;
}

export default async function DoctorsPage({ searchParams }: PageProps) {
    // 1. Get Params (await for Next.js 15)
    const params = await searchParams;
    const query = params.q || '';
    const location = params.loc || '';

    // 2. Fetch Data (Server-Side)
    const doctors = await searchDoctors(query, location);

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header / Search Bar */}
            <div className="bg-blue-700 text-white py-8 px-4 shadow-lg sticky top-0 z-30">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-4">
                        <Link href="/" className="text-white/80 hover:text-white">
                            ← Home
                        </Link>
                        <h1 className="text-2xl font-bold">Find & Book Top Doctors</h1>
                    </div>

                    <form className="flex flex-col md:flex-row gap-2 bg-white p-2 rounded-lg max-w-4xl">
                        <div className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-gray-200 px-3">
                            <MapPin className="text-gray-400 w-5 h-5 mr-2" />
                            <input
                                name="loc"
                                defaultValue={location}
                                placeholder="City (e.g. Delhi)"
                                className="w-full py-2 text-gray-900 outline-none"
                            />
                        </div>
                        <div className="flex-[2] flex items-center px-3">
                            <Search className="text-gray-400 w-5 h-5 mr-2" />
                            <input
                                name="q"
                                defaultValue={query}
                                placeholder="Search doctors, clinics, specialties..."
                                className="w-full py-2 text-gray-900 outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white font-bold py-2 px-8 rounded hover:bg-blue-800 transition"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Filters (Practo Style) */}
                <div className="hidden lg:block lg:col-span-1">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 sticky top-40">
                        <div className="flex items-center gap-2 mb-4 text-gray-800 font-bold border-b pb-2">
                            <Filter className="w-4 h-4" /> Filters
                        </div>

                        {/* Filter: Availability */}
                        <div className="mb-6">
                            <h4 className="text-sm font-semibold mb-2">Availability</h4>
                            <label className="flex items-center gap-2 text-sm text-gray-600 mb-1 cursor-pointer">
                                <input type="checkbox" className="rounded text-blue-600" /> Available Today
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                <input type="checkbox" className="rounded text-blue-600" /> Available Tomorrow
                            </label>
                        </div>

                        {/* Filter: Consultation Fee */}
                        <div className="mb-6">
                            <h4 className="text-sm font-semibold mb-2">Consultation Fee</h4>
                            <label className="flex items-center gap-2 text-sm text-gray-600 mb-1 cursor-pointer">
                                <input type="checkbox" className="rounded text-blue-600" /> ₹0 - ₹500
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-600 mb-1 cursor-pointer">
                                <input type="checkbox" className="rounded text-blue-600" /> ₹500 - ₹1000
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                <input type="checkbox" className="rounded text-blue-600" /> ₹1000+
                            </label>
                        </div>

                        {/* Filter: Gender */}
                        <div className="mb-6">
                            <h4 className="text-sm font-semibold mb-2">Gender</h4>
                            <label className="flex items-center gap-2 text-sm text-gray-600 mb-1 cursor-pointer">
                                <input type="checkbox" className="rounded text-blue-600" /> Male Doctor
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                <input type="checkbox" className="rounded text-blue-600" /> Female Doctor
                            </label>
                        </div>
                    </div>
                </div>

                {/* Doctor List Feed */}
                <div className="lg:col-span-3">
                    <div className="mb-4 text-gray-500 text-sm">
                        Showing {doctors.length} results
                        {query && ` for "${query}"`}
                        {location && ` in ${location}`}
                    </div>

                    {doctors.length > 0 ? (
                        doctors.map((doc) => <DoctorCard key={doc.id} doctor={doc} />)
                    ) : (
                        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                            <h3 className="text-xl font-bold text-gray-400">No doctors found</h3>
                            <p className="text-gray-500 mb-4">Try changing your search filters</p>
                            <Link
                                href="/doctors"
                                className="text-blue-600 hover:underline font-medium"
                            >
                                View all doctors
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
