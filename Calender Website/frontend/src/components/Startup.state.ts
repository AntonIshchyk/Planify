import Login from "./Login";

export type StartupState = {
    message : string;
    updateMessage : (message : string) => (state : StartupState) => StartupState

}

export const initStartupState = {
    message : '',
    updateMessage : (message: string) => (state: StartupState) : StartupState => ({...state,
        message : message
    })
}