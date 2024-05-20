"use client";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import "./Header.css";

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="dp_row dp_justifycontentspcbet aligncenter header">
      <div className="header-left aligncenter">
        <i className="fas fa-tasks"></i>
      </div>
      <div className="dp_row dp_justifycontentspcbet header-right aligncenter">
        <Link href="/addtodo" passHref>
          <div className="header-link">Home</div>
        </Link>
        <Link href="/todolist" passHref>
          <div className="header-link">Todo List</div>
        </Link>
        {user ? (
          <div
            className="header-button"
            style={{ backgroundColor: "red" }}
            onClick={logout}
          >
            Logout
          </div>
        ) : (
          <Link href="/login" passHref>
            <div className="header-button">Login</div>
          </Link>
        )}
      </div>
    </header>
  );
};
