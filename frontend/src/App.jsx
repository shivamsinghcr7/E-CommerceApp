import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className="py-3 h-[100vh]">
        <Outlet />
      </main>
    </>
  );
}

export default App;
