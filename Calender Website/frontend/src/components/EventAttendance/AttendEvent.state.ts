import {StateUpdater, createStateUpdater} from '../Updater/Updater';

export type AttendEventState = {
    EventId : string;
    updateField: StateUpdater<AttendEventState>;
}
export const initAttendEventState = {
    EventId : '',
    updateField : createStateUpdater<AttendEventState>()
}