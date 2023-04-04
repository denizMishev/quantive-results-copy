export function Register() {
    return (
        <section>
            <form id="registerForm">
                <div>
                    <h1>Sign up</h1>
                </div>

                <div>
                    <i class="fa-solid fa-user"></i>
                    <label for="username">Username</label>
                    <input type="text" placeholder="Enter your username here"/>
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
                    <i class="fa-solid fa-lock"></i>
                    <label for="rePassword">Repeat password</label>
                    <input type="password" placeholder="Repeat your password here"/>
                </div>

                <div>
                    <button class="loginRegisterBtn">Press Enter to submit</button>
                </div>
            </form>

        </section>
    )
}