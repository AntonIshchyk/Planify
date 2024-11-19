import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
interface StartUpProps {
    isAdmin : boolean;
    isLoggedIn : boolean;
}
const MenuBar: React.FC<StartUpProps> = ({isAdmin, isLoggedIn}) => {
    const handleLogout = async (event : React.FormEvent) => {
        event.preventDefault();
        await axios.post(
            'http://localhost:3000/Calender-Website/logout',
            {},
             {withCredentials : true}
        );
        window.location.reload();

    }
  return (
    <nav className="menu-bar">
      <div className="menu-logo">MyApp</div>
      <ul className="menu-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        {isAdmin &&
        <li>
          <Link to="/create-event">Create Event</Link>
        </li>
        }
        {isLoggedIn && 
        <li>
            <form onSubmit={handleLogout}><button type="submit">Logout</button></form>
        </li>}
      </ul>
    </nav>  
  );
};

export default MenuBar;
