"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("user_token");
    const userData = localStorage.getItem("user_data");
    if (token && userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser(null);
      if (router.pathname !== "/login") {
        router.push("/login");
      }
    }
  }, [router.pathname]); // Include router.pathname in the dependency array

  const logout = () => {
    // Perform logout actions, such as clearing user data from localStorage
    setUser(null);
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_data");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
