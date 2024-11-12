import React, { useState } from 'react';
import axios from 'axios';

interface StartupProps {
    onAdminClick: () => void;
    onUserClick: () => void;
}
const Startup: React.FC<StartupProps> = ({onAdminClick, onUserClick}) => {
    const [message, setMessage] = useState('');


    return (
        <div>
            <h2>Login</h2>
            <div className="narrator">  <h3>Welcome! What are you?</h3></div>
            <div className='left-to-right'>
            <form onSubmit={(event) => 
                {
                    event.preventDefault();
                    onUserClick()
                }
            }>
            <button type="submit" className='choicebutton'>User</button>
            </form>
            <form onSubmit={(event) => {
                event.preventDefault();
                onAdminClick();
            }}>
            <button type="submit" className='choicebutton'>Admin</button>
            </form>
            </div>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Startup;   