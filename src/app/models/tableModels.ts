export class Cell {
    constructor(row: number, column: number) {
        this.row = row;
        this.column = column;
    }

    row: number;
    column: number;
    content?: string;
    table!: Table;

    public get focused(): boolean {
        return this.table.selectedRectangle?.contains(this.row, this.column);
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
    topLeft: Point;
    bottomRight: Point;

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

export class Table {
    constructor(row: number, column: number) {
        if (row < 1) {
            throw new Error('Row must be great than 0.');
        }

        if (column < 1) {
            throw new Error('Column must be great than 0.');
        }

        if (row > Table.maxRows) {
            throw new Error(`Row must be less than ${Table.maxRows}.`);
        }

        if (column > Table.maxColumns) {
            throw new Error(`Column must be less than ${Table.maxColumns}.`);
        }

        this.buildCells(row, column);
    }

    private static maxRows = 500;
    private static maxColumns = 26;
    cells: Cell[][] = [];
    currentCell?: Point;
    selectedRectangle?: Rectangle;

    select(row: number, column: number): void {
        this.currentCell = new Point(row, column);
        this.selectedRectangle = Rectangle.build(this.currentCell, this.currentCell);
    }

    selectMore(row: number, column: number): void {
        this.selectedRectangle.update(this.currentCell, new Point(row, column));
    }

    shouldUpdateSelectedCell(row: number, column: number): boolean {
        return !(this.currentCell && this.currentCell.equal(new Point(row, column)));
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

    public get rowCount(): number {
        return this.cells.length;
    }

    public get columnCount(): number {
        return this.cells[0].length;
    }

    public static get maxRowCount(): number {
        return Table.maxRows;
    }

    public static get maxColumnCount(): number {
        return Table.maxColumns;
    }
}
