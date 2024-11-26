import React, { useState } from 'react';
import axios from 'axios';
import { AppState } from '../App.state';
interface AdminScreenProps{

}
export class AdminScreen extends React.Component<AdminScreenProps,{}>{
    constructor(props : AdminScreenProps){
        super(props)
    }
    render(){
    return (
        <div>
            <div className='narrator'>Welcome Admin!</div>
        </div>
    );
};
}
export default AdminScreen;