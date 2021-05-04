import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import { TreeNode } from '../../types/tree';
import { CollapsedListItem } from './CollapsedListItem';

interface Props {
    nodes: TreeNode[];
    level: number;
}

export const NormalListItem: React.FC<Props> = (props: Props) => {
    return (
        <>
            {props.nodes.map(x => {
                if (x.children) {
                    return <CollapsedListItem node={x} key={x.id} level={props.level} />
                }

                return (
                    <ListItem button key={x.id}>
                        <ListItemText primary={x.name} style={{ paddingLeft: (props.level * 32).toString() + 'px' }} />
                    </ListItem>
                );
            })}
        </>
    );
};
