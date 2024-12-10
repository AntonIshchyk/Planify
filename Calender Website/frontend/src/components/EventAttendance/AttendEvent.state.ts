export type AttendEventState = {
    EventId : string;
    updateEventId : (EventId : string) => (state: AttendEventState) => AttendEventState
}
export const initAttendEventState = {
    EventId : '',
    updateEventId : (EventId: string) => (state: AttendEventState) : AttendEventState => ({...state,
        EventId : EventId
    }),
}