import React from "react";
import './Header.css';

const Header = () => {
    
    return (
        <div className="header">
            <div className="menu-section">
                <div className="app-logo">
                    <img src="/logo-todo-list.png" alt="todo-list logo" />
                </div>
                <div className="app-menu">
                    <ul className="list-app-menu">
                        <li>My Lists</li>
                        <li>Calendar</li>                    
                    </ul>                
                </div>
            </div>
            <div className="user-options">
                <div className="user-icon">
                    <img src="/user-icon.png" alt="user logo" />
                    <p>User email</p>
                </div>
                <div className="user-menu">
                    <ul>
                        <li>Logout</li>
                    </ul>
                </div>
            </div>
            <div className="mobile-menu">
                <img src="/menu-icon-app.png" alt="mobile menu icon" />
            </div>
        </div>
    )
}

export default Header;
