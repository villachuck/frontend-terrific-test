import React, { useEffect } from "react";
import './Header.css';

const Header: React.FC = () => { 
    
    const removeSession = () => {
        localStorage.setItem('isAuthenticated', 'false');
        window.location.href = '/login';
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
                            <a href="/my-lists">My Lists</a>
                        </li>
                        <li>
                            <a href="/my-calendar">Calendar</a>
                        </li>                    
                    </ul>                
                </div>
            </div>
            <div className="user-options">
                <div className="log-out-section">
                    <button type="button" className="logout-btn" onClick={removeSession}>Logout</button>
                </div>
            </div>
            <div className="mobile-menu">
                <img src="/menu-icon-app.png" alt="mobile menu icon" />
            </div>
        </div>
    )
}

export default Header;
