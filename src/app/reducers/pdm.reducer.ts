import { Action, createReducer, on } from '@ngrx/store';
import { setObject } from '../actions/pdm.actions';
import { RootObject } from '../models/pdmModels';

export interface PdmState {
    fileName: string | undefined;
    rootObject: RootObject | undefined;
}

export const initialState: PdmState = {
    fileName: undefined,
    rootObject: undefined
};

const _pdmReducer = createReducer(
    initialState,
    on(setObject, (_, args) => {
        return { fileName: args.fileName, rootObject: args.rootObject };
    })
);

export function pdmReducer(state: PdmState | undefined, action: Action) {
    return _pdmReducer(state, action);
}
