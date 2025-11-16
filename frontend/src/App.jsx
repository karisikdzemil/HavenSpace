import Footer from "./components/footer"
import Header from "./components/header"
import Outlet from "./Outlet"

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
