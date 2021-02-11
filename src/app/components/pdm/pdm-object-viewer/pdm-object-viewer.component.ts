import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigableNode, PdmReader, PdmReaderFactory, RootObject, Table } from 'src/app/models/pdmModels';
import { TableService } from 'src/app/services/table.service';
import { PdmService } from 'src/app/services/pdm.service';
import { TreeNode } from '../../shared/tree-viewer/treeNode';
import { PdmNavigableNode } from './models';

@Component({
    selector: 'app-pdm-object-viewer',
    templateUrl: './pdm-object-viewer.component.html',
    styleUrls: ['./pdm-object-viewer.component.scss']
})
export class PdmObjectViewerComponent implements OnInit, OnDestroy {
    nodes: TreeNode[];
    serviceSubscription: Subscription | null;
    pdmReader: PdmReader;
    rootObject: RootObject;
    tables: Table[];

    constructor(private pdmService: PdmService, private tableService: TableService) {
    }

    ngOnInit(): void {
        this.serviceSubscription = this.pdmService.getObservable().subscribe(async file => {
            this.pdmReader = await PdmReaderFactory.createFromFile(file);
            this.readObjects();
            this.tableService.sendTable(undefined);
        });
    }

    ngOnDestroy(): void {
        this.serviceSubscription?.unsubscribe();
    }

    readObjects(): void {
        this.rootObject = this.pdmReader.readRootObject();
        const nodes: NavigableNode[] = this.rootObject.getNavigableNodes();
        this.nodes = [];
        nodes.map(x => this.nodes.push(PdmNavigableNode.fromNavigableNode(x).toTreeNode()));

        this.tables = this.rootObject.getAllTables();
    }

    navigate(objId: string): void {
        const tables = this.tables.filter(x => x.id === objId);
        if (tables.length > 0) {
            this.tableService.sendTable(tables[0]);
        }
    }
}
