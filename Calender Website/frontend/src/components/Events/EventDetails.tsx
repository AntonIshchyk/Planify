import React from 'react';
import axios from 'axios';
import { EventListState, initEventListState } from './EventList.state';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { EventDetailsState, initEventDetailsState } from './EventDetails.state';
import { useParams } from 'react-router-dom';
import apiClient from '../../ApiClient';
interface EventDetailsProps {
    onBacktoMenuClick: () => void;
    isAdminLogin: boolean;
    isLoggedIn: boolean;
    params: {
        eventId : string;
    }
};
export function withRouter(Component: any) {
    return function WrappedComponent(props: any) {
        const params = useParams();
        return <Component {...props} params={params} />;
    };
}

export class EventDetails extends React.Component<EventDetailsProps, EventDetailsState>{
    constructor(props: EventDetailsProps){
        super(props);
        this.state = initEventDetailsState;
        
    }
    handleDeleteEvent = async () => {

        try{
            const response = await apiClient.delete(
                `http://localhost:3000/Calender-Website/delete-event?id=${this.state.event.id}`,
                { withCredentials: true}
            );
            
            localStorage.setItem('message', response.data);
            window.location.reload();
            window.dispatchEvent(new Event('storageUpdated'));
            window.location.href = '/get-all-events'
        }catch(error){
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data);
            } else {
                toast.error('An error occurred. Please try again.');
            }
        }
    }
    handleFeedbackSent = async () => {
        try{
            const response = await apiClient.post(
                'http://localhost:3000/Calender-Website/review',
                {
                    "EventId" : this.state.event.id,
                    "Rating" : this.state.rating,
                    "Feedback" : this.state.feedback
                },
                { withCredentials: true
                }
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

    handleEventAttend = async () => {
        try{
            const response = await apiClient.post(
                'http://localhost:3000/Calender-Website/EventAttendance',
                {
                    "EventId" : this.state.event.id
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
    approve = async () => {
        try{
        const response = await apiClient.put(
            `http://localhost:3000/Calender-Website/approve-event?eventId=${this.state.event.id}`,
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
    fetchEvents = async () => {
        try {
            const responseevent = await apiClient.get(
                `http://localhost:3000/Calender-Website/get-event?id=${this.props.params.eventId}`,
                {withCredentials:true}
            )
            this.setState(this.state.updateEvent(responseevent.data))
            const response = await apiClient.get(
                'http://localhost:3000/Calender-Website/get-all-events',
                { withCredentials: true }
            );
            const attending = await apiClient.get(
                'http://localhost:3000/Calender-Website/IsAttending',
                { withCredentials: true }
            );
            this.setState(this.state.updateAttending(attending.data));
                    const rating = await apiClient.get(
                        `http://localhost:3000/Calender-Website/average-rating?eventId=${this.props.params.eventId}`,
                        { withCredentials: true }
                    );
            this.setState(this.state.updateAverageRatings(rating.data));
                }
         catch (error ) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data);
            } 
            else {
                toast.error('An error occurred. Please try again.');
            }
        }
    };
 // Empty dependency array to run once when the component mounts
    render(){
    return (
        <div>
                        <h3>{this.state.event.title}</h3>
                        <p><strong>Description: </strong>{this.state.event.description}</p>
                        <p><strong>Date: </strong>{this.state.event.date}</p>
                        <p><strong>Start time: </strong>{this.state.event.startTime}</p>
                        <p><strong>End time: </strong>{this.state.event.endTime}</p>
                        <p><strong>Location: </strong>{this.state.event.location}</p>
                        <p><strong>Rating: {this.state.averageRatings}</strong></p>
                        <p><strong>Approval: </strong>{this.state.event.adminApproval ? 'Approved' : 'Pending'}</p>
                        {this.props.isAdminLogin && !this.state.event.adminApproval && (<form onSubmit={(e) => {
                            e.preventDefault();
                            this.approve()
                        }}>
                        <button type="submit">Approve</button>
                        </form>
                        )}
                        {this.props.isAdminLogin && (<form onSubmit={(e) => {
                            e.preventDefault();
                            this.handleDeleteEvent()
                        }}>
                        <button type="submit">Delete</button>
                        </form>
                        )}
                        {this.props.isLoggedIn && this.state.event.adminApproval && !this.state.attending.includes(this.state.event.id)  && (<form onSubmit={(e) => {
                            e.preventDefault();
                            this.handleEventAttend()
                        }}>
                        <button type="submit">Attend</button>
                        </form>
                        )}
                        {this.props.isAdminLogin && (<li>
                            <Link to={`/update-event/${this.state.event.id}`}>Update event</Link> <br />
                            <Link to={`/show-attendances/${this.state.event.id}/${this.state.event.title}`}>See Attendancees</Link>

                        </li>
                        )}
                {this.state.attending.includes(this.state.event.id) &&
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.handleFeedbackSent()
                }}>
                Rating: 
                <input
                    type="number"
                    step="0.5"
                    value={this.state.rating}
                    onChange={(e) =>{
                        const value = Math.min(5, Math.max(0, Number(e.target.value))) 
                        this.setState(this.state.updateRating(value))
                    }}
                    required />
                <br />
                Feedback:
                <textarea
                    placeholder="feedback"
                    value={this.state.feedback}
                    onChange={(e) => 
                        this.setState(this.state.updateFeedback(e.target.value))}
                />
                <br />
                <button type="submit">Send Feedback</button>
            </form>
    }
                        <br />  
                    </div>
                )
            }
        }
export default withRouter(EventDetails);
export {};
