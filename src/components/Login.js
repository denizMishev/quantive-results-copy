export function Login() {
    return (
        <section>
            <form id="loginForm">
                <div>
                    <h1>Login</h1>
                </div>
                <div>
                    <i class="fa-solid fa-envelope"></i>
                    <label for="email">Email</label>
                    <input type="email" placeholder="Enter your email here"/>
                </div>
                <div>
                    <i class="fa-solid fa-lock"></i>
                    <label for="password">Password</label>
                    <input type="password" placeholder="Enter your password here"/>
                </div>
                <div>
                    <button class="loginRegisterBtn">Press Enter to submit</button>
                </div>
            </form>
        </section>
    )
}