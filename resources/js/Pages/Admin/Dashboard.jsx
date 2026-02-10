import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

export default function Dashboard({ insightCount, portfolioCount }) {
    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
                <p className="text-gray-500 text-sm mt-1">Selamat datang di panel admin Kaffah Education Partner.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl">📝</div>
                        <div>
                            <p className="text-sm text-gray-500">Total Insight</p>
                            <p className="text-3xl font-bold text-gray-800">{insightCount}</p>
                        </div>
                    </div>
                    <Link href="/admin/insights" className="text-sm text-blue-600 font-medium mt-4 inline-block hover:text-blue-800">
                        Kelola Insight →
                    </Link>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-2xl">📸</div>
                        <div>
                            <p className="text-sm text-gray-500">Total Portofolio</p>
                            <p className="text-3xl font-bold text-gray-800">{portfolioCount}</p>
                        </div>
                    </div>
                    <Link href="/admin/portfolios" className="text-sm text-green-600 font-medium mt-4 inline-block hover:text-green-800">
                        Kelola Portofolio →
                    </Link>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-2xl">🌐</div>
                        <div>
                            <p className="text-sm text-gray-500">Website</p>
                            <p className="text-lg font-bold text-gray-800">Online</p>
                        </div>
                    </div>
                    <a href="/" target="_blank" className="text-sm text-orange-600 font-medium mt-4 inline-block hover:text-orange-800">
                        Buka Website →
                    </a>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Aksi Cepat</h3>
                <div className="flex flex-wrap gap-3">
                    <Link href="/admin/insights/create" className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-[#15322b] transition-colors">
                        + Tambah Insight
                    </Link>
                    <Link href="/admin/portfolios/create" className="px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-[#d94d20] transition-colors">
                        + Tambah Portofolio
                    </Link>
                </div>
            </div>
        </AdminLayout>
    );
}
