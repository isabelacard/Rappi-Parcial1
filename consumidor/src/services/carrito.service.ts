const API = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export const getCarrito = async (id_usuario: number) => {
    const res = await fetch(`${API}/carrito/${id_usuario}`);
    const data = await res.json();
    return data.carrito;
};

export const agregarProducto = async (id_usuario: number, id_producto: number, cantidad: number) => {
    const res = await fetch(`${API}/carrito/${id_usuario}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_producto, cantidad }),
    });
    const data = await res.json();
    return data.item;
};

export const eliminarProducto = async (id_usuario: number, id_producto: number) => {
    const res = await fetch(`${API}/carrito/${id_usuario}/${id_producto}`, {
        method: "DELETE",
    });
    const data = await res.json();
    return data.item;
};
