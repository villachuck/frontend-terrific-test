import React from "react";
import './Header.css';
import { Link } from "react-router-dom";

const Header: React.FC = () => { 
    
    const removeSession = () => {
        localStorage.setItem('isAuthenticated', 'false');
    }
    
    return (
        <div className="header">
            <div className="menu-section">
                <div className="app-logo">
                    <img src="/logo-todo-list.png" alt="todo-list logo" />
                </div>
                <div className="app-menu">
                    <ul className="list-app-menu">
                        <li>
                            <Link to="/my-lists">My Lists</Link>
                        </li>
                        <li>
                            <Link to="/my-calendar">Calendar</Link>
                        </li>                    
                    </ul>                
                </div>
            </div>
            <div className="user-options">
                <div className="log-out-section">
                    <Link to="/">
                        <button type="button" className="logout-btn" onClick={removeSession}>Logout</button>
                    </Link>
                </div>
            </div>
            <div className="mobile-menu">
                <img src="/menu-icon-app.png" alt="mobile menu icon" />
            </div>
        </div>
    )
}

export default Header;
