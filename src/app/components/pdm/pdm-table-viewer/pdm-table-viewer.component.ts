import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Table as PdmTable } from 'src/app/models/pdmModels';
import { Table } from 'src/app/models/tableModels';
import { PdmState } from 'src/app/reducers/pdm.reducer';

@Component({
    selector: 'app-pdm-table-viewer',
    templateUrl: './pdm-table-viewer.component.html',
    styleUrls: ['./pdm-table-viewer.component.scss']
})
export class PdmTableViewerComponent implements OnInit, OnDestroy {
    pdmTable: PdmTable | undefined;
    table: Table | undefined;
    subscription?: Subscription;
    isMouseDown = false;
    shiftDown = false;
    pdmState$: Observable<PdmState>;
    @ViewChild('copyableElemRef') copyableElemRef: ElementRef;
    @ViewChild('tableRef') tableRef: ElementRef;

    constructor(store: Store<{ pdm: PdmState }>) {
        this.pdmState$ = store.select('pdm');
    }

    ngOnInit(): void {
        this.subscription = this.pdmState$.subscribe(x => {
            if (x.tables === undefined || x.selected === undefined) {
                return;
            }

            this.pdmTable = x.tables.filter(y => y.id === x.selected)[0];
            this.table = undefined;

            if (x) {
                const array: string[][] = [];
                for (let i = 0; i < this.pdmTable.columns.length; i++) {
                    const column = this.pdmTable.columns[i];
                    const row: string[] = [
                        column.name,
                        column.code,
                        column.comment,
                        column.dataType,
                        column.length,
                        column.precision,
                        String(column.isPrimaryKey),
                        String(column.mandatory)
                    ];
                    array.push(row);
                }

                this.table = Table.from2DArray(array);
                window.scrollTo({ top: 64, behavior: 'smooth' });
            }
        });
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    onMouseOver(evt: MouseEvent): void {
        if (this.isMouseDown) {
            const element = evt.target as HTMLElement;
            this.selectCells(element);
        }
    }

    onMouseDown(evt: MouseEvent): void {
        const element = evt.target as HTMLElement;
        if (this.shiftDown) {
            this.selectCells(element);
        } else {
            this.isMouseDown = true;
            this.selectCell(element);
        }
    }

    onMouseUp(evt: MouseEvent): void {
        if (this.isMouseDown) {
            this.isMouseDown = false;
        }
    }

    onKeydown(evt: KeyboardEvent): void {
        if (evt.ctrlKey && evt.key === 'c') {
            const data = this.table.convertSelectedToArray();
            const element = this.copyableElemRef.nativeElement as HTMLInputElement;
            const table = Table.from2DArray(data);
            const clipboardData = {};
            clipboardData['text/plain'] = table.generateClipboardPlainTextData();
            clipboardData['text/html'] = this.generateClipboardHtmlData(table);
            element.value = JSON.stringify(clipboardData);
            element.select();
            element.setSelectionRange(0, element.value.length);
            document.execCommand('copy');
        } else if (evt.shiftKey) {
            this.shiftDown = true;
        }
    }

    onKeyup(evt: KeyboardEvent): void {
        if (!evt.shiftKey) {
            this.shiftDown = false;
        }
    }

    onCopy(evt: ClipboardEvent): void {
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

    generateClipboardHtmlData(table: Table): string {
        const rows = table.generateClipboardTableRowData('display: table-row; vertical-align: inherit; border-color: inherit;',
            'border: 1px solid #dee2e6; width: 50px; padding: 0.75rem; vertical-align: top;');
        const result = `<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8" />
</head>
<body>
    <table style="border-collapse: collapse; display: table; text-indent: initial; border-spacing: 2px; width: 100%; margin-bottom: 1rem; color: #212529; border: 1px solid #dee2e6;">
        <tbody style="display: table-row-group; vertical-align: middle; border-color: inherit;">
           ${rows.join('\r\n')}
        </tbody>
    </table>
</body>
</html>`;

        return result;
    }
}
