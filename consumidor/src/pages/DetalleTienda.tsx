import { useNavigate, useParams } from "react-router";

const tiendas = [
    { id: 1, nombre: "Burger House", descripcion: "Hamburguesas artesanales", emoji: "🍔" },
    { id: 2, nombre: "Sushi Cali", descripcion: "Sushi y comida japonesa", emoji: "🍣" },
    { id: 3, nombre: "Pizza Express", descripcion: "Pizzas rápidas y económicas", emoji: "🍕" },
];

const productos = [
    { id: 1, nombre: "Hamburguesa Clásica", descripcion: "Carne queso lechuga tomate", precio: 18000, id_tienda: 1 },
    { id: 2, nombre: "Hamburguesa Doble", descripcion: "Doble carne y doble queso", precio: 22000, id_tienda: 1 },
    { id: 3, nombre: "Sushi Roll California", descripcion: "Rollo con cangrejo y aguacate", precio: 25000, id_tienda: 2 },
    { id: 4, nombre: "Combo Pizza Personal", descripcion: "Pizza personal con gaseosa", precio: 20000, id_tienda: 3 },
    { id: 5, nombre: "Pizza Pepperoni", descripcion: "Pizza mediana pepperoni", precio: 32000, id_tienda: 3 },
];

const fmt = (n: number) => `$${n.toLocaleString("es-CO")}`;

export default function DetalleTienda() {
    const { id } = useParams();
    const navigate = useNavigate();

    const tienda = tiendas.find((t) => t.id === Number(id));
    const productostienda = productos.filter((p) => p.id_tienda === Number(id));

    if (!tienda) return <p className="p-8 text-zinc-400">Tienda no encontrada</p>;

    return (
        <div className="min-h-screen bg-white">
            {/* Navbar */}
            <div className="bg-white border-b border-gray-100 shadow-sm px-8 py-4 flex items-center justify-between">
                <button onClick={() => navigate("/tiendas")} className="text-sm text-zinc-500 hover:text-[#fd6250] transition cursor-pointer">
                    ← Volver
                </button>
                <button onClick={() => navigate("/carrito")} className="text-sm bg-[#fd6250] text-white font-semibold px-4 py-2 rounded-xl hover:bg-[#ff7a6a] transition cursor-pointer">
                    🛒 Ver carrito
                </button>
            </div>

            {/* Header tienda */}
            <div className="px-8 py-8 border-b border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="text-6xl">{tienda.emoji}</div>
                    <div>
                        <h1 className="text-3xl font-black text-zinc-800">{tienda.nombre}</h1>
                        <p className="text-zinc-400 text-sm mt-1">{tienda.descripcion}</p>
                    </div>
                </div>
            </div>

            {/* Productos */}
            <div className="px-8 py-6">
                <h2 className="text-lg font-black text-zinc-800 mb-4">
                    Menú <span className="text-[#fd6250]">({productostienda.length} productos)</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {productostienda.map((producto) => (
                        <div key={producto.id} className="border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col gap-2">
                            <div className="text-4xl">🍽️</div>
                            <h3 className="text-zinc-800 font-bold">{producto.nombre}</h3>
                            <p className="text-zinc-400 text-xs">{producto.descripcion}</p>
                            <div className="flex items-center justify-between mt-auto pt-2">
                                <span className="text-[#fd6250] font-black text-lg">{fmt(producto.precio)}</span>
                                <button className="bg-[#fd6250] hover:bg-[#ff7a6a] active:scale-95 text-white text-sm font-bold px-4 py-2 rounded-xl transition cursor-pointer">+ Agregar</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
