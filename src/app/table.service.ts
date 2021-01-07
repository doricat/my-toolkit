import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Table } from './models/pdmModels';

@Injectable({
    providedIn: 'root'
})
export class TableService {
    private subject = new Subject<Table | undefined>();

    constructor() { }

    sendTable(table: Table | undefined): void {
        this.subject.next(table);
    }

    getObservable(): Observable<Table | undefined> {
        return this.subject.asObservable();
    }
}
