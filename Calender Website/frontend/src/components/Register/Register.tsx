"use client";
import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { initRegisterState, RegisterState } from '../Register/Register.state';
import apiClient from '../../ApiClient';

interface RegisterProps {
    onBacktoMenuClick : () => void;
}
export class Login extends React.Component<RegisterProps, RegisterState> {
    constructor(props : RegisterProps){
        super(props);
        this.state = initRegisterState;
        
    }
    handleRegister = async (event : React.FormEvent) => {
        event.preventDefault();
        try{
                const response = await apiClient.post(
                'http://localhost:3000/Calender-Website/register',
                {  "Email" : this.state.email,
                    "FirstName" : this.state.firstName, 
                 "LastName" : this.state.lastName,
                 "Password" : this.state.password },
                 {withCredentials: true}
                )
            localStorage.setItem('message', response.data);
            window.location.reload();
            window.dispatchEvent(new Event('storageUpdated'));
        }
        catch(error){
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data);
            } else {
                toast.error("There is an error");
            }
        }
    };

    render() {
        return(
        <div>
            <h2>Register</h2>
            <form onSubmit={this.handleRegister}>
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
                    First Name:
                    <input 
                    type="username"
                    value={this.state.firstName}
                        onChange={(e) => this.setState(this.state.updateFirstName(e.currentTarget.value))}
                    required />
                </label>
                <br />
                <label>
                    Last Name:
                    <input 
                    type="username"
                    value={this.state.lastName}
                        onChange={(e) => this.setState(this.state.updateLastName(e.currentTarget.value))}
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
                <button type="submit">Register</button>
            </form>

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