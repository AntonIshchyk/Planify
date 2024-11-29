"use client";
import React from 'react';

interface StartupProps {
    onAdminClick: () => void;
    onUserClick: () => void;
}
export class Startup extends React.Component<StartupProps>{
    render(){
    return (
        <div>
            <h1>Login</h1>
            <div className="narrator"><h5>Welcome! What are you?</h5></div>
            <div className='left-to-right'>
            <form onSubmit={(event) => 
                {
                    event.preventDefault();
                    this.props.onUserClick()
                }
            }>
            <button type="submit" className='choicebutton'>User</button>
            </form>
            <form onSubmit={(event) => {
                event.preventDefault();
                this.props.onAdminClick();
            }}>
            <button type="submit" className='choicebutton'>Admin</button>
            </form>
            </div>
            
        </div>
    );
};
}

export default Startup;   