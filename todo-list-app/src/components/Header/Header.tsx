import React, { useState } from "react";
import './Header.css';

const Header: React.FC = () => {
    const [openMobileMenu, setOpenMobileMenu] = useState<string>('closeMenu');
    
    const removeSession = () => {
        localStorage.setItem('isAuthenticated', 'false');
        window.location.href = '/login';
    }

    const toggleMobileMenu = () => setOpenMobileMenu(openMobileMenu === 'closeMenu' ? 'openMenu' : 'closeMenu');
    
    return (
        <>
        <div className="header">
            <div className="menu-section">
                <div className="app-logo">
                    <img src="/logo-todo-list.png" alt="todo-list logo" />
                </div>
                <div className="app-menu">
                    <ul className="list-app-menu">
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
            <div className="mobile-menu" onClick={toggleMobileMenu}>
                <img src="/menu-icon-app.png" alt="mobile menu icon" />
            </div>
        </div>
        <div className={`menu-mobile ${openMobileMenu}`}>
            <div className="app-menu-mobile">                
                <div className="close-section">
                    <span onClick={toggleMobileMenu}>
                        <img src="/close-icon.png" />
                    </span>
                </div>
                <ul className="list-app-menu-mobile">
                    <li>
                        <a href="/my-calendar">Calendar
                            <img src="/toggle-down-icon.png" />
                        </a>
                    </li>                    
                    <li>
                        <a onClick={removeSession}>Logout
                            <img src="/toggle-down-icon.png" />
                        </a>
                    </li>                    
                </ul>                              
            </div>
        </div>
        </>
    )
}

export default Header;
