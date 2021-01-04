export interface TreeNode {
    id: string;
    name: string;
    path?: string;
    children?: TreeNode[];
}

export class TreeNodeViewModel implements TreeNode {
    id: string;
    name: string;
    path?: string;
    children?: TreeNodeViewModel[];

    collapsed: boolean;

    static fromTreeNode(treeNode: TreeNode): TreeNodeViewModel {
        const model = new TreeNodeViewModel();
        model.id = treeNode.id;
        model.name = treeNode.name;
        model.path = treeNode.path;
        if (treeNode.children) {
            model.children = [];
            for (const item of treeNode.children) {
                model.children.push(TreeNodeViewModel.fromTreeNode(item));
            }
        }
        model.collapsed = true;

        return model;
    }

    public get navigable(): boolean {
        return this.children === undefined || this.children.length === 0;
    }
}
