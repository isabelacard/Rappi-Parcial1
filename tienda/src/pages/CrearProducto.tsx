import { useState } from "react";
import { useNavigate } from "react-router";
import logo from "../assets/logo.png";

export default function CrearProducto() {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");

    const handleCrear = () => {
        console.log({ nombre, descripcion, precio });
        navigate("/mi-tienda");
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Navbar */}
            <div className="bg-white border-b border-gray-100 shadow-sm px-8 py-4 flex items-center justify-between">
                <button onClick={() => navigate(-1)} className="text-sm text-zinc-500 hover:text-[#fd6250] transition cursor-pointer">
                    ← Volver
                </button>
                <img src={logo} alt="Logo" className="h-8 object-contain" />
                <h1 className="text-lg font-black text-zinc-800">Nuevo producto 🍽️</h1>
            </div>

            <div className="max-w-md mx-auto px-6 py-8">
                <div className="border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col gap-5">
                    <div>
                        <h2 className="text-zinc-800 text-xl font-black">Crear producto</h2>
                        <p className="text-zinc-400 text-xs mt-1">Agrega un nuevo producto a tu tienda</p>
                    </div>

                    {/* Nombre */}
                    <div className="flex flex-col gap-1">
                        <label className="text-zinc-500 text-xs font-semibold uppercase tracking-widest">Nombre</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="Ej: Hamburguesa Clásica"
                            className="bg-orange-50 border border-gray-200 text-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#fd6250] focus:ring-2 focus:ring-[#fd6250]/20 transition placeholder-zinc-400"
                        />
                    </div>

                    {/* Descripción */}
                    <div className="flex flex-col gap-1">
                        <label className="text-zinc-500 text-xs font-semibold uppercase tracking-widest">Descripción</label>
                        <textarea
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            placeholder="Ej: Carne, queso, lechuga y tomate"
                            rows={3}
                            className="bg-orange-50 border border-gray-200 text-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#fd6250] focus:ring-2 focus:ring-[#fd6250]/20 transition placeholder-zinc-400 resize-none"
                        />
                    </div>

                    {/* Precio */}
                    <div className="flex flex-col gap-1">
                        <label className="text-zinc-500 text-xs font-semibold uppercase tracking-widest">Precio</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-sm font-bold">$</span>
                            <input
                                type="number"
                                value={precio}
                                onChange={(e) => setPrecio(e.target.value)}
                                placeholder="18000"
                                className="bg-orange-50 border border-gray-200 text-zinc-800 rounded-xl pl-8 pr-4 py-3 text-sm focus:outline-none focus:border-[#fd6250] focus:ring-2 focus:ring-[#fd6250]/20 transition placeholder-zinc-400 w-full"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleCrear}
                        disabled={!nombre || !descripcion || !precio}
                        className="w-full bg-[#fd6250] hover:bg-[#ff7a6a] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-[#fd6250]/30 cursor-pointer"
                    >
                        Crear producto →
                    </button>
                </div>
            </div>
        </div>
    );
}
