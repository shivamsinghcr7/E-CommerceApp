import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import Profile from "./pages/User/Profile.jsx";

// Private Route
import PrivateRoute from "./components/PrivateRoute.jsx";
import Home from "./pages/User/Home.jsx";
import Shop from "./pages/User/Shop.jsx";
import Cart from "./pages/User/Cart.jsx";
import Favourite from "./pages/User/Favourite.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorite" element={<Favourite />} />
      </Route>

      {/* This error occurs in React Router v6+ when a nested route is given an absolute path (/dashboard) instead of a relative one (dashboard), which breaks the parent-child nesting structure. */}
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="productlist" element={<Dashboard />} />
        <Route path="categorylist" element={<Dashboard />} />
        <Route path="orderlist" element={<Dashboard />} />
        <Route path="userlist" element={<Dashboard />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
);
