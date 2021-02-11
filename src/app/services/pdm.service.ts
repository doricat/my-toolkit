import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PdmService {
    private subject = new Subject<File>();

    constructor() { }

    sendFile(file: File): void {
        this.subject.next(file);
    }

    getObservable(): Observable<File> {
        return this.subject.asObservable();
    }
}
