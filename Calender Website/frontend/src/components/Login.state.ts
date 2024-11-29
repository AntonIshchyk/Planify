export type LoginState = {
    email : string;
    username: string;
    password: string;
    updateEmail : (email : string) => (state: LoginState) => LoginState
    updatePassword : (password : string) => (state : LoginState) => LoginState
    updateUsername: (username : string) => (state : LoginState) => LoginState
}

export const initLoginState = {
    email: '',
    username : '',
    password : '',
    updateUsername : (username: string) => (state: LoginState) : LoginState => ({...state,
        username : username
    }),
    updateEmail : (email: string) => (state: LoginState) : LoginState => ({...state,
        email : email
    }),
    updatePassword : (password: string) => (state: LoginState) : LoginState => ({...state,
        password : password
    })
}