import React, { useState } from 'react';
import axios from 'axios';
import { AppState } from '../App.state';
interface UserScreenProps{
    
}
export class UserScreen extends React.Component<UserScreenProps,{}>{
    constructor(props : UserScreenProps){
        super(props);
    }
    render(){
    return (
        <div>
            <div className='narrator'>Welcome User!</div>
        </div>
    );
};
}
export default UserScreen;