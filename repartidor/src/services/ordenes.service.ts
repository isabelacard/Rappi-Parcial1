const API = "http://localhost:3000";

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
    const data = await res.json();
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
