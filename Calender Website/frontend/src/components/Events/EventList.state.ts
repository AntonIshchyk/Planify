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
    updateEvents : (events : Event[]) => (state : EventListState) => EventListState,
    averageRatings : Map<string, number>,
    updateAverageRatings : (eventId : string, rating : number) => (state : EventListState) => EventListState
    }

export const initEventListState = {
    events : [],
    updateEvents : (events : Event[]) => (state:EventListState) => ({...state, events : events}),
    averageRatings : new Map<string, number>(),
    updateAverageRatings : (eventId : string, rating : number) => (state:EventListState) => ({...state, averageRatings : new Map<string, number>(state.averageRatings).set
        (eventId, rating)
    })
}