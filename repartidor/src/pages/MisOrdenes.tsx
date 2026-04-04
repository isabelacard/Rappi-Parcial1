import { useNavigate, useLocation } from "react-router";
import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import { getOrdenesByRepartidor, updateEstado } from "../services/ordenes.service";
import type { Orden } from "../types";

const fmt = (n: number) => `$${n.toLocaleString("es-CO")}`;

const ID_REPARTIDOR = 1;

export default function MisOrdenes() {
    const navigate = useNavigate();
    const location = useLocation();
    const [ordenes, setOrdenes] = useState<Orden[]>([]);

    useEffect(() => {
        getOrdenesByRepartidor(ID_REPARTIDOR).then((data) => {
            if (data) setOrdenes(data);
        });
    }, [location]);

    const marcarEntregado = async (id_orden: number) => {
        await updateEstado(id_orden, "entregado");
        setOrdenes((prev) => prev.map((o) => (o.id_orden === id_orden ? { ...o, estado: "entregado" } : o)));
    };

    const total = (orden: Orden) => orden.productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-white border-b border-gray-100 shadow-sm px-8 py-8 flex items-center justify-between">
                <button onClick={() => navigate("/ordenes")} className="text-sm text-zinc-500 hover:text-[#fd6250] transition cursor-pointer">
                    ← Volver
                </button>
                <img src={logo} alt="Logo" className="h-8 object-contain" />
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
                        <div key={orden.id_orden} className="border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-3 hover:shadow-md transition">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">🏪</span>
                                    <h3 className="text-zinc-800 font-black">{orden.tienda}</h3>
                                </div>
                                <span
                                    className={`text-xs font-semibold px-3 py-1 rounded-full
                                    ${orden.estado === "en_camino" ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"}`}
                                >
                                    {orden.estado === "en_camino" ? "🛵 En camino" : "✅ Entregado"}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 bg-orange-50 rounded-xl px-4 py-2">
                                <span className="text-sm">📍</span>
                                <p className="text-zinc-600 text-sm">{orden.direccion_entrega}</p>
                            </div>

                            <div className="border-t border-gray-100 pt-3 flex flex-col gap-1">
                                {orden.productos.map((p, i) => (
                                    <div key={i} className="flex justify-between text-zinc-500 text-sm">
                                        <span>
                                            • {p.nombre} x{p.cantidad}
                                        </span>
                                        <span>{fmt(p.precio * p.cantidad)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                                <span className="text-[#fd6250] font-black text-lg">{fmt(total(orden))}</span>
                                {orden.estado === "en_camino" && (
                                    <button onClick={() => marcarEntregado(orden.id_orden)} className="bg-green-500 hover:bg-green-400 active:scale-95 text-white text-sm font-bold px-4 py-2 rounded-xl transition cursor-pointer">
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
