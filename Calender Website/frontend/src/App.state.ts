import { DebugLogger } from "util";
import App from "./App";

export type AppState = {
    showAdminLogin: boolean;
    showUserLogin: boolean;
    loggedIn : boolean;
    isAdmin : boolean;
    updateShowAdminLogin : (showAdminLogin : boolean) => (state : AppState) => AppState;
    updateShowUserLogin : (showUserLogin : boolean) => (state : AppState) => AppState;
    updateLoggedIn : (loggedIn : boolean) => (state : AppState) => AppState;
    updateIsAdmin : (isAdmin : boolean) => (state : AppState) => AppState;
}   

export const initAppState = {
    showAdminLogin : false,
    showUserLogin : false,
    loggedIn : false,
    isAdmin : false,
    updateShowAdminLogin : (showAdminLogin: boolean) => (state: AppState) : AppState => ({...state,
        showAdminLogin : showAdminLogin
    }),
    updateShowUserLogin : (showUserLogin: boolean) => (state: AppState) : AppState => ({...state,
        showUserLogin : showUserLogin
    }),
    updateLoggedIn : (loggedIn: boolean) => (state: AppState) : AppState => ({...state,
        loggedIn : loggedIn
    }),
    updateIsAdmin : (isAdmin: boolean) => (state: AppState) : AppState => ({...state,
        isAdmin : isAdmin
    })
}