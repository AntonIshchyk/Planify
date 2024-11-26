import React from 'react';
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