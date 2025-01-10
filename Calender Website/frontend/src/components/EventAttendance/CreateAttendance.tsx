import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CreateAttendanceState, initCreateAttendanceState } from './CreateAttendance.state';
import apiClient from '../../ApiClient';

interface CreateAttendanceProps {
}
export class CreateAttendance extends React.Component<CreateAttendanceProps, CreateAttendanceState> {
    constructor(props: CreateAttendanceProps) {
        super(props);
        this.state = initCreateAttendanceState;
    }
    handleAttend = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await apiClient.post(
                'http://localhost:3000/Calender-Website/attend',
                {
                    "Date": new Date(this.state.dateTime).toISOString(),
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
                <h2>Attend</h2>
                <form onSubmit={this.handleAttend}>
                    Time:
                    <input
                        type="datetime-local"
                        value={this.state.dateTime}
                        onChange={(e) => this.setState(this.state.updateField("dateTime", e.target.value))}
                        required />
                    <br />
                    <button type="submit">Attend</button>
                </form>
            </div>
        );
    }
}

export default CreateAttendance