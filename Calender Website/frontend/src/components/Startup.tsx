import React, { useState } from 'react';
import axios from 'axios';


interface StartupProps {
    onAdminClick: () => void;
    onUserClick: () => void;
}
const Startup: React.FC<StartupProps> = ({onAdminClick, onUserClick}) => {
    const [message, setMessage] = useState('');
    const AdminLogin = async (event : React.FormEvent) => {
        event.preventDefault();

        
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={(event) => 
                {
                    event.preventDefault();
                    onUserClick()
                }
            }>
            <button type="submit">User</button>
            </form>
            <form onSubmit={(event) => {
                event.preventDefault();
                onAdminClick();
            }}>
            <button type="submit">Admin</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Startup;   