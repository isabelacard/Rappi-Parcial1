import { pool } from "../../db.js";

export class CarritoRepository {
    getCarrito = async (id_usuario) => {
        const result = await pool.query(
            `SELECT cp.id_producto, p.nombre, p.precio, SUM(cp.cantidad)::int AS cantidad
                FROM carrito c
                JOIN carrito_products cp ON c.id_carrito = cp.id_carrito
                JOIN productos p ON cp.id_producto = p.id_producto
                WHERE c.id_usuario = $1
                GROUP BY cp.id_producto, p.nombre, p.precio
                ORDER BY p.nombre`,
            [id_usuario]
        );
        return result.rows;
    };

    agregarProducto = async (id_usuario, id_producto, cantidad) => {
        const carrito = await pool.query("SELECT id_carrito FROM carrito WHERE id_usuario = $1", [id_usuario]);
        const id_carrito = carrito.rows[0].id_carrito;

        const existente = await pool.query("SELECT cantidad FROM carrito_products WHERE id_carrito = $1 AND id_producto = $2", [id_carrito, id_producto]);

        if (existente.rows.length > 0) {
            const result = await pool.query("UPDATE carrito_products SET cantidad = cantidad + $3 WHERE id_carrito = $1 AND id_producto = $2 RETURNING *", [id_carrito, id_producto, cantidad]);
            return result.rows[0];
        }

        const result = await pool.query("INSERT INTO carrito_products (id_carrito, id_producto, cantidad) VALUES ($1, $2, $3) RETURNING *", [id_carrito, id_producto, cantidad]);
        return result.rows[0];
    };

    eliminarProducto = async (id_usuario, id_producto) => {
        const carrito = await pool.query("SELECT id_carrito FROM carrito WHERE id_usuario = $1", [id_usuario]);
        const id_carrito = carrito.rows[0].id_carrito;

        const result = await pool.query("DELETE FROM carrito_products WHERE id_carrito = $1 AND id_producto = $2 RETURNING *", [id_carrito, id_producto]);
        return result.rows[0];
    };

    vaciarCarrito = async (id_usuario) => {
        const carrito = await pool.query("SELECT id_carrito FROM carrito WHERE id_usuario = $1", [id_usuario]);
        if (carrito.rows.length === 0) {
            return { deleted: 0 };
        }

        const id_carrito = carrito.rows[0].id_carrito;
        const result = await pool.query("DELETE FROM carrito_products WHERE id_carrito = $1 RETURNING *", [id_carrito]);
        return { deleted: result.rowCount };
    };
}
