import React, { useState } from 'react';
import axios from 'axios';

const DeleteEvent: React.FC = () => {
    const [Id, SetId] = useState('');
    const [message, setMessage] = useState('');

    const handleDeleteEvent = async (event : React.FormEvent) => {
        event.preventDefault();

        try{
            const response = await axios.delete(
                `http://localhost:3000/Calender-Website/delete-event`,
                {
                    withCredentials: true,
                    params: Id
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
            <h1>Delete Event</h1>
            <form onSubmit={handleDeleteEvent}>
                <label>
                    Event ID:
                    <textarea
                        placeholder="text"
                        value={Id}
                        onChange={(e) => SetId(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Delete Event</button>
            </form>
            <p>{message}</p>
        </div>
    )
}

export default DeleteEvent;