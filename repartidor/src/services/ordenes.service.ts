const API = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export const getOrdenesDisponibles = async () => {
    const res = await fetch(`${API}/ordenes/disponibles`);
    const data = await res.json();
    return data.ordenes;
};

export const getOrdenById = async (id_orden: number) => {
    const res = await fetch(`${API}/ordenes/${id_orden}`);
    const data = await res.json();
    return data.orden;
};

export const aceptarOrden = async (id_orden: number, id_repartidor: number) => {
    const res = await fetch(`${API}/ordenes/${id_orden}/aceptar`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_repartidor }),
    });

    let data: { orden?: unknown; error?: string } = {};
    const raw = await res.text();

    try {
        data = raw ? JSON.parse(raw) : {};
    } catch {
        data = { error: raw || "Respuesta invalida del servidor" };
    }

    if (!res.ok) {
        throw new Error(data.error || `No se pudo aceptar la orden (HTTP ${res.status})`);
    }

    return data.orden;
};

export const getOrdenesByRepartidor = async (id_repartidor: number) => {
    const res = await fetch(`${API}/ordenes/repartidor/${id_repartidor}`);
    const data = await res.json();
    return data.ordenes;
};

export const updateEstado = async (id_orden: number, estado: string) => {
    const res = await fetch(`${API}/ordenes/${id_orden}/estado`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado }),
    });
    const data = await res.json();
    return data.orden;
};
