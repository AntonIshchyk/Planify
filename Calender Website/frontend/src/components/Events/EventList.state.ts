import {StateUpdater, createStateUpdater} from '../Updater/Updater';
import {User} from '../Friends/Friends.state'

interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    adminApproval: boolean;
}

export type EventListState = {
    events : Event[];
    attending : string[];
    friendsAttending: User[];
    isModalOpen: boolean;
    updateField: StateUpdater<EventListState>;
    }

export const initEventListState = {
    events : [],
    attending : [],
    friendsAttending: [],
    isModalOpen : false,
    updateField: createStateUpdater<EventListState>()
}