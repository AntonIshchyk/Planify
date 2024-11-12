import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin: React.FC = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (event : React.FormEvent) => {
        event.preventDefault();

        try{
            
            const response = await axios.post(
                'http://localhost:3000/Calender-Website/login-admin',
                {
                "Username": username, 
                 "Password" : password },
                 { withCredentials: true }
            );
            setMessage(response.data);
        }catch(error){
            if (axios.isAxiosError(error) && error.response) {
                setMessage(error.response.data); // Displays "Admin not found" or "Admin is already logged in."
            } else {
                setMessage('An error occurred. Please try again.');
            }
        }
    }

    return (
        <div>
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
                <label>
                    Username:
                    <input 
                    type="username"
                    value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    required />
                </label>
                <br />
                <label>
                    Password:
                    <input 
                    type="password" 
                    value={password} 
                    onChange = {(e) => setPassword(e.target.value)}
                    required/>
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AdminLogin;