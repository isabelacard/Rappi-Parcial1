import { useNavigate } from "react-router";
import logo from "../assets/logo.png";

const ordenes = [
    {
        id: 1,
        tienda: "Burger House",
        emoji: "🍔",
        estado: "pendiente",
        total: 58000,
        fecha: "2025-03-08",
        productos: ["Hamburguesa Clásica x2", "Combo Pizza Personal x1"],
    },
    {
        id: 2,
        tienda: "Pizza Express",
        emoji: "🍕",
        estado: "en_camino",
        total: 20000,
        fecha: "2025-03-07",
        productos: ["Combo Pizza Personal x1"],
    },
];

const fmt = (n: number) => `$${n.toLocaleString("es-CO")}`;

const estadoColor: Record<string, string> = {
    pendiente: "bg-yellow-100 text-yellow-600",
    en_camino: "bg-blue-100 text-blue-600",
    entregado: "bg-green-100 text-green-600",
    cancelado: "bg-red-100 text-red-400",
};

const estadoLabel: Record<string, string> = {
    pendiente: "⏳ Pendiente",
    en_camino: "🛵 En camino",
    entregado: "✅ Entregado",
    cancelado: "❌ Cancelado",
};

export default function MisOrdenes() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white">
            {/* Navbar */}
            <div className="bg-white border-b border-gray-100 shadow-sm px-8 py-4 flex items-center justify-between">
                <button onClick={() => navigate("/tiendas")} className="text-sm text-zinc-500 hover:text-[#fd6250] transition cursor-pointer">
                    ← Volver
                </button>
                <img src={logo} alt="Logo" className="h-8 object-contain" />
                <h1 className="text-lg font-black text-zinc-800">Mis órdenes 📦</h1>
            </div>

            <div className="max-w-xl mx-auto px-6 py-8 flex flex-col gap-4">
                {ordenes.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-5xl mb-4">📦</p>
                        <p className="text-zinc-400">No tienes órdenes aún</p>
                        <button onClick={() => navigate("/tiendas")} className="mt-4 text-[#fd6250] font-semibold hover:underline cursor-pointer">
                            Pedir ahora →
                        </button>
                    </div>
                ) : (
                    ordenes.map((orden) => (
                        <div key={orden.id} className="border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-3 hover:shadow-md transition">
                            {/* Header */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">{orden.emoji}</span>
                                    <div>
                                        <h3 className="text-zinc-800 font-black">{orden.tienda}</h3>
                                        <p className="text-zinc-400 text-xs">{orden.fecha}</p>
                                    </div>
                                </div>
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${estadoColor[orden.estado]}`}>{estadoLabel[orden.estado]}</span>
                            </div>

                            {/* Productos */}
                            <div className="border-t border-gray-100 pt-3 flex flex-col gap-1">
                                {orden.productos.map((p, i) => (
                                    <p key={i} className="text-zinc-500 text-sm">
                                        • {p}
                                    </p>
                                ))}
                            </div>

                            {/* Total */}
                            <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                                <span className="text-zinc-400 text-sm">Total</span>
                                <span className="text-[#fd6250] font-black text-lg">{fmt(orden.total)}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
