export default function PageHeader({ title, subtitle }) {
    return (
        <section className="bg-primary-dark text-white py-16 px-6 text-center">
            <h1 className="text-white text-3xl md:text-4xl font-bold mb-4">{title}</h1>
            {subtitle && (
                <p className="text-lg max-w-[800px] mx-auto opacity-90">{subtitle}</p>
            )}
        </section>
    );
}
