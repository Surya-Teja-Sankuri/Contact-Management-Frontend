import React from "react";
import '../css/navbar.css';
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { auth } = useAuth();
    const logout = useLogout();
    const navigate = useNavigate();

    const signOut = async () => {
        await logout();
        navigate('/login');
        // alert('signout');
    }

    return (
        <nav className="navbar">
            <h1 className="navbar__title">Contacts</h1>
            {
                auth.user ?
                    <div className="user-details">
                        <h3 className="username">
                            {auth.user}
                        </h3>
                        <button className="signout-button" onClick={signOut}>
                            Sign Out
                        </button>
                    </div>
                    :
                    <ul className="navbar__links">
                        <a href="login"><li>
                            Login
                            <span></span><span></span><span></span><span></span>
                        </li></a>
                        <a href="register"><li>
                            Register
                            <span></span><span></span><span></span><span></span>
                        </li></a>
                    </ul>
            }
        </nav>
    );
};

export default Navbar;
