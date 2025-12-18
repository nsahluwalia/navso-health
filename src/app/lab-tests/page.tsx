/**
 * NAVSO Health - Lab Tests Page
 */

import Link from 'next/link';

const labTests = [
    { id: '1', name: 'Complete Blood Count (CBC)', category: 'Blood Test', price: 450, discountedPrice: 350, parameters: 24, reportTime: '24 hours', homeCollection: true },
    { id: '2', name: 'Lipid Profile', category: 'Heart Health', price: 800, discountedPrice: 599, parameters: 8, reportTime: '24 hours', homeCollection: true },
    { id: '3', name: 'Thyroid Profile (T3, T4, TSH)', category: 'Thyroid', price: 700, discountedPrice: 499, parameters: 3, reportTime: '24 hours', homeCollection: true },
    { id: '4', name: 'Diabetes Screening (HbA1c)', category: 'Diabetes', price: 900, discountedPrice: 699, parameters: 2, reportTime: '24 hours', homeCollection: true },
    { id: '5', name: 'Liver Function Test (LFT)', category: 'Liver Health', price: 650, discountedPrice: 499, parameters: 12, reportTime: '24 hours', homeCollection: true },
    { id: '6', name: 'Kidney Function Test (KFT)', category: 'Kidney Health', price: 600, discountedPrice: 450, parameters: 8, reportTime: '24 hours', homeCollection: true },
];

export default function LabTestsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-green-700 text-white py-8 px-4">
                <div className="max-w-7xl mx-auto">
                    <Link href="/" className="text-white/80 hover:text-white mb-4 inline-block">← Home</Link>
                    <h1 className="text-3xl font-bold mb-2">Book Lab Tests</h1>
                    <p className="text-green-100">Get accurate results with home sample collection</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {labTests.map((test) => {
                        const discount = Math.round(((test.price - test.discountedPrice) / test.price) * 100);
                        return (
                            <div key={test.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">🏠 Home Collection</span>
                                    {discount > 0 && <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">{discount}% OFF</span>}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{test.name}</h3>
                                <p className="text-sm text-gray-500 mb-4">{test.category}</p>
                                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                                    <span>🧪 {test.parameters} parameters</span>
                                    <span>⏱️ {test.reportTime}</span>
                                </div>
                                <div className="flex items-end justify-between pt-4 border-t border-gray-100">
                                    <div>
                                        <p className="text-sm text-gray-400 line-through">₹{test.price}</p>
                                        <p className="text-2xl font-bold text-green-600">₹{test.discountedPrice}</p>
                                    </div>
                                    <button className="bg-green-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-green-700 transition">
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
