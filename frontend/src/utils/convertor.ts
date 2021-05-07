import { NavigableNode, Table } from '../types/pdm';
import { MyTable } from '../types/table';
import { TreeNode } from '../types/tree';

const toTreeNode = (node: NavigableNode): TreeNode => {
    let children: TreeNode[] | undefined;
    if (node.children) {
        children = [];
        node.children.forEach(x => children!.push(toTreeNode(x)));
    }

    const result: TreeNode = {
        id: node.id,
        name: node.name,
        children
    };

    return result;
};

export const toTreeNodes = (nodes: NavigableNode[]): TreeNode[] => {
    const result: TreeNode[] = [];
    nodes.forEach(x => result.push(toTreeNode(x)));

    return result;
};

export const toTable = (table: Table): MyTable => {
    const array: (string | null)[][] = [];
    for (let i = 0; i < table.columns.length; i++) {
        const column = table.columns[i];
        const row: (string | null)[] = [
            column.name,
            column.code,
            column.comment,
            column.dataType,
            column.length,
            column.precision,
            String(column.isPrimaryKey),
            String(column.mandatory)
        ];

        array.push(row);
    }

    const result = MyTable.from2DArray(array);
    return result;
};

export const toTableSummary = (table: Table) => {
    return {
        code: table.code,
        name: table.name,
        comment: table.comment
    };
};
