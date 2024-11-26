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
    updateEvents : (events : Event[]) => (state : EventListState) => EventListState
}

export const initEventListState = {
    events : [],
    updateEvents : (events : Event[]) => (state:EventListState) => ({...state, events : events})

}