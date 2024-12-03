interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    recurringDays: number;
    friends: string[];
    friendRequests: string[];
}


export type FriendsState = {
    friends : User[],
    requests: User[],
    updateFriends : (friends : User[]) => (state : FriendsState) => FriendsState
    updateFriendRequests : (requests : User[]) => (state : FriendsState) => FriendsState
}

export const initFriendsState = {
    friends : [],
    requests: [],
    updateFriends : (friends: User[]) => (state: FriendsState) => ({...state, friends : friends}),
    updateFriendRequests: (friendRequests: User[]) => (state: FriendsState) => ({ ...state, requests: friendRequests })

}