import React from 'react';
import axios from 'axios';
import { EventListState, initEventListState } from './EventList.state';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import apiClient from '../../ApiClient';

interface EventListProps {
    onBacktoMenuClick: () => void;
    isAdminLogin: boolean;
    isLoggedIn: boolean;
}

export class EventList extends React.Component<EventListProps, EventListState>{
    constructor(props: EventListProps){
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
                    </div>
                ))
            )}
        </div>
    );
}
}
export default EventList;
export {};
