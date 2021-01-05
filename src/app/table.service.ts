import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Table } from './models/pdmModels';

@Injectable({
    providedIn: 'root'
})
export class TableService {
    private subject = new Subject<Table>();

    constructor() { }

    sendTable(table: Table): void {
        this.subject.next(table);
    }

    getObservable(): Observable<Table> {
        return this.subject.asObservable();
    }
}
