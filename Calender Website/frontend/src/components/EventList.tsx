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

    useEffect(() => {
        // Fetch data when the component mounts
        const fetchEvents = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:3000/Calender-Website/get-all-events',
                    { withCredentials: true }
                );
                setEvents(response.data);
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    setMessage(error.response.data);
                } else {
                    setMessage('An error occurred. Please try again.');
                }
            }
        };

        fetchEvents();
    }, []); // Empty dependency array to run once when the component mounts

    return (
        <div>
            {message && <p>{message}</p>}
            {events.length <= 0 ? (
                <p>No events found.</p>) : 
                (events.map((event) => (
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
                ))
            )}
        </div>
    );
};

export default EventList;
