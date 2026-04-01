import { useNavigate } from "react-router";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { getTiendas } from "../services/tiendas.service";
import type { Tienda } from "../types";

export default function Tiendas() {
    const navigate = useNavigate();
    const [tiendas, setTiendas] = useState<Tienda[]>([]);

    useEffect(() => {
        getTiendas().then((data) => {
            if (data) setTiendas(data);
        });
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-white border-b border-gray-100 shadow-sm px-8 py-8 flex items-center justify-between">
                <img src={logo} alt="Logo" className="h-8 object-contain" />
                <h1 className="text-2xl font-black text-zinc-800">
                    ¿Qué quieres <span className="text-[#fd6250]">hoy?</span> ヾ(•ω•`)o
                </h1>
                <button onClick={() => navigate("/mis-ordenes")} className="text-sm text-[#fd6250] font-semibold hover:underline cursor-pointer">
                    Mis órdenes
                </button>
            </div>

            <div className="px-8 py-6">
                <p className="text-zinc-400 text-sm mb-6">{tiendas.filter((t) => t.estado === "abierta").length} tiendas disponibles</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tiendas.map((tienda) => (
                        <div
                            key={tienda.id_tienda}
                            onClick={() => tienda.estado === "abierta" && navigate(`/tiendas/${tienda.id_tienda}`)}
                            className={`rounded-2xl border p-6 flex flex-col gap-3 transition-all
                            ${tienda.estado === "abierta" ? "border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 cursor-pointer" : "border-gray-100 opacity-50 cursor-not-allowed"}`}
                        >
                            <div className="text-5xl">🏪</div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h2 className="text-zinc-800 font-black text-lg">{tienda.nombre}</h2>
                                    <span
                                        className={`text-xs font-semibold px-2 py-0.5 rounded-full
                                        ${tienda.estado === "abierta" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-400"}`}
                                    >
                                        {tienda.estado}
                                    </span>
                                </div>
                                <p className="text-zinc-400 text-sm mt-1">{tienda.descripcion}</p>
                            </div>

                            {tienda.estado === "abierta" && <span className="text-[#fd6250] text-sm font-semibold mt-auto">Ver menú →</span>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
