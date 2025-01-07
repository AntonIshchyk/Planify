import {StateUpdater, createStateUpdater} from '../Updater/Updater';

export type RegisterState = {
    email : string;
    password: string;
    firstName : string,
    lastName : string,
    updateField: StateUpdater<RegisterState>;
}

export const initRegisterState = {
    email: '',
    firstName : '',
    lastName : '',
    password : '',
    updateField: createStateUpdater<RegisterState>()
} 