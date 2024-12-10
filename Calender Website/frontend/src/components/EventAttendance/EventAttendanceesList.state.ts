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
    events : Event[],
    updateEvents : (events : Event[]) => (state : EventAttendanceesListState) => EventAttendanceesListState
}

export const initEventAttendanceesListState = {
    events : [],
    updateEvents : (events : Event[]) => (state:EventAttendanceesListState) => ({...state, events : events})

}