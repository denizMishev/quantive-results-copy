import { Link } from "react-router-dom";

export function Navbar() {
    return (
        <nav id="main-nav">
            <div>
                <h1><b>Menu</b></h1>
            </div>
            <li><Link class="main-nav-links" to="/">Home page</Link></li>
            <li><Link class="main-nav-links" to="/register">Register</Link></li>
            <li><Link class="main-nav-links" to="/login">Login</Link></li>
            <li><Link class="main-nav-links" to="">CPUs</Link></li>
        </nav>
    )
}