import React from 'react';
interface AdminScreenProps{

}
export class AdminScreen extends React.Component<AdminScreenProps,{}>{
    render(){
    return (
        <div>
            <div className='narrator'>Welcome Admin!</div>
        </div>
    );
};
}
export default AdminScreen;