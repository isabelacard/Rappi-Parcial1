import { useNavigate } from "react-router";
import logo from "../assets/logo.png";
import { useState } from "react";

const ordenesIniciales = [
    {
        id: 1,
        tienda: "Burger House",
        emoji: "🍔",
        direccion: "Calle 10 #23-45",
        estado: "en_camino",
        total: 58000,
        fecha: "2025-03-08",
        productos: ["Hamburguesa Clásica x2", "Combo Pizza Personal x1"],
    },
    {
        id: 2,
        tienda: "Pizza Express",
        emoji: "🍕",
        direccion: "Avenida 6 #12-33",
        estado: "entregado",
        total: 20000,
        fecha: "2025-03-07",
        productos: ["Combo Pizza Personal x1"],
    },
];

const fmt = (n: number) => `$${n.toLocaleString("es-CO")}`;

export default function MisOrdenes() {
    const navigate = useNavigate();
    const [ordenes, setOrdenes] = useState(ordenesIniciales);

    const marcarEntregado = (id: number) => {
        setOrdenes((prev) => prev.map((o) => (o.id === id ? { ...o, estado: "entregado" } : o)));
        // aquí llamarás a ordenes.service.ts
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Navbar */}
            <div className="bg-white border-b border-gray-100 shadow-sm px-8 py-4 flex items-center justify-between">
                <button onClick={() => navigate("/ordenes")} className="text-sm text-zinc-500 hover:text-[#fd6250] transition cursor-pointer">
                    ← Volver
                </button>
                <img src={logo} alt="Logo" className="h-8 object-contain" />
                <h1 className="text-lg font-black text-zinc-800">Mis entregas 🛵</h1>
            </div>

            <div className="max-w-xl mx-auto px-6 py-8 flex flex-col gap-4">
                {ordenes.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-5xl mb-4">🛵</p>
                        <p className="text-zinc-400">No tienes órdenes aceptadas</p>
                        <button onClick={() => navigate("/ordenes")} className="mt-4 text-[#fd6250] font-semibold hover:underline cursor-pointer">
                            Ver órdenes disponibles →
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
                                <span
                                    className={`text-xs font-semibold px-3 py-1 rounded-full
                                    ${orden.estado === "en_camino" ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"}`}
                                >
                                    {orden.estado === "en_camino" ? "🛵 En camino" : "✅ Entregado"}
                                </span>
                            </div>

                            {/* Dirección */}
                            <div className="flex items-center gap-2 bg-orange-50 rounded-xl px-4 py-2">
                                <span className="text-sm">📍</span>
                                <p className="text-zinc-600 text-sm">{orden.direccion}</p>
                            </div>

                            {/* Productos */}
                            <div className="border-t border-gray-100 pt-3 flex flex-col gap-1">
                                {orden.productos.map((p, i) => (
                                    <p key={i} className="text-zinc-500 text-sm">
                                        • {p}
                                    </p>
                                ))}
                            </div>

                            {/* Total y botón */}
                            <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                                <span className="text-[#fd6250] font-black text-lg">{fmt(orden.total)}</span>
                                {orden.estado === "en_camino" && (
                                    <button onClick={() => marcarEntregado(orden.id)} className="bg-green-500 hover:bg-green-400 active:scale-95 text-white text-sm font-bold px-4 py-2 rounded-xl transition cursor-pointer">
                                        ✅ Marcar entregado
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
