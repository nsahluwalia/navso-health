/**
 * NAVSO Health - Video Consultation Page
 */

import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function getVideoDoctors() {
    try {
        const doctors = await prisma.doctor.findMany({
            take: 6,
            include: { user: true, clinics: { include: { clinic: true }, take: 1 } },
        });
        return doctors;
    } catch (error) {
        console.error('Error fetching doctors:', error);
        return [];
    }
}

export default async function VideoConsultPage() {
    const doctors = await getVideoDoctors();

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
            <div className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <Link href="/" className="text-white/80 hover:text-white mb-6 inline-block">← Back to Home</Link>
                    <h1 className="text-4xl font-bold mb-4">Video Consultation</h1>
                    <p className="text-purple-100 text-lg mb-8">Consult with top doctors from the comfort of your home</p>
                    <Link href="/doctors?type=video" className="inline-flex items-center gap-2 bg-white text-purple-700 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all shadow-lg">
                        📹 Start Consultation
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
                        <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">⏱️</div>
                        <div><h3 className="font-bold text-gray-900">Instant Consultation</h3><p className="text-gray-500 text-sm">Connect within minutes</p></div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
                        <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">🔒</div>
                        <div><h3 className="font-bold text-gray-900">Secure & Private</h3><p className="text-gray-500 text-sm">End-to-end encrypted</p></div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
                        <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">📹</div>
                        <div><h3 className="font-bold text-gray-900">HD Video Quality</h3><p className="text-gray-500 text-sm">Crystal clear calls</p></div>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-8">Doctors Available Now</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {doctors.length > 0 ? doctors.map((doctor) => (
                        <div key={doctor.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-3xl">👨‍⚕️</div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900">{doctor.name}</h3>
                                    <p className="text-purple-600 text-sm">{doctor.specialization}</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <span className="text-yellow-400">⭐</span>
                                        <span className="text-sm font-medium">{doctor.averageRating || 4.5}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div>
                                    <p className="text-xs text-gray-500">Consultation Fee</p>
                                    <p className="text-xl font-bold text-gray-900">₹{doctor.clinics[0]?.consultationFee || 500}</p>
                                </div>
                                <Link href={`/book/${doctor.id}?type=video`} className="bg-purple-600 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-purple-700 transition flex items-center gap-1">
                                    📹 Consult
                                </Link>
                            </div>
                        </div>
                    )) : (
                        <div className="col-span-full text-center py-12 bg-gray-50 rounded-xl">
                            <p className="text-gray-500">Loading doctors...</p>
                            <Link href="/doctors" className="text-purple-600 hover:underline mt-2 inline-block">View all doctors</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
