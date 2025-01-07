import {StateUpdater, createStateUpdater} from '../Updater/Updater';

export type LoginState = {
    email : string;
    username: string;
    password: string;
    updateField: StateUpdater<LoginState>;
}

export const initLoginState = {
    email: '',
    username : '',
    password : '',
    updateField: createStateUpdater<LoginState>()
} 