
export type ViewAttendanceesState = {
    attendances : string[],
    updateAttendances: (attendances: string[]) => (state : ViewAttendanceesState) => ViewAttendanceesState
}

export const initViewAttendanceesState = {
    attendances : [],
    updateAttendances: (attendances: string[]) => (state:ViewAttendanceesState) => ({...state, attendances : attendances})

}