import React from "react";
import { FriendsState, initFriendsState } from "./Friends.state";
import { toast } from 'react-toastify';
import axios from 'axios';
import './Friends.css';

export class Friends extends React.Component<{}, FriendsState> {
    constructor(props: {}) {
        super(props);
        this.state = initFriendsState;
    }

    // Fetch data on component mount
    componentDidMount() {
        this.fetchFriends();
        this.fetchFriendsRequests();
        this.fetchSessionId();
    }

    fetchSessionId = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/Calender-Website/get-session-id',
                { withCredentials: true }
            );
            const sessionId = response.data;
            this.setState(this.state.updateField("sessionId", sessionId));
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data);
            } else {
                toast.error('Failed to retrieve session ID. Please try again.');
            }
        }
    };


    fetchFriends = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/Calender-Website/friends',
                { withCredentials: true }
            );

            const friendIds: string[] = response.data;

            if (friendIds.length === 0) {
                this.setState(this.state.updateField("friends", []));
                return;
            }

            // Fetch details for each friend
            const friendsResponse = await axios.get(
                `http://localhost:3000/Calender-Website/get-many-users-by-id?${friendIds.map(id => `Ids=${id}`).join('&')}`,
                { withCredentials: true }
            );

            this.setState(this.state.updateField("friends", friendsResponse.data));
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data);
            }
            else {
                toast.error('An error occurred. Please try again.');
            }
        }
    };

    fetchFriendsRequests = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/Calender-Website/friend-requests',
                { withCredentials: true }
            );

            const RequestSourceIds: string[] = response.data;

            if (RequestSourceIds.length === 0) {
                this.setState(this.state.updateField("requests", []));
                return;
            }

            // Fetch details for each friend
            const RequestsResponse = await axios.get(
                `http://localhost:3000/Calender-Website/get-many-users-by-id?${RequestSourceIds.map(id => `Ids=${id}`).join('&')}`,
                { withCredentials: true }
            );

            this.setState(this.state.updateField("requests", RequestsResponse.data));
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data);
            }
            else {
                toast.error('An error occurred. Please try again.');
            }
        }
    };


    deleteFriend = async (friendId: string) => {
        try {
            // Send DELETE request to remove the friend
            await axios.delete(
                `http://localhost:3000/Calender-Website/delete-friend?id=${friendId}`,
                { withCredentials: true }
            );

            // After deletion, remove the friend from the state
            this.setState({
                friends: this.state.friends.filter(friend => friend.id !== friendId),
            });

            toast.success('Friend deleted successfully!');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data);
            } else {
                toast.error('An error occurred. Please try again.');
            }
        }
    };

    fetchFindPeople = async (str: string) => {
        try {
            const response = await axios.get(
                `http://localhost:3000/Calender-Website/find-people?str=${str}`,
                { withCredentials: true }
            );
            this.setState(this.state.updateField("foundPeople", response.data));
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data);
            }
            else {
                toast.error('An error occurred. Please try again.');
            }
        }
    };

    handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchStr = e.target.value;
        this.setState(this.state.updateField("searchStr", searchStr));
        if (searchStr.length > 0) {
            this.fetchFindPeople(searchStr);
        }
        else {
            // Clear the foundPeople list if the search field is empty
            this.setState(this.state.updateField("foundPeople", []));
        }
    };

    sendFriendRequest = async (personId: string) => {
        try {
            await axios.post(
                `http://localhost:3000/Calender-Website/send-friend-request?toId=${personId}`,
                {},
                { withCredentials: true }
            );
            toast.success("Friend request sent successfully!");
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data);
            }
            else {
                toast.error('An error occurred. Please try again.');
            }
        }
    };

    manageFriendRequest = async (friendId: string, approve: boolean) => {
        try {
            await axios.post(
                `http://localhost:3000/Calender-Website/manage-friend-request?id=${friendId}&approve=${approve}`,
                {},
                { withCredentials: true }
            );

            // Update the requests and friends state based on the action
            if (approve) {
                // If approved, move the friend from requests to friends
                const newFriend = this.state.requests.find(request => request.id === friendId);
                if (newFriend) {
                    this.setState({
                        requests: this.state.requests.filter(request => request.id !== friendId),
                        friends: [...this.state.friends, newFriend],
                    });
                }
                toast.success('Friend request approved successfully!');
            } else {
                // If denied, remove the request from the state
                this.setState({
                    requests: this.state.requests.filter(request => request.id !== friendId),
                });
                toast.success('Friend request denied successfully!');
            }
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data);
            } else {
                toast.error('An error occurred. Please try again.');
            }
        }
    };

    render() {
        return (
            <div className="container">
                <div className="find-people">
                    <h1>Find People</h1>
                    <input
                        type="text"
                        placeholder="Search for people..."
                        value={this.state.searchStr}
                        onChange={this.handleSearchChange}
                    />

                    {this.state.foundPeople.length === 0 ? (
                        <p></p>
                    ) : (
                        this.state.foundPeople.map(person => {
                            const isFriend = this.state.friends.some(friend => friend.id === person.id);

                            return (
                                <div key={person.id}>
                                    <p>Name: {person.firstName} {person.lastName}</p>
                                    <p>Email: {person.email}</p>
                                    {isFriend ? (
                                        <p>Status: Already Friends</p>
                                    ) : person.id === this.state.sessionId ? <p></p> : (
                                        <button onClick={() => this.sendFriendRequest(person.id)}>
                                            Send Friend Request
                                        </button>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>

                <div className="friends-requests-container">
                    <div className="friends">
                        <h1>Your Friends</h1>
                        {this.state.friends.length <= 0 ? (
                            <p>No Friends found</p>
                        ) : (
                            this.state.friends.map(friend => (
                                <div key={friend.id}>
                                    <p>Name: {friend.firstName} {friend.lastName}</p>
                                    <p>Email: {friend.email}</p>
                                    <button onClick={() => this.deleteFriend(friend.id)}>
                                        Delete friend
                                    </button>
                                    <br />
                                </div>
                            ))
                        )}
                    </div>

                    <div className="friend-requests">
                        <h1>Your Friend Requests</h1>
                        {this.state.requests.length <= 0 ? (
                            <p>No Requests found</p>
                        ) : (
                            this.state.requests.map(friend => (
                                <div key={friend.id}>
                                    <p>Name: {friend.firstName} {friend.lastName}</p>
                                    <p>Email: {friend.email}</p>
                                    <button onClick={() => this.manageFriendRequest(friend.id, true)}>
                                        Approve
                                    </button>
                                    <button className="deny" onClick={() => this.manageFriendRequest(friend.id, false)}>
                                        Deny
                                    </button>
                                    <br />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
export default Friends;