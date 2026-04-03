export type Orden = {
    id_orden: number;
    tienda: string;
    direccion_entrega: string;
    metodo_pago: string;
    estado: string;
    productos: { nombre: string; cantidad: number; precio: number }[];
};
