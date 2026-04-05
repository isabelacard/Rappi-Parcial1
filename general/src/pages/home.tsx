import logo from "../assets/logo.png";

const CONSUMIDOR_URL = import.meta.env.VITE_CONSUMIDOR_URL ?? "http://localhost:5174";
const TIENDA_URL = import.meta.env.VITE_TIENDA_URL ?? "http://localhost:5176";
const REPARTIDOR_URL = import.meta.env.VITE_REPARTIDOR_URL ?? "http://localhost:5173";

export default function Home() {
    const opciones = [
        {
            titulo: "Consumidor",
            descripcion: "Pide tu comida favorita",
            emoji: "🛒",
            url: CONSUMIDOR_URL,
        },
        {
            titulo: "Tienda",
            descripcion: "Administra tu restaurante",
            emoji: "🏪",
            url: TIENDA_URL,
        },
        {
            titulo: "Repartidor",
            descripcion: "Gestiona tus entregas",
            emoji: "🛵",
            url: REPARTIDOR_URL,
        },
    ];

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
            <div className="absolute w-96 h-96 bg-[#fd6250] rounded-full blur-3xl opacity-10 -top-20 -right-20" />
            <div className="absolute w-80 h-80 bg-orange-300 rounded-full blur-3xl opacity-10 -bottom-20 -left-20" />

            <div className="z-10 text-center mb-12">
                <img src={logo} alt="Logo" className="h-30 object-contain" />
                <p className="text-zinc-400 text-sm mt-2">¿Quién eres hoy?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl z-10">
                {opciones.map((op) => (
                    <a
                        key={op.titulo}
                        href={op.url}
                        target="_blank"
                        rel="noreferrer"
                        className="border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center gap-4 cursor-pointer group"
                    >
                        <div className="text-6xl">{op.emoji}</div>
                        <div className="text-center">
                            <h2 className="text-zinc-800 font-black text-xl group-hover:text-[#fd6250] transition">{op.titulo}</h2>
                            <p className="text-zinc-400 text-sm mt-1">{op.descripcion}</p>
                        </div>
                        <span className="text-[#fd6250] text-sm font-semibold mt-auto">Entrar →</span>
                    </a>
                ))}
            </div>
        </div>
    );
}
