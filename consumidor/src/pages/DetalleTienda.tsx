import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { getTiendaById } from "../services/tiendas.service";
import { getProductosByTienda } from "../services/productos.service";
import { agregarProducto } from "../services/carrito.service";
import type { Tienda, Producto } from "../types/index.ts";

const fmt = (n: number) => `$${n.toLocaleString("es-CO")}`;

const ID_USUARIO = 1;

export default function DetalleTienda() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tienda, setTienda] = useState<Tienda | null>(null);
    const [productos, setProductos] = useState<Producto[]>([]);

    useEffect(() => {
        getTiendaById(Number(id)).then((data) => {
            if (data) setTienda(data);
        });
        getProductosByTienda(Number(id)).then((data) => {
            if (data) setProductos(data);
        });
    }, [id]);

    const handleAgregar = async (id_producto: number) => {
        await agregarProducto(ID_USUARIO, id_producto, 1);
        alert("Producto agregado al carrito ✅");
    };

    if (!tienda) return <p className="p-8 text-zinc-400">Cargando...</p>;

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-white border-b border-gray-100 shadow-sm px-8 py-8 flex items-center justify-between">
                <button onClick={() => navigate("/tiendas")} className="text-sm text-zinc-500 hover:text-[#fd6250] transition cursor-pointer">
                    ← Volver
                </button>
                <button onClick={() => navigate("/carrito")} className="text-sm bg-[#fd6250] text-white font-semibold px-4 py-2 rounded-xl hover:bg-[#ff7a6a] transition cursor-pointer">
                    🛒 Ver carrito
                </button>
            </div>

            <div className="px-8 py-8 border-b border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="text-6xl">🏪</div>
                    <div>
                        <h1 className="text-3xl font-black text-zinc-800">{tienda.nombre}</h1>
                        <p className="text-zinc-400 text-sm mt-1">{tienda.descripcion}</p>
                    </div>
                </div>
            </div>

            <div className="px-8 py-6">
                <h2 className="text-lg font-black text-zinc-800 mb-4">
                    Menú <span className="text-[#fd6250]">({productos.length} productos)</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {productos.map((producto) => (
                        <div key={producto.id_producto} className="border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col gap-2">
                            <div className="text-4xl">🍽️</div>
                            <h3 className="text-zinc-800 font-bold">{producto.nombre}</h3>
                            <p className="text-zinc-400 text-xs">{producto.descripcion}</p>
                            <div className="flex items-center justify-between mt-auto pt-2">
                                <span className="text-[#fd6250] font-black text-lg">{fmt(producto.precio)}</span>
                                <button onClick={() => handleAgregar(producto.id_producto)} className="bg-[#fd6250] hover:bg-[#ff7a6a] active:scale-95 text-white text-sm font-bold px-4 py-2 rounded-xl transition cursor-pointer">
                                    + Agregar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
