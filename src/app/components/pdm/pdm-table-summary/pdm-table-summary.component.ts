import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Table } from 'src/app/models/pdmModels';
import { PdmState } from 'src/app/reducers/pdm.reducer';

@Component({
    selector: 'app-pdm-table-summary',
    templateUrl: './pdm-table-summary.component.html',
    styleUrls: ['./pdm-table-summary.component.scss']
})
export class PdmTableSummaryComponent implements OnInit, OnDestroy {
    table: Table | undefined;
    pdmState$: Observable<PdmState>;
    subscription?: Subscription;

    constructor(store: Store<{ pdm: PdmState }>) {
        this.pdmState$ = store.select('pdm');
    }

    ngOnInit(): void {
        this.subscription = this.pdmState$.subscribe(x => {
            if (x.tables === undefined || x.selected === undefined) {
                return;
            }

            this.table = x.tables.filter(y => y.id === x.selected)[0];
        });
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}
