import React from "react";
import { FriendsState, initFriendsState } from "./Friends.state";
import { toast } from 'react-toastify';
import axios from 'axios';


export class Friends extends React.Component<{}, FriendsState>
{
    constructor(props : {})
    {
        super(props);
        this.state = initFriendsState;   
    }

    // Fetch data on component mount
    componentDidMount() {
        this.fetchFriends();
        this.fetchFriendsRequests();
    }

    fetchFriends = async () => {
        try 
        {
            const response = await axios.get(
                'http://localhost:3000/Calender-Website/friends',
                { withCredentials: true }
            );

            const friendIds: string[] = response.data;

            if (friendIds.length === 0) {
                this.setState(this.state.updateFriends([]));
                return;
            }
            
            // Fetch details for each friend
            const friendsResponse = await axios.get(
                `http://localhost:3000/Calender-Website/get-many-users-by-id?${friendIds.map(id =>`Ids=${id}`).join('&')}`,
                { withCredentials: true }
            );

            this.setState(this.state.updateFriends(friendsResponse.data));
        } 
        catch (error) 
        {
            if (axios.isAxiosError(error) && error.response) 
            {
                toast.error(error.response.data);
            } 
            else 
            {
                toast.error('An error occurred. Please try again.');
            }
        }
    };

    fetchFriendsRequests = async () => {
        try 
        {
            const response = await axios.get(
                'http://localhost:3000/Calender-Website/friend-requests',
                { withCredentials: true }
            );

            const RequestSourceIds: string[] = response.data;

            if (RequestSourceIds.length === 0) {
                this.setState(this.state.updateFriends([]));
                return;
            }

            // Fetch details for each friend
            const RequestsResponse = await axios.get(
                `http://localhost:3000/Calender-Website/get-many-users-by-id?${RequestSourceIds.map(id =>`Ids=${id}`).join('&')}`,
                { withCredentials: true }
            );

            this.setState(this.state.updateFriendRequests(RequestsResponse.data));
        } 
        catch (error) 
        {
            if (axios.isAxiosError(error) && error.response) 
            {
                toast.error(error.response.data);
            } 
            else 
            {
                toast.error('An error occurred. Please try again.');
            }
        }
    };

    render()
    {
        return (
            <div>
                <h1>Your Friends</h1>
                {this.state.friends.length <= 0 ? (
                <p>No Friends found.</p>) : 
                (this.state.friends.map(friend => (
                    <div key={friend.id}>
                        <h3>{friend.firstName}</h3>
                        <h3>{friend.lastName}</h3>
                        <h3>{friend.email}</h3>
                        <h3>Recurring Days {friend.recurringDays}</h3>
                        <h3>We could also show friends of our friend</h3>
                        <br />
                    </div>
                ))
            )}

                <div>
                <h1>Your Friend Requests</h1>
                    {this.state.requests.length <= 0 ? (
                    <p>No Requests found.</p>) : 
                    (this.state.friends.map(friend => (
                        <div key={friend.id}>
                            <h3>{friend.firstName}</h3>
                            <h3>{friend.lastName}</h3>
                            <h3>{friend.email}</h3>
                            <h3>Recurring Days {friend.recurringDays}</h3>
                            <h3>We could also show friends of our potential friend</h3>
                            <br />
                        </div>
                        ))
                    )}
                </div>
            </div>
        );
    }
}

export default Friends;