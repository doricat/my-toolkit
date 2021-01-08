import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
    @ViewChild('clipboardData') clipboardData: ElementRef;
    @ViewChild('tableRef') tableRef: ElementRef;

    constructor(private tableService: TableService) { }

    ngOnInit(): void {
        this.serviceSubscription = this.tableService.getObservable().subscribe(x => {
            this.pdmTable = x;
            this.table = undefined;

            if (x) {
                const array: string[][] = [];
                for (let i = 0; i < x.columns.length; i++) {
                    const column = x.columns[i];
                    const row: string[] = [
                        column.name,
                        column.code,
                        column.comment,
                        column.dataType,
                        column.length,
                        column.precision,
                        String(column.mandatory)
                    ];
                    array.push(row);
                }

                this.table = Table.from2DArray(array);
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

    onKeydown(evt: KeyboardEvent): void {
        if (evt.ctrlKey && evt.key === 'c') {
            const data = this.table.generateClipboardData();
            const element = this.clipboardData.nativeElement as HTMLInputElement;
            const table = Table.from2DArray(data);
            const clipboardData = {};
            clipboardData['text/plain'] = table.generatePlainTextTable();
            clipboardData['text/html'] = this.generateHtml(data);
            element.value = JSON.stringify(clipboardData);
            element.select();
            element.setSelectionRange(0, element.value.length);
            document.execCommand('copy');
        }
    }

    copy(evt: ClipboardEvent): void {
        const element = evt.currentTarget as HTMLInputElement;
        const json = element.value;
        const obj = JSON.parse(json) as { [type: string]: string };
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                evt.clipboardData.setData(key, obj[key]);
            }
        }

        evt.preventDefault();
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

    generateHtml(array: string[][]): string {
        const result = `<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8" />
</head>
<body>
    <table style="border-collapse: collapse; display: table; text-indent: initial; border-spacing: 2px; width: 100%; margin-bottom: 1rem; color: #212529; border: 1px solid #dee2e6;">
        <tbody style="display: table-row-group; vertical-align: middle; border-color: inherit;">
           ${this.generateCells(array)}
        </tbody>
    </table>
</body>
</html>`;
        return result;
    }

    generateCells(array: string[][]): string {
        const result: string[] = [];
        for (let i = 0; i < array.length; i++) {
            const lineItems: string[] = ['<tr style="display: table-row; vertical-align: inherit; border-color: inherit;">'];
            for (let j = 0; j < array[i].length; j++) {
                lineItems.push(`<td style="border: 1px solid #dee2e6; width: 50px; padding: 0.75rem; vertical-align: top;">${array[i][j] ?? ' '}</td>`);
            }
            lineItems.push('</tr>');
            result.push(lineItems.join('\r\n'));
        }

        return result.join('\r\n');
    }
}
