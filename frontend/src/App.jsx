import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import CarForm from "./pages/CarForm";
import CarDetail from "./pages/CarDetail";
import EditCar from "./pages/EditCar";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  const user = localStorage.getItem("token");

  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/create"
          element={user ? <CarForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/cars/:id"
          element={user ? <CarDetail /> : <Navigate to="/login" />}
        />
        <Route
          path="/cars/edit/:id"
          element={user ? <EditCar /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
