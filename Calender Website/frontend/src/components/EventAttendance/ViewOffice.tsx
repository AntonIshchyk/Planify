import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import apiClient from '../../ApiClient';
import { initViewOfficeState, ViewOfficeState } from './ViewOffice.state';

interface ViewOfficeProps {
}

export class ViewOffice extends React.Component<ViewOfficeProps, ViewOfficeState> {
    constructor(props: ViewOfficeProps) {
        super(props);
        this.state = initViewOfficeState;
    }

    componentDidMount() {
        // Fetch data when the component mounts
        this.fetchAttendances();
    }
    async handleDelete(id: string) {
        const isConfirmed = window.confirm("Are you sure you want to delete this attendance?");
        if (!isConfirmed) return;

        try {
            const response = await axios.delete(
                `http://localhost:3000/Calender-Website/delete-attendance?id=${id}`,
                {
                    withCredentials: true
                }
            )
            localStorage.setItem('message', response.data);
            window.location.reload();
            window.dispatchEvent(new Event('storageUpdated'));
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data)
            }
            else {
                toast.error('An error occurred. Please try again.');
            }
        }
    }
    fetchAttendances = async () => {
        try {
            const response = await apiClient.get(
                'http://localhost:3000/Calender-Website/check-own-attendances',
                { withCredentials: true }
            );
            this.setState(this.state.updateAttendances(response.data));
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data);
            }
            else {
                toast.error('An error occurred. Please try again.');
            }
        }
    };

    render() {
        return (
            <div>
                {this.state.attendances.length <= 0 ? (
                    <p>No attendances found.</p>) :
                    (this.state.attendances.map((attendance) => (
                        <div key={attendance.id}>
                            {attendance.date.slice(0, -6).replace("T", " ")}
                            <br />
                            <button type="button" onClick={() => this.handleDelete(attendance.id)}>
                                Remove Attendancee
                            </button>
                            <br />
                            <br />
                        </div>

                    )))
                }


            </div>
        );

    }
}

export default ViewOffice;
