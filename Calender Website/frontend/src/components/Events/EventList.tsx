import React from 'react';
import axios from 'axios';
import { EventListState, initEventListState } from './EventList.state';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

interface EventListProps {
    onBacktoMenuClick: () => void;
    isAdminLogin: boolean;
    isUserLogin: boolean;
    navigate: (path: string) => void;
}

export class EventList extends React.Component<EventListProps, EventListState> {
    constructor(props: EventListProps) {
        super(props);
        this.state = initEventListState;

    }
    handleEventAttend = async (eventId : string) => {
        try{
            const response = await axios.post(
                'http://localhost:3000/Calender-Website/EventAttendance',
                {
                    "EventId" : eventId
                },
                { withCredentials: true }
            );
            localStorage.setItem('message', response.data);
            window.location.reload();
            window.dispatchEvent(new Event('storageUpdated'));
        }catch(error){
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data); // Displays "Event already exists."
            } else {
                toast.error('An error occurred. Please try again.');
            }
        }
    }
    approve = async (id : string) => {
        try{
        const response = await axios.put(
            `http://localhost:3000/Calender-Website/approve-event?eventId=${id}`,
            {},
            { withCredentials: true }
        );
            localStorage.setItem('message', "Event Approved");
            window.location.reload();
            window.dispatchEvent(new Event('storageUpdated'));
    }catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            toast.error(error.response.data);
        } else {
            toast.error('An error occurred. Please try again.');
        }
    }
    }
    componentDidMount() {
        // Fetch data when the component mounts
        this.fetchEvents();
    }
    async handleDelete(id: string) {
        const isConfirmed = window.confirm("Are you sure you want to delete this event?");
        if (!isConfirmed) return;

        try {
            const response = await axios.delete(
                `http://localhost:3000/Calender-Website/delete-event?id=${id}`,
                {
                    withCredentials: true
                }
            )
            localStorage.setItem('message', id);
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

    handleUpdateEvent = async (id: string, event: React.FormEvent) => {

        event.preventDefault()
        try {
            const response = await axios.put(
                `http://localhost:3000/Calender-Website/update-event?id=${id}`,
                {
                    "Id": id,
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
            window.location.reload();
            this.props.navigate('/update-event');
            window.location.reload();
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data);
            } else {
                toast.error('An error occurred. Please try again.');
            }
        }
    }
    fetchEvents = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/Calender-Website/get-all-events',
                { withCredentials: true }
            );

            console.log(this.props.isAdminLogin ? 'Fetching all events...' : 'Fetching your events...');
            this.setState(this.state.updateEvents(response.data));

            const attending = await axios.get(
                'http://localhost:3000/Calender-Website/IsAttending',
                { withCredentials: true }
            );
            this.setState(this.state.updateField("attending",attending.data));
            this.setState(this.state.updateField("events", response.data));

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data);
            } else {
                toast.error('An error occurred. Please try again.');
            }
        }
    };

    // Empty dependency array to run once when the component mounts
    render() {
        return (
            <div>
                {this.state.events.length <= 0 ? (
                    <p>No events found.</p>) :
                    (this.state.events.map((event) => (
                        <div key={event.id}>
                            <h3>{event.title}</h3>
                            <p><strong>Description: </strong>{event.description}</p>
                            <p><strong>Date: </strong>{event.date}</p>
                            <p><strong>Start time: </strong>{event.startTime}</p>
                            <p><strong>End time: </strong>{event.endTime}</p>
                            <p><strong>Location: </strong>{event.location}</p>
                            <p><strong>Approval: </strong>{event.adminApproval ? 'Approved' : 'Pending'}</p>
                            {this.props.isAdminLogin && <label><button type="submit" onClick={() => this.handleDelete(event.id)}>Delete</button></label>}
                            {this.props.isAdminLogin && !event.adminApproval && (<form onSubmit={(e) => {
                               e.preventDefault();
                               this.approve(event.id)
                            }}>
                            <button type="submit">Approve</button>
                            </form>
                            )}
                            {this.props.isLoggedIn && event.adminApproval && !this.state.attending.includes(event.id)  && (<form onSubmit={(e) => {
                            e.preventDefault();
                            this.handleEventAttend(event.id)
                        }}>
                        <button type="submit">Attend</button>
                        </form>
                        )}
                            {this.props.isAdminLogin && (<li>
                                <Link to={`/update-event/${event.id}`}>Update event</Link> <br />
                                <Link to={`/show-attendances/${event.id}/${event.title}`}>See Attendancees</Link>

                            </li>
                            )}
                            <br />
                        </div>
                    ))
                    )}
            </div>
        );
    }
}

function withNavigation(Component: typeof EventList) {
    return function Wrapper(props: Omit<EventListProps, 'navigate'>) {
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate} />;
    };
}

export default withNavigation(EventList);
