import {StateUpdater, createStateUpdater} from '../Updater/Updater';

export type ViewAttendanceesState = {
    attendances : string[],
    updateField: StateUpdater<ViewAttendanceesState>;
}

export const initViewAttendanceesState = {
    attendances : [],
    updateField : createStateUpdater<ViewAttendanceesState>()
}