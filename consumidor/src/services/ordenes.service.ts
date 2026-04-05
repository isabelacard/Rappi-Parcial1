const API = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export const getOrdenesByUsuario = async (id_usuario: number) => {
    const res = await fetch(`${API}/ordenes/usuario/${id_usuario}`);
    const data = await res.json();
    return data.ordenes;
};

export const createOrden = async (id_usuario: number, id_tienda: number, direccion_entrega: string, metodo_pago: string, productos: { id_producto: number; cantidad: number }[]) => {
    const res = await fetch(`${API}/ordenes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_usuario, id_tienda, direccion_entrega, metodo_pago, productos }),
    });
    const data = await res.json();
    return data.orden;
};
