import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { EventAttendanceesListState, initEventAttendanceesListState } from './EventAttendanceesList.state';

interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    adminApproval: boolean;
}

export class EventAttendanceesList extends React.Component<{}, EventAttendanceesListState>{
    constructor(props : {}){
        super(props);
        this.state = initEventAttendanceesListState;
        
    }
    async handleDelete(id: string){
        try{
            const response = await axios.delete(
                'http://localhost:3000/Calender-Website/delete-event-attendance',
                {
                    withCredentials: true,
                    data: {
                        eventId: id
                    }
                }
            )
            localStorage.setItem('message', id);
            window.location.reload();
            window.dispatchEvent(new Event('storageUpdated'));
        }
        catch(error){
            if(axios.isAxiosError(error) && error.response){
                toast.error(error.response.data)
            }
            else {
                toast.error('An error occurred. Please try again.');
            }
        }
    }
    componentDidMount() {
        // Fetch data when the component mounts
        this.fetchEvents();
    }
    fetchEvents = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/Calender-Website/get-attending-events',
                { withCredentials: true }
            );
            this.setState(this.state.updateEvents(response.data));
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data);
            } else {
                toast.error('An error occurred. Please try again.');
            }
        }
    };
 // Empty dependency array to run once when the component mounts
    render(){
    return (
        <div>
            {this.state.events.length <= 0 ? (
                <p>No events found.</p>) : 
                (this.state.events.map((event) => (
                    <div key={event.id}>
                        <h3>{event.title}</h3>
                        <p><strong>Description: </strong>{event.description}</p>
                        <p><strong>Date: </strong>{event.date}</p>
                        <p><strong>Start time: </strong>{event.startTime}</p>
                        <p><strong>End time: </strong>{event.endTime}</p>
                        <p><strong>Location: </strong>{event.location}</p>
                        <p><strong>Approval: </strong>{event.adminApproval ? 'Approved' : 'Pending'}</p>
                        <button type="button" onClick={() => this.handleDelete(event.id)}>
                            Remove Attendancee
                            </button>
                        <br />
                    </div>
                ))
            )}
        </div>
    );
}
}
export default EventAttendanceesList;
