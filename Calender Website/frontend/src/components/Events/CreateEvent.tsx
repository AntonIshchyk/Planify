import React from 'react';
import axios from 'axios';
import { CreateEventState, initCreateEventState } from './CreateEvent.state';
import { toast } from 'react-toastify';
import apiClient from '../../ApiClient';

interface CreateEventProps {
}
export class CreateEvent extends React.Component<CreateEventProps, CreateEventState> {
    constructor(props: CreateEventProps) {
        super(props);
        this.state = initCreateEventState;
    }
    handleCreateEvent = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await apiClient.post(
                'http://localhost:3000/Calender-Website/create-event',
                {
                    "Title": this.state.title,
                    "Description": this.state.description,
                    "Date": this.state.date,
                    "StartTime": this.state.startTime,
                    "EndTime": this.state.endTime,
                    "Location": this.state.location,
                    "AdminApproval": this.state.adminApproval
                },
                { withCredentials: true }
            );
            toast.info(response.data);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data); // Displays "Event already exists."
            } else {
                toast.error('An error occurred. Please try again.');
            }
        }
    }
    render() {
        return (
            <div>
                <h2>Create Event</h2>
                <form onSubmit={this.handleCreateEvent}>
                    Title:
                    <input
                        type="text"
                        value={this.state.title}
                        onChange={(e) => this.setState(this.state.updateField("title", e.target.value))}
                        required />
                    <br />
                    Description:
                    <textarea
                        placeholder="text"
                        value={this.state.description}
                        onChange={(e) => this.setState(this.state.updateField("description", e.target.value))}
                    />
                    <br />
                    Location:
                    <input
                        type="text"
                        value={this.state.location}
                        onChange={(e) => this.setState(this.state.updateField("location", e.target.value))}
                        required />
                    <br />
                    Date:
                    <input
                        type="date"
                        value={this.state.date}
                        onChange={(e) => this.setState(this.state.updateField("date", e.target.value))}
                        required />
                    <br />
                    Start Time:
                    <input
                        type="time"
                        value={this.state.startTime}
                        onChange={(e) => this.setState(this.state.updateField("startTime", e.target.value))}
                        required />
                    <br />
                    End Time:
                    <input
                        type="time"
                        value={this.state.endTime}
                        onChange={(e) => this.setState(this.state.updateField("endTime", e.target.value))}
                        required />
                    <br />
                    <label>
                        Admin Approval:
                        <input
                            type="checkbox"
                            checked={this.state.adminApproval}
                            onChange={(e) => this.setState(this.state.updateField("adminApproval", e.target.checked))} />
                    </label>
                    <br />
                    <button type="submit">Create Event</button>
                </form>
            </div>
        );
    }
}

export default CreateEvent