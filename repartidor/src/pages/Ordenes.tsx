import { useNavigate } from "react-router";
import logo from "../assets/logo.png";

const ordenes = [
    {
        id: 1,
        tienda: "Burger House",
        emoji: "🍔",
        direccion: "Calle 10 #23-45",
        metodo_pago: "Tarjeta",
        total: 58000,
        fecha: "2025-03-08",
        productos: ["Hamburguesa Clásica x2", "Combo Pizza Personal x1"],
    },
    {
        id: 2,
        tienda: "Pizza Express",
        emoji: "🍕",
        direccion: "Avenida 6 #12-33",
        metodo_pago: "Efectivo",
        total: 20000,
        fecha: "2025-03-07",
        productos: ["Combo Pizza Personal x1"],
    },
];

const fmt = (n: number) => `$${n.toLocaleString("es-CO")}`;

export default function Ordenes() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white">
            {/* Navbar */}
            <div className="bg-white border-b border-gray-100 shadow-sm px-8 py-4 flex items-center justify-between">
                <img src={logo} alt="Logo" className="h-8 object-contain" />
                <h1 className="text-lg font-black text-zinc-800">Órdenes disponibles 📦</h1>
                <button onClick={() => navigate("/mis-ordenes")} className="text-sm text-[#fd6250] font-semibold hover:underline cursor-pointer">
                    Mis entregas
                </button>
            </div>

            <div className="max-w-xl mx-auto px-6 py-8 flex flex-col gap-4">
                <p className="text-zinc-400 text-sm">{ordenes.length} órdenes esperando repartidor</p>

                {ordenes.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-5xl mb-4">📦</p>
                        <p className="text-zinc-400">No hay órdenes disponibles</p>
                    </div>
                ) : (
                    ordenes.map((orden) => (
                        <div key={orden.id} onClick={() => navigate(`/ordenes/${orden.id}`)} className="border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-3 hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer">
                            {/* Header */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">{orden.emoji}</span>
                                    <div>
                                        <h3 className="text-zinc-800 font-black">{orden.tienda}</h3>
                                        <p className="text-zinc-400 text-xs">{orden.fecha}</p>
                                    </div>
                                </div>
                                <span className="bg-yellow-100 text-yellow-600 text-xs font-semibold px-3 py-1 rounded-full">⏳ Pendiente</span>
                            </div>

                            {/* Dirección */}
                            <div className="flex items-center gap-2 bg-orange-50 rounded-xl px-4 py-2">
                                <span className="text-sm">📍</span>
                                <p className="text-zinc-600 text-sm">{orden.direccion}</p>
                            </div>

                            {/* Método pago y total */}
                            <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                                <span className="text-zinc-400 text-sm">{orden.metodo_pago === "Efectivo" ? "💵 Efectivo" : "💳 Tarjeta"}</span>
                                <span className="text-[#fd6250] font-black text-lg">{fmt(orden.total)}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
