interface Attendances {
    Id: string;
    User: string;
    EventId: string;
    Rating: number;
    Feedback: string;
}

export type ViewAttendanceesState = {
    attendances : Attendances[],
    updateAttendances: (attendances: Attendances[]) => (state : ViewAttendanceesState) => ViewAttendanceesState
}

export const initViewAttendanceesState = {
    attendances : [],
    updateAttendances: (attendances: Attendances[]) => (state:ViewAttendanceesState) => ({...state, attendances : attendances})

}