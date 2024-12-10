export type RegisterState = {
    email : string;
    password: string;
    firstName : string,
    lastName : string,
    updateEmail : (email : string) => (state: RegisterState) => RegisterState
    updatePassword : (password : string) => (state : RegisterState) => RegisterState
    updateFirstName: (firstName : string) => (state : RegisterState) => RegisterState
    updateLastName: (lastName : string) => (state : RegisterState) => RegisterState
}

export const initRegisterState = {
    email: '',
    firstName : '',
    lastName : '',
    password : '',
    updateFirstName : (firstName: string) => (state: RegisterState) : RegisterState => ({...state,
        firstName : firstName
    }),
    updateLastName : (lastName: string) => (state: RegisterState) : RegisterState => ({...state,
        lastName : lastName
    }),
    updateEmail : (email: string) => (state: RegisterState) : RegisterState => ({...state,
        email : email
    }),
    updatePassword : (password: string) => (state: RegisterState) : RegisterState => ({...state,
        password : password
    })
} 