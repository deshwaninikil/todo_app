import Link from "next/link";
import "./Header.css";

export const Header = () => {
  return (
    <header className="dp_row dp_justifycontentspcbet aligncenter header">
      <div className="header-left aligncenter">
        <i className="fas fa-tasks"></i>
      </div>
      <div className="dp_row dp_justifycontentspcbet header-right aligncenter">
        <Link href="/" passHref>
          <div className="header-link">Home</div>
        </Link>
        <Link href="/todolist" passHref>
          <div className="header-link">Todo List</div>
        </Link>
        <Link href="/login" passHref>
          <div className="header-button">Login</div>
        </Link>
      </div>
    </header>
  );
};
