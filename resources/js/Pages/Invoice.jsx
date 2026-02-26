import { Head } from '@inertiajs/react';

export default function Invoice({ order }) {
    const formatPrice = (num) => 'Rp ' + Number(num).toLocaleString('id-ID');
    const formatDate = (str) => new Date(str).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });

    // Calculate totals
    const subtotal = Number(order.subtotal);
    const discountPercent = Number(order.discount_percent || 0);
    const discountAmount = Math.round(subtotal * (discountPercent / 100));
    const shippingCost = Number(order.shipping_cost || 0);
    const total = subtotal - discountAmount + shippingCost;

    return (
        <div className="min-h-screen bg-gray-100 p-8 font-sans">
            <Head title={`Invoice ${order.invoice_number}`} />

            {/* Print Styles */}
            <style>{`
                @media print {
                    @page { size: auto; margin: 0mm; }
                    body { background: white; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    .no-print { display: none !important; }
                    .invoice-container { box-shadow: none !important; max-width: 100% !important; margin: 0 !important; }
                }
            `}</style>

            <div className="max-w-[850px] mx-auto bg-white shadow-lg invoice-container relative">
                {/* Header Banner */}
                <div className="bg-[#1A3C34] px-10 py-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img src="/img/logo_new.png" alt="KEP" className="h-16 brightness-0 invert" />
                        <div className="text-white">
                            <h1 className="text-lg font-bold leading-tight tracking-wide">KAFFAH EDUCATION</h1>
                            <p className="text-xs text-white/60 tracking-widest">PARTNER</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-[#F05A28] font-extrabold text-4xl tracking-[6px]">INVOICE</div>
                        <p className="text-white/50 text-xs mt-1 tracking-wider">FORM PEMESANAN BUKU</p>
                    </div>
                </div>

                {/* Invoice Meta Bar */}
                <div className="bg-[#F05A28] px-10 py-2 flex justify-between text-white text-xs font-bold tracking-wider">
                    <span>NO: {order.invoice_number}</span>
                    <span>TANGGAL: {formatDate(order.created_at)}</span>
                </div>

                {/* Content */}
                <div className="p-12 pt-8">
                    {/* Customer & Payment Info Grid */}
                    <div className="flex justify-between items-start mb-6 gap-8">
                        {/* Left: Customer Info */}
                        <div className="flex-1">
                            <h3 className="font-bold text-xs uppercase mb-1">INVOICE TO:</h3>
                            <div className="text-sm text-gray-800 leading-snug mb-4">
                                <p className="font-bold">{order.customer_name}</p>
                                <p>{order.institution}</p>
                                <p className="whitespace-pre-line">{order.address}</p>
                            </div>

                            <div className="text-xs font-bold leading-snug space-y-0.5">
                                <div className="flex"><span className="w-20">NO WA</span><span>: {order.phone}</span></div>
                                {order.email && <div className="flex"><span className="w-20">EMAIL</span><span>: {order.email}</span></div>}
                            </div>
                        </div>

                        {/* Right: Payment Info */}
                        <div className="w-[350px]">
                            <div className="border border-black p-2 text-sm">
                                <h3 className="font-bold mb-1 text-xs">INFO PEMBAYARAN:</h3>
                                <div className="grid grid-cols-[60px_1fr] gap-x-1 text-xs font-medium">
                                    <span>NO. REK</span>
                                    <span>: 6313-0102-5486-539</span>
                                    <span>NAMA</span>
                                    <span>: MOH SHORIH ALKHOLID</span>
                                    <span>BANK</span>
                                    <span>: BRI</span>
                                </div>
                            </div>
                            <p className="text-xs mt-1 font-medium">Konfirmasi : 0856-4625-2020</p>
                        </div>
                    </div>

                    {/* Items Table */}
                    <table className="w-full border-collapse border border-black mb-4 text-sm">
                        <thead>
                            <tr className="bg-[#1A3C34] text-white text-center text-xs font-bold">
                                <th className="border border-black py-2 px-1 w-10">NO</th>
                                <th className="border border-black py-2 px-3 text-left">NAMA PRODUK</th>
                                <th className="border border-black py-2 px-2">HARGA @</th>
                                <th className="border border-black py-2 px-2 w-16">JUMLAH</th>
                                <th className="border border-black py-2 px-2 w-32">TOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map((item, index) => (
                                <tr key={index} className="text-center">
                                    <td className="border border-black py-1 px-1">{index + 1}</td>
                                    <td className="border border-black py-1 px-3 text-left font-medium">{item.product_name}</td>
                                    <td className="border border-black py-1 px-2">{Number(item.price).toLocaleString('id-ID')}</td>
                                    <td className="border border-black py-1 px-2">{item.quantity}</td>
                                    <td className="border border-black py-1 px-2">
                                        {formatPrice(item.price * item.quantity)}
                                    </td>
                                </tr>
                            ))}
                            {/* Empty rows to fill space */}
                            {[...Array(Math.max(0, 8 - order.items.length))].map((_, i) => (
                                <tr key={`empty-${i}`} className="text-center h-8">
                                    <td className="border border-black py-1 px-1"></td>
                                    <td className="border border-black py-1 px-3"></td>
                                    <td className="border border-black py-1 px-2"></td>
                                    <td className="border border-black py-1 px-2"></td>
                                    <td className="border border-black py-1 px-2"></td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="font-bold">
                            {/* Subtotal */}
                            <tr>
                                <td colSpan="4" className="text-right border-none pt-2 pr-4 text-xs">Subtotal</td>
                                <td className="border border-black py-1 px-2 text-center">{formatPrice(subtotal)}</td>
                            </tr>
                            {/* Discount */}
                            {discountPercent > 0 && (
                                <tr>
                                    <td colSpan="4" className="text-right border-none pt-1 pr-4 text-xs">Diskon {discountPercent}%</td>
                                    <td className="border border-black bg-[#00FF00] py-1 px-2 text-center text-black">
                                        {formatPrice(discountAmount)}
                                    </td>
                                </tr>
                            )}
                            {/* Shipping */}
                            <tr>
                                <td colSpan="4" className="text-right border-none pt-1 pr-4 text-xs">Biaya Pengiriman</td>
                                <td className="border border-black py-1 px-2 text-center">
                                    {formatPrice(shippingCost)}
                                </td>
                            </tr>
                            {/* Grand Total */}
                            <tr>
                                <td colSpan="4" className="text-right border-none pt-2 pr-4 text-base">TOTAL</td>
                                <td className="border border-black bg-[#FFFF00] py-2 px-2 text-center text-black text-lg">
                                    {formatPrice(total)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>

                    {/* Signatures */}
                    <div className="flex justify-between px-16 mt-12 text-xs font-bold text-center">
                        <div>
                            <p className="mb-20">Admin</p>
                            <p className="uppercase border-b border-black inline-block min-w-[150px]">Mohammad Adib Amrullah</p>
                        </div>
                        <div>
                            <p className="mb-20">Bag. Keuangan</p>
                            <p className="uppercase border-b border-black inline-block min-w-[150px]">M. SHORIH ALKHOLID</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Action Buttons (No Print) */}
            <div className="fixed bottom-8 right-8 flex gap-3 no-print">
                <button
                    onClick={() => window.print()}
                    className="bg-gray-800 text-white p-3 rounded-full hover:bg-black shadow-lg transition-transform hover:scale-110 cursor-pointer"
                    title="Cetak Invoice"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 6 2 18 2 18 9"></polyline>
                        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                        <rect x="6" y="14" width="12" height="8"></rect>
                    </svg>
                </button>
                <a
                    href={`https://wa.me/6281220745064`}
                    target="_blank"
                    className="bg-[#25D366] text-white p-3 rounded-full hover:bg-[#1da851] shadow-lg transition-transform hover:scale-110 cursor-pointer"
                    title="Hubungi via WhatsApp"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                </a>
            </div>
        </div>
    );
}
