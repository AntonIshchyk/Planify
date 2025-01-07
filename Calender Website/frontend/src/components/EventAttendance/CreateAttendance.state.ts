import {StateUpdater, createStateUpdater} from '../Updater/Updater';

export type CreateAttendanceState = {
    dateTime : string;
    updateField: StateUpdater<CreateAttendanceState>;
}
export const initCreateAttendanceState = {
    dateTime : '',
    updateField: createStateUpdater<CreateAttendanceState>()
}