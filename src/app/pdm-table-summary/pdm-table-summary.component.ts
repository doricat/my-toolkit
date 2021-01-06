import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Table } from '../models/pdmModels';
import { TableService } from '../table.service';

@Component({
    selector: 'app-pdm-table-summary',
    templateUrl: './pdm-table-summary.component.html',
    styleUrls: ['./pdm-table-summary.component.scss']
})
export class PdmTableSummaryComponent implements OnInit, OnDestroy {
    table: Table | undefined;
    serviceSubscription: Subscription | null;

    constructor(private tableService: TableService) { }

    ngOnInit(): void {
        this.serviceSubscription = this.tableService.getObservable().subscribe(x => {
            this.table = x;
        });
    }

    ngOnDestroy(): void {
        this.serviceSubscription?.unsubscribe();
    }
}
