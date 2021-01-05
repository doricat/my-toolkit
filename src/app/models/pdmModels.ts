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

export interface NavigableObject {
    getNavigableNode(): NavigableNode;
    getNavigableNodes(): NavigableNode[];
}

export class BasicObject {
    constructor(id: string, objectId: string, name: string, code: string, element: Element) {
        this.id = id;
        this.objectId = objectId;
        this.name = name;
        this.code = code;
        this.element = element;
    }

    id: string;
    objectId: string;
    name?: string;
    code?: string;
    element: Element;
    comment?: string;

    static readFromElement(element: Element): BasicObject | null {
        if (element.namespaceURI !== 'object') {
            return null;
        }

        let objectId: string;
        let name: string | undefined;
        let code: string | undefined;
        let comment: string | undefined;

        for (let i = 0; i < element.children.length; i++) {
            const child = element.children[i];

            if (child.nodeName === 'a:ObjectID') {
                objectId = child.textContent;
            }

            if (child.nodeName === 'a:Name') {
                name = child.textContent;
            }

            if (child.nodeName === 'a:Code') {
                code = child.textContent;
            }

            if (child.nodeName === 'a:Comment') {
                comment = child.textContent;
            }
        }

        const id = element.attributes.getNamedItem('Id')?.value ?? '';
        const o = new BasicObject(id, objectId, name, code, element);
        o.comment = comment;
        return o;
    }

    convertTo<T extends BasicObject>(c: new (id: string, objectId: string, name: string, code: string, element: Element) => T): T {
        const o = new c(this.id, this.objectId, this.name, this.code, this.element);
        o.comment = this.comment;

        return o;
    }
}

export class RootObject implements NavigableObject {
    constructor(id: string, children: Model[], element: Element) {
        this.id = id;
        this.children = children;
        this.element = element;
    }

    id: string;
    children: Model[];
    element: Element;

    getNavigableNode(): NavigableNode {
        throw new Error('Not Implementation');
    }

    getNavigableNodes(): NavigableNode[] {
        const nodes: NavigableNode[] = [];
        this.children.map(x => nodes.push(x.getNavigableNode()));

        return nodes;
    }
}

export class Model extends BasicObject implements NavigableObject {
    #packages: Package[] | undefined;
    #tables: Table[] | undefined;

    public get tables(): Table[] {
        if (this.#tables === undefined) {
            const tables: Table[] = [];

            const element = this.element.querySelector('Tables');
            if (element) {
                for (let i = 0; i < element.children.length; i++) {
                    const child = element.children[i];
                    if (child.nodeName === 'o:Table') {
                        const table = BasicObject.readFromElement(child).convertTo(Table);
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

            const element = this.element.querySelector('Packages');
            if (element) {
                for (let i = 0; i < element.children.length; i++) {
                    const child = element.children[i];
                    if (child.nodeName === 'o:Package') {
                        const pkg = BasicObject.readFromElement(child).convertTo(Package);
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

        this.tables?.map(x => children.push({
            id: x.id,
            objectId: x.objectId,
            name: x.name,
            code: x.code
        }));

        this.packages?.map(x => children.push(x.getNavigableNode()));

        const node: NavigableNode = {
            id: this.id,
            objectId: this.objectId,
            name: this.name,
            code: this.code,
            children
        };

        return node;
    }

    getNavigableNodes(): NavigableNode[] {
        throw new Error('Not Implementation');
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
                        const column = BasicObject.readFromElement(child).convertTo(Column);
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
                        const key = BasicObject.readFromElement(child).convertTo(Key);
                        keys.push(key);
                    }
                }
            }

            this.#keys = keys;
        }

        return this.#keys;
    }

    public get primaryKey(): PrimaryKey {
        if (this.#primaryKey === undefined) {
            const element = this.element.querySelector('PrimaryKey');
            if (element) {
                const child = element.children.firstOrDefault();
                if (child) {
                    this.#primaryKey = new PrimaryKey(child.attributes.getNamedItem('Ref')?.value ?? '');
                }
            }
        }

        return this.#primaryKey;
    }
}

export class Column extends BasicObject {
    #dataType: string | undefined | null;
    #length: string | undefined | null;
    #precision: string | undefined | null;
    #mandatory: boolean | undefined | null;

    public get dataType(): string | null {
        if (this.#dataType === undefined) {
            const content = this.element.querySelector('DataType')?.textContent;
            this.#dataType = content;
        }

        return this.#dataType;
    }

    public get length(): string | null {
        if (this.#length === undefined) {
            const content = this.element.querySelector('Length')?.textContent;
            this.#length = content;
        }

        return this.#length;
    }

    public get precision(): string | null {
        if (this.#precision === undefined) {
            const content = this.element.querySelector('Precision')?.textContent;
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
}

export class Key extends BasicObject {
    #columns: RefObject[] | undefined;

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
}


export class PdmReader {
    constructor(document: Document) {
        if (!document.isPowerDesignerDocument()) {
            throw new Error('document格式不正确。');
        }

        this.document = document;
    }

    document: Document;

    readRootObject(): RootObject | null {
        const element = this.document.querySelector('RootObject');
        let rootObject: RootObject | null = null;

        do {
            if (!element) {
                break;
            }

            const childrenElement = element.children.firstOrDefault();
            if (!childrenElement) {
                break;
            }

            const models: Model[] = [];
            for (let i = 0; i < childrenElement.children.length; i++) {
                const child = childrenElement.children[i];
                if (child.nodeName === 'o:Model') {
                    const model = BasicObject.readFromElement(child).convertTo(Model);
                    models.push(model);
                }
            }

            const id = element.attributes.getNamedItem('Id')?.value ?? '';
            rootObject = new RootObject(id, models, element);
        } while (false);

        return rootObject;
    }
}

export class PdmReaderFactory {
    static createFromXml(xml: string): PdmReader {
        const parser = new DOMParser();
        const document = parser.parseFromString(xml, 'text/xml');

        if (document.parseError()) {
            throw new Error('parserError');
        }

        return new PdmReader(document);
    }

    static createFromFile(file: File): Promise<PdmReader> {
        const promise = new Promise((resolve: (reader: PdmReader) => void) => {
            const fileReader = new FileReader();
            fileReader.readAsText(file);
            fileReader.onloadend = () => {
                if (fileReader.readyState === FileReader.DONE) {
                    resolve(PdmReaderFactory.createFromXml(fileReader.result as string));
                }
            };
        });

        return promise;
    }
}
