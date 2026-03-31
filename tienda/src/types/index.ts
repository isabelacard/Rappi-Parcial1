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
