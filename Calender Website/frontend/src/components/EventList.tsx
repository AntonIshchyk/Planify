import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

const EventList: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [message, setMessage] = useState('');

    const handleEventList = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await axios.get(
                'http://localhost:3000/Calender-Website/get-all-events',
                { withCredentials: true }
            );
            setEvents(response.data);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setMessage(error.response.data); // Displays "Event already exists."
            } else {
                setMessage('An error occurred. Please try again.');
            }
        }
        if (events.length === 0) {
            setMessage('No events found.');
        }
    }
    return (
        <div>
            <h2>Event List</h2>
            <form onSubmit={handleEventList}>
                <button type="submit">Get All Events</button>
            </form>
            {events && events.map((event) => (
                <div key={event.id}>
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                    <p>{event.date}</p>
                    <p>{event.startTime}</p>
                    <p>{event.endTime}</p>
                    <p>{event.location}</p>
                    <p>{event.adminApproval ? 'Approved' : 'Pending'}</p>
        </div>
            ))}
        </div>);}
export default EventList;