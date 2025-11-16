import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import Contact from "./pages/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      { index: true, element: <Home /> },
      { path: "properties", element: <Properties /> },
      { path: "contact", element: <Contact /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
