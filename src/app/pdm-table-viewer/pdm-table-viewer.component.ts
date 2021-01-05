import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Table } from '../models/pdmModels';
import { TableService } from '../table.service';

@Component({
    selector: 'app-pdm-table-viewer',
    templateUrl: './pdm-table-viewer.component.html',
    styleUrls: ['./pdm-table-viewer.component.scss']
})
export class PdmTableViewerComponent implements OnInit, OnDestroy {
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
