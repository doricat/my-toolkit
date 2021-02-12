import { createAction, props } from '@ngrx/store';
import { RootObject } from '../models/pdmModels';

export const readFile = createAction('Read PDM File', props<{ file: File }>());
export const setObject = createAction('Set PDM Object', props<{ fileName: string, rootObject: RootObject }>());
