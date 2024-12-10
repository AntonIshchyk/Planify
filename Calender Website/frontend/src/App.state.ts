import {StateUpdater, createStateUpdater} from './components/Updater/Updater';

export type AppState = {
    showAdminLogin: boolean;
    showUserLogin: boolean;
    showRegister: boolean;
    loggedIn : boolean;
    isAdmin : boolean;
    updateField: StateUpdater<AppState>
}   

export const initAppState = {
    showAdminLogin : false,
    showUserLogin : false,
    showRegister: false,
    loggedIn : false,
    isAdmin : false,
    updateField: createStateUpdater<AppState>()
}