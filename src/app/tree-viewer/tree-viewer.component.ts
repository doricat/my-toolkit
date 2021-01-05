import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { TreeNode, TreeNodeViewModel } from './treeNode';

@Component({
    selector: 'app-tree-viewer',
    templateUrl: './tree-viewer.component.html',
    styleUrls: ['./tree-viewer.component.scss']
})
export class TreeViewerComponent implements OnInit, OnChanges {
    nodes: TreeNodeViewModel[] = [];
    @Input() child: TreeNode;
    @Input() children: TreeNode[];
    @Output() navigate = new EventEmitter<string>();

    constructor() {

    }

    ngOnInit(): void {

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.children?.currentValue) {
            const nodes = changes.children.currentValue as TreeNode[];
            const list: TreeNodeViewModel[] = [];
            for (let i = 0; i < nodes.length; i++) {
                const element = nodes[i];
                list.push(TreeNodeViewModel.fromTreeNode(element));
            }

            this.nodes = list;
        }

        if (changes.child?.currentValue) {
            const node = changes.child.currentValue as TreeNode;
            const list: TreeNodeViewModel[] = [];
            list.push(TreeNodeViewModel.fromTreeNode(node));

            this.nodes = list;
        }
    }

    onClick(node: TreeNodeViewModel): void {
        node.collapsed = !node.collapsed;
    }

    onNavigate(evt: Event, node: TreeNodeViewModel): void {
        evt.preventDefault();
        this.navigate.emit(node.id);
    }

    onNavigate2(objId: string): void {
        this.navigate.emit(objId);
    }
}
