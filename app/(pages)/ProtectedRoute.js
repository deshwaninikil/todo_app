"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // Redirect to home page if user is logged in and tries to access login or signup page
    if (
      user &&
      (router.pathname === "/login" || router.pathname === "/signup")
    ) {
      router.push("/addtodo");
    }
    // Redirect to login page if user is not logged in
    else if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  return <>{children}</>;
};

export default ProtectedRoute;
