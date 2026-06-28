import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function Layout(){
    const location = useLocation();

    return(
        <>
        <Header />
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <Outlet />
            </motion.div>
        </AnimatePresence>
        <Footer />
        </>
    )
}
