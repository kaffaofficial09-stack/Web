import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function PortfolioForm({ portfolio }) {
    const isEditing = !!portfolio;

    const { data, setData, post, processing, errors } = useForm({
        title: portfolio?.title || '',
        description: portfolio?.description || '',
        image: null,
        is_published: portfolio?.is_published ?? true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            post(`/admin/portfolios/${portfolio.id}`, {
                _method: 'PUT',
                forceFormData: true,
            });
        } else {
            post('/admin/portfolios', { forceFormData: true });
        }
    };

    return (
        <AdminLayout>
            <Head title={isEditing ? 'Edit Portofolio' : 'Tambah Portofolio'} />

            <div className="mb-6">
                <Link href="/admin/portfolios" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                    ← Kembali ke Portofolio
                </Link>
                <h2 className="text-2xl font-bold text-gray-800 mt-2">
                    {isEditing ? 'Edit Portofolio' : 'Tambah Portofolio Baru'}
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-3xl space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Judul Kegiatan *</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        placeholder="Contoh: Workshop Jakarta, Seminar Nasional..."
                        required
                    />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi *</label>
                    <textarea
                        rows="4"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        placeholder="Deskripsi kegiatan..."
                        required
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Foto Kegiatan</label>
                    {isEditing && portfolio.image && (
                        <img src={portfolio.image} alt="" className="w-32 h-20 object-cover rounded-lg mb-2" />
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setData('image', e.target.files[0])}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-accent/10 file:text-accent hover:file:bg-accent/20 file:cursor-pointer"
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
                        className="px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-[#d94d20] transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        {processing ? 'Menyimpan...' : isEditing ? 'Simpan Perubahan' : 'Tambah Portofolio'}
                    </button>
                    <Link href="/admin/portfolios" className="px-6 py-3 bg-gray-100 text-gray-600 font-medium rounded-lg hover:bg-gray-200 transition-colors">
                        Batal
                    </Link>
                </div>
            </form>
        </AdminLayout>
    );
}
