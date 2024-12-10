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
    title : string
    description : string
    date : string
    startTime : string
    endTime : string
    location : string
    adminApproval : boolean
    events : Event[],
    updateEvents : (events : Event[]) => (state : EventListState) => EventListState
}

export const initEventListState = {
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    adminApproval: false,
    events : [],
    updateEvents : (events : Event[]) => (state:EventListState) => ({...state, events : events})

}