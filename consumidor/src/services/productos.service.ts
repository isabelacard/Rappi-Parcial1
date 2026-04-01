const API = "http://localhost:3000";

export const getProductosByTienda = async (id_tienda: number) => {
    const res = await fetch(`${API}/productos/${id_tienda}`);
    const data = await res.json();
    return data.productos;
};
