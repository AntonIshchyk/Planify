import {StateUpdater, createStateUpdater} from '../Updater/Updater';

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
    updateField: StateUpdater<FriendsState>
}

export const initFriendsState = {
    friends : [],
    requests: [],
    updateField: createStateUpdater<FriendsState>()
}