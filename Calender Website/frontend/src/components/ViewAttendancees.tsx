import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { initViewAttendanceesState, ViewAttendanceesState } from './ViewAttendancees.state';
import { useParams } from 'react-router-dom';
export function withRouter(Component: any) {
    return function WrappedComponent(props: any) {
        const params = useParams();
        return <Component {...props} params={params} />;
    };
}

interface ViewAttendanceesProps {
    params: {
        eventId: string;
        title?: string;
    };
}

export class ViewAttendancees extends React.Component<ViewAttendanceesProps, ViewAttendanceesState> {
    constructor(props: ViewAttendanceesProps) {
        super(props);
        this.state = initViewAttendanceesState;
    }
    
    componentDidMount() {
        // Fetch data when the component mounts
        this.fetchAttendances();
    }

    fetchAttendances = async () => {
        const  eventId  = this.props.params.eventId; // Access eventId from params
        try {
            const response = await axios.get(
                `http://localhost:3000/Calender-Website/EventAttendanceofEvent?Id=${eventId}`,
                { withCredentials: true }
            );
            this.setState(this.state.updateAttendances(response.data));
            toast.info(this.state.attendances[1])

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data);
            } else {
                toast.error('An error occurred. Please try again.');
            }
        }
    };

    render() {
        if (!Array.isArray(this.state.attendances)) {
            return <p>Invalid data type for attendance list.</p>;
        }
    
        return (
            <div>
                {this.state.attendances.length > 0 ? (
                    this.state.attendances.map((attendance) => (
                        <div key={attendance.Id}>
                            <h3>Attendance Details</h3>
                            <p><strong>Attendee:</strong> {attendance.User}</p>
                            <br />
                        </div>
                    ))
                ) : (
                    <p>No attendances found.</p>
                )}
            </div>
        );
    }
    
}

export default withRouter(ViewAttendancees);
