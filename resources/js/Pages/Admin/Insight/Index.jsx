import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function InsightIndex({ insights }) {
    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus insight ini?')) {
            router.delete(`/admin/insights/${id}`);
        }
    };

    return (
        <AdminLayout>
            <Head title="Kelola Insight" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Insight</h2>
                    <p className="text-gray-500 text-sm">Kelola artikel dan wawasan pendidikan</p>
                </div>
                <Link href="/admin/insights/create" className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-[#15322b] transition-colors">
                    + Tambah Insight
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {insights.length === 0 ? (
                    <div className="p-12 text-center text-gray-400">
                        <div className="text-5xl mb-3">📝</div>
                        <p className="font-medium">Belum ada insight</p>
                        <p className="text-sm">Klik tombol "Tambah Insight" untuk memulai.</p>
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Judul</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Kategori</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Tanggal</th>
                                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {insights.map((insight) => (
                                <tr key={insight.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {insight.image && (
                                                <img src={insight.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                                            )}
                                            <div>
                                                <p className="font-medium text-gray-800 text-sm">{insight.title}</p>
                                                <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{insight.description}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">{insight.category}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${insight.is_published ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                            {insight.is_published ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(insight.created_at).toLocaleDateString('id-ID')}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/insights/${insight.id}/edit`} className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                                Edit
                                            </Link>
                                            <button onClick={() => handleDelete(insight.id)} className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors cursor-pointer">
                                                Hapus
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </AdminLayout>
    );
}
