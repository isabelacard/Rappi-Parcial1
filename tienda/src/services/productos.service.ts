const API = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export const getProductosByTienda = async (id_tienda: number) => {
    const res = await fetch(`${API}/productos/${id_tienda}`);
    const data = await res.json();
    return data.productos;
};

export const createProducto = async (nombre: string, descripcion: string, precio: number, id_tienda: number) => {
    const res = await fetch(`${API}/productos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, descripcion, precio, id_tienda }),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data?.error || "No se pudo crear el producto");
    }

    return data.producto;
};
