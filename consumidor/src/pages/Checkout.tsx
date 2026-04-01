import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import logo from "../assets/logo.png";
import { getCarrito } from "../services/carrito.service";
import { createOrden } from "../services/ordenes.service";
import type { ItemCarrito } from "../types";

const fmt = (n: number) => `$${n.toLocaleString("es-CO")}`;

const ID_USUARIO = 1;
const ID_TIENDA = 1;

export default function Checkout() {
    const navigate = useNavigate();
    const [direccion, setDireccion] = useState("");
    const [metodo, setMetodo] = useState<"Tarjeta" | "Efectivo">("Tarjeta");
    const [carrito, setCarrito] = useState<ItemCarrito[]>([]);

    useEffect(() => {
        getCarrito(ID_USUARIO).then((data) => {
            if (data) setCarrito(data);
        });
    }, []);

    const total = carrito.reduce((acc, p) => acc + Number(p.precio) * p.cantidad, 0);

    const handleOrden = async () => {
        const productos = carrito.map((p) => ({
            id_producto: p.id_producto,
            cantidad: p.cantidad,
        }));
        console.log("ENVIANDO:", { ID_USUARIO, ID_TIENDA, direccion, metodo, productos });
        await createOrden(ID_USUARIO, ID_TIENDA, direccion, metodo, productos);
        navigate("/mis-ordenes");
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-white border-b border-gray-100 shadow-sm px-8 py-4 flex items-center justify-between">
                <button onClick={() => navigate(-1)} className="text-sm text-zinc-500 hover:text-[#fd6250] transition cursor-pointer">
                    ← Volver
                </button>
                <img src={logo} alt="Logo" className="h-8 object-contain" />
                <h1 className="text-lg font-black text-zinc-800">Checkout 💳</h1>
            </div>

            <div className="max-w-xl mx-auto px-6 py-8 flex flex-col gap-5">
                <div className="border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-3">
                    <h2 className="text-zinc-800 font-black">📍 Dirección de entrega</h2>
                    <input
                        type="text"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        placeholder="Ej: Calle 10 #23-45"
                        className="bg-orange-50 border border-gray-200 text-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#fd6250] focus:ring-2 focus:ring-[#fd6250]/20 transition placeholder-zinc-400"
                    />
                </div>

                <div className="border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-3">
                    <h2 className="text-zinc-800 font-black">💰 Método de pago</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {(["Tarjeta", "Efectivo"] as const).map((m) => (
                            <button
                                key={m}
                                onClick={() => setMetodo(m)}
                                className={`py-3 rounded-xl font-bold text-sm border transition cursor-pointer
                                    ${metodo === m ? "bg-[#fd6250] text-white border-[#fd6250] shadow-lg shadow-[#fd6250]/30" : "bg-white text-zinc-500 border-gray-200 hover:border-[#fd6250]"}`}
                            >
                                {m === "Tarjeta" ? "💳 Tarjeta" : "💵 Efectivo"}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-2">
                    <h2 className="text-zinc-800 font-black mb-1">🧾 Resumen</h2>
                    {carrito.map((p) => (
                        <div key={p.id_producto} className="flex justify-between text-zinc-400 text-sm">
                            <span>
                                {p.nombre} x{p.cantidad}
                            </span>
                            <span>{fmt(Number(p.precio) * p.cantidad)}</span>
                        </div>
                    ))}
                    <div className="flex justify-between text-zinc-400 text-sm">
                        <span>Domicilio</span>
                        <span className="text-green-500 font-semibold">Gratis</span>
                    </div>
                    <div className="border-t border-gray-100 pt-2 flex justify-between text-zinc-800 font-black text-lg">
                        <span>Total</span>
                        <span className="text-[#fd6250]">{fmt(total)}</span>
                    </div>
                </div>

                <button
                    onClick={handleOrden}
                    disabled={!direccion || carrito.length === 0}
                    className="w-full bg-[#fd6250] hover:bg-[#ff7a6a] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-[#fd6250]/30 cursor-pointer"
                >
                    Confirmar orden →
                </button>
            </div>
        </div>
    );
}
