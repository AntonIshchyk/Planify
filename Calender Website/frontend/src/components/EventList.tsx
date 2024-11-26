import React, { useState } from 'react';
import axios from 'axios';
import { EventListState, initEventListState } from './EventList.state';
import { AppState } from '../App.state';
import { toast } from 'react-toastify';

interface EventListProps{
}
export class EventList extends React.Component<EventListProps, EventListState> {
    constructor(props: EventListProps){
        super(props);
        this.state = initEventListState
    }
    handleEventList = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await axios.get(
                'http://localhost:3000/Calender-Website/get-all-events',
                { withCredentials: true }
            );
            this.setState(this.state.updateEvents(response.data));
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data); // Displays "Event already exists."
            } else {
                toast.error('An error occurred. Please try again.');
            }
        }
        if (this.state.events.length === 0) {
            toast.error('No events found.');
        }
    }
    render(){
    return (
        <div>
            {this.state.events && this.state.events.map((event) => (
                <div key={event.id}>
                    <h3>{event.title}</h3>
                    <p><strong>Description: </strong>{event.description}</p>
                    <p><strong>Date: </strong>{event.date}</p>
                    <p><strong>Start time: </strong>{event.startTime}</p>
                    <p><strong>End time: </strong>{event.endTime}</p>
                    <p><strong>Location: </strong>{event.location}</p>
                    <p><strong>Approval: </strong>{event.adminApproval ? 'Approved' : 'Pending'}</p>
                    <br />
        </div>
            ))}
        </div>);}
}
export default EventList;