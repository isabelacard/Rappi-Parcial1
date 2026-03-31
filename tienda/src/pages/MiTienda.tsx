import { useLocation, useNavigate } from "react-router";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { getTiendaById, updateEstado } from "../services/tiendas.service";
import { getProductosByTienda } from "../services/productos.service";
import type { Tienda, Producto } from "../types";

const fmt = (n: number) => `$${n.toLocaleString("es-CO")}`;

const ID_TIENDA = 1;

export default function MiTienda() {
    const navigate = useNavigate();
    const [tienda, setTienda] = useState<Tienda | null>(null);
    const [productos, setProductos] = useState<Producto[]>([]);
    const [estado, setEstado] = useState("");
    const location = useLocation();

    useEffect(() => {
        getTiendaById(ID_TIENDA).then((data) => {
            if (data) {
                setTienda(data);
                setEstado(data.estado);
            }
        });
        getProductosByTienda(ID_TIENDA).then((data) => {
            if (data) setProductos(data);
        });
    }, [location]);

    const toggleEstado = async () => {
        const nuevoEstado = estado === "abierta" ? "cerrada" : "abierta";
        await updateEstado(ID_TIENDA, nuevoEstado);
        setEstado(nuevoEstado);
    };

    if (!tienda) return <p className="p-8 text-zinc-400">Cargando...</p>;

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-white border-b border-gray-100 shadow-sm px-8 py-4 flex items-center justify-between">
                <img src={logo} alt="Logo" className="h-8 object-contain" />
                <h1 className="text-lg font-black text-zinc-800">Mi Tienda 🏪</h1>
                <button onClick={() => navigate("/crear-producto")} className="text-sm bg-[#fd6250] text-white font-semibold px-4 py-2 rounded-xl hover:bg-[#ff7a6a] transition cursor-pointer">
                    + Producto
                </button>
            </div>

            <div className="max-w-2xl mx-auto px-6 py-8 flex flex-col gap-6">
                <div className="border border-gray-100 rounded-2xl p-6 shadow-sm flex items-center gap-5">
                    <div className="text-6xl">🏪</div>
                    <div className="flex-1">
                        <h2 className="text-zinc-800 text-2xl font-black">{tienda.nombre}</h2>
                        <p className="text-zinc-400 text-sm mt-1">{tienda.descripcion}</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${estado === "abierta" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-400"}`}>{estado === "abierta" ? "✅ Abierta" : "🔴 Cerrada"}</span>
                        <button onClick={toggleEstado} className={`relative w-14 h-7 rounded-full transition-all cursor-pointer ${estado === "abierta" ? "bg-[#fd6250]" : "bg-gray-300"}`}>
                            <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all ${estado === "abierta" ? "left-8" : "left-1"}`} />
                        </button>
                        <span className="text-xs text-zinc-400">{estado === "abierta" ? "Cerrar tienda" : "Abrir tienda"}</span>
                    </div>
                </div>

                <div>
                    <h2 className="text-zinc-800 font-black text-lg mb-4">
                        Mis productos <span className="text-[#fd6250]">({productos.length})</span>
                    </h2>
                    <div className="flex flex-col gap-3">
                        {productos.map((p) => (
                            <div key={p.id_producto} className="border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center gap-4 hover:shadow-md transition">
                                <div className="text-3xl">🍽️</div>
                                <div className="flex-1">
                                    <h3 className="text-zinc-800 font-bold">{p.nombre}</h3>
                                    <p className="text-zinc-400 text-xs">{p.descripcion}</p>
                                </div>
                                <span className="text-[#fd6250] font-black">{fmt(p.precio)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
