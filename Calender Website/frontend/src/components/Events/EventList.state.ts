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
    attending : string[],
    updateAttending : (attending : string[]) => (state : EventListState) => EventListState,
    feedback: Map<string, string>,
    rating : Map<string, number>,
    updateFeedback : (eventId : string, feedback : string) => (state : EventListState) => EventListState,
    updateRating : (eventId : string, rating : number) => (state : EventListState) => EventListState,
    averageRatings : Map<string, number>,
    updateAverageRatings : (eventId : string, rating : number) => (state : EventListState) => EventListState
    }

export const initEventListState = {
    feedback : new Map<string, string>(),
    events : [],
    updateEvents : (events : Event[]) => (state:EventListState) => ({...state, events : events}),
    attending : [],
    updateAttending : (attending : string[]) => (state:EventListState) => ({...state, attending : attending}),
    updateFeedback: (eventId: string, feedback: string) => (state: EventListState) => ({
        ...state,
        feedback: new Map<string, string>(state.feedback).set(eventId, feedback),
    }),
    rating: new Map<string, number>(),
    averageRatings : new Map<string, number>(),
    updateRating : (eventId : string, rating : number) => (state:EventListState) => ({...state, rating : new Map<string, number>(state.rating).set
        (eventId, rating)
    }),
    updateAverageRatings : (eventId : string, rating : number) => (state:EventListState) => ({...state, averageRatings : new Map<string, number>(state.averageRatings).set
        (eventId, rating)
    })
}