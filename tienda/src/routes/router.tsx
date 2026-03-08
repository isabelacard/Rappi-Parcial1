import { createBrowserRouter } from "react-router";
import Login from "../pages/Login.tsx";
import MiTienda from "../pages/MiTienda.tsx";
import CrearProducto from "../pages/CrearProducto.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/mi-tienda",
        element: <MiTienda />,
    },
    {
        path: "/crear-producto",
        element: <CrearProducto />,
    },
]);

export default router;
