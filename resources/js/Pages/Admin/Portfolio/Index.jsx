import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function PortfolioIndex({ portfolios }) {
    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus portofolio ini?')) {
            router.delete(`/admin/portfolios/${id}`);
        }
    };

    return (
        <AdminLayout>
            <Head title="Kelola Portofolio" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Portofolio</h2>
                    <p className="text-gray-500 text-sm">Kelola dokumentasi kegiatan</p>
                </div>
                <Link href="/admin/portfolios/create" className="px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-[#d94d20] transition-colors">
                    + Tambah Portofolio
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {portfolios.length === 0 ? (
                    <div className="p-12 text-center text-gray-400">
                        <div className="text-5xl mb-3">📸</div>
                        <p className="font-medium">Belum ada portofolio</p>
                        <p className="text-sm">Klik tombol "Tambah Portofolio" untuk memulai.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                        {portfolios.map((portfolio) => (
                            <div key={portfolio.id} className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                                {portfolio.image ? (
                                    <img src={portfolio.image} alt={portfolio.title} className="w-full h-40 object-cover" />
                                ) : (
                                    <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-4xl text-gray-400">📷</div>
                                )}
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-semibold text-gray-800 text-sm">{portfolio.title}</h4>
                                        <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${portfolio.is_published ? 'bg-green-50 text-green-700' : 'bg-gray-200 text-gray-500'}`}>
                                            {portfolio.is_published ? 'Published' : 'Draft'}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 line-clamp-2 mb-3">{portfolio.description}</p>
                                    <div className="flex gap-2">
                                        <Link href={`/admin/portfolios/${portfolio.id}/edit`} className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                            Edit
                                        </Link>
                                        <button onClick={() => handleDelete(portfolio.id)} className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors cursor-pointer">
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
