import "./Footer.css";
import Link from "next/link";
export const Footer = () => {
  return (
    <>
      <footer className="dp_row dp_rowdir_clmn_onlyMob text-alignMob justify-contentspaceAround footer">
        <div className="dp_row dp_rowdir_clmn footer-item">
          <div className="footer-copy fw-bold">Copyright © 2024 Todo App.</div>
          <div>All Rights Reserved</div>
          <div className="dp_row justifycenter footer-icons fs-1-25">
            <a
              href="https://github.com/deshwaninikil"
              target="_blank"
              rel="noreferrer"
              className="footer-link"
            >
              <i className="fa-brands fa-github fa-icon"></i>
            </a>

            <a
              href="https://twitter.com/NDeshwani"
              target="_blank"
              rel="noreferrer"
              className="footer-link"
            >
              <i className="fa-brands fa-twitter fa-icon"></i>
            </a>

            <a
              href="https://www.linkedin.com/in/nikil-deshwani-a77324188/"
              target="_blank"
              rel="noreferrer"
              className="footer-link"
            >
              <i className="fa-brands fa-linkedin-in fa-icon"></i>
            </a>
          </div>
        </div>
        <div className="footer-item">
          <span className="fw-600">Quick Links</span>
          <div className="dp_row dp_rowdir_clmn quick-links">
            <Link href="/" passHref>
              <div className="footer-link">Home</div>
            </Link>
            {/* Todo list link */}
            <Link href="/todolist" passHref>
              <div className="footer-link">Todo List</div>
            </Link>
            {/* Login button */}
            <Link href="/login" passHref>
              <div className="footer-link">Login</div>
            </Link>
          </div>
        </div>
        <div className="footer-item">
          <span className="fw-600">Contact Us</span>
          <div className="dp_row dp_rowdir_clmn contact-details">
            <span>
              <i className="fa-solid fa-location-dot fa-icon"></i>
              <span className="ml-0-5">1111 Central Lounge, New delhi</span>
            </span>
            <span>
              <i className="fa-solid fa-phone fa-icon"></i>
              <span className="ml-0-5">+91 9099203274</span>
            </span>
            <span>
              <i className="fa-solid fa-envelope fa-icon"></i>
              <span className="ml-0-5">support@todoapp.com</span>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};
