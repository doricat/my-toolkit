export class Cell {
    constructor(row: number, column: number) {
        this.row = row;
        this.column = column;
    }

    row: number;
    column: number;
    content: string | null = null;
    table!: MyTable;

    public get focused(): boolean {
        return this.table.selectedRectangle?.contains(this.row, this.column)!;
    }
}

export class Row {
    index!: number;
    height!: number;
}

export class Column {
    index!: number;
    width!: number;
}

export class Point {
    constructor(row: number, column: number) {
        this.row = row;
        this.column = column;
    }

    row!: number;
    column!: number;

    min(other: Point): boolean {
        if (this.row < other.row || this.column < other.column) {
            return true;
        }

        return false;
    }

    equal(other: Point): boolean {
        return this.row === other.row && this.column === other.column;
    }
}

export class Size {
    constructor(rows: number, columns: number) {
        this.rows = rows;
        this.columns = columns;
    }

    rows!: number;
    columns!: number;
}

export class Rectangle {
    topLeft: Point = new Point(0, 0);
    bottomRight: Point = new Point(0, 0);

    static build(point1: Point, point2: Point): Rectangle {
        const rect = new Rectangle();
        rect.update(point1, point2);
        return rect;
    }

    update(point1: Point, point2: Point): void {
        const minRow = Math.min(point1.row, point2.row);
        const maxRow = Math.max(point1.row, point2.row);
        const minColumn = Math.min(point1.column, point2.column);
        const maxColumn = Math.max(point1.column, point2.column);

        this.topLeft = new Point(minRow, minColumn);
        this.bottomRight = new Point(maxRow, maxColumn);
    }

    contains(row: number, column: number): boolean {
        return row >= this.topLeft.row
            && row <= this.bottomRight.row
            && column >= this.topLeft.column
            && column <= this.bottomRight.column;
    }
}

export class MyTable {
    constructor(row: number, column: number) {
        if (row < 0) {
            throw new Error('Row must be greater than or equal 0.');
        }

        if (column < 0) {
            throw new Error('Column must be greater than or equal 0.');
        }

        if (row > MyTable.maxRows) {
            throw new Error(`Row must be less than ${MyTable.maxRows}.`);
        }

        if (column > MyTable.maxColumns) {
            throw new Error(`Column must be less than ${MyTable.maxColumns}.`);
        }

        this.buildCells(row, column);
    }

    private static maxRows = 500;
    private static maxColumns = 26;
    cells: Cell[][] = [];
    currentCell?: Point;
    selectedRectangle?: Rectangle;

    static from2DArray(array: (string | null)[][]): MyTable {
        if (array.length === 0) {
            return new MyTable(0, 0);
        }

        const table = new MyTable(array.length, array[0].length);
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i].length; j++) {
                table.cells[i][j].content = array[i][j];
            }
        }

        return table;
    }

    select(row: number, column: number): void {
        this.currentCell = new Point(row, column);
        this.selectedRectangle = Rectangle.build(this.currentCell, this.currentCell);
    }

    selectMore(row: number, column: number): void {
        this.selectedRectangle!.update(this.currentCell!, new Point(row, column));
    }

    shouldUpdateSelectedCell(row: number, column: number): boolean {
        return !(this.currentCell && this.currentCell.equal(new Point(row, column)));
    }

    convertSelectedToArray(): string[][] {
        const result: string[][] = [];
        if (this.currentCell && this.selectedRectangle) {
            const topLeft = this.selectedRectangle.topLeft;
            const bottomRight = this.selectedRectangle.bottomRight;
            for (let i = topLeft.row; i <= bottomRight.row; i++) {
                const row: string[] = [];
                for (let j = topLeft.column; j <= bottomRight.column; j++) {
                    row.push(this.cells[i][j].content!);
                }

                result.push(row);
            }
        }

        return result;
    }

    generateClipboardPlainTextData(format: boolean = true): string {
        const dict: { [key: number]: number } = {};
        const array: string[][] = [];
        for (let i = 0; i < this.cells.length; i++) {
            const lineItems: string[] = [];
            for (let j = 0; j < this.cells[i].length; j++) {
                const content = this.cells[i][j].content ?? ' ';
                if (format) {
                    dict[j] = Math.max(dict[j] ?? 0, this.calculateTextWidth(content));
                }

                lineItems.push(content);
            }

            array.push(lineItems);
        }

        if (format) {
            for (let i = 0; i < array.length; i++) {
                for (let j = 0; j < array[i].length; j++) {
                    const content = array[i][j];
                    const width = this.calculateTextWidth(content);
                    const gap = dict[j] - width;
                    if (gap > 0) {
                        array[i][j] = content + ''.padEnd(gap);
                    }
                }
            }
        }

        const lines: string[] = [];
        for (let i = 0; i < array.length; i++) {
            lines.push(array[i].join(' '));
        }

        return lines.join('\r\n');
    }

    generateClipboardTableRowData(trStyle: string, tdStyle: string): string[] {
        const rows: string[] = [];
        for (let i = 0; i < this.cells.length; i++) {
            const lineItems: string[] = [`<tr style="${trStyle}">`];
            for (let j = 0; j < this.cells[i].length; j++) {
                lineItems.push(`<td style="${tdStyle}">${this.cells[i][j].content ?? ''}</td>`);
            }

            lineItems.push('</tr>');
            rows.push(lineItems.join('\r\n'));
        }

        return rows;
    }

    private buildCells(row: number, column: number): void {
        for (let i = 0; i < row; i++) {
            const rowArray: Cell[] = [];
            for (let j = 0; j < column; j++) {
                const cell = new Cell(i, j);
                cell.table = this;
                rowArray.push(cell);
            }

            this.cells.push(rowArray);
        }
    }

    /** 半角字符为1个单位 全角2个单位 */
    private calculateTextWidth(text: string): number {
        let width = 0;
        for (let i = 0; i < text.length; i++) {
            const c = text[i];
            if (/[\uff00-\uffef\u4e00-\u9fa5]/.test(c)) {
                width += 2;
                // eslint-disable-next-line no-control-regex
            } else if (/[\u0000-\u007f]/.test(c)) {
                width++;
            }

            // TODO 其他情况暂不考虑
        }

        return width;
    }

    public get rowCount(): number {
        return this.cells.length;
    }

    public get columnCount(): number {
        return this.cells[0].length;
    }

    public static get maxRowCount(): number {
        return MyTable.maxRows;
    }

    public static get maxColumnCount(): number {
        return MyTable.maxColumns;
    }
}
