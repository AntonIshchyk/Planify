import Login from "./Login";

export type LoginState = {
    email : string;
    username: string;
    password: string;
    message : string;
    updateEmail : (email : string) => (state: LoginState) => LoginState
    updatePassword : (password : string) => (state : LoginState) => LoginState
    updateUsername: (username : string) => (state : LoginState) => LoginState
    updateMessage : (message : string) => (state : LoginState) => LoginState

}

export const initLoginState = {
    email: "",
    username : "",
    password : "",
    message: "",
    updateUsername : (username: string) => (state: LoginState) : LoginState => ({...state,
        username : username
    }),
    updateEmail : (email: string) => (state: LoginState) : LoginState => ({...state,
        email : email
    }),
    updateMessage : (message: string) => (state: LoginState) : LoginState => ({...state,
        message : message
    }),
    updatePassword : (password: string) => (state: LoginState) : LoginState => ({...state,
        password : password
    })
}