import {StateUpdater, createStateUpdater} from '../Updater/Updater';

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
    events : Event[],
    attending : string[],
    updateField: StateUpdater<EventListState>;
    }

export const initEventListState = {
    events : [],
    attending : [],
    updateField: createStateUpdater<EventListState>()
}