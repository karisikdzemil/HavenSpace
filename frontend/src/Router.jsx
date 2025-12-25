import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import Contact from "./pages/Contact";
import Propertie from "./pages/propertie";
import AddProperty from "./pages/AddProperty";
import EditProperty from "./pages/EditPropety";
import Register from "./pages/Register";
import MyProperties from "./pages/MyProperties";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      { index: true, element: <Home /> },
      { path: "properties", element: <Properties /> },
      {path: 'new-listings', element: <AddProperty />},
      {path: 'my-properties', element: <MyProperties />},
      { path: "contact", element: <Contact /> },
      {path: "propertie/:id", element: <Propertie />},
      {path: "edit-property/:id", element: <EditProperty />},
      {path: "register", element: <Register />}
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
