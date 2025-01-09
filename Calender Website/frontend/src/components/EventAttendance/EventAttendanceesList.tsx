import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { EventAttendanceesListState, initEventAttendanceesListState } from './EventAttendanceesList.state';
import apiClient from '../../ApiClient';
import { Link } from 'react-router-dom';

export class EventAttendanceesList extends React.Component<{}, EventAttendanceesListState>{
    constructor(props : {}){
        super(props);
        this.state = initEventAttendanceesListState;
        
    }
    async handleDelete(id: string){
        try{
            const response = await apiClient.delete(
                `http://localhost:3000/Calender-Website/delete-event-attendance?eventId=${id}`,
                {
                    withCredentials: true
                }
            )
            localStorage.setItem('message', response.data);
            window.location.reload();
            window.dispatchEvent(new Event('storageUpdated'));
        }
        catch(error){
            if(axios.isAxiosError(error) && error.response){
                toast.error(error.response.data)
            }
            else {
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
            const response = await apiClient.get(
                'http://localhost:3000/Calender-Website/get-attending-events',
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
 // Empty dependency array to run once when the component mounts
    render(){
    return (
        <div>
            {this.state.events.length <= 0 ? (
                <p>No attendances found.</p>) : 
                (this.state.events.map((event) => (
                    <div key={event.id}>
                        <Link to={`/show-event/${event.id}`}><h3>{event.title}</h3></Link>
                        <button type="button" onClick={() => this.handleDelete(event.id)}>
                            Remove Attendancee
                            </button>
                        <br />
                    </div>
                ))
            )}
        </div>
    );
}
}
export default EventAttendanceesList;
