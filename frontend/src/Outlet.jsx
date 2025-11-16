import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import Home from './pages/Home';
import Properties from './pages/Properties';
import Contact from './pages/Contact';

export default function Outlet (){
    const router = createBrowserRouter([
        {path: '/', element: <Home />},
        {path: '/properties', element: <Properties />},
        {path: '/contact', element: <Contact />}
    ]);
    return(
        <RouterProvider router={router}/>
    )  
}