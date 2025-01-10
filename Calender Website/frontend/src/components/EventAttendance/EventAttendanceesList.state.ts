import { StateUpdater, createStateUpdater } from '../Updater/Updater';

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

export type EventAttendanceesListState = {
    events: Event[],
    updateField: StateUpdater<EventAttendanceesListState>;
}

export const initEventAttendanceesListState = {
    events: [],
    updateField: createStateUpdater<EventAttendanceesListState>()
}