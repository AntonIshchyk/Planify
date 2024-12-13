import {StateUpdater, createStateUpdater} from './components/Updater/Updater';

export type AppState = {
    showRegister: boolean;
    loggedIn : boolean;
    isAdmin : boolean;
    updateField: StateUpdater<AppState>
}   

export const initAppState = {
    showRegister: false,
    loggedIn : false,
    isAdmin : false,
    updateField: createStateUpdater<AppState>()
}