"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import "./Auth.css";
import { useAuth } from "@/app/context/AuthContext";

export const SignUpPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useAuth();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Redirect logged-in users away from the login page
  useEffect(() => {
    if (user) {
      router.push("/addtodo"); // Redirect to home page
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("/api/signup", formData);
      if (response.data.message === "User created successfully") {
        // Redirect to login page if user created successfully
        toast.success("User created successfully");
        // window.location.href = "/login";
        router.push("/login");
      } else {
        setErrorMessage("Failed to create user. Please try again.");
        toast.error("Failed to create user. Please try again.");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      setErrorMessage("Failed to create user. Please try again.");
      toast.error("Failed to create user. Please try again.");
    }
  };

  return (
    <>
      <section className="dp_row justifycenter auth_section">
        <div className="auth_container">
          <div className="auth_title">
            <h2 className="heading text-align">Sign Up</h2>
          </div>
          <form className="auth_form" onSubmit={handleSubmit}>
            <div className="auth_body">
              <div className="auth_items">
                <div className="input_group">
                  <label className="input_label">First Name</label>
                  <input
                    type="text"
                    className="input_txt"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {errorMessage && !formData.firstName && (
                    <div className="error-message">Please fill this field.</div>
                  )}
                </div>
              </div>
              <div className="auth_items">
                <div className="input_group">
                  <label className="input_label">Last Name</label>
                  <input
                    type="text"
                    className="input_txt"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  {errorMessage && !formData.lastName && (
                    <div className="error-message">Please fill this field.</div>
                  )}
                </div>
              </div>
              <div className="auth_items">
                <div className="input_group">
                  <label className="input_label">Email</label>
                  <input
                    type="email"
                    className="input_txt"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errorMessage && !formData.email && (
                    <div className="error-message">Please fill this field.</div>
                  )}
                  {/* {errorMessage && (
                    <div className="error-message">{errorMessage}</div>
                  )} */}
                </div>
              </div>
              <div className="auth_items">
                <div className="input_group password-div">
                  <label className="input_label">Password</label>
                  <input
                    type="password"
                    className="input_txt"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errorMessage && !formData.password && (
                    <div className="error-message">Please fill this field.</div>
                  )}
                  <span className="password-icon">
                    <i className="fa-solid fa-eye-slash"></i>
                  </span>
                </div>
              </div>
              <div className="auth_items">
                <button type="submit" className="btn">
                  Sign Up
                </button>
              </div>
              <div className="auth_items signup_item">
                Already have an account?{" "}
                <Link href="/login" passHref>
                  <div className="auth_llnk">Login</div>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUpPage;
