type StateUpdater<Entity> = <Field extends keyof Entity>(
    field: Field,
    value: Entity[Field]
) => (state: Entity) => Entity;

const createStateUpdater = <Entity>(): StateUpdater<Entity> => {
    return <Field extends keyof Entity>(key: Field, value: Entity[Field]) => (state: Entity): Entity => ({
        ...state,
        [key]: value,
    });
};


export type CreateEventState = {
    title : string;
    description: string;
    date : string;
    startTime : string;
    endTime : string;
    location : string;
    adminApproval : boolean;
    updateField: StateUpdater<CreateEventState>;
}
export const initCreateEventState = {
    title : '',
    description : '',
    date : '',
    startTime : '',
    endTime : '',
    location : '',
    adminApproval : false,
    updateField: createStateUpdater<CreateEventState>(),
}