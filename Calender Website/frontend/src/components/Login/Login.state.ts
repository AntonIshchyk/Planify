import {StateUpdater, createStateUpdater} from '../Updater/Updater';

export type LoginState = {
    email : string;
    username: string;
    password: string;
    adminLogin: boolean;
    updateField: StateUpdater<LoginState>;
}

export const initLoginState = {
    email: '',
    username : '',
    password : '',
    adminLogin : false,
    updateField: createStateUpdater<LoginState>()
} 