import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import NoteList from "./components/NoteList";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

const BASE_URL = "http://localhost:5000"; // ganti sesuai URL backend kamu

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Cek localStorage saat pertama kali render
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Fungsi untuk register
  const handleRegister = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/create-users`, data);
      console.log("Register sukses:", response.data);
      alert(response.data.msg); // Tampilkan pesan berhasil
      window.location.href = "/login"; // Arahkan ke halaman login
    } catch (error) {
      console.error("Register gagal:", error.response?.data || error.message);
      alert("Gagal Register. Pastikan semua data benar.");
    }
  };

  // Fungsi untuk login
  const handleLogin = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, data, {
        withCredentials: true, // Agar cookie refresh token bisa disimpan
      });
      console.log("Login sukses:", response.data);
      localStorage.setItem("accessToken", response.data.accessToken);
      setIsAuthenticated(true); // Set state login
    } catch (error) {
      console.error("Login gagal:", error.response?.data || error.message);
      alert("Email atau password salah.");
    }
  };

  // Fungsi ProtectedRoute
  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("accessToken");
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <NoteList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={<LoginForm handleLogin={handleLogin} />}
        />
        <Route
          path="/register"
          element={<RegisterForm handleRegister={handleRegister} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
