import { endianness } from "os";
import { isJSDocUnknownTag } from "typescript";

export type UpdateEventState = {
    title : string;
    description: string;
    date : string;
    startTime : string;
    endTime : string;
    location : string;
    adminApproval : boolean;
    id : string;
    updateTitle : (title : string) => (state: UpdateEventState) => UpdateEventState
    updateDescription : (description : string) => (state: UpdateEventState) => UpdateEventState
    updateDate : (date : string) => (state: UpdateEventState) => UpdateEventState
    updateStartTime : (startTime : string) => (state: UpdateEventState) => UpdateEventState
    updateEndTime : (endTime : string) => (state: UpdateEventState) => UpdateEventState
    updateLocation : (location : string) => (state: UpdateEventState) => UpdateEventState
    updateAdminApproval : (adminApproval : boolean) => (state: UpdateEventState) => UpdateEventState
    updateId : (id : string) => (state : UpdateEventState) => UpdateEventState
}
export const initUpdateEventState = {
    title : '',
    description : '',
    date : '',
    startTime : '',
    endTime : '',
    location : '',
    adminApproval : false,
    id : '',
    updateTitle : (title: string) => (state: UpdateEventState) : UpdateEventState => ({...state,
        title : title
    }),
    updateDescription : (description: string) => (state: UpdateEventState) : UpdateEventState => ({...state,
        description : description
    }),
    updateDate : (date: string) => (state: UpdateEventState) : UpdateEventState => ({...state,
        date : date
    }),
    updateStartTime : (startTime: string) => (state: UpdateEventState) : UpdateEventState => ({...state,
        startTime : startTime
    }),
    updateEndTime : (endTime: string) => (state: UpdateEventState) : UpdateEventState => ({...state,
        endTime : endTime
    }),
    updateLocation : (location: string) => (state: UpdateEventState) : UpdateEventState => ({...state,
        location : location
    }),
    updateAdminApproval : (adminApproval: boolean) => (state: UpdateEventState) : UpdateEventState => ({...state,
        adminApproval : adminApproval
    }),
    updateId : (id : string) => (state : UpdateEventState) : UpdateEventState => ({...state, id : id})
}