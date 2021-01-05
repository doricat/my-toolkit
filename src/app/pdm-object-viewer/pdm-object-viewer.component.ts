import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PdmService } from '../pdm.service';
import { TreeNode } from '../tree-viewer/treeNode';
import { NavigableNode, PdmReader, PdmReaderFactory, RootObject } from '../models/pdmModels';
import { PdmNavigableNode } from './models';

@Component({
    selector: 'app-pdm-object-viewer',
    templateUrl: './pdm-object-viewer.component.html',
    styleUrls: ['./pdm-object-viewer.component.scss']
})
export class PdmObjectViewerComponent implements OnInit {
    nodes: TreeNode[];
    serviceSubscription: Subscription | null;
    pdmReader: PdmReader;
    rootObject: RootObject;

    constructor(private pdmService: PdmService) {
    }

    ngOnInit(): void {
        this.serviceSubscription = this.pdmService.getObservable().subscribe(async file => {
            this.pdmReader = await PdmReaderFactory.createFromFile(file);
            this.readObjects();
        });
    }

    readObjects(): void {
        this.rootObject = this.pdmReader.readRootObject();
        const nodes: NavigableNode[] = this.rootObject.getNavigableNodes();
        this.nodes = [];
        nodes.map(x => this.nodes.push(PdmNavigableNode.fromNavigableNode(x).toTreeNode()));
    }
}
