export type DeleteEventState = {
    id: string
    updateId : (id : string) => (state: DeleteEventState) => DeleteEventState
}
export const initDeleteEventState = {
    id: '',
    updateId: (id: string) => (state: DeleteEventState) : DeleteEventState => ({...state, id : id})
}