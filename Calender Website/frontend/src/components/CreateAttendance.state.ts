export type CreateAttendanceState = {
    dateTime : string;
    updateDate : (dateTime : string) => (state: CreateAttendanceState) => CreateAttendanceState
}
export const initCreateAttendanceState = {
    dateTime : '',
    updateDate : (dateTime: string) => (state: CreateAttendanceState) : CreateAttendanceState => ({...state,
        dateTime : dateTime
    }),
}