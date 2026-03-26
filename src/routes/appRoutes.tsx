import type { RouteObject } from "react-router-dom";
import Home from "../pages/home";
import LaptopsPage from '../pages/laptops';
import AdminGate from "../components/adminGate";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/laptops",
    element: <LaptopsPage />,
  },
  {
     path: "/admin",
    element:<AdminGate />,
  }
];

export default routes;
