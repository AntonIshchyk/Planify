import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../../ApiClient';

interface MenuBarProps {
  isAdmin: boolean;
  isLoggedIn: boolean;
  navigate: (path: string) => void; // Adding navigate prop
}

export class MenuBar extends React.Component<MenuBarProps, {}> {
  handleLogout = async (event: React.FormEvent) => {
    
    event.preventDefault();
    await apiClient.post(
      'http://localhost:3000/Calender-Website/logout',
      {},
      { withCredentials: true }
    );

    // Programmatically navigate to the root path
    this.props.navigate('');
    window.location.reload();
  };

  render() {
    return (
      <nav className="menu-bar">
        <div className="menu-logo">MyApp</div>
        <ul className="menu-links">
          {this.props.isLoggedIn && (
            <li>
              <Link to="/">Home</Link>
            </li>
          )}
          {this.props.isAdmin && (
            <li>
              <Link to="/create-event">Create Event</Link>
            </li>
          )}
          {this.props.isLoggedIn && (
            <li>
              <Link to="/get-all-events">All Events</Link>
            </li>
          )}
          {this.props.isLoggedIn && (
            <li>
              <Link to="/attend">Attend Office</Link>
            </li>
          )}
           {this.props.isLoggedIn && (
            <li>
              <Link to="/attending-dates">Attendances Office</Link>
            </li>
          )}
          {this.props.isLoggedIn && (
            <li>
              <Link to="/attending-events">Attending Events</Link>
            </li>
          )}
          {this.props.isLoggedIn && !this.props.isAdmin &&
            <li>
              <Link to="/friends">Friends</Link>
            </li>}
          {this.props.isAdmin && (
            <li>
              <Link to="/add-admin">Add Admin Account</Link>
            </li>
          )}
          {this.props.isLoggedIn && (
            <li>
              <form onSubmit={this.handleLogout}>
                <button type="submit">Logout</button>
              </form>
            </li>
          )}
        </ul>
      </nav>
    );
  }
}

// Wrapper to inject navigate into MenuBar
function withNavigation(Component: typeof MenuBar) {
  return function Wrapper(props: Omit<MenuBarProps, 'navigate'>) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

export default withNavigation(MenuBar);
