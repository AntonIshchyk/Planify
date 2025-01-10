import React from 'react';
import axios from 'axios';
import { initLoginState, LoginState } from './Login.state';
import { toast } from 'react-toastify';
import apiClient from '../../ApiClient';
import './Login.css'; // Import the CSS file

interface LoginProps {
  onRegisterClick: () => void;
}

export class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = initLoginState;
  }

  handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (this.state.adminLogin) {
        const response = await apiClient.post(
          'http://localhost:3000/Calender-Website/login-admin',
          { Username: this.state.username, Password: this.state.password },
          { withCredentials: true }
        );
        localStorage.setItem('message', response.data);
        window.location.reload();
        window.dispatchEvent(new Event('storageUpdated'));
      } else {
        const response = await apiClient.post(
          'http://localhost:3000/Calender-Website/login-user',
          { Email: this.state.email, Password: this.state.password },
          { withCredentials: true }
        );
        localStorage.setItem('message', response.data);
        window.location.reload();
        window.dispatchEvent(new Event('storageUpdated'));
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data);
      } else {
        toast.error('There is an error');
      }
    }
  };

  render() {
    return (
      <div className="login-container">
        <div className="narrator">
          <h5>Welcome to the Calendar!</h5>
        </div>
        <h2>Login</h2>
        <form onSubmit={this.handleLogin}>
          <label>
            Select Role:
            <select
              onChange={(e) =>
                this.setState(
                  this.state.updateField('adminLogin', e.currentTarget.value === 'admin')
                )
              }
              value={this.state.adminLogin ? 'admin' : 'user'}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <br />
          {!this.state.adminLogin && (
            <label>
              Email:
              <input
                type="email"
                value={this.state.email}
                onChange={(e) =>
                  this.setState(this.state.updateField('email', e.currentTarget.value))
                }
                required
              />
            </label>
          )}
          {this.state.adminLogin && (
            <label>
              Username:
              <input
                type="username"
                value={this.state.username}
                onChange={(e) =>
                  this.setState(this.state.updateField('username', e.currentTarget.value))
                }
                required
              />
            </label>
          )}
          <br />
          <label>
            Password:
            <input
              type="password"
              value={this.state.password}
              onChange={(e) =>
                this.setState(this.state.updateField('password', e.currentTarget.value))
              }
              required
            />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            this.props.onRegisterClick();
          }}
        >
          <button className="register-btn" type="submit">
            Register as User
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
