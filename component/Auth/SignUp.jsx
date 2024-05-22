"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import "./Auth.css";
import { useAuth } from "@/app/context/AuthContext";
import { useShowPassword } from "../Hooks/useShowPassword";

export const SignUpPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [inputErrors, setInputErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { showPass, togglePassword } = useShowPassword();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Redirect logged-in users away from the sign-up page
  useEffect(() => {
    if (user) {
      router.push("/addtodo"); // Redirect to home page
    }
  }, [user, router]);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const lengthRequirement = password.length >= 9;
    const specialCharRequirement = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const numberRequirement = /\d/.test(password);
    return lengthRequirement && specialCharRequirement && numberRequirement;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error message
    const errors = {};

    if (!formData.firstName) {
      errors.firstName = "Please fill this field.";
    }
    if (!formData.lastName) {
      errors.lastName = "Please fill this field.";
    }
    if (!formData.email) {
      errors.email = "Please fill this field.";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!formData.password) {
      errors.password = "Please fill this field.";
    } else if (!validatePassword(formData.password)) {
      errors.password =
        "Password must be at least 9 characters long, include a special character, and a number.";
    }

    setInputErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await axios.post("/api/signup", formData);
      if (response.data.message === "User created successfully") {
        // Redirect to login page if user created successfully
        toast.success("User created successfully");
        router.push("/login");
      } else {
        setErrorMessage("Failed to create user. Please try again.");
        toast.error("Failed to create user. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const apiErrorMessage = error.response.data.error;
        setErrorMessage(apiErrorMessage);
        toast.error(apiErrorMessage);
      } else {
        console.error("Error creating user:", error);
        setErrorMessage("Failed to create user. Please try again.");
        toast.error("Failed to create user. Please try again.");
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <section className="dp_row justifycenter auth_section">
      <div className="auth_container" style={{ opacity: loading ? 0.5 : 1 }}>
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
                {inputErrors.firstName && (
                  <div className="error-message">{inputErrors.firstName}</div>
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
                {inputErrors.lastName && (
                  <div className="error-message">{inputErrors.lastName}</div>
                )}
              </div>
            </div>
            <div className="auth_items">
              <div className="input_group">
                <label className="input_label">Email</label>
                <input
                  type="text"
                  className="input_txt"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {inputErrors.email && (
                  <div className="error-message">{inputErrors.email}</div>
                )}
              </div>
            </div>
            <div className="auth_items">
              <div className="input_group password-div">
                <label className="input_label">Password</label>
                <input
                  type={showPass ? "text" : "password"}
                  className="input_txt"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {inputErrors.password && (
                  <div className="error-message">{inputErrors.password}</div>
                )}
                <span className="password-icon" onClick={togglePassword}>
                  <i
                    className={`fa-solid ${
                      showPass ? "fa-eye" : "fa-eye-slash"
                    }`}
                  ></i>
                </span>
              </div>
            </div>
            <div className="auth_items">
              <button type="submit" className="btn" disabled={loading}>
                {loading ? "Loading..." : "Sign Up"}
              </button>
            </div>
            {errorMessage && (
              <div className="error-message" style={{ color: "red" }}>
                {errorMessage}
              </div>
            )}
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
  );
};

export default SignUpPage;
