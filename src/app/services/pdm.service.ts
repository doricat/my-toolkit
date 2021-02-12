import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PdmReaderFactory, RootObject } from '../models/pdmModels';

@Injectable({
    providedIn: 'root'
})
export class PdmService {
    constructor() { }

    readFile(file: File): Observable<{ fileName: string, rootObject: RootObject }> {
        return from(PdmReaderFactory.createFromFile(file)).pipe(switchMap(x => of({ fileName: file.name, rootObject: x.readRootObject() })));
    }
}
