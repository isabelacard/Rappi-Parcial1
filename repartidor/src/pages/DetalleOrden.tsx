import { useNavigate, useParams } from "react-router";
import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import { getOrdenById, aceptarOrden } from "../services/ordenes.service";
import type { Orden } from "../types";

const fmt = (n: number) => `$${n.toLocaleString("es-CO")}`;

const ID_REPARTIDOR = 1;

export default function DetalleOrden() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [orden, setOrden] = useState<Orden | null>(null);
    const [aceptada, setAceptada] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        getOrdenById(Number(id)).then((data) => {
            if (data) setOrden(data);
        });
    }, [id]);

    if (!orden) return <p className="p-8 text-zinc-400">Cargando...</p>;

    const total = orden.productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

    const handleAceptar = async () => {
        if (loading) return;

        try {
            setLoading(true);
            setError("");
            await aceptarOrden(Number(id), ID_REPARTIDOR);
            setAceptada(true);
            setTimeout(() => navigate("/mis-ordenes"), 1500);
        } catch (e) {
            setError(e instanceof Error ? e.message : "No se pudo aceptar la orden");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-white border-b border-gray-100 shadow-sm px-8 py-8 flex items-center justify-between">
                <button onClick={() => navigate(-1)} className="text-sm text-zinc-500 hover:text-[#fd6250] transition cursor-pointer">
                    ← Volver
                </button>
                <img src={logo} alt="Logo" className="h-8 object-contain" />
                <h1 className="text-lg font-black text-zinc-800">Detalle orden 📋</h1>
            </div>

            <div className="max-w-md mx-auto px-6 py-8 flex flex-col gap-4">
                <div className="border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center gap-4">
                    <span className="text-5xl">🏪</span>
                    <div>
                        <h2 className="text-zinc-800 text-xl font-black">{orden.tienda}</h2>
                    </div>
                    <span className="ml-auto bg-yellow-100 text-yellow-600 text-xs font-semibold px-3 py-1 rounded-full">⏳ Pendiente</span>
                </div>

                <div className="border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-2">
                    <h3 className="text-zinc-800 font-black">📍 Dirección de entrega</h3>
                    <div className="bg-orange-50 rounded-xl px-4 py-3">
                        <p className="text-zinc-600 text-sm">{orden.direccion_entrega}</p>
                    </div>
                </div>

                <div className="border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-2">
                    <h3 className="text-zinc-800 font-black">🧾 Productos</h3>
                    <div className="flex flex-col gap-1">
                        {orden.productos.map((p, i) => (
                            <div key={i} className="flex justify-between text-zinc-500 text-sm">
                                <span>
                                    • {p.nombre} x{p.cantidad}
                                </span>
                                <span>{fmt(p.precio * p.cantidad)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center justify-between">
                    <div>
                        <h3 className="text-zinc-800 font-black">💳 Método de pago</h3>
                        <p className="text-zinc-400 text-sm mt-1">{orden.metodo_pago === "Efectivo" ? "💵 Efectivo" : "💳 Tarjeta"}</p>
                    </div>
                    <span className="text-[#fd6250] font-black text-2xl">{fmt(total)}</span>
                </div>

                {aceptada ? (
                    <div className="w-full bg-green-100 text-green-600 font-bold py-4 rounded-2xl text-center">✅ Orden aceptada, redirigiendo...</div>
                ) : (
                    <button
                        onClick={handleAceptar}
                        disabled={loading}
                        className="w-full bg-[#fd6250] hover:bg-[#ff7a6a] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-[#fd6250]/30 cursor-pointer"
                    >
                        {loading ? "Aceptando..." : "Aceptar orden →"}
                    </button>
                )}

                {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
            </div>
        </div>
    );
}
