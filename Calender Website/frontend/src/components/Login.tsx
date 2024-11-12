import React, { useState } from 'react';
import axios from 'axios';


interface StartupProps {
    onBacktoMenuClick : () => void;
    isAdmin : boolean;
    isUser : boolean;
}
const Login: React.FC<StartupProps> = ({onBacktoMenuClick, isAdmin, isUser}) => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (event : React.FormEvent) => {
        event.preventDefault();

        try{
        
            if(isAdmin){
            const response = await axios.post(
                'http://localhost:3000/Calender-Website/login-user',
                {"Username" : username, 
                 "Password" : password },
                 {withCredentials : true}
            );
            setMessage(response.data);
        }
        else{
            const response = await axios.post(
                'http://localhost:3000/Calender-Website/login-user',
                {"Email" : email, 
                 "Password" : password },
                 {withCredentials : true}
            );
            setMessage(response.data);
        }
        }catch(error){
            if (axios.isAxiosError(error) && error.response) {
                setMessage(error.response.data); // Displays "User not found" or "User is already logged in."
            } else {
                setMessage('An error occurred. Please try again.');
            }
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                {isUser && <label>
                    Email:
                    <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                </label>
                }
                <br />
                {isAdmin && <label>
                    Username:
                    <input 
                    type="username"
                    value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    required />
                </label>
                }
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

            <form onSubmit={(event) => {
                event.preventDefault();
                onBacktoMenuClick();
            }}>
            <button type="submit">Back to Menu</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;   