import React, { useState } from 'react';
import axios from 'axios';

const CreateEvent: React.FC = () => {
    const [Title, setTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [Date, setDate] = useState('');
    const [StartTime, setStartTime] = useState('');
    const [EndTime, setEndTime] = useState('');
    const [Location, setLocation] = useState('');
    const [message, setMessage] = useState('');

    const handleCreateEvent = async (event : React.FormEvent) => {
        event.preventDefault();

        try{
            const response = await axios.post(
                'http://localhost:3000/Calender-Website/create-event',
                {
                    "Title": Title,
                    "Description": Description,
                    "Date": Date,
                    "StartTime": StartTime,
                    "EndTime": EndTime,
                    "Location": Location
                }
            );
            setMessage(response.data);
        }catch(error){
            if (axios.isAxiosError(error) && error.response) {
                setMessage(error.response.data); // Displays "Event already exists."
            } else {
                setMessage('An error occurred. Please try again.');
            }
        }
    }
    return (
        <div>
            <h2>Create Event</h2>
            <form onSubmit={handleCreateEvent}>
                <label>
                    Title:
                    <input
                        type="title"
                        value={Title}
                        onChange={(e) => setTitle(e.target.value)}
                        required />
                </label>
                <br />
                <label>
                    Description:
                    <input
                        type="description"
                        value={Description}
                        onChange={(e) => setDescription(e.target.value)}
                        required />
                </label>
                <br />
                <label>
                    Date:
                    <input
                        type="date"
                        value={Date}
                        onChange={(e) => setDate(e.target.value)}
                        required />
                </label>
                <br />
                <label>
                    Start Time:
                    <input
                        type="time"
                        value={StartTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required />
                </label>
                <br />
                <label>
                    End Time:
                    <input
                        type="time"
                        value={EndTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required />
                </label>
                <br />
                <label>
                    Location:
                    <input
                        type="location"
                        value={Location}
                        onChange={(e) => setLocation(e.target.value)}
                        required />
                </label>
                <br />
                <button type="submit">Create Event</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default CreateEvent;