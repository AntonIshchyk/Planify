import {StateUpdater, createStateUpdater} from './components/Updater/Updater';

export type AppState = {
    showAdminLogin: boolean;
    showUserLogin: boolean;
    loggedIn : boolean;
    isAdmin : boolean;
    updateField: StateUpdater<AppState>
}   

export const initAppState = {
    showAdminLogin : false,
    showUserLogin : false,
    loggedIn : false,
    isAdmin : false,
    updateField: createStateUpdater<AppState>()
}