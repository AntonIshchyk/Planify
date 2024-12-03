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

    componentDidMount() {
        this.fetchFriends(); // Fetch friends on component mount
    }

    fetchFriends = async () => {
        try 
        {
            const response = await axios.get(
                'http://localhost:3000/Calender-Website/friends',
                { withCredentials: true }
            );

            const friendIds: string[] = response.data;

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
            </div>
        );
    }
}

export default Friends;