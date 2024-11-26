import { endianness } from "os";

export type CreateEventState = {
    title : string;
    description: string;
    date : string;
    startTime : string;
    endTime : string;
    location : string;
    adminApproval : boolean;
    updateTitle : (title : string) => (state: CreateEventState) => CreateEventState
    updateDescription : (description : string) => (state: CreateEventState) => CreateEventState
    updateDate : (date : string) => (state: CreateEventState) => CreateEventState
    updateStartTime : (startTime : string) => (state: CreateEventState) => CreateEventState
    updateEndTime : (endTime : string) => (state: CreateEventState) => CreateEventState
    updateLocation : (location : string) => (state: CreateEventState) => CreateEventState
    updateAdminApproval : (adminApproval : boolean) => (state: CreateEventState) => CreateEventState
}
export const initCreateEventState = {
    title : '',
    description : '',
    date : '',
    startTime : '',
    endTime : '',
    location : '',
    adminApproval : false,
    updateTitle : (title: string) => (state: CreateEventState) : CreateEventState => ({...state,
        title : title
    }),
    updateDescription : (description: string) => (state: CreateEventState) : CreateEventState => ({...state,
        description : description
    }),
    updateDate : (date: string) => (state: CreateEventState) : CreateEventState => ({...state,
        date : date
    }),
    updateStartTime : (startTime: string) => (state: CreateEventState) : CreateEventState => ({...state,
        startTime : startTime
    }),
    updateEndTime : (endTime: string) => (state: CreateEventState) : CreateEventState => ({...state,
        endTime : endTime
    }),
    updateLocation : (location: string) => (state: CreateEventState) : CreateEventState => ({...state,
        location : location
    }),
    updateAdminApproval : (adminApproval: boolean) => (state: CreateEventState) : CreateEventState => ({...state,
        adminApproval : adminApproval
    })
}