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
    updateFriends : (friends : User[]) => (state : FriendsState) => FriendsState
}

export const initFriendsState = {
    friends : [],
    updateFriends : (friends: User[]) => (state: FriendsState) => ({...state, friends : friends})
}