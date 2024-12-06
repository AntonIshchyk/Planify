export type ViewAttendanceesState = {
    attendancees : string[],
    updateAttendancees : (attendancees : string[]) => (state : ViewAttendanceesState) => ViewAttendanceesState
}

export const initViewAttendanceesState = {
    attendancees : [],
    updateAttendancees : (attendancees : string[]) => (state:ViewAttendanceesState) => ({...state, attendancees : attendancees})

}