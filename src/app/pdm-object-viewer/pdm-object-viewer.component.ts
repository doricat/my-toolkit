import { Component, OnInit } from '@angular/core';
import { TreeNodeViewModel } from '../tree-viewer/treeNode';

@Component({
    selector: 'app-pdm-object-viewer',
    templateUrl: './pdm-object-viewer.component.html',
    styleUrls: ['./pdm-object-viewer.component.scss']
})
export class PdmObjectViewerComponent implements OnInit {
    nodes: TreeNodeViewModel[];

    constructor() {
    }

    ngOnInit(): void {

    }
}
