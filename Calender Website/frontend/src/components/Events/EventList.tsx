import React from 'react';
import axios from 'axios';
import { EventListState, initEventListState } from './EventList.state';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Modal from './FriendsAttendingEvent';

interface EventListProps {
    onBacktoMenuClick: () => void;
    isAdminLogin: boolean;
    isUserLogin: boolean;
}

export class EventList extends React.Component<EventListProps, EventListState> {
    constructor(props: EventListProps) {
        super(props);
        this.state = initEventListState;
    }

    componentDidMount() {
        // Fetch data when the component mounts
        this.fetchEvents();
    }

    fetchEvents = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/Calender-Website/get-all-events',
                { withCredentials: true }
            );
            this.setState(this.state.updateField("events", response.data));
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data);
            } else {
                toast.error('An error occurred. Please try again.');
            }
        }
    };

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

    render() {
        return (
            <div>
                {this.state.events.length <= 0 ? (
                    <p>No events found.</p>
                ) : (
                    this.state.events.map((event) => (
                        <div key={event.id}>
                            <h3>{event.title}</h3>
                            <p><strong>Description: </strong>{event.description}</p>
                            <p><strong>Date: </strong>{event.date}</p>
                            <p><strong>Start time: </strong>{event.startTime}</p>
                            <p><strong>End time: </strong>{event.endTime}</p>
                            <p><strong>Location: </strong>{event.location}</p>
                            <p><strong>Approval: </strong>{event.adminApproval ? 'Approved' : 'Pending'}</p>
                            
                            {this.props.isAdminLogin && (
                                <li>
                                    <Link to={`/show-attendances/${event.id}/${event.title}`}>
                                        See Attendance
                                    </Link>
                                </li>
                            )}

                            {this.props.isUserLogin && (
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

export default EventList;
export {};
