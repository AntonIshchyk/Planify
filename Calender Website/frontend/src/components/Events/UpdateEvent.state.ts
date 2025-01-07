import {StateUpdater, createStateUpdater} from '../Updater/Updater';

export type UpdateEventState = {
    title : string;
    description: string;
    date : string;
    startTime : string;
    endTime : string;
    location : string;
    adminApproval : boolean;
    id : string;
    updateField: StateUpdater<UpdateEventState>;
}
export const initUpdateEventState = {
    title : '',
    description : '',
    date : '',
    startTime : '',
    endTime : '',
    location : '',
    adminApproval : false,
    id : '',
    updateField: createStateUpdater<UpdateEventState>()
}