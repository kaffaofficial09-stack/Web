import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function InsightForm({ insight }) {
    const isEditing = !!insight;

    const { data, setData, post, put, processing, errors } = useForm({
        title: insight?.title || '',
        category: insight?.category || '',
        description: insight?.description || '',
        content: insight?.content || '',
        image: null,
        is_published: insight?.is_published ?? true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            post(`/admin/insights/${insight.id}`, {
                _method: 'PUT',
                forceFormData: true,
            });
        } else {
            post('/admin/insights', { forceFormData: true });
        }
    };

    return (
        <AdminLayout>
            <Head title={isEditing ? 'Edit Insight' : 'Tambah Insight'} />

            <div className="mb-6">
                <Link href="/admin/insights" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                    ← Kembali ke Insight
                </Link>
                <h2 className="text-2xl font-bold text-gray-800 mt-2">
                    {isEditing ? 'Edit Insight' : 'Tambah Insight Baru'}
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-3xl space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Judul *</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        placeholder="Judul artikel..."
                        required
                    />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Kategori *</label>
                    <input
                        type="text"
                        value={data.category}
                        onChange={(e) => setData('category', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        placeholder="Contoh: LITERASI, NUMERASI, STRATEGI MENGAJAR"
                        required
                    />
                    {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi Singkat *</label>
                    <textarea
                        rows="3"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        placeholder="Ringkasan artikel yang akan tampil di halaman Insight..."
                        required
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Konten (opsional)</label>
                    <textarea
                        rows="8"
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        placeholder="Tulis konten lengkap artikel jika perlu..."
                    ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Gambar</label>
                    {isEditing && insight.image && (
                        <img src={insight.image} alt="" className="w-32 h-20 object-cover rounded-lg mb-2" />
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setData('image', e.target.files[0])}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 file:cursor-pointer"
                    />
                    {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="is_published"
                        checked={data.is_published}
                        onChange={(e) => setData('is_published', e.target.checked)}
                        className="rounded border-gray-300"
                    />
                    <label htmlFor="is_published" className="text-sm text-gray-700">Publish langsung</label>
                </div>

                <div className="flex gap-3 pt-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-[#15322b] transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        {processing ? 'Menyimpan...' : isEditing ? 'Simpan Perubahan' : 'Tambah Insight'}
                    </button>
                    <Link href="/admin/insights" className="px-6 py-3 bg-gray-100 text-gray-600 font-medium rounded-lg hover:bg-gray-200 transition-colors">
                        Batal
                    </Link>
                </div>
            </form>
        </AdminLayout>
    );
}
