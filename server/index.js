import express from "express";
import cors from "cors";
import TiendasRouter from "./routes/tiendas/tiendas.router.js";
import ProductosRouter from "./routes/productos/productos.router.js";
import CarritoRouter from "./routes/carrito/carrito.router.js";
import OrdenesRouter from "./routes/ordenes/ordenes.router.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/tiendas", TiendasRouter);
app.use("/productos", ProductosRouter);
app.use("/carrito", CarritoRouter);
app.use("/ordenes", OrdenesRouter);

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server corriendo en puerto ${PORT}`);
});
