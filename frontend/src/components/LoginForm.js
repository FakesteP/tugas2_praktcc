import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Add framer-motion for animations
import { BASE_URL } from "../utils";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        username,
        password,
      });
      
      // Store token in localStorage
      localStorage.setItem("accessToken", response.data.accessToken);
      
      // Show success message
      setIsLoading(false);
      
      // Use setTimeout for a smooth transition
      setTimeout(() => {
        navigate("/");
      }, 500);
      
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(
        error.response?.data?.message || "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <motion.div 
      className="auth-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="auth-form-wrapper"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2>Welcome Back</h2>
        
        {errorMessage && (
          <motion.div 
            className="error-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ 
              color: "#e74c3c", 
              padding: "10px", 
              borderRadius: "6px", 
              marginBottom: "15px",
              background: "rgba(231, 76, 60, 0.1)" 
            }}
          >
            {errorMessage}
          </motion.div>
        )}
        
        <form className="auth-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              autoFocus
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="auth-button"
            disabled={isLoading}
            style={{ 
              opacity: isLoading ? 0.7 : 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span> Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
        
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="register-link">
              Register here
            </Link>
          </p>
                    
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginForm;