import {StateUpdater, createStateUpdater} from '../Updater/Updater';

export type StartupState = {
    message : string;
    updateField: StateUpdater<StartupState>
}

export const initStartupState = {
    message : '',
    updateField: createStateUpdater<StartupState>()
}