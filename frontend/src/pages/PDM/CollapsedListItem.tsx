import React from 'react';
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { TreeNode } from '../../types/tree';
import { NormalListItem } from './NormalListItem';

interface Props {
    node: TreeNode;
    level: number;
}

export const CollapsedListItem: React.FC<Props> = (props: Props) => {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    const node = props.node;

    return (
        <>
            <ListItem button onClick={handleClick}>
                <ListItemText primary={node.name} style={{ paddingLeft: (props.level * 32).toString() + 'px' }} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <NormalListItem nodes={node.children!} level={props.level + 1} />
                </List>
            </Collapse>
        </>
    );
};
