import { Head, useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/login');
    };

    return (
        <>
            <Head title="Admin Login — Kaffah Education Partner" />
            <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-primary-light flex items-center justify-center px-4 relative overflow-hidden">
                {/* Decorative orbs */}
                <div className="absolute top-20 right-[10%] w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-[5%] w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '32px 32px'
                }}></div>

                <div className="w-full max-w-[420px] relative">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <img src="/img/logo_new.png" alt="Kaffah Education Partner" className="h-16 mx-auto mb-6 brightness-0 invert" />
                        <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
                        <p className="text-white/50 text-sm mt-1">Masuk untuk mengelola konten website</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-1.5">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
                                placeholder="admin@kaffa.com"
                                required
                            />
                            {errors.email && <p className="text-red-300 text-xs mt-1.5">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-1.5">Password</label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="rounded border-white/30 bg-white/10 text-accent focus:ring-accent/30"
                            />
                            <label htmlFor="remember" className="text-sm text-white/60">Ingat saya</label>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3.5 bg-accent text-white font-semibold rounded-xl hover:bg-accent-hover hover:shadow-xl hover:shadow-accent/20 transition-all duration-300 disabled:opacity-50 cursor-pointer text-sm"
                        >
                            {processing ? 'Memproses...' : 'Masuk'}
                        </button>
                    </form>

                    <p className="text-center text-white/30 text-xs mt-6">&copy; 2024 Kaffah Education Partner</p>
                </div>
            </div>
        </>
    );
}
