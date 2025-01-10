import { StateUpdater, createStateUpdater } from '../Updater/Updater';
import { User } from '../Friends/Friends.state'

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
    friendsAttending: User[];
    isModalOpen: boolean;
    title: string
    description: string
    date: string
    startTime: string
    endTime: string
    location: string
    adminApproval: boolean
    events: Event[],
    updateEvents: (events: Event[]) => (state: EventListState) => EventListState,
    attending: string[],
    feedback: Map<string, string>,
    rating: Map<string, number>,
    updateFeedback: (eventId: string, feedback: string) => (state: EventListState) => EventListState,
    averageRatings: Map<string, number>,
    updateAverageRatings: (eventId: string, rating: number) => (state: EventListState) => EventListState
    updateField: StateUpdater<EventListState>;
}

export const initEventListState = {
    updateEvents: (events: Event[]) => (state: EventListState) => ({ ...state, events: events }),
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    adminApproval: false,
    feedback: new Map<string, string>(),
    events: [],
    attending: [],
    friendsAttending: [],
    isModalOpen: false,
    updateFeedback: (eventId: string, feedback: string) => (state: EventListState) => ({
        ...state,
        feedback: new Map<string, string>(state.feedback).set(eventId, feedback),
    }),
    rating: new Map<string, number>(),
    averageRatings: new Map<string, number>(),
    updateAverageRatings: (eventId: string, rating: number) => (state: EventListState) => ({
        ...state, averageRatings: new Map<string, number>(state.averageRatings).set
            (eventId, rating)
    }),
    updateField: createStateUpdater<EventListState>()
}