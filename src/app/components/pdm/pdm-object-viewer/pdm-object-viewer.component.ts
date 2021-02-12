import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NavigableNode, PdmReader, PdmReaderFactory, RootObject, Table } from 'src/app/models/pdmModels';
import { TableService } from 'src/app/services/table.service';
import { PdmService } from 'src/app/services/pdm.service';
import { TreeNode } from '../../shared/tree-viewer/treeNode';
import { PdmNavigableNode } from './models';
import { Store } from '@ngrx/store';
import { PdmState } from 'src/app/reducers/pdm.reducer';

@Component({
    selector: 'app-pdm-object-viewer',
    templateUrl: './pdm-object-viewer.component.html',
    styleUrls: ['./pdm-object-viewer.component.scss']
})
export class PdmObjectViewerComponent implements OnInit, OnDestroy {
    nodes: TreeNode[];
    pdmState$: Observable<PdmState>;
    tables: Table[];

    constructor(private tableService: TableService, private store: Store<{ pdm: PdmState }>) {
        this.pdmState$ = store.select('pdm');
        this.pdmState$.subscribe(x => {
            console.log(x);
            if (x.rootObject) {
                const nodes: NavigableNode[] = x.rootObject.getNavigableNodes();
                this.nodes = [];
                nodes.map(x => this.nodes.push(PdmNavigableNode.fromNavigableNode(x).toTreeNode()));

                this.tables = x.rootObject.getAllTables();
            }
        });
    }

    ngOnInit(): void { }

    ngOnDestroy(): void { }

    navigate(objId: string): void {
        const tables = this.tables.filter(x => x.id === objId);
        if (tables.length > 0) {
            this.tableService.sendTable(tables[0]);
        }
    }
}
