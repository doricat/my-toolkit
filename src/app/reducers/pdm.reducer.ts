import { Action, createReducer, on } from '@ngrx/store';
import { readTables, selectTable, setObject } from '../actions/pdm.actions';
import { PdmNavigableNode } from '../components/pdm/pdm-object-viewer/models';
import { TreeNode } from '../components/shared/tree-viewer/treeNode';
import { RootObject, Table } from '../models/pdmModels';

export interface PdmState {
    fileName?: string;
    rootObject?: RootObject;
    treeNodes?: TreeNode[];
    tables?: Table[];
    selected?: string;
}

export const initialState: PdmState = {
    fileName: undefined,
    rootObject: undefined,
    treeNodes: undefined,
    tables: undefined,
    selected: undefined
};

const _pdmReducer = createReducer(
    initialState,
    on(setObject, (_, args) => {
        return { fileName: args.fileName, rootObject: args.rootObject };
    }),
    on(readTables, state => {
        const nodes = state.rootObject.getNavigableNodes();
        const treeNodes: TreeNode[] = [];
        nodes.map(x => treeNodes.push(PdmNavigableNode.fromNavigableNode(x).toTreeNode()));
        return { ...state, tables: state.rootObject.getAllTables(), treeNodes: treeNodes };
    }),
    on(selectTable, (state, args) => {
        return { ...state, selected: args.objectId };
    })
);

export function pdmReducer(state: PdmState | undefined, action: Action) {
    return _pdmReducer(state, action);
}
