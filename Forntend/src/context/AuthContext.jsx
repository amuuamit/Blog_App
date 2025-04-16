import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import server from "../environment";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${server}/api/v1/user/getUser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setUser(res.data.user))
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        });
    }
  }, []);

  const handleLogin = async (formData) => {
    try {
      const response = await axios.post(
        `${server}/api/v1/user/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login response:", response.data);

      if (response.status === 200) {
        const { user, token } = response.data;

        console.log("user", user);
        if (user && token) {
          localStorage.setItem("token", token);
          setUser(user);
          alert(`Welcome ${user.first_name || "User"} to Blog Creation...`);
          router("/home");
          return response.data;
        } else {
          alert("Login successful, but user data is missing!");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response?.data?.message) {
        alert(`Login error: ${error.response.data.message}`);
      } else {
        alert("Login error: An unexpected error occurred.");
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
