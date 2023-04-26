import { createAction, props } from "@ngrx/store"

export const effectErrorHandler = (effectName: string, err: any) => {
    const errorMessage = String(err.message) || '';
    const message = `Error in ${effectName} effect. ${errorMessage}`
    console.error(message);

    return errorAction({ message: message });
}

export const errorAction = createAction(
    'ERROR ACTION',
    props<{ message: string }>()
)