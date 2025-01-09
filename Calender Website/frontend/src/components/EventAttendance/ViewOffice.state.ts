export interface Attendance {
    id : string;
    userId : string;
    date : string;
}

export type ViewOfficeState = {
    attendances : Attendance[];
    updateAttendances : (attendances : Attendance[]) => (state : ViewOfficeState) => ViewOfficeState;
}
export const initViewOfficeState = {
    attendances : [],
    updateAttendances : (attendances : Attendance[]) => (state:ViewOfficeState) => ({...state, attendances : attendances})
}