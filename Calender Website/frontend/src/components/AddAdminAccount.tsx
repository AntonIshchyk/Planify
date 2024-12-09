"use client";
import React from 'react';
import axios from 'axios';
import { initLoginState, LoginState } from './Login.state';
import { toast } from 'react-toastify';

export class Login extends React.Component<{}, LoginState> {
    constructor(props : {}){
        super(props);
        this.state = initLoginState;
        
    }
    handleAddAdmin = async (event : React.FormEvent) => {
        event.preventDefault();
        try{
            const response = await axios.post(
            'http://localhost:3000/Calender-Website/register-admin',
            {"Username" : this.state.username, 
                "Password" : this.state.password,
                "Email" : this.state.email},
                {withCredentials: true}
            );
            toast.info(response.data);
        
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
            <form onSubmit={this.handleAddAdmin}>
                <label>
                    Email:
                    <input 
                    type="email"
                    value={this.state.email}
                    onChange={(e) => this.setState(this.state.updateEmail(e.currentTarget.value))}
                    required />
                </label>
                <br />
                <label>
                    Username:
                    <input 
                    type="username"
                    value={this.state.username}
                        onChange={(e) => this.setState(this.state.updateUsername(e.currentTarget.value))}
                    required />
                </label>
                <br />
                <label>
                    Password:
                    <input 
                    type="password" 
                    value={this.state.password} 
                    onChange = {(e) => this.setState(this.state.updatePassword(e.currentTarget.value))}
                    required/>
                </label>
                <br />
                <button type="submit">Add Account</button>
            </form>
        </div>
)};
};

export default Login;   