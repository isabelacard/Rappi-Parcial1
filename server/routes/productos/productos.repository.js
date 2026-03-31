import { pool } from "../../db.js";

export class ProductosRepository {
    getProductosByTienda = async (id_tienda) => {
        const result = await pool.query("SELECT * FROM productos WHERE id_tienda = $1", [id_tienda]);
        return result.rows;
    };

    createProducto = async (nombre, descripcion, precio, id_tienda) => {
        await pool.query(`
        SELECT setval('productos_id_producto_seq', 
        (SELECT MAX(id_producto) FROM productos))
    `);
        const result = await pool.query("INSERT INTO productos (nombre, descripcion, precio, id_tienda) VALUES ($1, $2, $3, $4) RETURNING *", [nombre, descripcion, precio, id_tienda]);
        return result.rows[0];
    };
}
