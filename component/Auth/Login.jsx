"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import "./Auth.css";
import { useAuth } from "@/app/context/AuthContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [inputErrors, setInputErrors] = useState({});
  const { setUser, user } = useAuth();
  const router = useRouter();

  // Redirect logged-in users away from the login page
  useEffect(() => {
    if (user) {
      router.push("/addtodo"); // Redirect to home page
    }
  }, [user, router]);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!email) {
      errors.email = "Please fill this field";
    } else if (!validateEmail(email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!password) {
      errors.password = "Please fill this field";
    }

    setInputErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post("/api/login", {
          email,
          password,
        });
        const { token, user } = response.data;
        const userData = JSON.stringify(user);
        // Store the token in localStorage
        localStorage.setItem("user_token", token);
        localStorage.setItem("user_data", userData);
        setUser(user); // Update the user context

        // Redirect to home page
        toast.success("Login successfully");
        router.push("/addtodo");
      } catch (error) {
        setError("Login failed. Please check your credentials and try again.");
        toast.error("Login failed");
      }
    }
  };

  return (
    <section className="dp_row justifycenter auth_section">
      <div className="auth_container">
        <div className="auth_title">
          <h2 className="heading text-align">Login</h2>
        </div>
        <form className="auth_form" onSubmit={handleLogin}>
          <div className="auth_body">
            <div className="auth_items">
              <div className="input_group">
                <label className="input_label">Email Address</label>
                <input
                  type="text"
                  className="input_txt"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {inputErrors.email && (
                  <div className="error">{inputErrors.email}</div>
                )}
              </div>
            </div>
            <div className="auth_items">
              <div className="input_group password-div">
                <label className="input_label">Password</label>
                <input
                  type="password"
                  className="input_txt"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {inputErrors.password && (
                  <div className="error">{inputErrors.password}</div>
                )}
                <span className="password-icon">
                  <i className="fa-solid fa-eye-slash"></i>
                </span>
              </div>
            </div>
            <div className="auth_items action_btn">
              <button type="submit" className="btn">
                Login
              </button>
              <button type="button" className="btn">
                Login as Guest User
              </button>
            </div>
            {error && <div className="error">{error}</div>}
            <div className="auth_items signup_item">
              Need an account?
              <Link href="/signup" passHref>
                <div className="auth_llnk">Sign Up</div>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
