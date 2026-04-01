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
