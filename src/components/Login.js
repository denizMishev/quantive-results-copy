import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";
import * as authService from "../services/authService";

export function Login() {
  const { userLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loginFormValues, setLoginFormValues] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setLoginFormValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    authService
      .login(loginFormValues)
      .then((authData) => {
        userLogin(authData);
        navigate("/home");
      })
      .catch(() => {
        navigate("/404");
      });
  };

  return (
    <section className="login-form-ctr">
      <form onSubmit={onSubmit} className="login-form">
        <div className="login-form-title-ctr">
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
        <div className="login-form-heading-ctr">
          <span>Log in to your account</span>
        </div>
        <div className="login-form-input-fields-ctr">
          <div className="email-ctr">
            <label htmlFor="email">Email*</label>
            <input
              name="email"
              type="email"
              value={loginFormValues.email}
              onChange={onChangeHandler}
            />
          </div>
          <div className="password-ctr">
            <label htmlFor="password">Password*</label>
            <input
              name="password"
              type="password"
              value={loginFormValues.password}
              onChange={onChangeHandler}
            />
          </div>
        </div>

        <button className="login-form-login-btn user-form-btn">Log in</button>
        <div className="login-form-start-free-trial user-form-alternative">
          <span className="login-form-start-free-trial-prompt">
            Don't have an account yet?
          </span>
          <span>
            <Link className="register-form-login-btn-ctr" to="/register">
              <span>Start a free trial</span>
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
