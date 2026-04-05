import { useNavigate, useLocation } from "react-router";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { getOrdenesDisponibles } from "../services/ordenes.service";
import type { Orden } from "../types";

const fmt = (n: number) => `$${n.toLocaleString("es-CO")}`;

export default function Ordenes() {
    const navigate = useNavigate();
    const location = useLocation();
    const [ordenes, setOrdenes] = useState<Orden[]>([]);

    useEffect(() => {
        getOrdenesDisponibles().then((data) => {
            if (data) setOrdenes(data);
        });
    }, [location]);

    const total = (orden: Orden) => orden.productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-white border-b border-gray-100 shadow-sm px-8 py-8 flex items-center justify-between">
                <img src={logo} alt="Logo" className="h-8 object-contain" />
                <h1 className="text-2xl pl-50 font-black text-zinc-800">
                    Elige la orden <span className="text-[#fd6250]">de hoy</span> ヾ(•ω•`)o
                </h1>
                <div className="flex items-center gap-10">
                    <button onClick={() => navigate("/mis-ordenes")} className="text-sm text-[#fd6250] font-semibold hover:underline cursor-pointer">
                        Mis órdenes
                    </button>
                    <button onClick={() => (window.location.href = "https://rappi-general.onrender.com")} className="bg-[#fd6250] hover:bg-[#ff7a6a] active:scale-95 text-white font-bold px-4 py-2 rounded-xl transition-all cursor-pointer">
                        Cerrar sesión
                    </button>
                </div>
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
                        <div
                            key={orden.id_orden}
                            onClick={() => navigate(`/ordenes/${orden.id_orden}`)}
                            className="border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-3 hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">🏪</span>
                                    <div>
                                        <h3 className="text-zinc-800 font-black">{orden.tienda}</h3>
                                    </div>
                                </div>
                                <span className="bg-yellow-100 text-yellow-600 text-xs font-semibold px-3 py-1 rounded-full">⏳ Pendiente</span>
                            </div>

                            <div className="flex items-center gap-2 bg-orange-50 rounded-xl px-4 py-2">
                                <span className="text-sm">📍</span>
                                <p className="text-zinc-600 text-sm">{orden.direccion_entrega}</p>
                            </div>

                            <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                                <span className="text-zinc-400 text-sm">{orden.metodo_pago === "Efectivo" ? "💵 Efectivo" : "💳 Tarjeta"}</span>
                                <span className="text-[#fd6250] font-black text-lg">{fmt(total(orden))}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
