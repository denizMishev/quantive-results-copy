import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import * as authService from "../services/authService";
import { addNewUser } from "../services/userService";
import { AuthContext } from "../contexts/AuthContext";

export function Register() {
  const { userLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");

    if (password !== confirmPassword) {
      return;
    }

    authService.register(email, username, password).then((authData) => {
      userLogin(authData);
      addNewUser(email, username);
      navigate("/home");
    });
  };

  return (
    <section className="register-form-ctr">
      <form onSubmit={onSubmit} className="register-form">
        <div className="register-form-title-ctr">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M448 256A192 192 0 1 0 64 256a192 192 0 1 0 384 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 80a80 80 0 1 0 0-160 80 80 0 1 0 0 160zm0-224a144 144 0 1 1 0 288 144 144 0 1 1 0-288zM224 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
            />
          </svg>
          <h1>Team OKRs</h1>
        </div>
        <div className="register-form-heading-ctr">
          <span>Sign up for our FREE plan</span>
        </div>
        <div className="register-form-input-fields-ctr">
          <input
            name="username"
            placeholder="Enter your username here"
            type="text"
          />
          <input
            name="email"
            placeholder="Enter your email address here"
            type="email"
          />
          <input
            name="password"
            type="password"
            placeholder="Enter your password here"
          />
          <input
            name="confirm-password"
            type="password"
            placeholder="Repeat password here"
          />
        </div>
        <button className="register-form-signup-button user-form-btn">
          Sign up
        </button>
        <div className="register-form-login-ctr user-form-alternative">
          <span>Already have an account?</span>
          <span>
            <Link to="/login">
              Log in
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                />
              </svg>
            </Link>
          </span>
        </div>
      </form>
    </section>
  );
}
