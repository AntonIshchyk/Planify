import {StateUpdater, createStateUpdater} from '../Updater/Updater';

export type DeleteEventState = {
    id: string
    updateField: StateUpdater<DeleteEventState>;
}
export const initDeleteEventState : DeleteEventState  = {
    id: '',
    updateField: createStateUpdater<DeleteEventState>()
}