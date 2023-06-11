import { useContext } from "react";
import { useNavigate } from 'react-router-dom';

import * as authService from '../services/authService'
import { AuthContext } from "../contexts/AuthContext";

export function Register() {

    const { userLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirm-password');

        if (password !== confirmPassword) {
            return;
        }

        authService.register(email, password)
            .then(authData => {
                userLogin(authData);
                navigate('/');
            });
    }

    return (
        <section>
            <form id="registerForm" onSubmit={onSubmit}>
                <div>
                    <h1>Sign up</h1>
                </div>

                <div>
                    <i className="fa-solid fa-user"></i>
                    <label htmlFor="username">Username</label>
                    <input name="username" type="text" placeholder="Enter your username here"/>
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
                    <i className="fa-solid fa-lock"></i>
                    <label htmlFor="rePassword">Repeat password</label>
                    <input name="confirm-password" type="password" placeholder="Repeat your password here"/>
                </div>

                <div>
                    <button className="loginRegisterBtn">Press Enter to submit</button>
                </div>
            </form>

        </section>
    )
}