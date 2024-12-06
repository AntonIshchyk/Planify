import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { initViewAttendanceesState, ViewAttendanceesState } from './ViewAttendancees.state';
interface ViewAttendanceesProps {
    eventId : string;
    title : string;
}
export class ViewAttendancees extends React.Component<ViewAttendanceesProps, ViewAttendanceesState>{
    constructor(props : ViewAttendanceesProps){
        super(props);
        this.state = initViewAttendanceesState;
    }
    componentDidMount() {
        // Fetch data when the component mounts
        this.fetchEvents();
    }
    fetchEvents = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/Calender-Website/get-attendances-of-event',
                { withCredentials: true }
            );
            this.setState(this.state.updateAttendancees(response.data));
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data);
            } else {
                toast.error('An error occurred. Please try again.');
            }
        }
    };
 // Em
 // Empty dependency array to run once when the component mounts
    render(){
    return (
        <div>
             {this.state.attendancees.length <= 0 ? (
                <p>No attendances found.</p>) : 
                (this.state.attendancees.map((attendance) => (
                    <div key={attendance}>
                        <h3>{}</h3>
                        <p><strong></strong>{attendance}</p>
                        <br />  
                    </div>
                ))
            )}
        </div>
    );
}
}
export default ViewAttendancees;
