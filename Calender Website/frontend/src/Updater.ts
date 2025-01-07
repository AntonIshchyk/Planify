export type StateUpdater<Entity> = <Field extends keyof Entity>(
    field: Field,
    value: Entity[Field]
) => (state: Entity) => Entity;

export const createStateUpdater = <Entity>(): StateUpdater<Entity> => {
    return <Field extends keyof Entity>(key: Field, value: Entity[Field]) => (state: Entity): Entity => ({
        ...state,
        [key]: value,
    });
};