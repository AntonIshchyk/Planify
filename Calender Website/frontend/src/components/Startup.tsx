import React, { useState } from 'react';

interface StartupProps {
    onAdminClick: () => void;
    onUserClick: () => void;
}
const Startup: React.FC<StartupProps> = ({onAdminClick, onUserClick}) => {
    const [message, setMessage] = useState('');


    return (
        <div>
            <h1>Login</h1>
            <div className="narrator"><h5>Welcome! What are you?</h5></div>
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