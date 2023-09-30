import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";

import * as authService from "../services/authService";

import { userFormErrors } from "../util/errormessages";
import { addNewUser } from "../services/userService";
import { AuthContext } from "../contexts/AuthContext";

export function Register() {
  const navigate = useNavigate();
  const { userLogin } = useContext(AuthContext);
  const [registerFormValues, setRegisterFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [focusedField, setFocusedField] = useState({
    usernameFocus: false,
    emailFocus: false,
    passwordFocus: false,
    confirmPasswordFocus: false,
  });

  const { showBoundary } = useErrorBoundary([]);

  useEffect(() => {
    let requiredFieldsFilled = true;

    for (const formValue of Object.values(registerFormValues)) {
      if (formValue.length === 0) {
        requiredFieldsFilled = false;
      }
    }
  }, [registerFormValues]);

  const onChangeHandler = (e) => {
    const value = e.target.value;
    const target = e.target.name;

    setRegisterFormValues((state) => ({
      ...state,
      [target]: value,
    }));
  };

  const onBlurHandler = (e) => {
    const target = e.target.name + "Focus";

    setFocusedField((state) => ({
      ...state,
      [target]: true,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const registerFormData = {
      username: registerFormValues.username,
      email: registerFormValues.email,
      password: registerFormValues.password,
    };

    authService
      .register(registerFormData)
      .then((authData) => {
        userLogin(authData);
        addNewUser(registerFormData.email, registerFormData.username);
        navigate("/home");
      })
      .catch((err) => {
        showBoundary(err);
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
          <p className="user-form-fields-required txt-gray txt-sm">
            *All fields are required
          </p>
          <input
            className="register-form-input-field"
            name="username"
            placeholder="Enter your username here"
            type="text"
            pattern="^[A-Za-z0-9]{1,30}$"
            required
            onChange={onChangeHandler}
            value={registerFormValues.username}
            onBlur={onBlurHandler}
            focused={focusedField.usernameFocus.toString()}
          />
          <span className="user-form-error txt-red txt-sm">
            {userFormErrors.usernameErrMsg}
          </span>
          <input
            name="email"
            placeholder="Enter your email address here"
            required
            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
            onChange={onChangeHandler}
            value={registerFormValues.email}
            onBlur={onBlurHandler}
            focused={focusedField.emailFocus.toString()}
          />
          <span className="user-form-error txt-red txt-sm">
            {userFormErrors.emailErrMsg}
          </span>
          <input
            name="password"
            type="password"
            pattern="^[A-Za-z0-9]{8,30}$"
            required
            placeholder="Enter your password here"
            onChange={onChangeHandler}
            value={registerFormValues.password}
            onBlur={onBlurHandler}
            focused={focusedField.passwordFocus.toString()}
          />
          <span className="user-form-error txt-red txt-sm">
            {userFormErrors.passwordErrMsg}
          </span>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Repeat password here"
            pattern={registerFormValues.password}
            required
            onChange={onChangeHandler}
            value={registerFormValues.confirmPassword}
            onBlur={onBlurHandler}
            focused={focusedField.confirmPasswordFocus.toString()}
          />
          <span className="user-form-error txt-red txt-sm">
            {userFormErrors.confirmPasswordErrMsg}
          </span>
        </div>
        <button
          id="specialtrickster1"
          className="register-form-signup-button user-form-btn"
        >
          Sign up
        </button>
        <div className="register-form-login-ctr user-form-alternative">
          <span className="register-form-login-redirect-prompt-span">
            Already have an account?
          </span>
          <span>
            <Link className="register-form-login-btn-ctr" to="/login">
              <span>Log in</span>
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
