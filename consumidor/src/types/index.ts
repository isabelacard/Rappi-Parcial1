export type Tienda = {
    id_tienda: number;
    nombre: string;
    descripcion: string;
    estado: string;
    id_admin: number;
};

export type Producto = {
    id_producto: number;
    nombre: string;
    descripcion: string;
    precio: number;
    id_tienda: number;
};

export type ItemCarrito = {
    id_producto: number;
    nombre: string;
    precio: number;
    cantidad: number;
};

export type Orden = {
    id_orden: number;
    tienda: string;
    estado: string;
    direccion_entrega: string;
    metodo_pago: string;
    productos: { nombre: string; cantidad: number; precio: number }[];
};

export type OrdenResponse = {
    error?: string;
    orden?: unknown;
};
