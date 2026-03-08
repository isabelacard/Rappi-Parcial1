import { useNavigate, useParams } from "react-router";
import logo from "../assets/logo.png";
import { useState } from "react";

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

export default function DetalleOrden() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [aceptada, setAceptada] = useState(false);

    const orden = ordenes.find((o) => o.id === Number(id));

    if (!orden) return <p className="p-8 text-zinc-400">Orden no encontrada</p>;

    const handleAceptar = () => {
        setAceptada(true);
        // aquí llamarás a ordenes.service.ts
        setTimeout(() => navigate("/mis-ordenes"), 1500);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Navbar */}
            <div className="bg-white border-b border-gray-100 shadow-sm px-8 py-4 flex items-center justify-between">
                <button onClick={() => navigate(-1)} className="text-sm text-zinc-500 hover:text-[#fd6250] transition cursor-pointer">
                    ← Volver
                </button>
                <img src={logo} alt="Logo" className="h-8 object-contain" />
                <h1 className="text-lg font-black text-zinc-800">Detalle orden 📋</h1>
            </div>

            <div className="max-w-md mx-auto px-6 py-8 flex flex-col gap-4">
                {/* Header tienda */}
                <div className="border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center gap-4">
                    <span className="text-5xl">{orden.emoji}</span>
                    <div>
                        <h2 className="text-zinc-800 text-xl font-black">{orden.tienda}</h2>
                        <p className="text-zinc-400 text-xs">{orden.fecha}</p>
                    </div>
                    <span className="ml-auto bg-yellow-100 text-yellow-600 text-xs font-semibold px-3 py-1 rounded-full">⏳ Pendiente</span>
                </div>

                {/* Dirección */}
                <div className="border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-2">
                    <h3 className="text-zinc-800 font-black">📍 Dirección de entrega</h3>
                    <div className="bg-orange-50 rounded-xl px-4 py-3">
                        <p className="text-zinc-600 text-sm">{orden.direccion}</p>
                    </div>
                </div>

                {/* Productos */}
                <div className="border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-2">
                    <h3 className="text-zinc-800 font-black">🧾 Productos</h3>
                    <div className="flex flex-col gap-1">
                        {orden.productos.map((p, i) => (
                            <p key={i} className="text-zinc-500 text-sm">
                                • {p}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Pago */}
                <div className="border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center justify-between">
                    <div>
                        <h3 className="text-zinc-800 font-black">💳 Método de pago</h3>
                        <p className="text-zinc-400 text-sm mt-1">{orden.metodo_pago === "Efectivo" ? "💵 Efectivo" : "💳 Tarjeta"}</p>
                    </div>
                    <span className="text-[#fd6250] font-black text-2xl">{fmt(orden.total)}</span>
                </div>

                {/* Botón aceptar */}
                {aceptada ? (
                    <div className="w-full bg-green-100 text-green-600 font-bold py-4 rounded-2xl text-center">✅ Orden aceptada, redirigiendo...</div>
                ) : (
                    <button onClick={handleAceptar} className="w-full bg-[#fd6250] hover:bg-[#ff7a6a] active:scale-95 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-[#fd6250]/30 cursor-pointer">
                        Aceptar orden →
                    </button>
                )}
            </div>
        </div>
    );
}
