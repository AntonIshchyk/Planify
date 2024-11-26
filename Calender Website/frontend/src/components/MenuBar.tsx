import React from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import Login from './Login';
interface MenuBarProps {
    isAdmin : boolean;
    isLoggedIn : boolean;
}
export class MenuBar extends React.Component<MenuBarProps, {}>{
    constructor(props : MenuBarProps){
        super(props);
    }
    handleLogout = async (event : React.FormEvent) => {
        event.preventDefault();
        await axios.post(
            'http://localhost:3000/Calender-Website/logout',
            {},
             {withCredentials : true}
        );
        window.location.reload();

    }
    render(){
  return (
    <nav className="menu-bar">
      <div className="menu-logo">MyApp</div>
      <ul className="menu-links">
        {
        this.props.isLoggedIn && 
        <li>
          <Link to="/">Home</Link>
        </li>
        }
        {this.props.isAdmin &&
        <li>
          <Link to="/create-event">Create Event</Link>
        </li>
        }
        {this.props.isLoggedIn &&
        <li>
          <Link to="/get-all-events">All Events</Link>
        </li>}
        {this.props.isAdmin &&
        <li>
          <Link to="/delete-event">Delete Event</Link>
        </li>}
        {this.props.isLoggedIn && 
        <li>
            <form onSubmit={this.handleLogout}><button type="submit">Logout</button></form>
        </li>}
      </ul>
    </nav>  
  );
}
};

export default MenuBar;