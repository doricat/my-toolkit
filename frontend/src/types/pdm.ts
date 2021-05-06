import { copyTo } from "../utils/array";
import { firstOrDefault } from "../utils/html";

export interface RefObject {
    ref: string;
}

export interface NavigableNode {
    id: string;
    objectId: string;
    name: string;
    code: string;
    children?: NavigableNode[];
}

export class BasicObject {
    constructor(id: string, objectId: string, element: Element, name: string | null, code: string | null) {
        this.id = id;
        this.objectId = objectId;
        this.name = name;
        this.code = code;
        this.element = element;
    }

    id: string;
    objectId: string;
    name: string | null;
    code: string | null;
    element: Element;
    comment: string | null = null;

    static readFromElement(element: Element): BasicObject | null {
        if (element.namespaceURI !== 'object') {
            return null;
        }

        let objectId: string = '';
        let name: string = '';
        let code: string = '';
        let comment: string | null = null;

        for (let i = 0; i < element.children.length; i++) {
            const child = element.children[i];

            if (child.nodeName === 'a:ObjectID') {
                objectId = child.textContent!;
            }

            if (child.nodeName === 'a:Name') {
                name = child.textContent!;
            }

            if (child.nodeName === 'a:Code') {
                code = child.textContent!;
            }

            if (child.nodeName === 'a:Comment') {
                comment = child.textContent;
            }
        }

        const id = element.attributes.getNamedItem('Id')?.value ?? '';
        const o = new BasicObject(id, objectId, element, name, code);
        o.comment = comment;
        return o;
    }

    convertTo<T extends BasicObject>(c: new (id: string, objectId: string, element: Element, name: string | null, code: string | null) => T): T {
        const o = new c(this.id, this.objectId, this.element, this.name, this.code);
        o.comment = this.comment;

        return o;
    }
}

export class RootObject {
    constructor(id: string, children: Model[], element: Element) {
        this.id = id;
        this.children = children;
        this.element = element;
    }

    id: string;
    children: Model[];
    element: Element;

    getNavigableNodes(): NavigableNode[] {
        const nodes: NavigableNode[] = [];
        this.children.forEach(x => nodes.push(x.getNavigableNode()));

        return nodes;
    }

    getAllTables(): Table[] {
        const tables: Table[] = [];
        this.children.forEach(x => copyTo(x.getAllTables(), tables));

        return tables;
    }
}

export class Model extends BasicObject {
    #packages: Package[] | undefined;
    #tables: Table[] | undefined;

    public get tables(): Table[] {
        if (this.#tables === undefined) {
            const tables: Table[] = [];

            const element = firstOrDefault(this.element.children, x => x.nodeName === 'c:Tables');
            if (element) {
                for (let i = 0; i < element.children.length; i++) {
                    const child = element.children[i];
                    if (child.nodeName === 'o:Table') {
                        const table = BasicObject.readFromElement(child)!.convertTo(Table);
                        tables.push(table);
                    }
                }
            }

            this.#tables = tables;
        }

        return this.#tables;
    }

    public get packages(): Package[] {
        if (this.#packages === undefined) {
            const packages: Package[] = [];

            const element = firstOrDefault(this.element.children, x => x.nodeName === 'c:Packages');
            if (element) {
                for (let i = 0; i < element.children.length; i++) {
                    const child = element.children[i];
                    if (child.nodeName === 'o:Package') {
                        const pkg = BasicObject.readFromElement(child)!.convertTo(Package);
                        packages.push(pkg);
                    }
                }
            }

            this.#packages = packages;
        }

        return this.#packages;
    }

    getNavigableNode(): NavigableNode {
        const children: NavigableNode[] = [];

        this.tables?.forEach(x => children.push({
            id: x.id,
            objectId: x.objectId,
            name: x.name!,
            code: x.code!
        }));

        this.packages?.forEach(x => children.push(x.getNavigableNode()));

        const node: NavigableNode = {
            id: this.id,
            objectId: this.objectId,
            name: this.name!,
            code: this.code!,
            children
        };

        return node;
    }

