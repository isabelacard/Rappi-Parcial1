const API = "http://localhost:3000";

export const getTiendas = async () => {
    const res = await fetch(`${API}/tiendas`);
    const data = await res.json();
    return data.tiendas;
};

export const getTiendaById = async (id: number) => {
    const res = await fetch(`${API}/tiendas/${id}`);
    const data = await res.json();
    return data.tienda;
};

export const updateEstado = async (id: number, estado: string) => {
    const res = await fetch(`${API}/tiendas/${id}/estado`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado }),
    });
    const data = await res.json();
    return data.tienda;
};
