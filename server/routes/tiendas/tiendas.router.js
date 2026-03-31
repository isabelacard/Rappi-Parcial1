import express from "express";
import { TiendasController } from "./tiendas.controller.js";
import { TiendasRepository } from "./tiendas.repository.js";

const repository = new TiendasRepository();
const controller = new TiendasController(repository);

const router = express.Router();

router.get("/", controller.getTiendas);
router.get("/:id", controller.getTiendaById);
router.put("/:id/estado", controller.updateEstado);

export default router;
