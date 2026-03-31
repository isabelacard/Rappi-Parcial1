import express from "express";
import { ProductosController } from "./productos.controller.js";
import { ProductosRepository } from "./productos.repository.js";

const repository = new ProductosRepository();
const controller = new ProductosController(repository);

const router = express.Router();

router.get("/:id_tienda", controller.getProductosByTienda);
router.post("/", controller.createProducto);

export default router;
