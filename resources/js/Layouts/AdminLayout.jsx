import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminLayout({ children }) {
    const { url, props } = usePage();
    const { auth } = props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navItems = [
        { href: '/admin', label: 'Dashboard', icon: '📊' },
        { href: '/admin/insights', label: 'Insight', icon: '📝' },
        { href: '/admin/portfolios', label: 'Portofolio', icon: '📸' },
    ];

    const isActive = (href) => {
        if (href === '/admin') return url === '/admin';
        return url.startsWith(href);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 w-64 bg-primary text-white z-50 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6 border-b border-white/10">
                    <Link href="/admin" className="flex items-center gap-2">
                        <div className="w-8 h-8 border-2 border-white rounded flex items-center justify-center">
                            <span className="text-sm font-extrabold" style={{ fontFamily: 'Georgia, serif' }}>K</span>
                        </div>
                        <div className="leading-none">
                            <div className="text-sm font-extrabold tracking-wide">KAFFAH</div>
                            <div className="text-[8px] font-bold text-white/60 tracking-wider">ADMIN PANEL</div>
                        </div>
                    </Link>
                </div>

                <nav className="p-4 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                                isActive(item.href)
                                    ? 'bg-white/15 text-white'
                                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                            }`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-white/10">
                    <Link href="/" className="flex items-center gap-2 px-4 py-2 text-white/60 hover:text-white text-sm transition-colors">
                        🌐 Lihat Website
                    </Link>
                    <Link
                        href="/admin/logout"
                        method="post"
                        as="button"
                        className="w-full flex items-center gap-2 px-4 py-2 text-red-300 hover:text-red-100 text-sm transition-colors cursor-pointer"
                    >
                        🚪 Logout
                    </Link>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top bar */}
                <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden text-xl cursor-pointer bg-transparent border-none text-gray-600"
                        >
                            ☰
                        </button>
                        <h1 className="text-lg font-semibold text-gray-700">Admin Panel</h1>
                    </div>
                    {auth?.user && (
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold text-gray-700">{auth.user.name}</p>
                                <p className="text-xs text-gray-500">Administrator</p>
                            </div>
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                                {auth.user.name.charAt(0)}
                            </div>
                        </div>
                    )}
                </header>

                {/* Page content */}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
