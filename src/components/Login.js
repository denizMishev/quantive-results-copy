import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";
import * as authService from '../services/authService';

export function Login() {

    const { userLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        const {
            email,
            password,
        } = Object.fromEntries(new FormData(e.target));

        authService.login(email, password)
            .then(authData => {
                userLogin(authData);
                navigate('/');
            })
            .catch(() => {
                navigate('/404');
            });
    };

    return (
        <section>
            <form id="loginForm" onSubmit={onSubmit}>
                <div>
                    <h1>Login</h1>
                </div>
                <div>
                    <i className="fa-solid fa-envelope"></i>
                    <label htmlFor="email">Email</label>
                    <input name="email" type="email" placeholder="Enter your email here"/>
                </div>
                <div>
                    <i className="fa-solid fa-lock"></i>
                    <label htmlFor="password">Password</label>
                    <input name="password" type="password" placeholder="Enter your password here"/>
                </div>
                <div>
                    <button className="loginRegisterBtn">Press Enter to submit</button>
                </div>
            </form>
        </section>
    )
}