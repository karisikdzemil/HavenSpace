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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
            >
                <Outlet />
            </motion.div>
        </AnimatePresence>
        <Footer />
        </>
    )
}
