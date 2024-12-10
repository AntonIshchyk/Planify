import React from 'react';
import axios from 'axios';
import { initLoginState, LoginState } from './Login.state';
import { toast } from 'react-toastify';

interface LoginProps {
    onBacktoMenuClick : () => void;
    isAdminLogin : boolean;
    isUserLogin : boolean;
    onRegisterClick : () => void;
}
export class Login extends React.Component<LoginProps, LoginState> {
    constructor(props : LoginProps){
        super(props);
        this.state = initLoginState;
        
    }
    handleLogin = async (event : React.FormEvent) => {
        event.preventDefault();
        try{
            if(this.props.isAdminLogin){
                const response = await axios.post(
                'http://localhost:3000/Calender-Website/login-admin',
                {"Username" : this.state.username, 
                 "Password" : this.state.password },
                 {withCredentials: true}
            );
            localStorage.setItem('message', response.data);
            window.location.reload();
            window.dispatchEvent(new Event('storageUpdated'));
        }
        else{
            const response = await axios.post(
                'http://localhost:3000/Calender-Website/login-user',
                {"Email" : this.state.email, 
                 "Password" : this.state.password },
                 {withCredentials : true}
            );
            localStorage.setItem('message', response.data);
            window.location.reload();
            window.dispatchEvent(new Event('storageUpdated'));
        }
        }catch(error){
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data); // Displays "User not found" or "User is already logged in."
            } else {
                toast.error("There is an error");
            }
        }
    };

    render() {
        return(
        <div>
            <h2>Login</h2>
            <form onSubmit={this.handleLogin}>
                {this.props.isUserLogin && <label>
                    Email:
                    <input 
                    type="email"
                    value={this.state.email}
                    onChange={(e) => this.setState(this.state.updateField("email", e.currentTarget.value))}
                    required />
                </label>
                }
                <br />
                {this.props.isAdminLogin && <label>
                    Username:
                    <input 
                    type="username"
                    value={this.state.username}
                        onChange={(e) => this.setState(this.state.updateField("username", e.currentTarget.value))}
                    required />
                </label>
                }
                <br />
                <label>
                    Password:
                    <input 
                    type="password" 
                    value={this.state.password} 
                    onChange = {(e) => this.setState(this.state.updateField("password", e.currentTarget.value))}
                    required/>
                </label>
                <br />
                <button type="submit">Login</button>
            </form> 
            { this.props.isUserLogin && <form onSubmit={(event) => {
                event.preventDefault();
                this.props.onRegisterClick();
            }}>
            <button type="submit">Register as User</button>
            </form>
            }
            <form onSubmit={(event) => {
                event.preventDefault();
                this.props.onBacktoMenuClick();
            }}>
            <button type="submit">Back to Menu</button>
            </form>
        </div>
)};
};

export default Login;   