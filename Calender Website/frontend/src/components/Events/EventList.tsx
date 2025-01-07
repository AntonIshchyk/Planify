import React from 'react';
import axios from 'axios';
import { EventListState, initEventListState } from './EventList.state';
import { toast } from 'react-toastify';
import Modal from './FriendsAttendingEvent';
import apiClient from '../../ApiClient';
import { Link, useNavigate } from 'react-router-dom';

interface EventListProps {
    onBacktoMenuClick: () => void;
    isAdminLogin: boolean;
    isLoggedIn: boolean;
    navigate: (path: string) => void;
}

export class EventList extends React.Component<EventListProps, EventListState> {
    constructor(props: EventListProps) {
        super(props);
        this.state = initEventListState;
    }

    handleChangeAverageRating = async (eventId : string, averageRating : number) => {
        this.setState(this.state.updateAverageRatings(eventId, averageRating))
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
                    "Location": this.state.location,
                    "AdminApproval": this.state.adminApproval
                },
                { withCredentials: true }
            );
            this.setState(this.state.updateField("events", response.data));
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
            const response = await apiClient.get(
                'http://localhost:3000/Calender-Website/get-all-events',
                { withCredentials: true }
            );
            this.setState(this.state.updateEvents(response.data));
            const ratings = await Promise.all(
                response.data.map(async (event: { id: string }) => {
                    const ratingResponse = await apiClient.get(
                        `http://localhost:3000/Calender-Website/average-rating?eventId=${event.id}`,
                        { withCredentials: true }
                    );
                    return { eventId: event.id, rating: ratingResponse.data };
                })
            );
    
            // Update state with the ratings
            ratings.forEach(({ eventId, rating }) => {
                this.setState(this.state.updateAverageRatings(eventId, rating));
            });
        } catch (error ) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data);
            } 
            else {
                toast.error('An error occurred. Please try again.');
            }
        }
    };

 // Empty dependency array to run once when the component mounts
 fetchFriendsAttending = async (eventId: string) => {
        try {
            const response = await axios.get(
                `http://localhost:3000/Calender-Website/event-friends?eventId=${eventId}`,
                { withCredentials: true }
            );
            this.setState(this.state.updateField("friendsAttending", response.data));
            this.setState(this.state.updateField("isModalOpen", true)); // Open the modal
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data);
            } else {
                toast.error('An error occurred while fetching friends attending.');
            }
        }
    };

    closeModal = () => {
        this.setState(this.state.updateField("isModalOpen", false)); // Close the modal
    };

    render(){
    return (
        <div>
            {this.state.events.length <= 0 ? (
                <p>No events found.</p>) : 
                (this.state.events.map((event) => (
                    <div key={event.id}>
                        <li>
                            <Link to={`/show-event/${event.id}`}><h3>{event.title}</h3></Link>
                        </li>
                        {this.state.averageRatings.get(event.id)}
                        {this.props.isLoggedIn && (
                                <button onClick={() => this.fetchFriendsAttending(event.id)}>
                                    See Friends Attending
                                </button>
                            )}
                            <br />
                    </div>
                ))
            )}
            {/* Render the Modal with the list of friends attending */}
                <Modal
                    isOpen={this.state.isModalOpen}
                    onClose={this.closeModal}
                    friends={this.state.friendsAttending}
                />
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
