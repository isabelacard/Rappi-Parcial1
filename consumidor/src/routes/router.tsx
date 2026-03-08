import { createBrowserRouter } from "react-router";
import Login from "../pages/Login.tsx";
import Tiendas from "../pages/Tiendas.tsx";
import DetalleTienda from "../pages/DetalleTienda.tsx";
import Carrito from "../pages/Carrito.tsx";
import Checkout from "../pages/Checkout.tsx";
import MisOrdenes from "../pages/MisOrdenes.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/tiendas",
        element: <Tiendas />,
    },
    {
        path: "/tiendas/:id",
        element: <DetalleTienda />,
    },
    {
        path: "/carrito",
        element: <Carrito />,
    },
    {
        path: "/checkout",
        element: <Checkout />,
    },
    {
        path: "/mis-ordenes",
        element: <MisOrdenes />,
    },
]);

export default router;
