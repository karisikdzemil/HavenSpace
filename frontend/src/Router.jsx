import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import Contact from "./pages/Contact";
import Propertie from "./pages/Propertie";
import AddProperty from "./pages/AddProperty";
import EditProperty from "./pages/EditProperty";
import Register from "./pages/Register";
import MyProperties from "./pages/MyProperties";
import Agents from "./pages/Agents";
import AgentProfile from "./pages/AgentProfile";
import EditProfile from "./pages/EditProfile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "properties", element: <Properties /> },
      {path: 'new-listings', element: <AddProperty />},
      {path: "agents", element: <Agents />},
      {path: "agents/:id", element: <AgentProfile />},
      {path: 'my-properties', element: <MyProperties />},
      { path: "contact", element: <Contact /> },
      {path: "propertie/:id", element: <Propertie />},
      {path: "edit-property/:id", element: <EditProperty />},
      {path: "edit-profile", element: <EditProfile />},
      {path: "register", element: <Register />},
      {path: "forgot-password", element: <ForgotPassword />},
      {path: "reset-password/:token", element: <ResetPassword />},
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
