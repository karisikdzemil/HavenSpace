import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import Contact from "./pages/Contact";
import Propertie from "./pages/propertie";
import AddProperty from "./pages/AddProperty";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      { index: true, element: <Home /> },
      { path: "properties", element: <Properties /> },
      {path: 'new-listings', element: <AddProperty />},
      { path: "contact", element: <Contact /> },
      {path: "propertie/:id", element: <Propertie />}
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
