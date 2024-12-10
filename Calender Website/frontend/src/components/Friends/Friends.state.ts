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
    foundPeople: User[],
    updateField: StateUpdater<FriendsState>
}

export const initFriendsState = {
    friends : [],
    requests: [],
    foundPeople: [],
    updateField: createStateUpdater<FriendsState>()
}