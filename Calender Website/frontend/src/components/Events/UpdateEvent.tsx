import React from 'react';
import axios from 'axios';
import { initUpdateEventState, UpdateEventState } from './UpdateEvent.state';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiClient from '../../ApiClient';
interface UpdateEventProps {
}
export class UpdateEvent extends React.Component<UpdateEventProps, UpdateEventState>{
    constructor(props: UpdateEventProps){
        super(props);
        this.state = initUpdateEventState;
    }
    handleUpdateEvent = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await apiClient.put(
                'http://localhost:3000/Calender-Website/update-event',
                {
                    "Id": this.state.id,
                    "Title": this.state.title,
                    "Description": this.state.description,
                    "Date": this.state.date,
                    "StartTime": this.state.startTime,
                    "EndTime": this.state.endTime,
                    "Location": this.state.adminApproval,
                    "AdminApproval": this.state.adminApproval
                },
                { withCredentials: true }
            );
            toast.info(response.data);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data);
            } else {
                toast.error('An error occurred. Please try again.');
            }
        }
    }
    render(){
    return (
        <div>
            <h2>Update Event</h2>
            <form onSubmit={this.handleUpdateEvent}>
                Id:
                <textarea
                    placeholder="Id"
                    value={this.state.id}
                    onChange={(e) => this.setState(this.state.updateField("id", e.target.value))}
                    required />
                <br />
                Title:
                <input
                    type="text"
                    value={this.state.title}
                    onChange={(e) => this.setState(this.state.updateField("title", e.target.value))}
                    required />
                <br />
                Description:
                <textarea
                    placeholder="Description"
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
                <button type="submit">Update Event</button>
            </form>
        </div>
    );
}
}

export default UpdateEvent;