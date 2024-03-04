import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import BookingBike from "./pages/BookingBike";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MyBooking from "./pages/MyBooking";

function App() {
  const isAuthenticated = Boolean(localStorage.getItem("user"));
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <MyBooking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking/:bikeid"
          element={
            <ProtectedRoute>
              <BookingBike />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

export function ProtectedRoute({ children }) {
  const isAuthenticated = Boolean(localStorage.getItem("user"));

  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
