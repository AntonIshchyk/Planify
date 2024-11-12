import React, { useState } from 'react';
import axios from 'axios';



const Startup: React.FC = () => {
    const [message, setMessage] = useState('');

    const AdminLogin = async (event : React.FormEvent) => {
        event.preventDefault();

        
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={AdminLogin}>
            <button type="submit">Admin</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Startup;   