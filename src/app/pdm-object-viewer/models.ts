import { TreeNode } from '../tree-viewer/treeNode';
import { NavigableNode } from '../models/pdmModels';

export class PdmNavigableNode implements NavigableNode {
    id: string;
    objectId: string;
    name: string;
    code: string;
    children?: NavigableNode[];

    static fromNavigableNode(node: NavigableNode): PdmNavigableNode {
        const o = new PdmNavigableNode();
        o.id = node.id;
        o.objectId = node.objectId;
        o.name = node.name;
        o.code = node.code;
        o.children = node.children;

        return o;
    }

    toTreeNode(): TreeNode {
        let children: TreeNode[] | undefined;
        if (this.children) {
            children = [];
            this.children.map(x => children.push(PdmNavigableNode.fromNavigableNode(x).toTreeNode()));
        }

        const node: TreeNode = {
            id: this.id,
            name: this.name,
            children
        };

        return node;
    }
}
