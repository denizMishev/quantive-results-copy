import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

export function Navbar() {

    const { user } = useContext(AuthContext)

    return (
        <nav id="main-nav">
            <div>
                <h1><b>Menu</b></h1>
            </div>
            {user.email && <span>{user.email}</span>}
            <li><Link className="main-nav-links" to="/">Home page</Link></li>
            
            <li><Link className="main-nav-links" to="/register">Register</Link></li>
            <li><Link className="main-nav-links" to="/login">Login</Link></li>
            <li><Link className="main-nav-links" to="/logout">Logout</Link></li>
            <li><Link className="main-nav-links" to="/create">Create OKR</Link></li>
        </nav>
    )
}