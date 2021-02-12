import { Injectable } from '@angular/core';
import { from, Observable, Subject, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PdmReaderFactory, RootObject } from '../models/pdmModels';

@Injectable({
    providedIn: 'root'
})
export class PdmService {
    private subject = new Subject<File>();

    constructor() { }

    readFile(file: File): Observable<{ fileName: string, rootObject: RootObject }> {
        return from(PdmReaderFactory.createFromFile(file)).pipe(switchMap(x => of({ fileName: file.name, rootObject: x.readRootObject() })));
    }

    sendFile(file: File): void {
        this.subject.next(file);
    }

    getObservable(): Observable<File> {
        return this.subject.asObservable();
    }
}
