import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Table as PdmTable } from '../models/pdmModels';
import { TableService } from '../table.service';
import { Table } from '../models/tableModels';

@Component({
    selector: 'app-pdm-table-viewer',
    templateUrl: './pdm-table-viewer.component.html',
    styleUrls: ['./pdm-table-viewer.component.scss']
})
export class PdmTableViewerComponent implements OnInit, OnDestroy {
    pdmTable: PdmTable | undefined;
    table: Table | undefined;
    serviceSubscription: Subscription | null;
    isMouseDown = false;

    constructor(private tableService: TableService) { }

    ngOnInit(): void {
        this.serviceSubscription = this.tableService.getObservable().subscribe(x => {
            this.pdmTable = x;
            this.table = undefined;

            if (x) {
                this.table = new Table(x.columns.length === 0 ? 1 : x.columns.length, 7);
                for (let i = 0; i < x.columns.length; i++) {
                    const column = x.columns[i];
                    this.table.cells[i][0].content = column.name;
                    this.table.cells[i][1].content = column.code;
                    this.table.cells[i][2].content = column.comment;
                    this.table.cells[i][3].content = column.dataType;
                    this.table.cells[i][4].content = column.length;
                    this.table.cells[i][5].content = column.precision;
                    this.table.cells[i][6].content = String(column.mandatory);
                }
            }
        });
    }

    ngOnDestroy(): void {
        this.serviceSubscription?.unsubscribe();
    }

    onMouseOver(evt: MouseEvent): void {
        if (this.isMouseDown) {
            const element = evt.target as HTMLElement;
            this.selectCells(element);
        }
    }

    onMouseDown(evt: MouseEvent): void {
        const element = evt.target as HTMLElement;
        this.isMouseDown = true;
        this.selectCell(element);
    }

    onMouseUp(evt: MouseEvent): void {
        if (this.isMouseDown) {
            this.isMouseDown = false;
        }
    }

    selectCells(element: Element): void {
        const tuple = this.getCoordinate(element);
        if (tuple) {
            const [row, column] = tuple;
            this.table.selectMore(row, column);
        }
    }

    selectCell(element: Element): void {
        const tuple = this.getCoordinate(element);
        if (tuple) {
            const [row, column] = tuple;
            if (this.table.shouldUpdateSelectedCell(row, column)) {
                this.table.select(row, column);
            }
        }
    }

    getCoordinate(element: Element): [number, number] | null {
        const row = element.getAttribute('data-row');
        const column = element.getAttribute('data-column');

        if (row && column) {
            const rowIndex = Number.parseInt(row, 10);
            const columnIndex = Number.parseInt(column, 10);
            return [rowIndex, columnIndex];
        }

        return null;
    }
}
