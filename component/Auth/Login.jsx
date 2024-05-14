import Link from "next/link";
import "./Auth.css";

export const Login = () => {
  return (
    <>
      <section class="dp_row justifycenter auth_section">
        <div class="auth_container">
          <div class="auth_title">
            <h2 class="heading text-align">Login</h2>
          </div>
          <form class="auth_form">
            <div class="auth_body">
              <div class="auth_items">
                <div class="input_group">
                  <label class="input_label">Email Address</label>
                  <input type="text" class="input_txt" required />
                </div>
              </div>
              <div class="auth_items">
                <div class="input_group password-div">
                  <label class="input_label">Password</label>
                  <input type="password" class="input_txt" required />
                  <span class="password-icon">
                    <i class="fa-solid fa-eye-slash"></i>
                  </span>
                </div>
              </div>
              <div class="auth_items action_btn">
                <button type="submit" class="btn">
                  Login
                </button>
                <button type="button" class="btn">
                  Login as Guest User
                </button>
              </div>
              <div class="auth_items signup_item">
                Need an account?
                <Link href="/signup" passHref>
                  <div class="auth_llnk">Sign Up</div>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
