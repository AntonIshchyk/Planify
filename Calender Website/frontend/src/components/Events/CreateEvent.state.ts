import {StateUpdater, createStateUpdater} from '../Updater/Updater';

export type CreateEventState = {
    title : string;
    description: string;
    date : string;
    startTime : string;
    endTime : string;
    location : string;
    adminApproval : boolean;
    updateField: StateUpdater<CreateEventState>;
}
export const initCreateEventState = {
    title : '',
    description : '',
    date : '',
    startTime : '',
    endTime : '',
    location : '',
    adminApproval : false,
    updateField: createStateUpdater<CreateEventState>(),
}