    getAllTables(): Table[] {
        const tables: Table[] = [];
        copyTo(this.tables, tables);
        this.packages.forEach(x => copyTo(x.getAllTables(), tables));

        return tables;
    }
}

export class Package extends Model {

}

export class Table extends BasicObject {
    #columns: Column[] | undefined;
    #keys: Key[] | undefined;
    #primaryKey: PrimaryKey | undefined;

    public get columns(): Column[] {
        if (this.#columns === undefined) {
            const columns: Column[] = [];

            const element = this.element.querySelector('Columns');
            if (element) {
                for (let i = 0; i < element.children.length; i++) {
                    const child = element.children[i];
                    if (child.nodeName === 'o:Column') {
                        const column = BasicObject.readFromElement(child)!.convertTo(Column);
                        column.table = this;
                        columns.push(column);
                    }
                }
            }

            this.#columns = columns;
        }

        return this.#columns;
    }

    public get keys(): Key[] {
        if (this.#keys === undefined) {
            const keys: Key[] = [];

            const element = this.element.querySelector('Keys');
            if (element) {
                for (let i = 0; i < element.children.length; i++) {
                    const child = element.children[i];
                    if (child.nodeName === 'o:Key') {
                        const key = BasicObject.readFromElement(child)!.convertTo(Key);
                        key.table = this;
                        keys.push(key);
                    }
                }
            }

            this.#keys = keys;
        }

        return this.#keys;
    }

    public get primaryKey(): PrimaryKey | undefined {
        if (this.#primaryKey === undefined) {
            const element = this.element.querySelector('PrimaryKey');
            if (element) {
                const child = firstOrDefault(element.children);
                if (child) {
                    const key = new PrimaryKey(child.attributes.getNamedItem('Ref')?.value ?? '');
                    key.table = this;
                    this.#primaryKey = key;
                }
            }
        }

        return this.#primaryKey;
    }
}

export class Column extends BasicObject {
    #dataType: string | null | undefined;
    #length: string | null | undefined;
    #precision: string | null | undefined;
    #mandatory: boolean | null | undefined;
    table: Table | undefined;

    public get dataType(): string | null {
        if (this.#dataType === undefined) {
            const content = this.element.querySelector('DataType')?.textContent ?? null;
            this.#dataType = content;
        }

        return this.#dataType;
    }

    public get length(): string | null {
        if (this.#length === undefined) {
            const content = this.element.querySelector('Length')?.textContent ?? null;
            this.#length = content;
        }

        return this.#length;
    }

    public get precision(): string | null {
        if (this.#precision === undefined) {
            const content = this.element.querySelector('Precision')?.textContent ?? null;
            this.#precision = content;
        }

        return this.#precision;
    }

    public get mandatory(): boolean | null {
        if (this.#mandatory === undefined) {
            const content = this.element.querySelector('Column\\.Mandatory')?.textContent;
            this.#mandatory = content === null ? false : content === '1';
        }

        return this.#mandatory;
    }

    public get isPrimaryKey(): boolean {
        if (this.table?.primaryKey) {
            const primaryKeyRef = this.table.primaryKey.ref;
            return this.table.keys.some(x => x.id === primaryKeyRef && x.columns.some(y => y.ref === this.id));
        }

        return false;
    }
}

export class Key extends BasicObject {
    #columns: RefObject[] | undefined;
    table: Table | undefined;

    public get columns(): RefObject[] {
        if (this.#columns === undefined) {
            const columns: RefObject[] = [];

            const keyColumns = this.element.querySelector('Key\\.Columns');
            if (keyColumns) {
                for (let i = 0; i < keyColumns.children.length; i++) {
                    const child = keyColumns.children[i];

                    if (child.nodeName === 'o:Column') {
                        columns.push({ ref: child.attributes.getNamedItem('Ref')?.value ?? '' });
                    }
                }
            }

            this.#columns = columns;
        }

        return this.#columns;
    }
}

export class PrimaryKey implements RefObject {
    constructor(ref: string) {
        this.ref = ref;
    }

    ref: string;
    table: Table | undefined;
}
