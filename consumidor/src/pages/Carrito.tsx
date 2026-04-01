import { useNavigate, useLocation } from "react-router";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { getCarrito, eliminarProducto } from "../services/carrito.service";
import type { ItemCarrito } from "../types";

const fmt = (n: number) => `$${n.toLocaleString("es-CO")}`;

const ID_USUARIO = 1;

export default function Carrito() {
    const navigate = useNavigate();
    const location = useLocation();
    const [carrito, setCarrito] = useState<ItemCarrito[]>([]);

    useEffect(() => {
        getCarrito(ID_USUARIO).then((data) => {
            if (data) setCarrito(data);
        });
    }, [location]);

    const handleEliminar = async (id_producto: number) => {
        await eliminarProducto(ID_USUARIO, id_producto);
        setCarrito((prev) => prev.filter((i) => i.id_producto !== id_producto));
    };

    const total = carrito.reduce((acc, p) => acc + Number(p.precio) * p.cantidad, 0);

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-white border-b border-gray-100 shadow-sm px-8 py-4 flex items-center justify-between">
                <button onClick={() => navigate(-1)} className="text-sm text-zinc-500 hover:text-[#fd6250] transition cursor-pointer">
                    ← Volver
                </button>
                <img src={logo} alt="Logo" className="h-8 object-contain" />
                <h1 className="text-lg font-black text-zinc-800">Mi carrito 🛒</h1>
            </div>

            <div className="max-w-xl mx-auto px-6 py-8 flex flex-col gap-4">
                {carrito.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-5xl mb-4">🛒</p>
                        <p className="text-zinc-400">Tu carrito está vacío</p>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col gap-3">
                            {carrito.map((item) => (
                                <div key={item.id_producto} className="border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
                                    <div className="text-4xl">🍽️</div>
                                    <div className="flex-1">
                                        <h3 className="text-zinc-800 font-bold text-sm">{item.nombre}</h3>
                                        <p className="text-[#fd6250] font-black">{fmt(Number(item.precio))}</p>
                                    </div>
                                    <span className="text-zinc-800 font-bold w-4 text-center">{item.cantidad}</span>
                                    <span className="text-zinc-600 font-semibold text-sm w-20 text-right">{fmt(Number(item.precio) * item.cantidad)}</span>
                                    <button onClick={() => handleEliminar(item.id_producto)} className="text-red-400 hover:text-red-600 text-xs cursor-pointer">
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-2 mt-2">
                            <div className="flex justify-between text-zinc-400 text-sm">
                                <span>Subtotal</span>
                                <span>{fmt(total)}</span>
                            </div>
                            <div className="flex justify-between text-zinc-400 text-sm">
                                <span>Domicilio</span>
                                <span className="text-green-500 font-semibold">Gratis</span>
                            </div>
                            <div className="border-t border-gray-100 pt-2 flex justify-between text-zinc-800 font-black text-lg">
                                <span>Total</span>
                                <span className="text-[#fd6250]">{fmt(total)}</span>
                            </div>
                        </div>

                        <button onClick={() => navigate("/checkout")} className="w-full bg-[#fd6250] hover:bg-[#ff7a6a] active:scale-95 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-[#fd6250]/30 cursor-pointer">
                            Ir a pagar →
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
