import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs/operators';
import { readFile, setObject } from '../actions/pdm.actions';
import { PdmService } from '../services/pdm.service';

@Injectable()
export class PdmEffects {
    constructor(
        private actions$: Actions,
        private pdmService: PdmService
    ) { }

    readFile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(readFile),
            exhaustMap(action =>
                this.pdmService.readFile(action.file).pipe(map(x => {
                    return setObject(x);
                }))
            )
        )
    );
}
