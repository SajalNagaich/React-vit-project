import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile";
import Admin from "./pages/Admin";
import Laptop from "./pages/Laptop";
import AdminUpdate from "./pages/AdminUpdate";
const App = () => {
  return (
    <div>
      <Toaster />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/updateprofile"
            element={
              <PrivateRoute>
                <UpdateProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route
            path="/adminupdate/:id"
            element={
              <PrivateRoute>
                <AdminUpdate />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      {/* <Laptop></Laptop> */}
    </div>
  );
};

export default App;
