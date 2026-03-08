import { createBrowserRouter } from "react-router";
import Login from "../pages/Login.tsx";
import Ordenes from "../pages/Ordenes.tsx";
import DetalleOrden from "../pages/DetalleOrden.tsx";
import MisOrdenes from "../pages/MisOrdenes.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/ordenes",
        element: <Ordenes />,
    },
    {
        path: "/ordenes/:id",
        element: <DetalleOrden />,
    },
    {
        path: "/mis-ordenes",
        element: <MisOrdenes />,
    },
]);

export default router;
