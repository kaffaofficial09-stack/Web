import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function PortfolioForm({ portfolio }) {
    const isEditing = !!portfolio;

    const { data, setData, post, processing, errors } = useForm({
        _method: isEditing ? 'PUT' : 'POST',
        title: portfolio?.title || '',
        description: portfolio?.description || '',
        image: null,
        is_published: portfolio?.is_published ?? true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            post(`/admin/portfolios/${portfolio.id}`, {
                forceFormData: true,
            });
        } else {
            post('/admin/portfolios', { forceFormData: true });
        }
    };

    return (
        <AdminLayout>
            <Head title={`${isEditing ? 'Edit' : 'Tambah'} Portofolio — Admin KEP`} />

            <div className="mb-6">
                <Link href="/admin/portfolios" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Kembali ke Portofolio
                </Link>
                <h2 className="text-2xl font-bold text-gray-800 mt-3">
                    {isEditing ? 'Edit Portofolio' : 'Tambah Portofolio Baru'}
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 max-w-3xl space-y-5">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Judul Kegiatan *</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="Contoh: Workshop Jakarta, Seminar Nasional..."
                        required
                    />
                    {errors.title && <p className="text-red-500 text-xs mt-1.5">{errors.title}</p>}
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Deskripsi *</label>
                    <textarea
                        rows="4"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="Deskripsi kegiatan..."
                        required
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-xs mt-1.5">{errors.description}</p>}
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Foto Kegiatan</label>
                    {isEditing && portfolio.image && (
                        <img src={portfolio.image} alt="" className="w-32 h-20 object-cover rounded-xl mb-3 border border-gray-100" />
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setData('image', e.target.files[0])}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-accent/5 file:text-accent hover:file:bg-accent/10 file:cursor-pointer"
                    />
                    {errors.image && <p className="text-red-500 text-xs mt-1.5">{errors.image}</p>}
                </div>

                <div className="flex items-center gap-2.5 py-1">
                    <input
                        type="checkbox"
                        id="is_published"
                        checked={data.is_published}
                        onChange={(e) => setData('is_published', e.target.checked)}
                        className="rounded border-gray-300 text-accent focus:ring-accent/30"
                    />
                    <label htmlFor="is_published" className="text-sm text-gray-700 font-medium">Publish langsung</label>
                </div>

                <div className="flex gap-3 pt-3 border-t border-gray-100">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-6 py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accent-hover transition-colors disabled:opacity-50 cursor-pointer text-sm"
                    >
                        {processing ? 'Menyimpan...' : isEditing ? 'Simpan Perubahan' : 'Tambah Portofolio'}
                    </button>
                    <Link href="/admin/portfolios" className="px-6 py-3 bg-gray-100 text-gray-600 font-medium rounded-xl hover:bg-gray-200 transition-colors text-sm">
                        Batal
                    </Link>
                </div>
            </form>
        </AdminLayout>
    );
}
