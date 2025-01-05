import {StateUpdater, createStateUpdater} from '../Updater/Updater';

export interface User {
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
    searchStr: string,
    sessionId: string | null
    updateField: StateUpdater<FriendsState>
}

export const initFriendsState = {
    friends : [],
    requests: [],
    foundPeople: [],
    searchStr: "",
    sessionId: "",
    updateField: createStateUpdater<FriendsState>()
}