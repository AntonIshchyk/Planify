import React from 'react';
import axios from 'axios';
import { EventListState, initEventListState } from './EventList.state';
import { toast } from 'react-toastify';

interface EventListProps {
    onBacktoMenuClick: () => void;
    isAdminLogin: boolean;
    isUserLogin: boolean;
}

export class EventList extends React.Component<EventListProps, EventListState>{
    constructor(props: EventListProps){
        super(props);
        this.state = initEventListState;
        
    }
    componentDidMount() {
        // Fetch data when the component mounts
        this.fetchEvents();
    }
    async handleDelete(id: string) {
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
    fetchEvents = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/Calender-Website/get-all-events',
                { withCredentials: true }
            );
            this.setState(this.state.updateEvents(response.data));
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data);
            } else {
                toast.error('An error occurred. Please try again.');
            }
        }
    };
 // Empty dependency array to run once when the component mounts
    render(){
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
                        {this.props.isAdminLogin && <label><button onClick={() => this.handleDelete(event.id)}>Delete</button></label>}
                        <br />
                    </div>
                ))
            )}
        </div>
    );
}
}
export default EventList;
