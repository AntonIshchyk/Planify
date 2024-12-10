"use client";
import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AttendEventState, initAttendEventState } from './AttendEvent.state';

interface AttendEventProps{
}
export class AttendEvent extends React.Component<AttendEventProps, AttendEventState> {
    constructor(props: AttendEventProps){
        super(props);
        this.state = initAttendEventState;
    }
    handleEventAttend = async (event : React.FormEvent) => {
        event.preventDefault();
        try{
            const response = await axios.post(
                'http://localhost:3000/Calender-Website/EventAttendance',
                {
                    "EventId" : this.state.EventId
                },
                { withCredentials: true }
            );
            toast.info(response.data);
        }catch(error){
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data); // Displays "Event already exists."
            } else {
                toast.error('An error occurred. Please try again.');
            }
        }
    }
    render(){
    return (
        <div>
            <h2>Attend</h2>
            <form onSubmit={this.handleEventAttend}>
                EventId:
                <input
                    type="text"
                    value={this.state.EventId}
                    onChange={(e) => this.setState(this.state.updateField("EventId", e.target.value))}
                    required />
                <br />
                <button type="submit">Attend</button>
            </form>
        </div>
    );
}
}

export default AttendEvent