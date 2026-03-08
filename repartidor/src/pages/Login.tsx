import { useState } from "react";
import logo from "../assets/logo.png";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        console.log({ email, password });
    };

    return (
        <div className="min-h-screen bg-white gap-1 grid grid-cols-2 relative overflow-hidden">
            <div className="absolute w-96 h-96 bg-[#fd6250] rounded-full blur-3xl opacity-20 -top-20 -left-20" />
            <div className="absolute w-80 h-80 bg-orange-300 rounded-full blur-3xl opacity-20 -bottom-20 right-1/2" />

            {/*Logo*/}
            <div className="flex flex-col items-center justify-center ml-70 px-12 z-10">
                <img src={logo} alt="Logo" className="w-48 object-contain mb-6" />
                <p className="text-zinc-500 text-center text-sm leading-relaxed">
                    Los mejores deals en reparto,
                    <br />
                    <span className="text-[#fd6250] font-semibold">solo para ti :D</span>
                </p>
            </div>

            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 w-px h-1/3 bg-[#fd6250] z-10" />

            {/*Form */}
            <div className="flex items-center justify-center mr-40 px-12 z-10">
                <div className=" backdrop-blur-md shadow-2xl border shadow-orange-50 rounded-3xl p-8 flex flex-col gap-4 w-full max-w-sm">
                    <div>
                        <h2 className="text-zinc-800 text-2xl font-black">
                            Bienvenido querido <span className="text-[#fd6250]">repartidor</span> ( •̀ ω •́ )✧
                        </h2>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-zinc-500 text-xs font-semibold uppercase tracking-widest">Correo</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@email.com"
                            className="bg-orange-30 border border-gray-300 text-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#fd6250] focus:ring-2 focus:ring-[#fd6250]/20 transition placeholder-zinc-400"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-zinc-500 text-xs font-semibold uppercase tracking-widest">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="bg-orange-30 border border-gray-300 text-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#fd6250] focus:ring-2 focus:ring-[#fd6250]/20 transition placeholder-zinc-400"
                        />
                    </div>

                    <button onClick={handleLogin} className="w-full bg-[#fd6250] cursor-pointer hover:bg-[#ff7a6a] active:scale-95 text-white font-bold py-3 rounded-xl transition-all mt-1 shadow-lg shadow-[#fd6250]/40">
                        Entrar →
                    </button>
                </div>
            </div>
        </div>
    );
}
