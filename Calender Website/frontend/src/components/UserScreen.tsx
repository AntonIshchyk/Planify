"use client";
import React from 'react';

interface UserScreenProps{
    
}
export class UserScreen extends React.Component<UserScreenProps,{}>{
    render(){
    return (
        <div>
            <div className='narrator'>Welcome User!</div>
        </div>
    );
};
}
export default UserScreen;