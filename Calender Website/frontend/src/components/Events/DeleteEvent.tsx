import React from 'react';
import axios from 'axios';
import { DeleteEventState, initDeleteEventState } from './DeleteEvent.state';
import { toast } from 'react-toastify';
import apiClient from '../../ApiClient';

interface DeleteEventProps {
}
export class DeleteEvent extends React.Component<DeleteEventProps, DeleteEventState> {
    constructor(props: DeleteEventProps) {
        super(props);
        this.state = initDeleteEventState;
    }
    handleDeleteEvent = async (event : React.FormEvent) => {
        event.preventDefault();

        try{
            const response = await apiClient.delete(
                `http://localhost:3000/Calender-Website/delete-event?id=${this.state.id}`,
                { withCredentials: true}
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
            <h1>Delete Event</h1>
            <form onSubmit={this.handleDeleteEvent}>
                <label>
                    Event ID:
                    <textarea
                        placeholder="text"
                        value={this.state.id}
                        onChange={(e) => this.setState(this.state.updateField("id", e.target.value))}
                    />
                </label>
                <br />
                <button type="submit">Delete Event</button>
            </form>
        </div>
    )
}}

export default DeleteEvent;