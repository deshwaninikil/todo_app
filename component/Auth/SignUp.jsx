import Link from "next/link";
import "./Auth.css";
export const SignUpPage = () => {
  return (
    <>
      <section class="dp_row justifycenter auth_section">
        <div class="auth_container">
          <div class="auth_title">
            <h2 class="heading text-align">Sign Up</h2>
          </div>
          <form class="auth_form">
            <div class="auth_body">
              <div class="auth_items">
                <div class="input_group">
                  <label class="input_label">First Name</label>
                  <input type="text" class="input_txt" required />
                </div>
              </div>
              <div class="auth_items">
                <div class="input_group">
                  <label class="input_label">Last Name</label>
                  <input type="text" class="input_txt" required />
                </div>
              </div>
              <div class="auth_items">
                <div class="input_group">
                  <label class="input_label">Email</label>
                  <input type="email" class="input_txt" required />
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
              <div class="auth_items">
                <button type="submit" class="btn">
                  Sign Up
                </button>
              </div>
              <div class="auth_items signup_item">
                Already have an account?
                <Link href="/login" passHref>
                  <div class="auth_llnk">Login</div>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
