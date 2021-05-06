import { makeObservable, observable, runInAction, action } from 'mobx';
import { PDMReaderFactory } from '../services/pdmService';
import { NavigableNode, Table } from '../types/pdm';

class Store {
    constructor() {
        makeObservable(this, {
            file: observable,
            nodes: observable,
            selectedTable: observable,
            openFile: action,
            selectTable: action,
            clean: action
        });
    }

    file: File | null = null;
    nodes: NavigableNode[] = [];
    tables: Table[] = [];
    selectedTable: Table | null = null;

    async openFile(): Promise<void> {
        if (this.file != null) {
            const reader = await PDMReaderFactory.createFromFile(this.file);
            const rootObject = reader.readRootObject();
            runInAction(() => {
                this.nodes = rootObject?.getNavigableNodes() ?? [];
                this.tables = rootObject?.getAllTables() ?? [];
            });
        }
    }

    selectTable(id: string): void {
        const tables = this.tables.filter(x => x.id === id);
        if (tables.length > 0) {
            this.selectedTable = tables[0];
        }
    }

    clean(): void {
        this.file = null;
        this.nodes = [];
        this.tables = [];
        this.selectedTable = null;
    }
}

export { Store as PDMStore };
