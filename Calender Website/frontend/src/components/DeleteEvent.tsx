import React from 'react';
import axios from 'axios';
import { DeleteEventState, initDeleteEventState } from './DeleteEvent.state';
import { toast } from 'react-toastify';

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
            const response = await axios.delete(
                `http://localhost:3000/Calender-Website/delete-event`,
                {
                    withCredentials: true,
                    data: {
                        id: this.state.id
                    }
                }
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
                        onChange={(e) => this.setState(this.state.updateId(e.target.value))}
                    />
                </label>
                <br />
                <button type="submit">Delete Event</button>
            </form>
        </div>
    )
}}

export default DeleteEvent;