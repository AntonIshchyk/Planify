export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    adminApproval: boolean;
}

export type EventDetailsState = {
    event : Event;
    attending : string[],
    updateAttending : (attending : string[]) => (state : EventDetailsState) => EventDetailsState,
    feedback: string,
    rating : number,
    updateFeedback : (feedback: string) => (state : EventDetailsState) => EventDetailsState,
    updateRating : (rating : number) => (state : EventDetailsState) => EventDetailsState,
    averageRatings : number,
    updateAverageRatings : (rating : number) => (state : EventDetailsState) => EventDetailsState,
    updateEvent : (event : Event) => (state : EventDetailsState) => EventDetailsState
    };
    

const defaultEvent: Event = {
    id: "",
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    adminApproval: false,
};

export const initEventDetailsState = {
    event : defaultEvent,
    feedback : "",
    attending : [],
    updateAttending : (attending : string[]) => (state:EventDetailsState) => ({...state, attending : attending}),
    updateFeedback: (feedback: string) => (state: EventDetailsState) => ({
        ...state,
        feedback: feedback,
    }),
    rating: 0,
    averageRatings : 0,
    updateRating : (rating : number) => (state:EventDetailsState) => ({...state, rating : rating
    }),
    updateAverageRatings : (averageRatings : number) => (state:EventDetailsState) => ({...state, averageRatings : averageRatings
    }),
    updateEvent : (event : Event) => (state:EventDetailsState) => ({...state, event : event
    })
}